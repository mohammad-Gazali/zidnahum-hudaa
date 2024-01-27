from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDDEN
from points.models import PointsAddingCause, PointsAdding, PointsDeletingCause, PointsDeleting
from students.models import Student
from typing import List
from time import sleep


class PointsAddingTestCase(TestCase):
    def setUp(self):
        User = get_user_model()

        self.username1 = "test1"
        self.password1 = "mysecretpassword1"

        self.username2 = "test2"
        self.password2 = "mysecretpassword2"

        self.user1 = User.objects.create(
            username=self.username1,
        )
        self.user2 = User.objects.create(
            username=self.username2,
        )

        self.user1.set_password(self.password1)
        self.user2.set_password(self.password2)

        self.user1.save()
        self.user2.save()

        url_token = reverse("accounts_token_obtain_pair")

        res = self.client.post(url_token, {
            "username": self.username1,
            "password": self.password1,
        }, content_type="application/json")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.token1 = res.json()["access"]

        res = self.client.post(url_token, {
            "username": self.username2,
            "password": self.password2,
        }, content_type="application/json")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.token2 = res.json()["access"]

        self.student = Student.objects.create(
            name="test"
        )

        self.causes = [
            PointsAddingCause.objects.create(id=1, name="test 1"),
            PointsAddingCause.objects.create(id=2, name="test 2"),
            PointsAddingCause.objects.create(id=3, name="test 3"),
        ]

        self.addings: List[PointsAdding] = []

        self.addings.append(PointsAdding.objects.create(id=1, master=self.user1, student=self.student, cause=self.causes[0], value=1))
        sleep(0.1) # for making "created_at" different in PointsAdding instances, so the list view can return them by desc order relatively to "created_at"

        self.addings.append(PointsAdding.objects.create(id=2, master=self.user2, student=self.student, cause=self.causes[0], value=2))
        sleep(0.1) # for making "created_at" different in PointsAdding instances, so the list view can return them by desc order relatively to "created_at"

        self.addings.append(PointsAdding.objects.create(id=3, master=self.user1, student=self.student, cause=self.causes[0], value=3))


    def test_points_adding_cause_list_view(self):
        url = reverse("points_adding_cause_list_view")

        res = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token1}")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        res_ids = list(map(lambda x: x["id"], res.json()))

        expected_ids = list(map(lambda c: c.pk, self.causes))

        self.assertListEqual(res_ids, expected_ids)


    def test_points_adding_list_view(self):
        url = reverse("points_adding_list_create_view")

        res1 = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token1}")
        res2 = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token2}")

        self.assertEqual(res1.status_code, HTTP_200_OK, res1.json())
        self.assertEqual(res2.status_code, HTTP_200_OK, res2.json())
        
        self.assertEqual(len(res1.json()["results"]), 2)
        self.assertEqual(len(res2.json()["results"]), 1)

        self.assertEqual(res1.json()["results"][0]["id"], 3)
        self.assertEqual(res1.json()["results"][1]["id"], 1)

        self.assertEqual(res2.json()["results"][0]["id"], 2)


    def test_points_adding_create_view(self):
        url = reverse("points_adding_list_create_view")

        cause = self.causes[1]
        value = 139

        res = self.client.post(url, {
            "student": self.student.pk,
            "cause": cause.pk,
            "value": value,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token2}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_201_CREATED)

        new_adding = PointsAdding.objects.exclude(pk__in=map(lambda c: c.pk, self.causes)).first()

        self.assertEqual(new_adding.master.pk, self.user2.pk)
        self.assertEqual(new_adding.cause.pk, cause.pk)
        self.assertEqual(new_adding.value, value)


    def test_points_adding_delete_view(self):
        url = reverse("points_adding_delete_view", args=[1])

        failed_res = self.client.delete(url)

        self.assertEqual(failed_res.status_code, HTTP_401_UNAUTHORIZED)

        failed_res = self.client.delete(url, HTTP_AUTHORIZATION=f"Bearer {self.token2}")

        self.assertEqual(failed_res.status_code, HTTP_403_FORBIDDEN)

        res = self.client.delete(url, HTTP_AUTHORIZATION=f"Bearer {self.token1}")

        self.assertEqual(res.status_code, HTTP_204_NO_CONTENT)

        ids = set(map(lambda m: m.pk, PointsAdding.objects.all()))

        self.assertSetEqual(ids, {2, 3})


