from rest_framework import serializers
from comings.models import ComingCategory, Coming


class ComingCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ComingCategory
        fields = ["id", "name"]


class ComingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coming
        fields = ["student", "category"]


class ComingListSerializer(serializers.ModelSerializer):
    student = serializers.CharField(source="student.name")
    masjed = serializers.IntegerField(source="student.masjed")
    
    class Meta:
        model = Coming
        exclude = ["master", "is_doubled"]


class ComingListForStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coming
        fields = ["id", "registered_at"]