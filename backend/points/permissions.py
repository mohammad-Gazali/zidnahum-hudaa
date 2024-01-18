from rest_framework.permissions import BasePermission


class IsMasterForPointsAddingOrDeleting(BasePermission):
    def has_object_permission(self, request, view, obj):
        return super().has_object_permission(request, view, obj) and obj.master == request.user