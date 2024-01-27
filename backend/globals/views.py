from rest_framework.generics import ListAPIView
from globals.serializers import AssetCategorySerializer
from globals.models import AssetsCategory


class AssetListView(ListAPIView):
    serializer_class = AssetCategorySerializer
    queryset = AssetsCategory.objects.prefetch_related("files").all()
    pagination_class = None