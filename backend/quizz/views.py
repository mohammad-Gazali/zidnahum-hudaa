from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from quizz.serializers import QuizzAccountLoginSerializer, CurrentQuizzAccountSerializer, QuizzSubjectListSerializer, QuizzSessionSerializer
from quizz.models import QuizzAccount, QuizzSubject, PassedQuizz, QuizzLevel, QuizzQuestion
from quizz.utils import get_quizz_account
from quizz.permissions import HasQuizzAccount
from typing import Iterable, Dict
from random import sample


# quizz account views
class LoginQuizzAccountView(APIView):
    http_method_names = ["post"]

    def post(self, *args, **kwargs):
        serializer = QuizzAccountLoginSerializer(self.request.data)

        if serializer.is_valid():
            account = get_object_or_404(
                QuizzAccount, 
                student_id=serializer.validated_data["student_id"],
                password=serializer.validated_data["password"]
            )

            if not self.request.session.session_key:
                self.request.session.create()
            session_id = self.request.session.session_key

            account.session = session_id
            account.save()

            return Response(status=HTTP_204_NO_CONTENT)

        return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)


class CurrentQuizzAccountView(APIView):
    http_method_names = ["get"]
    permission_classes = [HasQuizzAccount]

    def get(self, *args, **kwargs):
        account = get_quizz_account(self.request)

        return Response({ 
            "account": CurrentQuizzAccountSerializer({
                "student_name": account.student.name,
                "student_id": account.student.id,
            }).data if account else None 
        }, HTTP_200_OK)


# quizz views
class QuizzSubjectListView(APIView):
    http_method_names = ["get"]
    permission_classes = [HasQuizzAccount]
    
    def get(self, *args, **kwargs):
        current_account = get_quizz_account(self.request)
        
        all_subjects = QuizzSubject.objects.all()
        passed_quizzes: Iterable[PassedQuizz] = current_account.passedquizz_set.all()

        quizz_level: Dict[int, QuizzLevel] = {}

        for passed_quizz in passed_quizzes:
            if (passed_quizz.subject not in quizz_level) or (passed_quizz.level > quizz_level[passed_quizz.subject]):
                quizz_level[passed_quizz.subject] = passed_quizz.level

        data = []

        for subject in all_subjects:
            level_in_map = quizz_level.get(subject.id)

            if not level_in_map:
                level = QuizzLevel.FIRST
            elif level_in_map == QuizzLevel.THIRD:
                level = -1 # -1 for passed subject (all levels are completed)
            else:
                level = level_in_map + 1

            data.append({
                "id": subject.id,
                "name": subject.name,
                "level": level,
            })

        return Response(QuizzSubjectListSerializer(data, many=True).data, HTTP_200_OK)


class QuizzSessionView(APIView):
    http_method_names = ["get"]
    permission_classes = [HasQuizzAccount]

    def get(self, *args, **kwargs):
        current_account = get_quizz_account(self.request)

        subject_id = kwargs['id']

        subject = get_object_or_404(QuizzSubject, id=subject_id)

        last_passed_quizz = PassedQuizz.objects.filter(subject_id=subject_id, account_id=current_account.id).order_by('-level').first()

        if not last_passed_quizz:
            level = QuizzLevel.FIRST
        else:
            if last_passed_quizz.level == QuizzLevel.THIRD:
                return Response({ "detail": "تم تجاوز الحد الأعلى بالفعل" })
            else:
                level = last_passed_quizz.level + 1


        questions = map(
            lambda question: { 
                "body": question.body,
                "choices": sample([
                    question.right_choice,
                    question.wrong_choice1,
                    question.wrong_choice2,
                    question.wrong_choice2
                ], 4)
            },
            QuizzQuestion.objects.filter(subject=subject, level=level).order_by('?')[:30],
        )

        serializer = QuizzSessionSerializer({
            "quizz": {
                "id": subject.id,
                "name": subject.name,
                "level": level,
            },
            "questions": list(questions),
        })

        return Response(serializer.data, HTTP_200_OK)


class QuizzSessionSubmitAnswerView(APIView):
    http_method_names = ["post"]
    permission_classes = [HasQuizzAccount]

    def post(self, *args, **kwargs):
        current_account = get_quizz_account(self.request)