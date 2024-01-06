from django.urls import path
from comings import views


urlpatterns = [
    path("category", views.ComingCategroyListView.as_view(), name="comings_coming_category_list_view"),
    path("", views.ComingListView.as_view, name="comings_list_view"),
    path("<int:pk>", views.ComingDeleteView.as_view(), name="comings_delete_view"),
]
