from django.http import HttpRequest
from rest_framework.permissions import IsAuthenticated
from students import constants

class IsMasterForMessage(IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return super().has_object_permission(request, view, obj) and obj.master == request.user


class IsMemoGroup(IsAuthenticated):
    def has_permission(self, request: HttpRequest, view):
        return request.user.is_superuser or request.user.is_staff or (super().has_permission(request, view) and request.user.groups.filter(name=constants.MEMO_GROUP).exists())


class IsComingGroup(IsAuthenticated):
    def has_permission(self, request: HttpRequest, view):
        return request.user.is_superuser or request.user.is_staff or (super().has_permission(request, view) and request.user.groups.filter(name=constants.COMING_GROUP).exists())


class IsPointsGroup(IsAuthenticated):
    def has_permission(self, request: HttpRequest, view):
        return request.user.is_superuser or request.user.is_staff or (super().has_permission(request, view) and request.user.groups.filter(name=constants.POINTS_GROUP).exists())


class IsHadeethGroup(IsAuthenticated):
    def has_permission(self, request: HttpRequest, view):
        return request.user.is_superuser or request.user.is_staff or (super().has_permission(request, view) and request.user.groups.filter(name=constants.HADEETH_GROUP).exists())


class IsReportsGroup(IsAuthenticated):
    def has_permission(self, request: HttpRequest, view):
        return request.user.is_superuser or request.user.is_staff or (super().has_permission(request, view) and request.user.groups.filter(name=constants.REPORTS_GROUP).exists())


class IsAddStudentsGroup(IsAuthenticated):
    def has_permission(self, request: HttpRequest, view):
        return request.user.is_superuser or request.user.is_staff or (super().has_permission(request, view) and request.user.groups.filter(name=constants.ADD_STUDENTS_GROUP).exists())