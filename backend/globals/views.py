from rest_framework.generics import ListAPIView
from globals.serializers import AssetCategorySerializer, NewsSerializer
from globals.models import AssetsCategory, News


class AssetListView(ListAPIView):
    serializer_class = AssetCategorySerializer
    queryset = AssetsCategory.objects.prefetch_related("files").all()
    pagination_class = None


# TODO: test in a TestCase
class NewsListView(ListAPIView):
    serializer_class = NewsSerializer
    queryset = News.objects.all()
    pagination_class = None