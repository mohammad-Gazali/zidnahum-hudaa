from rest_framework import serializers
from adminstration.models import ControlSettings
from students.models import Student, StudentMasjedChoice

class StudentUpdateSuperAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        exclude = ["id", "registered_at"]

    
class StudentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        exclude = [
            "id", "registered_at", "q_memorizing", "q_test",
            "q_elite_test", "q_awqaf_test", "q_awqaf_test_looking", 
            "q_awqaf_test_explaining",
        ]

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
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    memo = serializers.BooleanField(default=False)
    test = serializers.BooleanField(default=False)
    awqaf_test = serializers.BooleanField(default=False)
    awqaf_test_looking = serializers.BooleanField(default=False)
    awqaf_test_explaining = serializers.BooleanField(default=False)
    active_students = serializers.BooleanField(default=False)

class StatisticsResponseSerializer(serializers.Serializer):
    memo = serializers.ListField(child=serializers.FloatField(), required=False)
    test = serializers.ListField(child=serializers.FloatField(), required=False)
    awqaf_test = serializers.ListField(child=serializers.FloatField(), required=False)
    awqaf_test_looking = serializers.ListField(child=serializers.FloatField(), required=False)
    awqaf_test_explaining = serializers.ListField(child=serializers.FloatField(), required=False)
    active_students = serializers.ListField(child=serializers.FloatField(), required=False)

class TotalMoneyListSerializer(serializers.Serializer):
    id = serializers.IntegerField(source="student__id")
    name = serializers.CharField(source="student__name")
    sum = serializers.IntegerField()

class AddEliteTestSerializer(serializers.Serializer):
    student = serializers.IntegerField()
    parts = serializers.ListField(child=serializers.IntegerField(min_value=0, max_value=59))