from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, ListCreateAPIView, DestroyAPIView
from points.models import PointsAddingCause, PointsDeletingCause, PointsAdding, PointsDeleting
from points.serializers import PointsAddingCauseSerializer, PointsDeletingCauseSerializer, PointsAddingCreateSerializer, PointsDeletingCreateSerializer, PointsAddingListSerializer, PointsDeletingListSerializer
from points.permissions import IsMasterForPointsAddingOrDeleting


# TODO: test
class PointsAddingCauseListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PointsAddingCauseSerializer
    queryset = PointsAddingCause.objects.all()


# TODO: test
class PointsDeletingCauseListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PointsDeletingCauseSerializer
    queryset = PointsDeletingCause.objects.all()


# TODO: test
class PointsAddingListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == "POST":
            return PointsAddingCreateSerializer
        else:
            return PointsAddingListSerializer

    def get_queryset(self):
        return PointsAdding.objects.filter(master=self.request.user)
    
    def perform_create(self, serializer: PointsAddingCreateSerializer):
        PointsAdding.objects.create(
            master=self.request.user,
            **serializer.validated_data,
        )


# TODO: test
class PointsDeletingListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == "POST":
            return PointsDeletingCreateSerializer
        else:
            return PointsDeletingListSerializer

    def get_queryset(self):
        return PointsDeleting.objects.filter(master=self.request.user)
    
    def perform_create(self, serializer: PointsDeletingCreateSerializer):
        PointsDeleting.objects.create(
            master=self.request.user,
            **serializer.validated_data,
        )


# TODO: test
class PointsAddingDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated, IsMasterForPointsAddingOrDeleting]
    queryset = PointsAdding.objects.all()


# TODO: test
class PointsDeletingDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated, IsMasterForPointsAddingOrDeleting]
    queryset = PointsDeleting.objects.all()