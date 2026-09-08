from rest_framework import serializers
from students.models import StudentCategory, StudentGroup, MemorizeNotes, Student, MemorizeMessage, StudentMasjedChoice, StudentLevelChoice, MessageTypeChoice
from students.constants import EXTRA_HADEETH_LIMIT
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
    category = StudentCategorySerializer(allow_null=True)
    group = StudentGroupSerializer(allow_null=True)

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
    category = StudentCategorySerializer(allow_null=True)
    group = StudentGroupSerializer(allow_null=True)
    is_registered_today = serializers.BooleanField()

    class Meta:
        model = Student
        fields = ["id", "name", "category", "group", "mother_name", "birthdate", "masjed", "is_registered_today"]


class MemorizeMessageForStudentSerializer(serializers.ModelSerializer):
    changes = serializers.ListField(child=serializers.IntegerField(), required=False)

    class Meta:
        model = MemorizeMessage
        fields = ["id", "message_type", "changes"]


class StudentDetailsSerializer(serializers.ModelSerializer):
    level = serializers.ChoiceField(choices=StudentLevelChoice.choices, required=True)
    category = StudentCategorySerializer(allow_null=True)
    group = StudentGroupSerializer(allow_null=True)
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


class StudentUpdateQViewingSerializer(serializers.Serializer):
    q_viewing = serializers.ListField(
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


class StudentUpdateExtraHadeethSerializer(serializers.Serializer):
    value = serializers.IntegerField(min_value=0, max_value=EXTRA_HADEETH_LIMIT)


class MemorizeMessageSerializer(serializers.ModelSerializer):
    student = serializers.CharField(source="student.name")
    masjed = serializers.ChoiceField(choices=StudentMasjedChoice.choices, source="student.masjed")
    message_type = serializers.ChoiceField(choices=MessageTypeChoice.choices, required=True)
    changes = serializers.ListField(child=serializers.IntegerField(), required=False)

    class Meta:
        model = MemorizeMessage
        exclude = ["master", "is_doubled"]
