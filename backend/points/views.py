from django.core.exceptions import ValidationError
from rest_framework.generics import ListAPIView, ListCreateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from points.models import PointsAddingCause, PointsAdding
from points.serializers import PointsAddingCauseSerializer, PointsAddingCreateSerializer, PointsAddingListSerializer
from points.permissions import IsMasterForPointsAdding
from students.permissions import IsPointsGroup


class PointsAddingCauseListView(ListAPIView):
    permission_classes = [IsPointsGroup]
    serializer_class = PointsAddingCauseSerializer
    queryset = PointsAddingCause.objects.all()
    pagination_class = None


class PointsAddingListCreateView(ListCreateAPIView):
    permission_classes = [IsPointsGroup]
    
    def get_serializer_class(self):
        if self.request.method == "POST":
            return PointsAddingCreateSerializer
        else:
            return PointsAddingListSerializer

    def handle_exception(self, exc):
        if isinstance(exc, ValidationError):
            if len(exc.messages):
                return Response({ "detail": exc.messages[0] }, HTTP_400_BAD_REQUEST)
        return super().handle_exception(exc)

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


class PointsAddingDeleteView(DestroyAPIView):
    permission_classes = [IsPointsGroup, IsMasterForPointsAdding]
    queryset = PointsAdding.objects.all()
