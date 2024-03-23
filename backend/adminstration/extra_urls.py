from django.urls import path
from adminstration.extra_views import AddAwqafNoQTestCreateView

urlpatterns = [
    path('add-awqaf-no-q-test', AddAwqafNoQTestCreateView.as_view(), name="adminstration_extra_add_awqaf_no_q_test")
]
