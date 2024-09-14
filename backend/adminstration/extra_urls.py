from django.urls import path
from adminstration.extra_views import StudentUpdateView, AddAwqafNoQTestCreateView, AddAwqafQTestCreateView, AddMoneyDeletingNormalCreateView, AddMoneyDeletingCategoryCreateView, ControlSettingsReadUpdateView, StatisticsView, TotalMoneyListView

urlpatterns = [
    path("student-update/<int:pk>", StudentUpdateView.as_view(), name="adminstration_extra_student_update"),
    path("add-awqaf-no-q-test", AddAwqafNoQTestCreateView.as_view(), name="adminstration_extra_add_awqaf_no_q_test"),
    path("add-awqaf-q-test", AddAwqafQTestCreateView.as_view(), name="adminstration_extra_add_awqaf_q_test"),
    path("add-money-deleting-normal", AddMoneyDeletingNormalCreateView.as_view(), name="adminstration_extra_add_money_deleting_normal"),
    path("add-money-deleting-category", AddMoneyDeletingCategoryCreateView.as_view(), name="adminstration_extra_add_money_deleting_category"),
    path("control-settings", ControlSettingsReadUpdateView.as_view(), name="adminstration_control_settings_update_read"),
    path("statistics", StatisticsView.as_view(), name="adminstration_statistics"),
    path("total-money", TotalMoneyListView.as_view(), name="adminstration_total_money")
]
