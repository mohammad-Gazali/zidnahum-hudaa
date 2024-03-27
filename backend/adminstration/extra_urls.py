from django.urls import path
from adminstration.extra_views import AddAwqafNoQTestCreateView, AddAwqafQTestCreateView

urlpatterns = [
    path("add-awqaf-no-q-test", AddAwqafNoQTestCreateView.as_view(), name="adminstration_extra_add_awqaf_no_q_test"),
    path("add-awqaf-q-test", AddAwqafQTestCreateView.as_view(), name="adminstration_extra_add_awqaf_q_test"),
]
