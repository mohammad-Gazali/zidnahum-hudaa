import os
from django.core.management.base import BaseCommand
from django.conf import settings
from django.db.models import Prefetch
from openpyxl import Workbook
from students.models import Student, StudentLevelChoice, MemorizeMessage, MessageTypeChoice
from students.utils import get_num_pages_memo, get_num_pages_test
from students.constants import NEW
from comings.models import Coming
from points.models import PointsAdding, PointsAddingCause, PointsDeleting
from money.models import MoneyDeleting
from awqaf.models import AwqafNoQStudentRelation
from adminstration.models import ControlSettings
from math import ceil
from typing import List


AWQAF_PART_POINTS = 50
AWQAF_LOOKING_PART_POINTS = 15
AWQAF_EXPLAINING_PART_POINTS = 25
HADEETH_POINTS = 3
ALLAH_NAMES_POINTS = 15
ELITE_PART_POINTS = 50
POINT_VALUE = ControlSettings.get_point_value()
SKIP_EMPTY_STUDENTS = False
LEVEL_POINT_MAP = {
    StudentLevelChoice.ONE: 5,
    StudentLevelChoice.TWO: 5,
    StudentLevelChoice.THREE: 5,
}

class Command(BaseCommand):
    help = "Export students points info"

    def handle(self, *args, **options):
        wb = Workbook()
        ws = wb.active
        ws.title = "النقاط"

        adding_causes = [(cause.id, cause.name) for cause in PointsAddingCause.objects.all()]
        adding_causes_ids = [item[0] for item in adding_causes]
        adding_causes_names = [item[1] for item in adding_causes]

        # Write the header
        ws.append([
        'المعرف',
        'الاسم',
        'اسم الأم',
        'تاريخ الميلاد',
        'المسجد',
        'الفئة',
        'نقاط الحضور',
        *adding_causes_names,
        'نقاط التسميع',
        'نقاط الحديث',
        'نقاط سبر الأوقاف غيباً',
        'نقاط سبر الأوقاف نظراً',
        'نقاط سبر الأوقاف تفسيراً',
        'نقاط سبر الأوقاف بغير القرآن',
        'كلي النقاط',
        ])

        students = (
            Student.objects
                .select_related("category")
                .prefetch_related("memorizemessage_set")
                .prefetch_related("pointsadding_set")
                .prefetch_related("pointsdeleting_set")
                .prefetch_related(
                    Prefetch(
                        lookup="coming_set",
                        queryset=Coming.objects.select_related("category"),
                    ),
                )
                .prefetch_related(
                    Prefetch(
                        lookup="awqafnoqstudentrelation_set",
                        queryset=AwqafNoQStudentRelation.objects.select_related("test"),
                    ),
                )

        )

        # This is used to fill gaps between ids for students
        last_id = 100

        for student in students:
            memo_points = calc_memo_points(student)
            hadeeth_points = calc_hadeeth_points(student)

            coming_points = sum(calc_coming_points(coming) for coming in student.coming_set.all())

            adding_points_separated = []
            for adding_cause_id in adding_causes_ids:
              adding_points_separated.append(
                sum(
                  adding.value for adding in PointsAdding.objects.filter(student_id=student.id, cause_id=adding_cause_id)
                )
              )
            adding_points_sum = sum(adding_points_separated)

            deleting_points = sum(calc_deleting_points(deleting) for deleting in student.pointsdeleting_set.all())

            awqaf_test_points = len(list(filter(lambda x: x == NEW, student.q_awqaf_test))) * AWQAF_PART_POINTS
            awqaf_looking_test_points = len(list(filter(lambda x: x == NEW, student.q_awqaf_test_looking))) * AWQAF_LOOKING_PART_POINTS
            awqaf_explaining_test_points = len(list(filter(lambda x: x == NEW, student.q_awqaf_test_explaining))) * AWQAF_EXPLAINING_PART_POINTS

            awqaf_no_q_points = sum(calc_awqaf_no_q_points(relation) for relation in student.awqafnoqstudentrelation_set.filter(is_old=False))

            money_deleted = sum(calc_money_deleting(deleting) for deleting in student.moneydeleting_set.all())
            money_deleted_points = money_deleted / POINT_VALUE

            total_points = (
                awqaf_test_points +
                awqaf_looking_test_points +
                awqaf_explaining_test_points +
                adding_points_sum +
                coming_points +
                memo_points +
                awqaf_no_q_points +
                hadeeth_points -
                money_deleted_points -
                deleting_points
            )

            if SKIP_EMPTY_STUDENTS and total_points == 0 and money_deleted == 0:
                continue

            while student.pk != last_id + 1:
              ws.append([last_id + 1])
              last_id += 1

            last_id = student.pk

            ws.append([
                student.pk,
                student.name,
                student.mother_name,
                student.birthdate,
                student.get_masjed_display(),
                str(student.category) if student.category else "-",
                coming_points,
                *adding_points_separated,
                ceil(memo_points),
                int(hadeeth_points),
                awqaf_test_points,
                awqaf_looking_test_points,
                awqaf_explaining_test_points,
                awqaf_no_q_points,
                ceil(total_points),
            ])


        # Define output path (you can customize this)
        filename = "exported_points.xlsx"
        output_dir = os.path.join(settings.BASE_DIR.parent)
        file_path = os.path.join(output_dir, filename)

        # Save the workbook
        wb.save(file_path)

        self.stdout.write(
            self.style.SUCCESS(f'Successfully exported data to {filename}')
        )

