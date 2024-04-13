from rest_framework import serializers
from students.models import MemorizeMessage, StudentMasjedChoice


class ReportsRequestSerializer(serializers.Serializer):
    start_date = serializers.DateTimeField()
    end_date = serializers.DateTimeField()

class ReportsRequestWithMasjedSerializer(serializers.Serializer):
    start_date = serializers.DateTimeField()
    end_date = serializers.DateTimeField()
    masjed = serializers.ChoiceField(choices=StudentMasjedChoice.choices)

class ReportMemorizeMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemorizeMessage
        exclude = ['student']

class ReportsStudentResponseSerializer(serializers.Serializer):
    messages = ReportMemorizeMessageSerializer(many=True)
    sum_memo = serializers.FloatField()
    sum_test = serializers.FloatField()
    sum_all = serializers.FloatField()

class ReportsStudentCategoryOrGroupStudentSerializer(serializers.Serializer):
    student_id = serializers.IntegerField()
    student_name = serializers.CharField()
    sum_memo = serializers.FloatField()
    sum_test = serializers.FloatField()
    sum_all = serializers.FloatField()

class ReportsStudentCategoryOrGroupResponseSerializer(serializers.Serializer):
    students = ReportsStudentCategoryOrGroupStudentSerializer(many=True)
    total_memo = serializers.FloatField()
    total_test = serializers.FloatField()
    total = serializers.FloatField()

class ReportsCategoryOrGroupSpecificResponseSerializer(ReportsStudentCategoryOrGroupResponseSerializer):
    category_id = serializers.IntegerField()
    category_name = serializers.CharField()