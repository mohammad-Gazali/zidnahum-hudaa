from typing import List

from django.conf import settings
from django.urls import URLPattern, URLResolver, include, path, re_path
from django.views.generic import TemplateView
from django.views.static import serve
from drf_spectacular.views import (
  SpectacularAPIView,
  SpectacularSwaggerView,
)

urlpatterns: List[URLResolver | URLPattern] = [
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

# Media uploads are served by Django's static serve view in both DEBUG and
# production — Traefik proxies everything to Gunicorn and there is no separate
# reverse proxy serving /media/ anymore (see docker-compose.prod.yml). This
# route is registered explicitly because Django's static() helper returns []
# when DEBUG is False, which would silently drop /media/ in production.
urlpatterns += [
  re_path(
    rf"^{settings.MEDIA_URL.strip('/')}/(?P<path>.*)$",
    serve,
    kwargs={"document_root": settings.MEDIA_ROOT},
  ),
]

if settings.DEBUG:
  urlpatterns += [
    path("docs/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
      "docs/swagger",
      SpectacularSwaggerView.as_view(url_name="schema"),
      name="swagger-ui",
    ),
  ]


app_view = TemplateView.as_view(template_name="index.html")

urlpatterns += [
  path("", app_view),
  re_path(r"^(?P<path>.*)/$", app_view),
]
