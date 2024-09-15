from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView, DestroyAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_403_FORBIDDEN
from rest_framework.exceptions import ValidationError
from drf_yasg.openapi import Parameter, IN_QUERY, TYPE_STRING
from drf_yasg.utils import swagger_auto_schema
from comings.serializers import ComingCategorySerializer, ComingCreateSerializer, ComingListSerializer
from comings.models import ComingCategory, Coming
from comings.permissions import IsMasterForComing
from students.models import Student
from students.permissions import IsComingGroup
from adminstration.models import ControlSettings

# this is a query param for any model has student field and need to filter by it
param_student_name = Parameter("student__name", IN_QUERY, type=TYPE_STRING, description="param for filtering result via student name or student id")

class ComingCategroyListView(ListAPIView):
    queryset = ComingCategory.objects.all().order_by("id")
    serializer_class = ComingCategorySerializer
    pagination_class = None


class ComingListCreateView(ListCreateAPIView):
    permission_classes = [IsComingGroup]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        "category": ["exact"],
        "registered_at": ["gt", "lt"],
        "student__masjed": ["exact"],
    }

    def get_serializer_class(self):
        if self.request.method == "POST":
            return ComingCreateSerializer
        else:
            return ComingListSerializer

    def get_queryset(self):
        student_name = self.request.GET.get("student__name")

        if student_name:
            regex = Student.search_student_regex(student_name)
            student_name_kwargs = {"student__name__iregex": regex}
        else:
            student_name_kwargs = {}

        return (
            Coming.objects
            .filter(master=self.request.user)
            .filter(**student_name_kwargs)
            .select_related("student")
            .order_by("-registered_at")
        )

    def handle_exception(self, exc):

        if isinstance(exc, ValidationError):
            return Response({"detail": exc.detail}, HTTP_403_FORBIDDEN)

        return super().handle_exception(exc)

    def perform_create(self, serializer: ComingCreateSerializer):
        if Coming.objects.filter(**serializer.validated_data, registered_at__date=timezone.localtime().date()):
            raise ValidationError("you can't register a coming in for the same student and category in the same day")

        Coming.objects.create(
            master=self.request.user,
            is_doubled=ControlSettings.get_double_points(),
            **serializer.validated_data,
        )

    @swagger_auto_schema(manual_parameters=[param_student_name])
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class ComingDeleteView(DestroyAPIView):
    permission_classes = [IsComingGroup, IsMasterForComing]
    queryset = Coming.objects.all()
