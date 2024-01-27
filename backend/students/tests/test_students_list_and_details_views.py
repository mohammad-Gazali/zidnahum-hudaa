from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.status import HTTP_200_OK
from students.models import Student, StudentCategory, StudentGroup
from comings.models import Coming, ComingCategory
from adminstration.models import ControlSettings
from typing import List
from random import randint


class StudentListAndDetailsTestCase(TestCase):
    def setUp(self):
        User = get_user_model()

        self.control_settings = ControlSettings.objects.create(
            point_value=10,
        )

        self.username = "test"
        self.password = "mysecretpassword"

        self.user = User.objects.create(
            username=self.username,
        )

        self.user.set_password(self.password)

        self.user.save()

        url_token = reverse("accounts_token_obtain_pair")

        res = self.client.post(url_token, {
            "username": self.username,
            "password": self.password,
        }, content_type="application/json")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.token = res.json()["access"]

        self.category1 = StudentCategory.objects.create(
            id=1,
            name="test 1"
        )

        self.category2 = StudentCategory.objects.create(
            id=2,
            name="test 2"
        )

        self.category3 = StudentCategory.objects.create(
            id=3,
            name="test 3"
        )

        self.group1 = StudentGroup.objects.create(
            name="test 1"
        )

        self.group2 = StudentGroup.objects.create(
            name="test 2"
        )

        self.coming_category = ComingCategory.objects.create()

        self.students: List[Student] = []
        self.total_count = 100
        self.hidden_count = 0
        self.registerd_count = 0

        for i in range(1, self.total_count + 1):
            new_student = Student.objects.create(
                id=i,
                name=f"test name {i}"
            )

            if i % 3 == 0:
                new_student.category = self.category1
                new_student.group = self.group1

            elif i % 3 == 1:
                new_student.category = self.category2
                new_student.group = self.group2
                self.hidden_count += 1
                self.control_settings.hidden_ids.append(i)

            else:
                new_student.category = self.category3
                self.registerd_count += 1
                Coming.objects.create(
                    master=self.user,
                    student=new_student,
                    category=self.coming_category,
                )


            self.control_settings.save()
            new_student.save()
            self.students.append(new_student)


    def test_list_students_view_non_auth(self):
        url = reverse("students_list_view") + "?query=test"

        res = self.client.get(url)

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.assertEqual(res.json()["count"], self.total_count - self.hidden_count)

        res_ids = list(map(lambda x: x["id"], res.json()["results"]))

        while res.json()["next"] is not None:
            res = self.client.get(res.json()["next"])
            res_ids += list(map(lambda x: x["id"], res.json()["results"]))

        expected_ids = [s.pk for s in self.students if s.pk % 3 != 1]

        self.assertListEqual(res_ids, expected_ids)


    def test_list_students_view_auth(self):
        url = reverse("students_list_view") + "?query=test"

        res = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token}")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.assertEqual(res.json()["count"], self.total_count)

        res_ids = list(map(lambda x: x["id"], res.json()["results"]))

        while res.json()["next"] is not None:
            res = self.client.get(res.json()["next"], HTTP_AUTHORIZATION=f"Bearer {self.token}")
            res_ids += list(map(lambda x: x["id"], res.json()["results"]))

        expected_ids = [s.pk for s in self.students]

        self.assertListEqual(res_ids, expected_ids)


    def test_list_non_registerd_today_students_view(self):
        url = reverse("students_non_reg_today_list_view", args=[self.coming_category.pk]) + "?query=test"

        res = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token}")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.assertEqual(res.json()["count"], self.total_count - self.registerd_count)

        res_ids = list(map(lambda x: x["id"], res.json()["results"]))

        while res.json()["next"] is not None:
            res = self.client.get(res.json()["next"], HTTP_AUTHORIZATION=f"Bearer {self.token}")
            res_ids += list(map(lambda x: x["id"], res.json()["results"]))

        expected_ids = [s.pk for s in self.students if s.pk % 3 != 2]

        self.assertListEqual(res_ids, expected_ids)


    def test_list_via_category_model(self):
        expected_ids_1 = [s.pk for s in self.students if s.pk % 3 == 0]
        expected_ids_2 = [s.pk for s in self.students if s.pk % 3 == 1]
        expected_ids_3 = [s.pk for s in self.students if s.pk % 3 == 2]

        val_1 = list(map(lambda s: s.pk, self.category1.student_set.all()))
        val_2 = list(map(lambda s: s.pk, self.category2.student_set.all()))
        val_3 = list(map(lambda s: s.pk, self.category3.student_set.all()))

        self.assertListEqual(expected_ids_1, val_1)
        self.assertListEqual(expected_ids_2, val_2)
        self.assertListEqual(expected_ids_3, val_3)


    def test_student_details_view(self):
        for _ in range(10):
            rand = randint(1, self.total_count)
            
            url = reverse("students_details_view", args=[rand])

            # we used token here to display even the hidden ids
            res = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token}")

            self.assertEqual(res.status_code, HTTP_200_OK, res.json())

            self.assertEqual(rand, res.json()["id"])