class PointsDeletingTestCase(TestCase):
    def setUp(self):
        User = get_user_model()

        self.username1 = "test1"
        self.password1 = "mysecretpassword1"

        self.username2 = "test2"
        self.password2 = "mysecretpassword2"

        self.user1 = User.objects.create(
            username=self.username1,
        )
        self.user2 = User.objects.create(
            username=self.username2,
        )

        self.user1.set_password(self.password1)
        self.user2.set_password(self.password2)

        self.user1.save()
        self.user2.save()

        url_token = reverse("accounts_token_obtain_pair")

        res = self.client.post(url_token, {
            "username": self.username1,
            "password": self.password1,
        }, content_type="application/json")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.token1 = res.json()["access"]

        res = self.client.post(url_token, {
            "username": self.username2,
            "password": self.password2,
        }, content_type="application/json")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.token2 = res.json()["access"]

        self.student = Student.objects.create(
            name="test"
        )

        self.causes = [
            PointsDeletingCause.objects.create(id=1, name="test 1"),
            PointsDeletingCause.objects.create(id=2, name="test 2"),
            PointsDeletingCause.objects.create(id=3, name="test 3"),
        ]

        self.addings: List[PointsDeleting] = []

        self.addings.append(PointsDeleting.objects.create(id=1, master=self.user1, student=self.student, cause=self.causes[0], value=1))
        sleep(0.1) # for making "created_at" different in PointsDeleting instances, so the list view can return them by desc order relatively to "created_at"

        self.addings.append(PointsDeleting.objects.create(id=2, master=self.user2, student=self.student, cause=self.causes[0], value=2))
        sleep(0.1) # for making "created_at" different in PointsDeleting instances, so the list view can return them by desc order relatively to "created_at"

        self.addings.append(PointsDeleting.objects.create(id=3, master=self.user1, student=self.student, cause=self.causes[0], value=3))


    def test_points_deleting_cause_list_view(self):
        url = reverse("points_deleting_cause_list_view")

        res = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token1}")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        res_ids = list(map(lambda x: x["id"], res.json()))

        expected_ids = list(map(lambda c: c.pk, self.causes))

        self.assertListEqual(res_ids, expected_ids)


    def test_points_deleting_list_view(self):
        url = reverse("points_deleting_list_create_view")

        res1 = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token1}")
        res2 = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token2}")

        self.assertEqual(res1.status_code, HTTP_200_OK, res1.json())
        self.assertEqual(res2.status_code, HTTP_200_OK, res2.json())
        
        self.assertEqual(len(res1.json()["results"]), 2)
        self.assertEqual(len(res2.json()["results"]), 1)

        self.assertEqual(res1.json()["results"][0]["id"], 3)
        self.assertEqual(res1.json()["results"][1]["id"], 1)

        self.assertEqual(res2.json()["results"][0]["id"], 2)


    def test_points_deleting_create_view(self):
        url = reverse("points_deleting_list_create_view")

        cause = self.causes[1]
        value = 139

        res = self.client.post(url, {
            "student": self.student.pk,
            "cause": cause.pk,
            "value": value,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token2}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_201_CREATED)

        new_deleting = PointsDeleting.objects.exclude(pk__in=map(lambda c: c.pk, self.causes)).first()

        self.assertEqual(new_deleting.master.pk, self.user2.pk)
        self.assertEqual(new_deleting.cause.pk, cause.pk)
        self.assertEqual(new_deleting.value, value)


    def test_points_deleting_delete_view(self):
        url = reverse("points_deleting_delete_view", args=[1])

        failed_res = self.client.delete(url)

        self.assertEqual(failed_res.status_code, HTTP_401_UNAUTHORIZED)

        failed_res = self.client.delete(url, HTTP_AUTHORIZATION=f"Bearer {self.token2}")

        self.assertEqual(failed_res.status_code, HTTP_403_FORBIDDEN)

        res = self.client.delete(url, HTTP_AUTHORIZATION=f"Bearer {self.token1}")

        self.assertEqual(res.status_code, HTTP_204_NO_CONTENT)

        ids = set(map(lambda m: m.pk, PointsDeleting.objects.all()))

        self.assertSetEqual(ids, {2, 3})
