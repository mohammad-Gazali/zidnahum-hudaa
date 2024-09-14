from django.urls import path
from students.views.students_list_and_details_and_create_views import StudentCreateListView, StudentWithComingRegistrationListView, StudentDetailsView
from students.views.students_update_views import StudentUpdateQMemoView, StudentUpdateQTestView, StudentUpdateAlarbaeinAlnawawiaView, StudentUpdateRiadAlsaalihinView, StudentUpdateAllahNamesView, StudentUpdatePartsReceivedView
from students.views.memorize_messages_views import MemorizeMessageListView, MemorizeMessageDeleteView
from students.views.memorize_notes_views import MemorizeNotesCreateView, MemorizeNotesDeleteView
from students.views.extra_views import StudentCategoryListView, StudentGroupListView

urlpatterns = [
    # students list and details urls
    path("", StudentCreateListView.as_view(), name="students_create_list_view"),
    path("with-coming-registration/<int:coming_category_id>", StudentWithComingRegistrationListView.as_view(), name="students_with_coming_registeration_list_view"),
    path("<int:pk>", StudentDetailsView.as_view(), name="students_details_view"),

    # student update urls
    path("update/qmemo/<int:pk>", StudentUpdateQMemoView.as_view(), name="students_update_qmemo_view"),
    path("update/qtest/<int:pk>", StudentUpdateQTestView.as_view(), name="students_update_qtest_view"),
    path("update/alarbaein-alnawawia/<int:pk>", StudentUpdateAlarbaeinAlnawawiaView.as_view(), name="students_update_alarbaein_alnawawia_view"),
    path("update/riad-alsaalihin/<int:pk>", StudentUpdateRiadAlsaalihinView.as_view(), name="students_update_riad_alsaalihin_view"),
    path("update/allah-names/<int:pk>", StudentUpdateAllahNamesView.as_view(), name="students_update_allah_names_view"),
    path("update/parts-received/<int:pk>", StudentUpdatePartsReceivedView.as_view(), name="students_update_parts_received_view"),

    # memorize messages urls
    path("memorize-message", MemorizeMessageListView.as_view(), name="students_message_list_view"),
    path("memorize-message/<int:pk>", MemorizeMessageDeleteView.as_view(), name="students_message_delete_view"),

    # memorize notes urls
    path("memorize-notes", MemorizeNotesCreateView.as_view(), name="students_notes_create_view"),
    path("memorize-notes/<int:pk>", MemorizeNotesDeleteView.as_view(), name="students_notes_delete_view"),

    # extra urls
    path("category", StudentCategoryListView.as_view(), name="students_extra_category_list_view"),
    path("group", StudentGroupListView.as_view(), name="students_extra_group_list_view"),
]
