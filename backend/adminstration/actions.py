from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from drf_yasg.utils import swagger_auto_schema
from adminstration.actions_serializers import UserUpdatePasswordSerializer, ActionBooleanUpdateSerializer
from adminstration.actions_utils import create_delete_model_action_view
from awqaf.models import AwqafTestNoQ, AwqafNoQStudentRelation
from comings.models import ComingCategory, Coming
from globals.models import AssetsCategory, AssetFile
from money.models import MoneyDeletingCause, MoneyDeleting
from points.models import PointsAddingCause, PointsAdding, PointsDeletingCause, PointsDeleting
from students.models import StudentCategory, StudentGroup, Student, MemorizeMessage, MemorizeNotes


class AdminUserPasswordUpdateView(APIView):
    permission_classes = [IsAdminUser]
    http_method_names = ["put"]
    
    @swagger_auto_schema(
        request_body=UserUpdatePasswordSerializer,
    )
    def put(self, *args, **kwargs):
        serializer = UserUpdatePasswordSerializer(data=self.request.data)

        if serializer.is_valid():
            user = get_object_or_404(get_user_model(), pk=serializer.validated_data["user"])

            user.set_password(serializer.validated_data["new_password"])
            user.save()

            return Response(status=HTTP_204_NO_CONTENT)

        return Response({ "detail": serializer.errors }, status=HTTP_400_BAD_REQUEST)


class AdminUserUpdateActiveView(APIView):
    permission_classes = [IsAdminUser]
    http_method_names = ["put"]

    @swagger_auto_schema(request_body=ActionBooleanUpdateSerializer)
    def put(self, *args, **kwargs):
        serializer = ActionBooleanUpdateSerializer(data=self.request.data)

        if serializer.is_valid():
            ids = serializer.validated_data['ids']
            value = serializer.validated_data['value']

            for user in get_user_model().objects.filter(pk__in=ids, is_superuser=False):
                user.is_active = value
                user.save()

            return Response(status=HTTP_204_NO_CONTENT)

        return Response({ "detail": serializer.errors }, status=HTTP_400_BAD_REQUEST)


class AdminMoneyDeletingUpdateActiveView(APIView):
    permission_classes = [IsAdminUser]
    http_method_names = ["put"]

    @swagger_auto_schema(request_body=ActionBooleanUpdateSerializer)
    def put(self, *args, **kwargs):
        serializer = ActionBooleanUpdateSerializer(data=self.request.data)

        if serializer.is_valid():
            ids = serializer.validated_data['ids']
            value = serializer.validated_data['value']

            for deleting in MoneyDeleting.objects.filter(pk__in=ids):
                deleting.active_to_points = value
                deleting.save()

            return Response(status=HTTP_204_NO_CONTENT)

        return Response({ "detail": serializer.errors }, status=HTTP_400_BAD_REQUEST)


# ======= delete actions =======
AdminUserDeleteAction = create_delete_model_action_view(get_user_model())
AdminGroupDeleteAction = create_delete_model_action_view(Group)

AdminAwqafTestNoQDeleteAction = create_delete_model_action_view(AwqafTestNoQ)
AdminAwqafNoQStudentRelationDeleteAction = create_delete_model_action_view(AwqafNoQStudentRelation)

AdminComingCategoryDeleteAction = create_delete_model_action_view(ComingCategory)
AdminComingDeleteAction = create_delete_model_action_view(Coming)

AdminAssetsCategoryDeleteAction = create_delete_model_action_view(AssetsCategory)
AdminAssetFileDeleteAction = create_delete_model_action_view(AssetFile)

AdminMoneyDeletingCauseDeleteAction = create_delete_model_action_view(MoneyDeletingCause)

AdminPointsAddingCauseDeleteAction = create_delete_model_action_view(PointsAddingCause)
AdminPointsAddingDeleteAction = create_delete_model_action_view(PointsAdding)
AdminPointsDeletingCauseDeleteAction = create_delete_model_action_view(PointsDeletingCause)
AdminPointsDeletingDeleteAction = create_delete_model_action_view(PointsDeleting)

AdminStudentCategoryDeleteAction = create_delete_model_action_view(StudentCategory)
AdminStudentGroupDeleteAction = create_delete_model_action_view(StudentGroup)
AdminStudentDeleteAction = create_delete_model_action_view(Student)
AdminMemorizeMessageDeleteAction = create_delete_model_action_view(MemorizeMessage)
AdminMemorizeNotesDeleteAction = create_delete_model_action_view(MemorizeNotes)