from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_403_FORBIDDEN
from students.models import Student, StudentMasjedChoice, MemorizeMessage
from students.constants import NEW, MEMO_GROUP, HADEETH_GROUP
from adminstration.models import ControlSettings
from typing import List
from random import randint


class StudentUpdateTestCase(TestCase):
    def setUp(self):
        User = get_user_model()

        self.control_settings = ControlSettings.objects.first()

        self.username = "test"
        self.non_valid_username = "test_non_valid"
        self.password = "mysecretpassword"

        self.user = User.objects.create(
            username=self.username,
        )

        self.non_valid_user = User.objects.create(
            username=self.non_valid_username
        )

        self.user.set_password(self.password)
        self.user.groups.add(Group.objects.get(name=MEMO_GROUP))
        self.user.groups.add(Group.objects.get(name=HADEETH_GROUP))

        self.non_valid_user.set_password(self.password)

        self.user.save()
        self.non_valid_user.save()

        url_token = reverse("accounts_token_obtain_pair")

        res = self.client.post(url_token, {
            "username": self.username,
            "password": self.password,
        }, content_type="application/json")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.token = res.json()["access"]

        res = self.client.post(url_token, {
            "username": self.non_valid_username,
            "password": self.password,
        }, content_type="application/json")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.non_valid_token = res.json()["access"]

        self.students: List[Student] = []
        self.total_count = 100

        for i in range(1, self.total_count + 1):
            self.students.append(
                Student.objects.create(
                    id=i,
                    name=f"test {i}",
                    masjed=StudentMasjedChoice.HASANIN,
                )
            )


    def test_update_student_qmemo_view(self):
        for student in self.students:
            url = reverse("students_update_qmemo_view", args=[student.pk])

            self.control_settings.double_points = student.pk % 2 == 0
            self.control_settings.save()

            q_memo = []

            for _ in range(randint(1, 10)):
                q_memo.append(randint(0, 617))

            res = self.client.put(url, {
                "q_memo": q_memo
            }, HTTP_AUTHORIZATION=f"Bearer {self.non_valid_token}", content_type="application/json")

            self.assertEqual(res.status_code, HTTP_403_FORBIDDEN, res.json())

            res = self.client.put(url, {
                "q_memo": q_memo,
            }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

            self.assertEqual(res.status_code, HTTP_200_OK, res.json())

            refetched_student = Student.objects.get(pk=student.pk)

            expected_value = set([index for index, value in enumerate(refetched_student.q_memorizing) if value == NEW])

            self.assertSetEqual(expected_value, set(q_memo))

            message = MemorizeMessage.objects.get(student=student)

            self.assertEqual(set(message.changes), set(q_memo))
            self.assertEqual(self.control_settings.double_points, message.is_doubled)


    def test_update_student_qtest_view(self):
        for student in self.students:
            url = reverse("students_update_qtest_view", args=[student.pk])

            self.control_settings.double_points = student.pk % 2 == 0
            self.control_settings.save()

            q_test = []

            for _ in range(randint(1, 10)):
                q_test.append(randint(0, 239))

            res = self.client.put(url, {
                "q_test": q_test
            }, HTTP_AUTHORIZATION=f"Bearer {self.non_valid_token}", content_type="application/json")

            self.assertEqual(res.status_code, HTTP_403_FORBIDDEN, res.json())

            res = self.client.put(url, {
                "q_test": q_test
            }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

            self.assertEqual(res.status_code, HTTP_200_OK, res.json())

            refetched_student = Student.objects.get(pk=student.pk)

            expected_value = set([index for index, value in enumerate(refetched_student.q_test) if value == NEW])

            self.assertSetEqual(expected_value, set(q_test))

            message = MemorizeMessage.objects.get(student=student)

            self.assertEqual(set(message.changes), set(q_test))
            self.assertEqual(self.control_settings.double_points, message.is_doubled, f"id = {student.pk}")
            

    def test_update_alarbaein_alnawawia_view(self):
        for student in self.students[1:]:
            value = randint(1, 50)

            url = reverse("students_update_alarbaein_alnawawia_view", args=[student.pk])

            res = self.client.put(url, {
                "value": value,
            }, HTTP_AUTHORIZATION=f"Bearer {self.non_valid_token}", content_type="application/json")

            self.assertEqual(res.status_code, HTTP_403_FORBIDDEN)

            res = self.client.put(url, {
                "value": value,
            }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

            self.assertEqual(res.status_code, HTTP_204_NO_CONTENT)

            new_fetched_student = Student.objects.get(pk=student.pk)

            self.assertEqual(new_fetched_student.alarbaein_alnawawia_new, value)


        # bad request body test
        student = self.students[0]
        saved_old_value = 26
        saved_new_value = 16

        student.alarbaein_alnawawia_old = saved_old_value
        student.alarbaein_alnawawia_new = saved_new_value
        student.save()

        url = reverse("students_update_alarbaein_alnawawia_view", args=[student.pk])

        res = self.client.put(url, {
            "value": 51,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_400_BAD_REQUEST)

        res = self.client.put(url, {
            "value": 40,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_400_BAD_REQUEST)

        # success request body for single student with old value
        value = 43

        res = self.client.put(url, {
            "value": value,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_204_NO_CONTENT)

        new_fetched_student = Student.objects.get(pk=student.pk)

        self.assertEqual(new_fetched_student.alarbaein_alnawawia_new, value - saved_old_value)


    def test_update_riad_alsaalihin_view(self):
        for student in self.students[1:]:
            value = randint(1, 500)

            url = reverse("students_update_riad_alsaalihin_view", args=[student.pk])

            res = self.client.put(url, {
                "value": value,
            }, HTTP_AUTHORIZATION=f"Bearer {self.non_valid_token}", content_type="application/json")

            self.assertEqual(res.status_code, HTTP_403_FORBIDDEN)

            res = self.client.put(url, {
                "value": value,
            }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

            self.assertEqual(res.status_code, HTTP_204_NO_CONTENT)

            new_fetched_student = Student.objects.get(pk=student.pk)

            self.assertEqual(new_fetched_student.riad_alsaalihin_new, value)


        # bad request body test
        student = self.students[0]
        saved_old_value = 26
        saved_new_value = 16

        student.riad_alsaalihin_old = saved_old_value
        student.riad_alsaalihin_new = saved_new_value
        student.save()

        url = reverse("students_update_riad_alsaalihin_view", args=[student.pk])

        res = self.client.put(url, {
            "value": 40,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_400_BAD_REQUEST)

        # success request body for single student with old value
        value = 43

        res = self.client.put(url, {
            "value": value,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_204_NO_CONTENT)

        new_fetched_student = Student.objects.get(pk=student.pk)

        self.assertEqual(new_fetched_student.riad_alsaalihin_new, value - saved_old_value)


    def test_update_allah_names_view(self):
        for student in self.students[1:]:
            url = reverse("students_update_allah_names_view", args=[student.pk])

            res = self.client.put(url, HTTP_AUTHORIZATION=f"Bearer {self.non_valid_token}")

            self.assertEqual(res.status_code, HTTP_403_FORBIDDEN)

            res = self.client.put(url, HTTP_AUTHORIZATION=f"Bearer {self.token}")

            self.assertEqual(res.status_code, HTTP_204_NO_CONTENT)

            new_fetched_student = Student.objects.get(pk=student.pk)

            self.assertTrue(new_fetched_student.allah_names_new)

        # failed request body
        student = self.students[0]
        student.allah_names_old = True
        student.save()

        url = reverse("students_update_allah_names_view", args=[student.pk])

        res = self.client.put(url, HTTP_AUTHORIZATION=f"Bearer {self.token}")

        self.assertEqual(res.status_code, HTTP_400_BAD_REQUEST)

        student.allah_names_new = True
        student.allah_names_old = False
        student.save()

        res = self.client.put(url, HTTP_AUTHORIZATION=f"Bearer {self.token}")

        self.assertEqual(res.status_code, HTTP_400_BAD_REQUEST)

        # success for one student
        student.allah_names_new = False
        student.save()

        res = self.client.put(url, HTTP_AUTHORIZATION=f"Bearer {self.token}")

        self.assertEqual(res.status_code, HTTP_204_NO_CONTENT)

        new_fetched_student = Student.objects.get(pk=student.pk)

        self.assertTrue(new_fetched_student.allah_names_new)


    def test_update_student_parts_recevied(self):
        student = self.students[0]

        parts_received = "test"

        url = reverse("students_update_parts_received_view", args=[student.pk])

        res = self.client.put(url, {
            "parts_received": parts_received
        }, HTTP_AUTHORIZATION=f"Bearer {self.non_valid_token}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_403_FORBIDDEN)

        res = self.client.put(url, {
            "parts_received": parts_received
        }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_204_NO_CONTENT)

        new_fetched_student = Student.objects.get(pk=student.pk)

        self.assertEqual(new_fetched_student.parts_received, parts_received)
