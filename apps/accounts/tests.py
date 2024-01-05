from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse


class TestAccountsApp(TestCase):
    def setUp(self) -> None:
        User = get_user_model()

        self.username = "test"
        self.first_name = "first name"
        self.last_name = "last name"
        self.password = "very secret password"

        self.user = User.objects.create(
            username=self.username,
            first_name=self.first_name,
            last_name=self.last_name,
        )

        self.user.set_password(self.password)

        self.user.is_active = True
        self.user.save()

        self.assertEqual(self.username, self.user.username)
        self.assertEqual(self.first_name, self.user.first_name)
        self.assertEqual(self.last_name, self.user.last_name)
        self.assertNotEqual(self.password, self.user.password)

    
    def test_token_and_refresh_and_user_details_endpoints(self):
        url_token = reverse("accounts_token_obtain_pair")
        url_refresh = reverse("accounts_token_refresh")
        url_details = reverse("accounts_user_details")

        res = self.client.post(url_token, {
            "username": self.username,
            "password": self.password,
        }, content_type="application/json")

        self.assertEqual(res.status_code, 200, res.json())

        access_token = res.json()["access"]
        refresh_token = res.json()["refresh"]

        res = self.client.post(url_refresh, {
            "refresh": refresh_token,
        }, content_type="application/json")

        self.assertEqual(res.status_code, 200, f"response = {res.json()}")

        new_access_token = res.json()["access"]

        res = self.client.get(url_details, HTTP_AUTHORIZATION=f"Bearer {access_token}")

        self.assertEqual(res.status_code, 200, f"response = {res.json()}")

        res = self.client.get(url_details, HTTP_AUTHORIZATION=f"Bearer {new_access_token}")

        self.assertEqual(res.status_code, 200, f"response = {res.json()}")
        
        self.assertEqual(res.json()["id"], self.user.pk)
        self.assertEqual(res.json()["username"], self.username)
        self.assertEqual(res.json()["first_name"], self.first_name)
        self.assertEqual(res.json()["last_name"], self.last_name)
        self.assertEqual(res.json()["is_superuser"], self.user.is_superuser)
        self.assertEqual(res.json()["groups"], [])
