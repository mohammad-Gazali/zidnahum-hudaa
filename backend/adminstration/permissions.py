from django.http import HttpRequest
from rest_framework.permissions import IsAuthenticated

class IsSuperUser(IsAuthenticated):
    def has_permission(self, request: HttpRequest, view):
        return super().has_permission(request, view) and request.user.is_superuser