from rest_framework import serializers
from adminstration.models import ControlSettings
from students.models import StudentMasjedChoice

class AddAwqafTestNoQRequestSerailizer(serializers.Serializer):
    students = serializers.ListField(child=serializers.IntegerField(), allow_empty=False)
    test = serializers.IntegerField()


class AddAwqafTestQRequestSerializer(serializers.Serializer):
    students = serializers.ListField(child=serializers.IntegerField(), allow_empty=False)
    type = serializers.ChoiceField(choices=[
        ('normal', 'normal'),
        ('looking', 'looking'),
        ('explaining', 'explaining'),
    ])
    parts = serializers.ListField(child=serializers.IntegerField(min_value=0, max_value=29))


class AddMoneyDeletingNormalRequestSerailizer(serializers.Serializer):
    students = serializers.ListField(child=serializers.IntegerField(), allow_empty=False)
    cause = serializers.IntegerField()
    value = serializers.IntegerField()


class AddMoneyDeletingCategoryRequestSerailizer(serializers.Serializer):
    category = serializers.IntegerField()
    cause = serializers.IntegerField()
    value = serializers.IntegerField()
    masjed = serializers.ChoiceField(choices=StudentMasjedChoice.choices)


class ControlSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlSettings
        exclude = ['id']


class StatisticsRequestSerializer(serializers.Serializer):
    start_date = serializers.DateField(required=False)
    end_date = serializers.DateField(required=False)
    memo = serializers.BooleanField(default=False)
    test = serializers.BooleanField(default=False)
    awqaf_test = serializers.BooleanField(default=False)
    awqaf_test_looking = serializers.BooleanField(default=False)
    awqaf_test_explaining = serializers.BooleanField(default=False)
    active_students = serializers.BooleanField(default=False)


class StatisticsListField(serializers.ListField):
    child = serializers.FloatField()

class StatisticsResponseSerializer(serializers.Serializer):
    memo = StatisticsListField()
    test = StatisticsListField()
    awqaf_test = StatisticsListField()
    awqaf_test_looking = StatisticsListField()
    awqaf_test_explaining = StatisticsListField()
    active_students = StatisticsListField()