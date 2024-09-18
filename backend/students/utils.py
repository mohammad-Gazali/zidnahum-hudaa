from django.utils import timezone
from students.constants import LAST_PART_POINT_MAP, LAST_PART_MAP
from students.constants import NON, NEW
from typing import List
from copy import copy
from math import ceil


# json utils
def json_default_value_618():
    return [NON] * 618

def json_default_value_240():
    return [NON] * 240

def json_default_value_60():
    return [NON] * 60

def json_default_value_30():
    return [NON] * 30


# time utils
def get_last_sat_date_range():
    today = timezone.localtime().date()

    # When day is saturday
    if today.weekday() == 5:
        next_sat = today + timezone.timedelta(7)
        return [today, next_sat]

    idx = (today.weekday() + 1) % 7

    last_sat = today - timezone.timedelta(days=idx + 1)
    next_sat = last_sat + timezone.timedelta(days=7)
    return [last_sat, next_sat]


def get_last_sat_date_range_for_previous_week():
    [last_sat, next_sat] = get_last_sat_date_range()

    return [last_sat - timezone.timedelta(7), next_sat - timezone.timedelta(7)]


def get_first_month_half_range():
    now = timezone.localtime()

    return [
        timezone.make_aware(timezone.datetime(year=now.year, month=now.month, day=1), now.tzinfo),
        timezone.make_aware(timezone.datetime(year=now.year, month=now.month, day=16), now.tzinfo),
    ]


def get_second_month_half_range():
    now = timezone.localtime()

    previous_month = now.month - 1 if now.month - 1 >= 1 else 12
    next_month = now.month + 1 if now.month + 1 <= 12 else 1
    year_for_previous_month = now.year if previous_month != 12 else now.year - 1
    year_for_next_month = now.year if next_month != 1 else now.year + 1

    if now.day <= 15:
        return [
            timezone.make_aware(timezone.datetime(year=year_for_previous_month, month=previous_month, day=16), now.tzinfo),
            timezone.make_aware(timezone.datetime(year=now.year, month=now.month, day=1), now.tzinfo),
        ]
    
    return [
        timezone.make_aware(timezone.datetime(year=now.year, month=now.month, day=16), now.tzinfo),
        timezone.make_aware(timezone.datetime(year=year_for_next_month, month=next_month, day=1), now.tzinfo),
    ]


def get_num_pages_memo(changes) -> float:
    result = 0
    for item in changes:
        if 0 <= item <= 580:
            result += 1
        else:
            result += LAST_PART_POINT_MAP.get(item, 0) / 5

    return result

def get_num_pages_test(changes) -> float:
    return len(changes) * 2.5


# display memorize message changes util function
def display_memorize_message_changes(changes, message_type) -> str:
    if message_type == 1:
        return ' - '.join(map(_convert_memo_item, changes))

    elif message_type == 2:
        return ' - '.join(map(_convert_test_item, changes))

    else:
        return '!!'

def _convert_memo_item(item: int):
    if 0 <= item <= 580:
        return str(item + 1)
    elif item <= 617:
        return LAST_PART_MAP.get(item, '!!')
    else:
        return '!!'

def _convert_test_item(item: int):
    if item < 0 or item > 239:
        return '!!'

    orderNumber = item + 1
    partOrderNumber =  4 if orderNumber % 4 == 0 else orderNumber % 4
    partNumber = ceil(orderNumber / 4)

    return f'الربع {partOrderNumber} من الحزب {partNumber}'


# adding memorize protections
def check_for_qtest(student, changes: List[int]) -> str | None:
    return _check_for_qtest_by_previously_qmemo(student, changes) or _check_for_qtest_by_only_one_active_section(student, changes)

def _check_for_qtest_by_previously_qmemo(student, changes: List[int]) -> str | None:
    valid_qmemo = []

    student_memorize = student.q_memorizing

    for i in range(30):
        if i == 0:
            s = student_memorize[:21]
        elif i != 29:
            s = student_memorize[i * 20 + 1 : i * 20 + 21]
        else:
            s = student_memorize[581:]
        
        valid_qmemo.append(all(map(lambda item: item != NON, s)))

    for item in changes:
        section_index = item // 8

        if not valid_qmemo[section_index]:
            return 'يجب أن يتم تسميع كامل الجزء قبل سبر أي ربع منه'


def _check_for_qtest_by_only_one_active_section(student, changes: List[int]) -> str | None:
    COMPLETED = 'completed'
    ACTIVE = 'active'
    UNTOUCHED = 'untouched'

    student_qtest_status = []

    item_exists = lambda item: item != NON

    student_qtest = copy(student.q_test)

    for i in range(30):
        boolean_list = list(map(item_exists, student_qtest[8 * i : 8 * (i + 1)]))

        if all(boolean_list):
            student_qtest_status.append(COMPLETED)
        elif any(boolean_list):
            student_qtest_status.append(ACTIVE)
        else:
            student_qtest_status.append(UNTOUCHED)

    for item in changes:
        has_active = any(map(lambda status: status == ACTIVE, student_qtest_status))

        section_index = item // 8

        student_qtest[item] = NEW
        if student_qtest_status[section_index] == UNTOUCHED and has_active:
            return 'لا يمكن سبر أي ربع من جزء ما لم يتم إكمال سبر الأجزاء الأخرى'

        elif student_qtest_status[section_index] == UNTOUCHED:
            student_qtest_status[section_index] = ACTIVE
            
        elif student_qtest_status[section_index] == ACTIVE and all(map(item_exists, student_qtest[8 * section_index : 8 * (section_index + 1)])):
            student_qtest_status[section_index] = COMPLETED