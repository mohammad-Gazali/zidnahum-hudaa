from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from drf_yasg.utils import swagger_auto_schema
from adminstration.actions_serializers import UserUpdatePasswordSerializer


class UserPasswordUpdateView(APIView):
    permission_classes = [IsAdminUser]
    http_method_names = ["put"]
    
    @swagger_auto_schema(
        request_body=UserUpdatePasswordSerializer(),
    )
    def put(self, *args, **kwargs):
        serailizer = UserUpdatePasswordSerializer(data=self.request.data)

        if serailizer.is_valid():
            user = get_object_or_404(get_user_model(), pk=serailizer.validated_data["user"])

            user.set_password(serailizer.validated_data["new_password"])
            user.save()

            return Response(status=HTTP_200_OK)

        return Response({ "detail": serailizer.errors }, status=HTTP_400_BAD_REQUEST)