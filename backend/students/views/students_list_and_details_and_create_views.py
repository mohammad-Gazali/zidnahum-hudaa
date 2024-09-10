from django.utils import timezone
from django.db.models import Prefetch, Value, OuterRef, Exists
from django.conf import settings
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveAPIView
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from drf_yasg.utils import swagger_auto_schema
from drf_yasg.openapi import Parameter, IN_QUERY, TYPE_STRING
from students.serializers import StudentListSerializer, StudentCreateSerializer, StudentListWithComingRegistrationSerializer, StudentDetailsSerializer
from students.models import Student, MemorizeMessage
from students.utils import get_last_sat_date_range_for_previous_week, get_last_sat_date_range, get_first_month_half_range, get_second_month_half_range
from students.permissions import IsComingGroup
from comings.models import Coming
from adminstration.models import ControlSettings
from awqaf.models import AwqafNoQStudentRelation

query = Parameter("query", IN_QUERY, type=TYPE_STRING, description="param for filtering result via student name or student id")

# TODO: test create student
class StudentCreateListView(ListCreateAPIView):
    def get_permissions(self):
        return [] if self.request.method == "POST" else []

    @swagger_auto_schema(manual_parameters=[query])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return StudentCreateSerializer
        else:
            return StudentListSerializer

    def handle_exception(self, exc):

        if isinstance(exc, ValidationError):
            return Response({ "detail": exc.detail }, status=HTTP_400_BAD_REQUEST)

        return super().handle_exception(exc)

    def get_queryset(self):
        query = self.request.GET.get("query")
        masjed = self.request.GET.get("masjed")

        masjed_kwargs = {"masjed": int(masjed)} if masjed else {}

        if query is None:
            raise ValidationError("query param is required")

        if self.request.user.is_authenticated:
            return (
                Student
                .search_student(query)
                .filter(**masjed_kwargs)
                .order_by("id")
            )
        else:
            return (
                Student
                .search_student(query)
                .exclude(pk__in=ControlSettings.get_hidden_ids())
                .filter(**masjed_kwargs)
                .order_by("id")
            )


class StudentWithComingRegistrationListView(ListAPIView):
    permission_classes = [IsComingGroup]
    serializer_class = StudentListWithComingRegistrationSerializer

    def handle_exception(self, exc):

        if isinstance(exc, ValidationError):
            return Response({ "detail": exc.detail }, status=HTTP_400_BAD_REQUEST)

        return super().handle_exception(exc)

    def get_queryset(self):
        query = self.request.GET.get("query")
        masjed = self.request.GET.get("masjed")
        category_id: int = self.kwargs["coming_category_id"]

        if query is None:
            raise ValidationError("query param is required")

        masjed_kwargs = {"masjed": int(masjed)} if masjed else {}

        # getting students ids of regestired students in the same day
        # and this is for excluding them from the result
        registered_today_ids = (
            Coming.objects
            .filter(
                registered_at__date=timezone.now().date(), 
                category_id=category_id
            )
            .values('student_id')
            .distinct()
        )

        return (
            Student
            .search_student(query)
            .filter(**masjed_kwargs)
            .annotate(
                is_registered_today=Exists(
                    registered_today_ids.filter(student_id=OuterRef('id'))
                )
            )
            .order_by('id')
        )


class StudentDetailsView(RetrieveAPIView):
    serializer_class = StudentDetailsSerializer

    def get_queryset(self):
        awqaf_relations_prefetch = Prefetch(
            "awqafnoqstudentrelation_set",
            queryset=AwqafNoQStudentRelation.objects.all(),
            to_attr="awqaf_relations",
        )

        last_comings_prefetch = Prefetch(
            "coming_set",
            queryset=Coming.objects.filter(category_id=settings.Q_COMING_CATEGORY_ID).order_by("-registered_at")[:10],
            to_attr="last_comings",
        )

        previous_week_prefetch = Prefetch(
            "memorizemessage_set",
            queryset=MemorizeMessage.objects.filter(sended_at__range=get_last_sat_date_range_for_previous_week()),
            to_attr="previous_week_messages",
        )

        current_week_prefetch = Prefetch(
            "memorizemessage_set",
            queryset=MemorizeMessage.objects.filter(sended_at__range=get_last_sat_date_range()),
            to_attr="current_week_messages",
        )

        first_half_prefetch = Prefetch(
            "memorizemessage_set",
            queryset=MemorizeMessage.objects.filter(sended_at__range=get_first_month_half_range()),
            to_attr="first_half_month_messages",
        )
        
        second_half_prefetch = Prefetch(
            "memorizemessage_set",
            queryset=MemorizeMessage.objects.filter(sended_at__range=get_second_month_half_range()),
            to_attr="second_half_month_messages",
        )

        prefetches = [
            awqaf_relations_prefetch,
            last_comings_prefetch,
            previous_week_prefetch,
            current_week_prefetch,
            first_half_prefetch,
            second_half_prefetch,
        ]

        if self.request.user.is_authenticated:
            return (
                Student.objects.all()
                .prefetch_related(*prefetches)
                .annotate(current_date=Value(timezone.now().date()))
            )

        return (
            Student.objects
            .exclude(pk__in=ControlSettings.get_hidden_ids())
            .prefetch_related(*prefetches)
            .annotate(current_date=Value(timezone.now().date()))
        )
