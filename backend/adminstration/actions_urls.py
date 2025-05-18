from django.urls import path
from adminstration import actions_views

urlpatterns = [
    path("user/password", actions_views.AdminUserPasswordUpdateView.as_view(), name="adminstration_action_update_user_password_view"),
    path("user/active", actions_views.AdminUserUpdateActiveView.as_view(), name="adminstration_action_update_user_active_view"),
    path("money-deleting/active", actions_views.AdminMoneyDeletingUpdateActiveView.as_view(), name="adminstration_action_update_money_deleting_active_view"),

    # delete actions
    path("user/delete", actions_views.AdminUserDeleteAction.as_view(), name="adminstration_action_delete_user"),
    path("group/delete", actions_views.AdminGroupDeleteAction.as_view(), name="adminstration_action_delete_group"),
    
    path("awqaf-test-no-q/delete", actions_views.AdminAwqafTestNoQDeleteAction.as_view(), name="adminstration_action_delete_awqaf_test_no_q"),
    path("awqaf-no-q-student-relation/delete", actions_views.AdminAwqafNoQStudentRelationDeleteAction.as_view(), name="adminstration_action_delete_awqaf_no_q_student_relation"),
    
    path("coming-category/delete", actions_views.AdminComingCategoryDeleteAction.as_view(), name="adminstration_action_delete_coming_category"),
    path("coming/delete", actions_views.AdminComingDeleteAction.as_view(), name="adminstration_action_delete_coming"),
    
    path("assets-category/delete", actions_views.AdminAssetsCategoryDeleteAction.as_view(), name="adminstration_action_delete_assets_category"),
    path("asset-file/delete", actions_views.AdminAssetFileDeleteAction.as_view(), name="adminstration_action_delete_asset_file"),
    path("news/delete", actions_views.AdminNewsDeleteAction.as_view(), name="adminstration_action_delete_news"),
    
    path("money-deleting-cause/delete", actions_views.AdminMoneyDeletingCauseDeleteAction.as_view(), name="adminstration_action_delete_money_deleting_cause"),

    path("points-deleting-cause/delete", actions_views.AdminPointsDeletingCauseDeleteAction.as_view(), name="adminstration_action_delete_points_deleting_cause"),
    path("points-deleting/delete", actions_views.AdminPointsDeletingDeleteAction.as_view(), name="adminstration_action_delete_points_deleting"),
    path("points-adding-cause/delete", actions_views.AdminPointsAddingCauseDeleteAction.as_view(), name="adminstration_action_delete_points_adding_cause"),
    path("points-adding/delete", actions_views.AdminPointsAddingDeleteAction.as_view(), name="adminstration_action_delete_points_adding"),

    path("student-category/delete", actions_views.AdminStudentCategoryDeleteAction.as_view(), name="adminstration_action_delete_student_category"),
    path("student-group/delete", actions_views.AdminStudentGroupDeleteAction.as_view(), name="adminstration_action_delete_student_group"),
    path("student/delete", actions_views.AdminStudentDeleteAction.as_view(), name="adminstration_action_delete_student"),
    path("memorize-message/delete", actions_views.AdminMemorizeMessageDeleteAction.as_view(), name="adminstration_action_delete_memorize_message"),
    path("memorize-notes/delete", actions_views.AdminMemorizeNotesDeleteAction.as_view(), name="adminstration_action_delete_memorize_notes"),
]