from rest_framework.generics import ListAPIView, DestroyAPIView
from students.serializers import MemorizeMessageSerializer
from students.models import MemorizeMessage
from students.permissions import IsMemoGroup, IsMasterForMessage

class MemorizeMessageListView(ListAPIView):
    # there is case where the message is maybe hadeeth
    # but it is rare so I ignore it
    permission_classes = [IsMemoGroup]
    serializer_class = MemorizeMessageSerializer

    def get_queryset(self):
        return MemorizeMessage.objects.filter(master=self.request.user).order_by("-sended_at")


class MemorizeMessageDeleteView(DestroyAPIView):
    # there is case where the message is maybe hadeeth
    # but it is rare so I ignore it
    permission_classes = [IsMemoGroup, IsMasterForMessage]
    queryset = MemorizeMessage.objects.all()
