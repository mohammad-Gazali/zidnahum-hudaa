from students.models import MemorizeMessage, MessageTypeChoice, StudentMasjedChoice, Student
from students.constants import NEW
from comings.models import Coming
from reports import utils

def get_students_memo(start_date, end_date):
    result = [0] * len(StudentMasjedChoice)

    base_messages = MemorizeMessage.objects.filter(message_type=MessageTypeChoice.MEMO)

    base_messages = _get_messages_from_dates(base_messages, start_date, end_date)

    for value in StudentMasjedChoice.values:
        for message in base_messages.filter(student__masjed=value):
            result[value - 1] += utils.get_num_pages_memo(message.changes)

    return result


def get_students_test(start_date, end_date):
    result = [0] * len(StudentMasjedChoice)

    base_messages = MemorizeMessage.objects.filter(message_type=MessageTypeChoice.TEST)

    base_messages = _get_messages_from_dates(base_messages, start_date, end_date)

    for value in StudentMasjedChoice.values:
        for message in base_messages.filter(student__masjed=value):
            result[value - 1] += utils.get_num_pages_memo(message.changes)

    return result


def get_students_awqaf_test():
    result = [0] * len(StudentMasjedChoice)

    for value in StudentMasjedChoice.values:
        for student in Student.objects.filter(masjed=value):
            result[value - 1] += sum(1 for _ in filter(lambda x: x == NEW, student.q_awqaf_test))

    return result


def get_students_awqaf_test_looking():
    result = [0] * len(StudentMasjedChoice)

    for value in StudentMasjedChoice.values:
        for student in Student.objects.filter(masjed=value):
            result[value - 1] += sum(1 for _ in filter(lambda x: x == NEW, student.q_awqaf_test_looking))

    return result


def get_students_awqaf_test_explaining():
    result = [0] * len(StudentMasjedChoice)

    for value in StudentMasjedChoice.values:
        for student in Student.objects.filter(masjed=value):
            result[value - 1] += sum(1 for _ in filter(lambda x: x == NEW, student.q_awqaf_test_explaining))

    return result


def get_active_students(start_date, end_date):
    result = [0] * len(StudentMasjedChoice)

    comings = _get_coming_from_dates(start_date, end_date).select_related("student")

    for value in StudentMasjedChoice.values:
        result[value - 1] = (
            comings
                .filter(student__masjed=value)
                .values("student")
                .distinct()
                .count()
        )

    return result


def _get_messages_from_dates(messages, start_date, end_date):
    if start_date is not None and end_date is not None:
        return messages.filter(sended_at__date__range=[start_date, end_date])
    elif start_date is not None:
        return messages.filter(sended_at__date__gte=start_date)
    elif end_date is not None:
        return messages.filter(sended_at__date__lte=end_date)
    return messages


def _get_coming_from_dates(start_date, end_date):
    if start_date is not None and end_date is not None:
        return Coming.objects.filter(registered_at__date__range=[start_date, end_date])
    elif start_date is not None:
        return Coming.objects.filter(registered_at__date__gte=start_date)
    elif end_date is not None:
        return Coming.objects.filter(registered_at__date__lte=end_date)

    return Coming.objects.all()