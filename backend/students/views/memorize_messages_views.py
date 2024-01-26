from rest_framework.generics import ListAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from students.serializers import MemorizeMessageSerializer
from students.models import MemorizeMessage
from students.permissions import IsMasterForMessage

class MemorizeMessageListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MemorizeMessageSerializer

    def get_queryset(self):
        return MemorizeMessage.objects.filter(master=self.request.user).order_by("-sended_at")


class MemorizeMessageDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated, IsMasterForMessage]
    queryset = MemorizeMessage.objects.all()