def calc_memo_points(student: Student):
    q_memo = [index for (index, value) in enumerate(student.q_memorizing) if value == NEW]
    q_test = [index for (index, value) in enumerate(student.q_test) if value == NEW]
    q_elite_test = [index for (index, value) in enumerate(student.q_elite_test) if value == NEW]
    q_viewing = [index for (index, value) in enumerate(student.q_viewing) if value == NEW]

    messages_points = sum(_calc_message_points(message, q_memo, q_test, q_elite_test, q_viewing) for message in student.memorizemessage_set.all())

    non_messages_memo_points = get_num_pages_memo(q_memo) * LEVEL_POINT_MAP[student.level]
    non_messages_test_points = get_num_pages_test(q_test) * LEVEL_POINT_MAP[student.level]
    non_messages_elite_test_points = len(q_elite_test) * ELITE_PART_POINTS
    non_messages_viewing_points = get_num_pages_memo(q_viewing) * LEVEL_POINT_MAP[student.level]

    return messages_points + non_messages_memo_points + non_messages_test_points + non_messages_elite_test_points + non_messages_viewing_points

def calc_hadeeth_points(student: Student):
    riad_alsaalihin_points = HADEETH_POINTS * (student.riad_alsaalihin_new - student.riad_alsaalihin_old)
    alarbaein_alnawawia_points = HADEETH_POINTS * (student.alarbaein_alnawawia_new - student.alarbaein_alnawawia_old)
    extra_hadeeth_points = HADEETH_POINTS * student.extra_hadeeth

    valid_riad_alsaalihin_points = max(0, riad_alsaalihin_points)
    valid_alarbaein_alnawawia_points = max(0, alarbaein_alnawawia_points)
    valid_extra_hadeeth_points = max(0, extra_hadeeth_points)

    hadeeth_points = valid_riad_alsaalihin_points + valid_alarbaein_alnawawia_points + valid_extra_hadeeth_points

    allah_names_points = ALLAH_NAMES_POINTS if (student.allah_names_new and not student.allah_names_old) else 0

    return hadeeth_points + allah_names_points

def calc_coming_points(coming: Coming):
    value = coming.category.points

    if coming.is_doubled:
        return value * 2
    else:
        return value

def calc_awqaf_no_q_points(relation: AwqafNoQStudentRelation):
    if relation.is_old: return 0

    return relation.test.points

def calc_deleting_points(deleting: PointsDeleting):
    return deleting.value

def calc_money_deleting(deleting: MoneyDeleting):
    return deleting.value if deleting.active_to_points else 0

def _calc_message_points(message: MemorizeMessage, q_memo: List[int], q_test: List[int], q_elite_test: List[int], q_viewing: List[int]):
    changes = [*message.changes]
    remove_from_changes = []

    if message.message_type == MessageTypeChoice.MEMO:
        for item in changes:
            if item in q_memo:
                q_memo.remove(item)
            else:
                remove_from_changes.append(item)

        for item_to_remove in remove_from_changes:
            changes.remove(item_to_remove)

        value = get_num_pages_memo(changes) * LEVEL_POINT_MAP[message.student_level]

    elif message.message_type == MessageTypeChoice.TEST:
        for item in changes:
            if item in q_test:
                q_test.remove(item)
            else:
                remove_from_changes.append(item)

        for item_to_remove in remove_from_changes:
            changes.remove(item_to_remove)

        value = get_num_pages_test(changes) * LEVEL_POINT_MAP[message.student_level]

    elif message.message_type == MessageTypeChoice.ELITE_TEST:
        for item in changes:
            if item in q_elite_test:
                q_elite_test.remove(item)
            else:
                remove_from_changes.append(item)

        for item_to_remove in remove_from_changes:
            changes.remove(item_to_remove)

        value = len(changes) * ELITE_PART_POINTS

    elif message.message_type == MessageTypeChoice.VIEWING:
        for item in changes:
            if item in q_viewing:
                q_viewing.remove(item)
            else:
                remove_from_changes.append(item)

        for item_to_remove in remove_from_changes:
            changes.remove(item_to_remove)

        value = get_num_pages_memo(changes) * LEVEL_POINT_MAP[message.student_level]

    else:
        value = 0

    if message.is_doubled:
        return value * 2
    else:
        return value
