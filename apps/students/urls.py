from django.urls import path
from students import views

urlpatterns = [
    path("list", views.StudentListView.as_view(), name="students_list_view"),
    path("list/reg-today", views.StudentRegisterdTodayListView.as_view(), name="students_reg_today_list_view"),
]
