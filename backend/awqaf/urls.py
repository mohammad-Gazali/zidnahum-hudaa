from django.urls import path
from awqaf.views import AwqafTestNoQListView

urlpatterns = [
    path("test-no-q", AwqafTestNoQListView.as_view(), name="awqaf_test_no_q_list_view"),
]
