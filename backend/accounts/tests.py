from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse


class AccountsAppTestCase(TestCase):
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

        self.user.save()

        self.assertEqual(self.username, self.user.username)
        self.assertEqual(self.first_name, self.user.first_name)
        self.assertEqual(self.last_name, self.user.last_name)
        self.assertNotEqual(self.password, self.user.password)

        url_token = reverse("accounts_token_obtain_pair")

        res = self.client.post(url_token, {
            "username": self.username,
            "password": self.password,
        }, content_type="application/json")

        self.assertEqual(res.status_code, 200, res.json())

        self.token = res.json()["access"]
        self.refresh_token = res.json()["refresh"]

    
    def test_create_token(self):
        url = reverse("accounts_token_obtain_pair")
        
        res = self.client.post(url, {
            "username": self.username,
            "password": self.password,
        }, content_type="application/json")

        self.assertEqual(res.status_code, 200, res.json())

        res.json()["access"]
        res.json()["refresh"]

        self.assertEqual(res.status_code, 200, f"response = {res.json()}")


    def test_token_refresh(self):
        url = reverse("accounts_token_refresh")

        res = self.client.post(url, {
            "refresh": self.refresh_token,
        }, content_type="application/json")

        res.json()["access"]
        new_refresh_token = res.json()["refresh"]

        # failed because token was added to blacklist
        failed_response = self.client.post(url, {
            "refresh": self.refresh_token,
        }, content_type="application/json")

        self.assertEqual(failed_response.status_code, 401)

        successful_response = self.client.post(url, {
            "refresh": new_refresh_token,
        }, content_type="application/json")

        self.assertEqual(successful_response.status_code, 200)


    def test_user_details(self):
        url = reverse("accounts_user_details")

        res = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token}")

        self.assertEqual(res.status_code, 200, f"response = {res.json()}")
        
        self.assertEqual(res.json()["id"], self.user.pk)
        self.assertEqual(res.json()["username"], self.username)
        self.assertEqual(res.json()["first_name"], self.first_name)
        self.assertEqual(res.json()["last_name"], self.last_name)
        self.assertEqual(res.json()["is_superuser"], self.user.is_superuser)
        self.assertEqual(res.json()["groups"], [])