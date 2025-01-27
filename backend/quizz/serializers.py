from rest_framework import serializers
from quizz.models import QuizzSubject, QuizzLevel


# quizz accounts related serializers
class QuizzAccountLoginSerializer(serializers.Serializer):
    student_id = serializers.IntegerField()
    password = serializers.RegexField(r"^.{6}$")


class CurrentQuizzAccountSerializer(serializers.Serializer):
    student_name = serializers.CharField()
    student_id = serializers.IntegerField()


# quizz related serializers
class QuizzSubjectListSerializer(serializers.ModelSerializer):
    level = serializers.ChoiceField([*QuizzLevel.choices, (-1, 'Passed')])

    class Meta:
        model = QuizzSubject
        fields = "__all__"


class QuizzQuestionSerializer(serializers.Serializer):
    body = serializers.CharField()
    choices = serializers.ListField(child=serializers.CharField(), min_length=4, max_length=4)


class QuizzSessionSerializer(serializers.Serializer):
    quizz = QuizzSubjectListSerializer()
    questions = QuizzQuestionSerializer(many=True)


class QuizzQuesionSubmitSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    selected_choice = serializers.CharField(default=None)


class QuizzSubmitSessionSerializers(serializers.Serializer):
    quizz = QuizzSubjectListSerializer()
    questions = QuizzQuesionSubmitSerializer(many=True)


class QuizzQuestionResultSerializer(QuizzQuestionSerializer):
    right_choice_index = serializers.IntegerField()


class QuizzSessionResultSerializer(serializers.Serializer):
    quizz = QuizzSubjectListSerializer()
    questions = QuizzQuestionResultSerializer(many=True)