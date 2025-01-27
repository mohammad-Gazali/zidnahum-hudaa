from rest_framework.permissions import BasePermission


class HasQuizzAccount(BasePermission):
    def has_permission(self, request, view):
        # TODO: handle session
        return True