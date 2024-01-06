from rest_framework import serializers
from students.models import StudentCategory, StudentGroup, MemorizeNotes, Student


class StudentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCategory
        fields = "__all__"


class StudentGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentGroup
        fields = "__all__"


class MemorizeNotesGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemorizeNotes
        fields = ["content", "sended_at"]


class MemorizeNotesCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemorizeNotes
        fields = ["student", "content"]


class StudentListSerializer(serializers.ModelSerializer):
    category = StudentCategorySerializer()
    group = StudentGroupSerializer()

    class Meta:
        model = Student
        fields = ["id", "name", "category", "group", "mother_name", "birthdate", "parts_received"]


class StudentDetailsSerializer(serializers.ModelSerializer):
    category = StudentCategorySerializer()
    group = StudentGroupSerializer()
    notes = MemorizeNotesGetSerializer(many=True)

    class Meta:
        model = Student
        fields = "__all__"