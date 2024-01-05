from django.http import HttpRequest
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apps.accounts.serializers import UserSerilizer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_details(request: HttpRequest) -> Response:
    data = UserSerilizer(request.user).data
    return Response(data)