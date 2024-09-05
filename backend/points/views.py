from rest_framework.generics import ListAPIView, ListCreateAPIView, DestroyAPIView
from points.models import PointsAddingCause, PointsDeletingCause, PointsAdding, PointsDeleting
from points.serializers import PointsAddingCauseSerializer, PointsDeletingCauseSerializer, PointsAddingCreateSerializer, PointsDeletingCreateSerializer, PointsAddingListSerializer, PointsDeletingListSerializer
from points.permissions import IsMasterForPointsAddingOrDeleting
from students.permissions import IsPointsGroup


class PointsAddingCauseListView(ListAPIView):
    permission_classes = [IsPointsGroup]
    serializer_class = PointsAddingCauseSerializer
    queryset = PointsAddingCause.objects.all()
    pagination_class = None


class PointsDeletingCauseListView(ListAPIView):
    permission_classes = [IsPointsGroup]
    serializer_class = PointsDeletingCauseSerializer
    queryset = PointsDeletingCause.objects.all()
    pagination_class = None


class PointsAddingListCreateView(ListCreateAPIView):
    permission_classes = [IsPointsGroup]
    
    def get_serializer_class(self):
        if self.request.method == "POST":
            return PointsAddingCreateSerializer
        else:
            return PointsAddingListSerializer

    def get_queryset(self):
        return PointsAdding.objects.filter(master=self.request.user).order_by("-created_at")
    
    def perform_create(self, serializer: PointsAddingCreateSerializer):
        for student_id in serializer.validated_data['students']:
            PointsAdding.objects.create(
                master=self.request.user,
                value=serializer.validated_data['value'],
                cause=serializer.validated_data['cause'],
                student_id=student_id,
            )


class PointsDeletingListCreateView(ListCreateAPIView):
    permission_classes = [IsPointsGroup]
    
    def get_serializer_class(self):
        if self.request.method == "POST":
            return PointsDeletingCreateSerializer
        else:
            return PointsDeletingListSerializer

    def get_queryset(self):
        return PointsDeleting.objects.filter(master=self.request.user).order_by("-created_at")
    
    def perform_create(self, serializer: PointsDeletingCreateSerializer):
        for student_id in serializer.validated_data['students']:
            PointsDeleting.objects.create(
                master=self.request.user,
                value=serializer.validated_data['value'],
                cause=serializer.validated_data['cause'],
                student_id=student_id,
            )


class PointsAddingDeleteView(DestroyAPIView):
    permission_classes = [IsPointsGroup, IsMasterForPointsAddingOrDeleting]
    queryset = PointsAdding.objects.all()


class PointsDeletingDeleteView(DestroyAPIView):
    permission_classes = [IsPointsGroup, IsMasterForPointsAddingOrDeleting]
    queryset = PointsDeleting.objects.all()