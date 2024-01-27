from django.urls import path
from globals.views import AssetListView

urlpatterns = [
    path("asset", AssetListView.as_view(), name="globals_list_view")
]
