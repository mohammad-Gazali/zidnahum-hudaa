from rest_framework.generics import ListAPIView
from awqaf.serializers import AwqafTestNoQSerializer
from awqaf.models import AwqafTestNoQ


class AwqafTestNoQListView(ListAPIView):
    serializer_class = AwqafTestNoQSerializer
    queryset = AwqafTestNoQ.objects.all()
    pagination_class = None