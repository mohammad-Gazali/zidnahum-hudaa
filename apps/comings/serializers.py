from rest_framework import serializers
from comings.models import ComingCategory, Coming


class ComingCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ComingCategory
        fields = "__all__"


class ComingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coming
        fields = ["student", "category"]