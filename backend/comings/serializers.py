from rest_framework import serializers
from comings.models import ComingCategory, Coming


class ComingCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ComingCategory
        fields = "__all__"


class ComingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coming
        fields = ["student", "category"]


class ComingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coming
        fields = "__all__"