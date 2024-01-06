from django.utils import timezone
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from students.serializers import StudentListSerializer, StudentDetailsSerializer, MemorizeNotesCreateSerializer
from students.models import Student, MemorizeNotes
from comings.models import Coming
from adminstration.models import ControlSettings


# TODO: test
class StudentListView(ListAPIView):
    serializer_class = StudentListSerializer

    def get_queryset(self):
        query = self.request.GET.get("query")

        if self.request.user.is_authenticated:
            return Student.search_student(query)
        else:
            return Student.search_student(query).exclude(pk__in=ControlSettings.get_hidden_ids())


# TODO: test
class StudentNonRegisterdTodayListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentListSerializer

    def get_queryset(self):
        query = self.request.GET.get("query")
        category_id = self.request.GET.get("coming_category_id")

        if query is not None and category_id is not None:
            
            # getting students ids of regestired students in the same day
            # and this is for excluding them from the result
            registered_today = Coming.objects.filter(registered_at__date=timezone.now().date(), category_id=category_id)
            registered_today_ids = set(map(lambda x: x.student_id, registered_today))

            return Student.search_student(query).exclude(pk__in=registered_today_ids)


# TODO: test
class StudentDetailsView(RetrieveAPIView):
    serializer_class = StudentDetailsSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Student.objects.all()

        return Student.objects.exclude(pk__in=ControlSettings.get_hidden_ids())


# TODO: test
class MemorizeNotesCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MemorizeNotesCreateSerializer
    queryset = MemorizeNotes.objects.all()

    def perform_create(self, serializer: MemorizeNotesCreateSerializer):
        MemorizeNotes.objects.create(
            master_id=self.request.user.pk,
            **serializer.validated_data,
        )


# TODO: test
class MemorizeNotesDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = MemorizeNotes.objects.all()