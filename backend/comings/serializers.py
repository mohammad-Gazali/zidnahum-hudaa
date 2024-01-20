from rest_framework import serializers
from comings.models import ComingCategory, Coming


class ComingCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ComingCategory
        fields = "__all__"


class ComingCreateSerializer(serializers.Serializer):
    student = serializers.IntegerField()
    category = serializers.IntegerField()


class ComingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coming
        fields = "__all__"