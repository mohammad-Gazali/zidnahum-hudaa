from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from apps.accounts.views import user_details


urlpatterns = [
    path("token", TokenObtainPairView.as_view(), name="accounts_token_obtain_pair"),
    path("token/refresh", TokenRefreshView.as_view(), name="accounts_token_refresh"),
    path("details", user_details, name="accounts_user_details"),
]
