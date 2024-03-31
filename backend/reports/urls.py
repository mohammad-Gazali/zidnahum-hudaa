from django.urls import path
from reports import views

urlpatterns = [
    path('student/<int:id>', views.ReportsStudentView.as_view(), name='reports_student_view'),
    path('category/<int:id>', views.ReportsCategoryView.as_view(), name='reports_category_view'),
    path('group/<int:id>', views.ReportsGroupView.as_view(), name='reports_group_view'),
]
