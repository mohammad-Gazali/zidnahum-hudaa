from reports.serializers import (
    ReportMemorizeMessageSerializer, 
    ReportsStudentResponseSerializer, 
    ReportsStudentCategoryOrGroupStudentSerializer, 
    ReportsStudentCategoryOrGroupResponseSerializer,
)
from students.models import MemorizeMessage, MessageTypeChoice, Student, StudentCategory, StudentGroup
from students.utils import get_num_pages_memo, get_num_pages_test
from collections.abc import Iterable

def get_student_report(student: Student, start_date, end_date):
    messages = student.memorizemessage_set.filter(
        sended_at__date__range=[start_date, end_date],
        message_type__in=[MessageTypeChoice.MEMO, MessageTypeChoice.TEST],
    )

    sum_memo, sum_test = _get_sums_student_report(messages)

    messages_data = ReportMemorizeMessageSerializer(messages, many=True)

    report_serializer = ReportsStudentResponseSerializer({ 
        'messages': messages_data.data,
        'sum_memo': sum_memo,
        'sum_test': sum_test,
        'sum_all': sum_memo + sum_test,
    })

    return report_serializer.data


def get_category_or_group_report(category_or_group: StudentCategory | StudentGroup, start_date, end_date):
    total_memo = 0
    total_test = 0
    students_result = []

    students = category_or_group.student_set.all()

    for student in students:
        sum_memo, sum_test = _get_sums_student_report(student, start_date, end_date)

        total_memo += sum_memo
        total_test += sum_test

        students_result.append(ReportsStudentCategoryOrGroupStudentSerializer({
            'student_id': student.pk,
            'student_name': student.name,
            'sum_memo': sum_memo,
            'sum_test': sum_test,
            'sum_all': sum_memo + sum_test,
        }).data)


    return ReportsStudentCategoryOrGroupResponseSerializer({
        'students': students_result,
        'total_memo': total_memo,
        'total_test': total_test,
        'total': total_memo + total_test,
    }).data


def _get_sums_student_report(messages: Iterable[MemorizeMessage]):
    sum_memo = 0
    sum_test = 0

    for message in messages:
        if message.message_type == MessageTypeChoice.MEMO:
            sum_memo += get_num_pages_memo(message.changes)

        elif message.message_type == MessageTypeChoice.TEST:
            sum_test += get_num_pages_test(message.changes)

    return sum_memo, sum_test