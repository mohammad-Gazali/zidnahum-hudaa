from django.utils import timezone
from students.constants import LAST_PART_POINT_MAP, LAST_PART_MAP
from math import ceil


# json utils
def json_default_value_618():
    return [0] * 618


def json_default_value_240():
    return [0] * 240

def json_default_value_60():
    return [0] * 60

def json_default_value_30():
    return [0] * 30


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