from django.urls import path
from adminstration import actions

urlpatterns = [
    path("user/password", actions.AdminUserPasswordUpdateView.as_view(), name="adminstration_action_update_user_password_view"),
    path("user/active", actions.AdminUserUpdateActiveView.as_view(), name="adminstration_action_update_user_active_view"),
    path("money-deleting/active", actions.AdminMoneyDeletingUpdateActiveView.as_view(), name="adminstration_action_update_money_deleting_active_view"),

    # delete actions
    path("user/delete", actions.AdminUserDeleteAction.as_view(), name="adminstration_action_delete_user"),
    path("group/delete", actions.AdminGroupDeleteAction.as_view(), name="adminstration_action_delete_group"),
    
    path("awqaf-test-no-q/delete", actions.AdminAwqafTestNoQDeleteAction.as_view(), name="adminstration_action_delete_awqaf_test_no_q"),
    path("awqaf-no-q-student-relation/delete", actions.AdminAwqafNoQStudentRelationDeleteAction.as_view(), name="adminstration_action_delete_awqaf_no_q_student_relation"),
    
    path("coming-category/delete", actions.AdminComingCategoryDeleteAction.as_view(), name="adminstration_action_delete_coming_category"),
    path("coming/delete", actions.AdminComingDeleteAction.as_view(), name="adminstration_action_delete_coming"),
    
    path("assets-category/delete", actions.AdminAssetsCategoryDeleteAction.as_view(), name="adminstration_action_delete_assets_category"),
    path("asset-file/delete", actions.AdminAssetFileDeleteAction.as_view(), name="adminstration_action_delete_asset_file"),
    
    path("money-deleting-cause/delete", actions.AdminMoneyDeletingCauseDeleteAction.as_view(), name="adminstration_action_delete_money_deleting_cause"),

    path("points-deleting-cause/delete", actions.AdminPointsDeletingCauseDeleteAction.as_view(), name="adminstration_action_delete_points_deleting_cause"),
    path("points-deleting/delete", actions.AdminPointsDeletingDeleteAction.as_view(), name="adminstration_action_delete_points_deleting"),
    path("points-adding-cause/delete", actions.AdminPointsAddingCauseDeleteAction.as_view(), name="adminstration_action_delete_points_adding_cause"),
    path("points-adding/delete", actions.AdminPointsAddingDeleteAction.as_view(), name="adminstration_action_delete_points_adding"),

    path("student-category/delete", actions.AdminStudentCategoryDeleteAction.as_view(), name="adminstration_action_delete_student_category"),
    path("student-group/delete", actions.AdminStudentGroupDeleteAction.as_view(), name="adminstration_action_delete_student_group"),
    path("student/delete", actions.AdminStudentDeleteAction.as_view(), name="adminstration_action_delete_student"),
    path("memorize-message/delete", actions.AdminMemorizeMessageDeleteAction.as_view(), name="adminstration_action_delete_memorize_message"),
    path("memorize-notes/delete", actions.AdminMemorizeNotesDeleteAction.as_view(), name="adminstration_action_delete_memorize_notes"),
]