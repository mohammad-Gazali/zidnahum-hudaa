from django.utils import timezone
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.permissions import IsAuthenticated
from students.serializers import StudentListSerializer, StudentDetailsSerializer
from students.models import Student
from comings.models import Coming
from adminstration.models import ControlSettings


class StudentListView(ListAPIView):
    serializer_class = StudentListSerializer

    def handle_exception(self, exc):

        if isinstance(exc, ValidationError):
            return Response({ "detail": exc.detail }, status=HTTP_400_BAD_REQUEST)

        return super().handle_exception(exc)

    def get_queryset(self):
        query = self.request.GET.get("query")

        if query is None:
            raise ValidationError("query param is required")

        if self.request.user.is_authenticated:
            return Student.search_student(query).order_by("id")
        else:
            return Student.search_student(query).exclude(pk__in=ControlSettings.get_hidden_ids()).order_by("id")


class StudentNonRegisterdTodayListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentListSerializer

    def handle_exception(self, exc):

        if isinstance(exc, ValidationError):
            return Response({ "detail": exc.detail }, status=HTTP_400_BAD_REQUEST)

        return super().handle_exception(exc)

    def get_queryset(self):
        query = self.request.GET.get("query")
        category_id: int = self.kwargs["coming_category_id"]

        if query is None:
            raise ValidationError("query param is required")

            
        # getting students ids of regestired students in the same day
        # and this is for excluding them from the result
        registered_today = Coming.objects.filter(registered_at__date=timezone.now().date(), category_id=category_id)
        registered_today_ids = set(map(lambda x: x.student_id, registered_today))

        return Student.search_student(query).exclude(pk__in=registered_today_ids).order_by("id")


# TODO: add last_week q_memo and other extra values
# TODO: add tests to the nested fields
class StudentDetailsView(RetrieveAPIView):
    serializer_class = StudentDetailsSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Student.objects.all()

        return Student.objects.exclude(pk__in=ControlSettings.get_hidden_ids())
