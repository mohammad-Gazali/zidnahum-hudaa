from django.urls import path
from adminstration import actions

urlpatterns = [
    path("user/password", actions.UserPasswordUpdateView.as_view(), name="adminstration_action_update_user_password_view")
]