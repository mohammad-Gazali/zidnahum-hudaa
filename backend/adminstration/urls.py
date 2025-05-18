from rest_framework.routers import DefaultRouter
from adminstration import views

router = DefaultRouter()

# auth view sets
router.register("auth/user", views.AdminUserViewSet, basename="admin_user")
router.register("auth/group", views.AdminGroupViewSet, basename="admin_group")

# awqaf view sets
router.register("awqaf/test-no-q", views.AdminAwqafTestNoQViewSet, basename="admin_test_no_q")
router.register("awqaf/student-no-q-relation", views.AdminAwqafNoQStudentRelationViewSet, basename="admin_student_no_q_relation")

# comings view sets
router.register("comings/category", views.AdminComingCategoryViewSet, basename="admin_coming_category")
router.register("comings/coming", views.AdminComingViewSet, basename="admin_coming")

# globals view sets
router.register("globals/assets-category", views.AdminAssetsCategoryViewSet, basename="admin_assets_category")
router.register("globals/asset-file", views.AdminAssetFileViewSet, basename="admin_asset_file")
router.register("globals/news", views.AdminNewsViewSet, basename="admin_news")

# money view sets
router.register("money/deleting-cause", views.AdminMoneyDeletingCauseViewSet, basename="admin_money_deleting_cause")
router.register("money/deleting", views.AdminMoneyDeletingViewSet, basename="admin_money_deleting")

# points view sets
router.register("points/adding-cause", views.AdminPointsAddingCauseViewSet, basename="admin_points_adding_cause")
router.register("points/adding", views.AdminPointsAddingViewSet, basename="admin_points_adding")
router.register("points/deleting-cause", views.AdminPointsDeletingCauseViewSet, basename="admin_points_deleting_cause")
router.register("points/deleting", views.AdminPointsDeletingViewSet, basename="admin_points_deleting")

# students view sets
router.register("students/category", views.AdminStudentCategoryViewSet, basename="admin_student_category")
router.register("students/group", views.AdminStudentGroupViewSet, basename="admin_student_group")
router.register("students/student", views.AdminStudentViewSet, basename="admin_student")
router.register("students/memorize-message", views.AdminMemorizeMessageViewSet, basename="admin_memorize_message")
router.register("students/memorize-notes", views.AdminMemorizeNotesViewSet, basename="admin_memorize_notes")


urlpatterns = router.urls