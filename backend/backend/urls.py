from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from drf_yasg.views import get_schema_view
from drf_yasg.openapi import Info

schema_view = get_schema_view(
    Info(
        title="Zidnahum Hudaa Project API",
        default_version="v1",
    ),
    public=True,
)

urlpatterns = [
    # project's apps urls
    path("api/v1/accounts/", include("accounts.urls")),
    path("api/v1/awqaf/", include("awqaf.urls")),
    path("api/v1/comings/", include("comings.urls")),
    path("api/v1/globals/", include("globals.urls")),
    path("api/v1/points/", include("points.urls")),
    path("api/v1/students/", include("students.urls")),
    path("api/v1/reports/", include("reports.urls")),

    # admin urls
    path("api/v1/admin/", include("adminstration.urls")),
    path("api/v1/admin/actions/", include("adminstration.actions_urls")),
    path("api/v1/admin/extra/", include("adminstration.extra_urls")),
]

if settings.DEBUG:
    urlpatterns.append(
        # swagger
        path("docs", schema_view.with_ui(renderer="redoc", cache_timeout=0), name="schema_redoc_ui")
    )
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

client_view = TemplateView.as_view(template_name="client.html")
admin_view = TemplateView.as_view(template_name="admin.html")

urlpatterns += [
    path("admin/", admin_view),
    re_path(r"^admin/(?P<path>.*)/$", admin_view),
    path("", client_view),
    re_path(r"^(?P<path>.*)/$", client_view),
]