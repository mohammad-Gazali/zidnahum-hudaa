from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDDEN
from comings.models import ComingCategory, Coming
from students.models import Student, StudentMasjedChoice
from students.constants import COMING_GROUP
from adminstration.models import ControlSettings
from typing import List
from time import sleep


class ComingsAppTestCase(TestCase):
    def setUp(self):
        User = get_user_model()

        self.control_settings = ControlSettings.objects.first()

        self.username1 = "test1"
        self.password1 = "mysecretpassword1"

        self.username2 = "test2"
        self.password2 = "mysecretpassword2"

        self.non_valid_username = "test non valid"
        self.non_valid_password = "mysecretpassword non valid"

        self.user1 = User.objects.create(
            username=self.username1,
        )
        self.user2 = User.objects.create(
            username=self.username2,
        )
        self.non_valid_user = User.objects.create(
            username=self.non_valid_username,
        )

        self.user1.set_password(self.password1)
        self.user2.set_password(self.password2)
        self.non_valid_user.set_password(self.non_valid_password)

        self.user1.groups.add(Group.objects.get(name=COMING_GROUP))
        self.user2.groups.add(Group.objects.get(name=COMING_GROUP))

        self.user1.save()
        self.user2.save()
        self.non_valid_user.save()

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

        res = self.client.post(url_token, {
            "username": self.non_valid_username,
            "password": self.non_valid_password,
        }, content_type="application/json")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.non_valid_token = res.json()["access"]

        self.student = Student.objects.create(
            name="test",
            mother_name="test",
            masjed=StudentMasjedChoice.HASANIN
        )

        self.categories = [
            ComingCategory.objects.create(id=1, name="test 1"),
            ComingCategory.objects.create(id=2, name="test 2"),
            ComingCategory.objects.create(id=3, name="test 3"),
        ]

        self.comings: List[Coming] = []

        self.comings.append(Coming.objects.create(id=1, master=self.user1, student=self.student, category=self.categories[0]))
        sleep(0.1) # for making "registered_at" different in Coming instances, so the list view can return them by desc order relatively to "registered_at"

        self.comings.append(Coming.objects.create(id=2, master=self.user2, student=self.student, category=self.categories[0]))
        sleep(0.1) # for making "registered_at" different in Coming instances, so the list view can return them by desc order relatively to "registered_at"

        # here we made the category different from others to follow the same way when we don't sign the creating of coming
        # to the same category and student in the same day
        # we can make a signal for this but there is a chance where we must sign the students in the same day for the same category
        # so we can do this special case from the terminal, and if we made the preventing occur in the signal we can't do it even from terminal (as I know at least)
        self.comings.append(Coming.objects.create(id=3, master=self.user1, student=self.student, category=self.categories[2]))


    def test_coming_categories_list_view(self):
        url = reverse("comings_coming_category_list_view")

        res = self.client.get(url)

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        res_ids = list(map(lambda x: x["id"], res.json()))

        expected_ids = list(map(lambda c: c.pk, self.categories))

        self.assertListEqual(res_ids, expected_ids)

    
    def test_coming_list_view(self):
        url = reverse("comings_list_create_view")

        res = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.non_valid_token}")

        self.assertEqual(res.status_code, HTTP_403_FORBIDDEN, res.json())

        res1 = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token1}")
        res2 = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token2}")

        self.assertEqual(res1.status_code, HTTP_200_OK, res1.json())
        self.assertEqual(res2.status_code, HTTP_200_OK, res2.json())
        
        self.assertEqual(len(res1.json()["results"]), 2)
        self.assertEqual(len(res2.json()["results"]), 1)

        self.assertEqual(res1.json()["results"][0]["id"], 3)
        self.assertEqual(res1.json()["results"][1]["id"], 1)

        self.assertEqual(res2.json()["results"][0]["id"], 2)


    def test_coming_create_view(self):
        url = reverse("comings_list_create_view")

        category = self.categories[1]

        res = self.client.post(url, {
            "student": self.student.pk,
            "category": category.pk,
        }, HTTP_AUTHORIZATION=f"Bearer {self.non_valid_token}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_403_FORBIDDEN)

        res = self.client.post(url, {
            "student": self.student.pk,
            "category": category.pk,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token2}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_201_CREATED)

        new_coming = Coming.objects.exclude(pk__in=map(lambda c: c.pk, self.comings)).first()

        self.assertEqual(new_coming.master.pk, self.user2.pk)
        self.assertEqual(new_coming.category.pk, category.pk)

        # trying to create another coming in the same day
        failed_res = self.client.post(url, {
            "student": self.student.pk,
            "category": category.pk,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token1}", content_type="application/json")

        self.assertEqual(failed_res.status_code, HTTP_403_FORBIDDEN)

        failed_res = self.client.post(url, {
            "student": self.student.pk,
            "category": category.pk,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token2}", content_type="application/json")

        self.assertEqual(failed_res.status_code, HTTP_403_FORBIDDEN)


    def test_coming_delete_view(self):
        url = reverse("comings_delete_view", args=[1])

        failed_res = self.client.delete(url)

        self.assertEqual(failed_res.status_code, HTTP_401_UNAUTHORIZED)

        failed_res = self.client.delete(url, HTTP_AUTHORIZATION=f"Bearer {self.token2}")

        self.assertEqual(failed_res.status_code, HTTP_403_FORBIDDEN)

        failed_res = self.client.delete(url, HTTP_AUTHORIZATION=f"Bearer {self.non_valid_token}")

        self.assertEqual(failed_res.status_code, HTTP_403_FORBIDDEN)

        res = self.client.delete(url, HTTP_AUTHORIZATION=f"Bearer {self.token1}")

        self.assertEqual(res.status_code, HTTP_204_NO_CONTENT)

        ids = set(map(lambda m: m.pk, Coming.objects.all()))

        self.assertSetEqual(ids, {2, 3})

