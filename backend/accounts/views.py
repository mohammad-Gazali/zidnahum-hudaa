from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from drf_yasg.utils import swagger_auto_schema
from accounts.serializers import UserSerilizer



class UserDetailsView(APIView):
    http_method_names = ["get"]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(responses={
        HTTP_200_OK: UserSerilizer,
    })
    def get(self, *args, **kwargs) -> Response:
        data = UserSerilizer(self.request.user).data
        return Response(data, status=HTTP_200_OK)