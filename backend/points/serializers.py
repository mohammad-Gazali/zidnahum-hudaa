from points.models import PointsAddingCause, PointsDeletingCause, PointsAdding, PointsDeleting
from rest_framework import serializers


class PointsAddingCauseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PointsAddingCause
        fields = "__all__"


class PointsAddingCreateSerializer(serializers.ModelSerializer):
    students = serializers.ListField(child=serializers.IntegerField(), allow_empty=False)

    class Meta:
        model = PointsAdding
        fields = ["students", "value", "cause"]


class PointsAddingListSerializer(serializers.ModelSerializer):
    student = serializers.CharField(source="student.name")
    masjed = serializers.IntegerField(source="student.masjed")

    class Meta:
        model = PointsAdding
        exclude = ["master"]
