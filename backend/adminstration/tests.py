from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.status import HTTP_200_OK
from students.models import Student, StudentMasjedChoice

class ExtraViewsTestCase(TestCase):
    def setUp(self):
        User = get_user_model()

        self.super_username = "test1"
        self.super_password = "mysecretpassword1"

        self.username = "test2"
        self.password = "mysecretpassword2"

        self.super_user = User.objects.create(
            username=self.super_username,
        )
        self.user = User.objects.create(
            username=self.username,
        )

        self.super_user.set_password(self.super_password)
        self.user.set_password(self.password)

        self.super_user.is_superuser = True
        self.super_user.is_staff = True

        self.user.is_staff = True

        self.super_user.save()
        self.user.save()

        url_token = reverse("accounts_token_obtain_pair")

        res = self.client.post(url_token, {
            "username": self.super_username,
            "password": self.super_password,
        }, content_type="application/json")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.super_token = res.json()["access"]

        res = self.client.post(url_token, {
            "username": self.username,
            "password": self.password,
        }, content_type="application/json")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.token = res.json()["access"]

        self.student = Student.objects.create(
            name="test",
            mother_name="test",
            masjed=StudentMasjedChoice.HASANIN,
        )

    
    def test_update_student_view(self):
        url = reverse("adminstration_extra_student_update", args=[self.student.pk])

        super_user_edit_q_test = [1, 1, *[0 for _ in range(638)]]
        super_user_edit_parts_received = "first_edit"

        res = self.client.put(url, {
            "name": self.student.name,
            "masjed": self.student.masjed,
            "parts_received": super_user_edit_parts_received,
            "q_test": super_user_edit_q_test,
        }, HTTP_AUTHORIZATION=f"Bearer {self.super_token}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_200_OK)

        student = Student.objects.get(pk=self.student.pk)

        self.assertEqual(student.q_test, super_user_edit_q_test)
        self.assertEqual(student.parts_received, super_user_edit_parts_received)

        user_edit_q_test = [*[0 for _ in range(638)], 1, 1]
        user_edit_parts_received = "second_edit"

        res = self.client.put(url, {
            "name": self.student.name,
            "masjed": self.student.masjed,
            "parts_received": user_edit_parts_received,
            "q_test": user_edit_q_test,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_200_OK)

        student = Student.objects.get(pk=self.student.pk)

        self.assertNotEqual(student.q_test, user_edit_q_test)
        self.assertEqual(student.q_test, super_user_edit_q_test)
        self.assertEqual(student.parts_received, user_edit_parts_received)