from rest_framework.generics import ListAPIView, DestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from comings.serializers import ComingCategorySerializer, ComingSerializer
from comings.models import ComingCategory, Coming
from comings.permissions import IsMaster
from adminstration.models import ControlSettings


# TODO: test
class ComingCategroyListView(ListAPIView):
    queryset = ComingCategory.objects.all()
    serializer_class = ComingCategorySerializer


# TODO: test
class ComingListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ComingSerializer

    def get_queryset(self):
        return Coming.objects.filter(master=self.request.user)

    def perform_create(self, serializer: ComingSerializer):
        Coming.objects.create(
            master_id=self.request.user.pk,
            is_doubled=ControlSettings.get_double_points(),
            **serializer.validated_data,
        )


# TODO: test
class ComingDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated, IsMaster]
    queryset = Coming.objects.all()

