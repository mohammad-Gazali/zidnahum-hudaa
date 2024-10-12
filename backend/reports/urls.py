from django.urls import path
from reports import views

urlpatterns = [
    path('student/<int:id>', views.ReportsStudentView.as_view(), name='reports_student_view'),
    path('student/all', views.ReportsAllStudentsView.as_view(), name='reports_all_students_view'),
    path('category/<int:id>', views.ReportsCategoryView.as_view(), name='reports_category_view'),
    path('category/all', views.ReportsAllCategoriesView.as_view(), name='reports_all_categories_view'),
    path('group/<int:id>', views.ReportsGroupView.as_view(), name='reports_group_view'),
    path('group/all', views.ReportsAllGroupsView.as_view(), name='reports_all_groups_view'),
]
