from django.utils import timezone
from students.constants import LAST_PART_MAP
import pytz


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
    year = timezone.now().year
    month = timezone.now().month
    day = timezone.now().day

    today = timezone.datetime(year=year, month=month, day=day, tzinfo=pytz.UTC)

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
    year = timezone.now().year
    month = timezone.now().month

    return [
        timezone.datetime(year=year, month=month, day=1, tzinfo=pytz.UTC),
        timezone.datetime(year=year, month=month, day=16, tzinfo=pytz.UTC),
    ]


def get_second_month_half_range():
    year = timezone.now().year
    month = timezone.now().month

    previous_month = month - 1 if month - 1 >= 1 else 12
    next_month = month + 1 if month + 1 <= 12 else 1
    year_for_previous_month = year if previous_month != 12 else year - 1
    year_for_next_month = year if next_month != 1 else year + 1

    if timezone.now().day <= 15:
        return [
            timezone.datetime(year=year_for_previous_month, month=previous_month, day=16, tzinfo=pytz.UTC),
            timezone.datetime(year=year, month=month, day=1, tzinfo=pytz.UTC),
        ]
    
    return [
        timezone.datetime(year=year, month=month, day=16, tzinfo=pytz.UTC),
        timezone.datetime(year=year_for_next_month, month=next_month, day=1, tzinfo=pytz.UTC),
    ]


def get_num_pages_memo(changes) -> float:
    result = 0
    for item in changes:
        if 0 <= item <= 580:
            result += 1
        else:
            result += LAST_PART_MAP.get(item, 0) / 5

    return result

def get_num_pages_test(changes) -> float:
    return len(changes) * 2.5