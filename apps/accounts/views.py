from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.serializers import UserSerilizer


class UserDetailsView(APIView):
    http_method_names = ["GET"]
    permission_classes = [IsAuthenticated]

    def get(self, *args, **kwargs) -> Response:
        data = UserSerilizer(self.request.user).data
        return Response(data)