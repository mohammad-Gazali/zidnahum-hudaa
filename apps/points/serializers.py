from points.models import PointsAddingCause, PointsDeletingCause, PointsAdding, PointsDeleting
from rest_framework import serializers


class PointsAddingCauseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PointsAddingCause
        fields = "__all__"


class PointsDeletingCauseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PointsDeletingCause
        fields = "__all__"


class PointsAddingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PointsAdding
        fields = ["student", "value", "cause"]


class PointsDeletingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PointsDeleting
        fields = ["student", "value", "cause"]


class PointsAddingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PointsAdding
        fields = "__all__"


class PointsDeletingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PointsDeleting
        fields = "__all__"