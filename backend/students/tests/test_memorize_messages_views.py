from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from students.models import Student, MemorizeMessage
from adminstration.models import ControlSettings
from typing import List
from time import sleep

class MemorizeMessageTestCase(TestCase):
    def setUp(self):
        User = get_user_model()

        self.control_settings = ControlSettings.objects.create(
            point_value=10,
        )

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

        self.assertEqual(res.status_code, 200, res.json())

        self.token1 = res.json()["access"]

        res = self.client.post(url_token, {
            "username": self.username2,
            "password": self.password2,
        }, content_type="application/json")

        self.assertEqual(res.status_code, 200, res.json())

        self.token2 = res.json()["access"]

        self.student = Student.objects.create(
            name="test"
        )

        self.messages: List[MemorizeMessage] = []
        
        self.messages.append(MemorizeMessage.objects.create(id=1, master=self.user1, student=self.student, changes=[1]))
        sleep(0.1) # for making "sended_at" different in MemorizeMessasge instances, so the list view can return them by desc order relatively to "sended_at"

        self.messages.append(MemorizeMessage.objects.create(id=2, master=self.user2, student=self.student, changes=[2]))
        sleep(0.1) # for making "sended_at" different in MemorizeMessasge instances, so the list view can return them by desc order relatively to "sended_at"

        self.messages.append(MemorizeMessage.objects.create(id=3, master=self.user1, student=self.student, changes=[3]))


    def test_memorize_message_list_view(self):
        url = reverse("students_message_list_view")

        res1 = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token1}")
        res2 = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token2}")

        self.assertEqual(res1.status_code, 200, res1.json())
        self.assertEqual(res2.status_code, 200, res2.json())
        
        self.assertEqual(res1.json()["results"][0]["id"], 3)
        self.assertEqual(res1.json()["results"][1]["id"], 1)

        self.assertEqual(res2.json()["results"][0]["id"], 2)


    def test_memorize_message_delete_view(self):
        url = reverse("students_message_delete_view", args=[1])

        failed_res = self.client.delete(url, HTTP_AUTHORIZATION=f"Bearer {self.token2}")

        self.assertEqual(failed_res.status_code, 403)

        res = self.client.delete(url, HTTP_AUTHORIZATION=f"Bearer {self.token1}")

        self.assertEqual(res.status_code, 204)

        ids = set(map(lambda m: m.pk, MemorizeMessage.objects.all()))

        self.assertSetEqual(ids, {2, 3})
