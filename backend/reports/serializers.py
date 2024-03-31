from rest_framework import serializers
from students.models import MemorizeMessage


class ReportsRequestSerializer(serializers.Serializer):
    start_date = serializers.DateTimeField()
    end_date = serializers.DateTimeField()

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