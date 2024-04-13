from rest_framework.generics import CreateAPIView, DestroyAPIView
from students.serializers import MemorizeNotesCreateSerializer
from students.models import MemorizeNotes
from students.permissions import IsMemoGroup


class MemorizeNotesCreateView(CreateAPIView):
    permission_classes = [IsMemoGroup]
    serializer_class = MemorizeNotesCreateSerializer
    queryset = MemorizeNotes.objects.all()

    def perform_create(self, serializer: MemorizeNotesCreateSerializer):
        MemorizeNotes.objects.create(
            master=self.request.user,
            **serializer.validated_data,
        )


class MemorizeNotesDeleteView(DestroyAPIView):
    permission_classes = [IsMemoGroup]
    queryset = MemorizeNotes.objects.all()