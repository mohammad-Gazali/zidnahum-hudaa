import os
from django.core.management.base import BaseCommand
from django.conf import settings
from django.db.models import Prefetch
from openpyxl import Workbook
from students.models import Student, StudentLevelChoice, MemorizeMessage, MessageTypeChoice
from students.utils import get_num_pages_memo, get_num_pages_test
from students.constants import NEW
from comings.models import Coming
from points.models import PointsAdding
from money.models import MoneyDeleting
from awqaf.models import AwqafNoQStudentRelation
from adminstration.models import ControlSettings
from math import ceil
from typing import List


AWQAF_PART_POINTS = 50
AWQAF_LOOKING_PART_POINTS = 13
AWQAF_EXPLAINING_PART_POINTS = 25
HADEETH_POINTS = 3
ALLAH_NAMES_POINTS = 50
ELITE_PART_POINTS = 50
LEVEL_POINT_MAP = {
    StudentLevelChoice.ONE: 5,
    StudentLevelChoice.TWO: 7,
    StudentLevelChoice.THREE: 10,
}


class Command(BaseCommand):
    help = "Export students points info"

    def handle(self, *args, **options):
        wb = Workbook()
        ws = wb.active
        ws.title = "النقاط"

        # Write the header
        ws.append([
            'المعرف',
            'الاسم',
            'اسم الأم',
            'المسجد',
            'الفئة',
            'مستوى التجويد',
            'أحضره',
            'الغرامات بالليرة',
            'الغرامات بالنقطة',
            'نقاط الحلقات',
            'نقاط التسميع',
            'كلي النقاط',
        ])

        POINT_VALUE = ControlSettings.get_point_value()
        SKIP_EMPTY_STUDENTS = True
        RING_CAUSE_ID = 14
        
        students = (
            Student.objects
                .select_related("category")
                .prefetch_related("memorizemessage_set")
                .prefetch_related("pointsadding_set")
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

        for student in students:
            memo_points = calc_memo_points(student)
            hadeeth_points = calc_hadeeth_points(student)

            coming_points = sum(calc_coming_points(coming) for coming in student.coming_set.all())

            adding_points = sum(calc_adding_points(adding) for adding in student.pointsadding_set.all())

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
                adding_points +
                coming_points +
                memo_points +
                awqaf_no_q_points +
                hadeeth_points -
                money_deleted_points
            )

            rings_points = sum(calc_adding_points(adding) for adding in student.pointsadding_set.filter(cause_id=RING_CAUSE_ID))

            if SKIP_EMPTY_STUDENTS and total_points == 0 and money_deleted == 0:
                continue

            ws.append([
                student.pk,
                student.name,
                student.mother_name,
                student.get_masjed_display(),
                str(student.category) if student.category else "-",
                student.get_level_display(),
                student.bring_him,
                int(money_deleted),
                int(money_deleted_points),
                ceil(rings_points),
                ceil(memo_points),
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

    messages_points = sum(_calc_message_points(message, q_memo, q_test, q_elite_test) for message in student.memorizemessage_set.all())

    non_messages_memo_points = get_num_pages_memo(q_memo) * LEVEL_POINT_MAP[student.level]
    non_messages_test_points = get_num_pages_test(q_test) * LEVEL_POINT_MAP[student.level]
    non_messages_elite_test_points = len(q_elite_test) * ELITE_PART_POINTS

    return messages_points + non_messages_memo_points + non_messages_test_points + non_messages_elite_test_points

def calc_hadeeth_points(student: Student):
    riad_alsaalihin_points = HADEETH_POINTS * (student.riad_alsaalihin_new - student.riad_alsaalihin_old)
    alarbaein_alnawawia_points = HADEETH_POINTS * (student.alarbaein_alnawawia_new - student.alarbaein_alnawawia_old)

    valid_riad_alsaalihin_points = riad_alsaalihin_points if riad_alsaalihin_points > 0 else 0
    valid_alarbaein_alnawawia_points = alarbaein_alnawawia_points if alarbaein_alnawawia_points > 0 else 0

    hadeeth_points = valid_riad_alsaalihin_points + valid_alarbaein_alnawawia_points

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

def calc_adding_points(adding: PointsAdding):
    return adding.value

def calc_money_deleting(deleting: MoneyDeleting):
    return deleting.value if deleting.active_to_points else 0

def _calc_message_points(message: MemorizeMessage, q_memo: List[int], q_test: List[int], q_elite_test: List[int]):
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

    else:
        value = 0

    if message.is_doubled:
        return value * 2
    else:
        return value