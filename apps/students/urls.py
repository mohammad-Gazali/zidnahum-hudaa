from django.urls import path
from students import views

urlpatterns = [
    # students urls
    path("", views.StudentListView.as_view(), name="students_list_view"),
    path("<int:pk>", views.StudentDetailsView.as_view(), name="students_details_view"),
    path("non-reg-today", views.StudentNonRegisterdTodayListView.as_view(), name="students_non_reg_today_list_view"),
    path("qmemo/<int:pk>", views.StudentUpdateQMemoView.as_view(), name="students_update_qmemo_view"),
    path("qtest/<int:pk>", views.StudentUpdateQTestView.as_view(), name="students_update_qtest_view"),
    path("parts-received/<int:pk>", views.StudentUpdatePartsReceivedView.as_view(), name="students_update_parts_received_view"),

    # notes urls
    path("notes", views.MemorizeNotesCreateView.as_view(), name="students_notes_create_view"),
    path("notes/<int:pk>", views.MemorizeNotesDeleteView.as_view(), name="students_notes_delete_view"),

    # messages urls
    path("message", views.MemorizeMessageListView.as_view(), name="students_message_list_view"),
    path("message/<int:pk>", views.MemorizeMessageDeleteView.as_view(), name="students_message_delete_view"),
]
