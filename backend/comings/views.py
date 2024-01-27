from rest_framework.generics import ListAPIView, DestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from comings.serializers import ComingCategorySerializer, ComingCreateSerializer, ComingListSerializer
from comings.models import ComingCategory, Coming
from comings.permissions import IsMasterForComing
from adminstration.models import ControlSettings


class ComingCategroyListView(ListAPIView):
    queryset = ComingCategory.objects.all().order_by("id")
    pagination_class = None
    serializer_class = ComingCategorySerializer


class ComingListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return ComingCreateSerializer
        else:
            return ComingListSerializer

    def get_queryset(self):
        return Coming.objects.filter(master=self.request.user).order_by("-registered_at")

    def perform_create(self, serializer: ComingCreateSerializer):
        Coming.objects.create(
            master=self.request.user,
            is_doubled=ControlSettings.get_double_points(),
            **serializer.validated_data,
        )


class ComingDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated, IsMasterForComing]
    queryset = Coming.objects.all()
