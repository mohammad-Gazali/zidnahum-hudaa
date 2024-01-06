from django.urls import path
from students import views

urlpatterns = [
    path("", views.StudentListView.as_view(), name="students_list_view"),
    path("<int:pk>", views.StudentDetailsView.as_view(), name="students_details_view"),
    path("non-reg-today", views.StudentNonRegisterdTodayListView.as_view(), name="students_non_reg_today_list_view"),

    # notes urls
    path("notes", views.MemorizeNotesCreateView.as_view(), name="students_notes_create_view"),
    path("notes/<int:pk>", views.MemorizeNotesDeleteView.as_view(), name="students_notes_delete_view"),
]
