from django.utils import timezone
from rest_framework.generics import ListAPIView, DestroyAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_403_FORBIDDEN
from rest_framework.exceptions import ValidationError
from comings.serializers import ComingCategorySerializer, ComingCreateSerializer, ComingListSerializer
from comings.models import ComingCategory, Coming
from comings.permissions import IsMasterForComing
from students.permissions import IsComingGroup
from adminstration.models import ControlSettings


class ComingCategroyListView(ListAPIView):
    queryset = ComingCategory.objects.all().order_by("id")
    serializer_class = ComingCategorySerializer
    pagination_class = None


class ComingListCreateView(ListCreateAPIView):
    permission_classes = [IsComingGroup]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return ComingCreateSerializer
        else:
            return ComingListSerializer

    def get_queryset(self):
        return (
            Coming.objects
            .filter(master=self.request.user)
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


class ComingDeleteView(DestroyAPIView):
    permission_classes = [IsComingGroup, IsMasterForComing]
    queryset = Coming.objects.all()
