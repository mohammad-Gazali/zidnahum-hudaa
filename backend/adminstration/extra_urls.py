from django.urls import path
from adminstration import extra_views

urlpatterns = [
    path("student-update/<int:pk>", extra_views.StudentUpdateView.as_view(), name="adminstration_extra_student_update"),
    path("add-awqaf-no-q-test", extra_views.AddAwqafNoQTestCreateView.as_view(), name="adminstration_extra_add_awqaf_no_q_test"),
    path("add-awqaf-q-test", extra_views.AddAwqafQTestCreateView.as_view(), name="adminstration_extra_add_awqaf_q_test"),
    path("add-money-deleting-normal", extra_views.AddMoneyDeletingNormalCreateView.as_view(), name="adminstration_extra_add_money_deleting_normal"),
    path("add-money-deleting-category", extra_views.AddMoneyDeletingCategoryCreateView.as_view(), name="adminstration_extra_add_money_deleting_category"),
    path("control-settings", extra_views.ControlSettingsReadUpdateView.as_view(), name="adminstration_extra_control_settings_update_read"),
    path("statistics", extra_views.StatisticsView.as_view(), name="adminstration_extra_statistics"),
    path("total-money", extra_views.TotalMoneyListView.as_view(), name="adminstration_extra_total_money"),
    path("add-elite-test", extra_views.AddEliteTestCreateView.as_view(), name="adminstration_extra_add_elite_test"),
]
