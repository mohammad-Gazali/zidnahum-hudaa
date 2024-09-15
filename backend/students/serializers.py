from rest_framework import serializers
from students.models import StudentCategory, StudentGroup, MemorizeNotes, Student, MemorizeMessage
from awqaf.serializers import AwqafRelationSerializer
from comings.serializers import ComingListForStudentSerializer


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
        fields = ["id", "content", "sended_at"]


class MemorizeNotesCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemorizeNotes
        fields = ["student", "content"]


class StudentListSerializer(serializers.ModelSerializer):
    category = StudentCategorySerializer()
    group = StudentGroupSerializer()

    class Meta:
        model = Student
        fields = ["id", "name", "category", "group", "mother_name", "birthdate", "parts_received", "masjed"]


class StudentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        exclude = [
            "id", "registered_at", "q_memorizing", "q_test", "q_elite_test", "q_awqaf_test",
            "q_awqaf_test_looking", "q_awqaf_test_explaining",
            "alarbaein_alnawawia_new", "alarbaein_alnawawia_old",
            "riad_alsaalihin_new", "riad_alsaalihin_old",
            "allah_names_new", "allah_names_old"
        ]

class StudentListWithComingRegistrationSerializer(serializers.ModelSerializer):
    category = StudentCategorySerializer()
    group = StudentGroupSerializer()
    is_registered_today = serializers.BooleanField()

    class Meta:
        model = Student
        fields = ["id", "name", "category", "group", "mother_name", "birthdate", "masjed", "is_registered_today"]


class MemorizeMessageForStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemorizeMessage
        fields = ["id", "message_type", "changes"]


class StudentDetailsSerializer(serializers.ModelSerializer):
    category = StudentCategorySerializer()
    group = StudentGroupSerializer()
    memo_notes = MemorizeNotesGetSerializer(many=True)
    
    awqaf_relations = AwqafRelationSerializer(many=True)
    last_comings = ComingListForStudentSerializer(many=True)

    previous_week_messages = MemorizeMessageForStudentSerializer(many=True)
    current_week_messages = MemorizeMessageForStudentSerializer(many=True)
    first_half_month_messages = MemorizeMessageForStudentSerializer(many=True)
    second_half_month_messages = MemorizeMessageForStudentSerializer(many=True)

    current_date = serializers.DateField()

    class Meta:
        model = Student
        fields = "__all__"


class StudentUpdateQMemoSerializer(serializers.Serializer):
    q_memo = serializers.ListField(
        allow_empty=False,
        child=serializers.IntegerField(min_value=0, max_value=617),
    )


class StudentUpdateQTestSerializer(serializers.Serializer):
    q_test = serializers.ListField(
        allow_empty=False,
        child=serializers.IntegerField(min_value=0, max_value=239),
    )


class StudentUpdatePartsReceivedSerializer(serializers.Serializer):
    parts_received = serializers.CharField(max_length=50)


class StudentUpdateAlarbaeinAlnawawiaSerializer(serializers.Serializer):
    value = serializers.IntegerField(min_value=0, max_value=50)


class StudentUpdateRiadAlsaalihinSerializer(serializers.Serializer):
    value = serializers.IntegerField(min_value=0)


class MemorizeMessageSerializer(serializers.ModelSerializer):
    student = serializers.CharField(source="student.name")
    masjed = serializers.IntegerField(source="student.masjed")

    class Meta:
        model = MemorizeMessage
        exclude = ["master", "is_doubled"]