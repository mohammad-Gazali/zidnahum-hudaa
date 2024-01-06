from django.utils import timezone
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from students.serializers import StudentSerializer
from students.models import Student
from comings.models import Coming
from adminstration.models import ControlSettings


# TODO: test
class StudentListView(ListAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        query = self.request.GET.get("query")

        if self.request.user.is_authenticated:
            return Student.search_student(query)
        else:
            return Student.search_student(query).exclude(pk__in=ControlSettings.get_hidden_ids())


# TODO: test
class StudentRegisterdTodayListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentSerializer

    def get_queryset(self):
        query = self.request.GET.get("query")
        category_id = self.request.GET.get("coming_category_id")

        if query is not None and category_id is not None:
            
            # getting students ids of regestired students in the same day
            # and this is for excluding them from the result
            registered_today = Coming.objects.filter(registered_at__date=timezone.now().date(), category_id=category_id)
            registered_today_ids = set(map(lambda x: x.student_id, registered_today))

            return Student.search_student(query).exclude(pk__in=registered_today_ids)