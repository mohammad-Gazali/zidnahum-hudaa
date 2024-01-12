from django.urls import path
from points import views


urlpatterns = [
    # cause urls
    path("adding-cause", views.PointsAddingCauseListView.as_view(), name="points_adding_cause_list_view"),
    path("deleting-cause", views.PointsDeletingCauseListView.as_view(), name="points_deleting_cause_list_view"),

    # points urls
    path("adding", views.PointsAddingListCreateView.as_view(), name="points_adding_list_create_view"),
    path("deleting", views.PointsDeletingListCreateView.as_view(), name="points_deleting_list_create_view"),
    path("adding/<int:pk>", views.PointsAddingDeleteView.as_view(), name="points_adding_delete_view"),
    path("deleting/<int:pk>", views.PointsDeletingDeleteView.as_view(), name="points_deleting_delete_view"),
]
