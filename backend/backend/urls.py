from django.urls import path, include
from rest_framework.permissions import IsAdminUser
from drf_yasg.views import get_schema_view
from drf_yasg.openapi import Info

schema_view = get_schema_view(
    Info(
        title="Zidnahum Hudaa Project API",
        default_version="v1",
    ),
    public=True,
    # permission_classes=[IsAdminUser]
)

urlpatterns = [
    # project's apps urls
    path("api/v1/accounts/", include("accounts.urls")),
    path("api/v1/awqaf/", include("awqaf.urls")),
    path("api/v1/comings/", include("comings.urls")),
    path("api/v1/globals/", include("globals.urls")),
    path("api/v1/money/", include("money.urls")),
    path("api/v1/points/", include("points.urls")),
    path("api/v1/students/", include("students.urls")),

    # admin urls
    path("api/v1/admin/", include("adminstration.urls")),
    path("api/v1/admin/actions/", include("adminstration.actions_urls")),

    # swagger
    path("", schema_view.with_ui(renderer="redoc", cache_timeout=0), name="schema_redoc_ui"),
]
