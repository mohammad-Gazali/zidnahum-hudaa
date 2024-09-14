from django.urls import path
from points import views


urlpatterns = [
    # points adding urls
    path("adding", views.PointsAddingListCreateView.as_view(), name="points_adding_list_create_view"),
    path("adding/<int:pk>", views.PointsAddingDeleteView.as_view(), name="points_adding_delete_view"),
    path("adding/cause", views.PointsAddingCauseListView.as_view(), name="points_adding_cause_list_view"),
]
