from rest_framework.generics import CreateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from students.serializers import MemorizeNotesCreateSerializer
from students.models import MemorizeNotes


class MemorizeNotesCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MemorizeNotesCreateSerializer
    queryset = MemorizeNotes.objects.all()

    def perform_create(self, serializer: MemorizeNotesCreateSerializer):
        MemorizeNotes.objects.create(
            master=self.request.user,
            **serializer.validated_data,
        )


class MemorizeNotesDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = MemorizeNotes.objects.all()