from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAdminUser
from adminstration.extra_serializers import AddAwqafTestNoQRequestSerailizer, AddAwqafTestQRequestSerializer, AddMoneyDeletingNormalRequestSerailizer, AddMoneyDeletingCategoryRequestSerailizer
from awqaf.models import AwqafNoQStudentRelation
from students.models import Student
from students.constants import NEW, OLD
from money.models import MoneyDeleting

class AddAwqafNoQTestCreateView(CreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = AddAwqafTestNoQRequestSerailizer

    def perform_create(self, serializer):
        for suid in serializer.validated_data['students']:
            AwqafNoQStudentRelation.objects.get_or_create(
                student_id=suid,
                test_id=serializer.validated_data['test'],
            )


class AddAwqafQTestCreateView(CreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = AddAwqafTestQRequestSerializer

    def perform_create(self, serializer):
        test_type = serializer.validated_data['type']
        parts = serializer.validated_data['parts']

        for suid in serializer.validated_data['students']:
            student = get_object_or_404(Student, pk=suid)

            if test_type == 'normal':
                for part in parts:
                    if student.q_awqaf_test[part] != OLD:
                        student.q_awqaf_test[part] = NEW

            elif test_type == 'looking':
                for part in parts:
                    if student.q_awqaf_test_looking[part] != OLD:
                        student.q_awqaf_test_looking[part] = NEW

            else:
                for part in parts:
                    if student.q_awqaf_test_explaining[part] != OLD:
                        student.q_awqaf_test_explaining[part] = NEW
            
            student.save()

    

class AddMoneyDeletingNormalCreateView(CreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = AddMoneyDeletingNormalRequestSerailizer

    def perform_create(self, serializer):
        for suid in serializer.validated_data['students']:
            MoneyDeleting.objects.create(
                student_id=suid,
                cause_id=serializer.validated_data['cause'],
                value=serializer.validated_data['value'],
            )


class AddMoneyDeletingCategoryCreateView(CreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = AddMoneyDeletingCategoryRequestSerailizer

    def perform_create(self, serializer):
        category_id = serializer.validated_data['category']
        masjed = serializer.validated_data['masjed']
        students = Student.objects.filter(category_id=category_id, masjed=masjed)

        for s in students:
            MoneyDeleting.objects.create(
                student=s,
                cause_id=serializer.validated_data['cause'],
                value=serializer.validated_data['value'],
            )