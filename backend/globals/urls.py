from django.urls import path
from globals.views import AssetListView, NewsListView

urlpatterns = [
    path("asset", AssetListView.as_view(), name="globals_asset_list_view"),
    path("news", NewsListView.as_view(), name="globals_news_list_view"),
]
