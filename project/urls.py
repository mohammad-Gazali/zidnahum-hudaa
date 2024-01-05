from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    # project's apps urls
    path("api/accounts/", include("accounts.urls")),
    path("api/awqaf/", include("awqaf.urls")),
    path("api/comings/", include("comings.urls")),
    path("api/globals/", include("globals.urls")),
    path("api/money/", include("money.urls")),
    path("api/points/", include("points.urls")),
    path("api/students/", include("students.urls")),
]
