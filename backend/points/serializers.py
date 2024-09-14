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
    class Meta:
        model = PointsAdding
        fields = "__all__"
