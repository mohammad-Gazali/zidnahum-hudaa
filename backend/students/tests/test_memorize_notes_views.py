from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT
from students.models import Student, StudentMasjedChoice, MemorizeNotes
from students.constants import MEMO_GROUP
from adminstration.models import ControlSettings
from typing import List


class MemorizeNotesTestCase(TestCase):
    def setUp(self):
        User = get_user_model()

        self.control_settings = ControlSettings.objects.first()

        self.username = "test"
        self.password = "mysecretpassword"

        self.user = User.objects.create(
            username=self.username,
        )

        self.user.set_password(self.password)
        self.user.groups.add(Group.objects.get(name=MEMO_GROUP))

        self.user.save()

        url_token = reverse("accounts_token_obtain_pair")

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

        self.notes: List[MemorizeNotes] = []

        self.notes.append(MemorizeNotes.objects.create(id=1, master=self.user, student=self.student, content="test 1"))
        self.notes.append(MemorizeNotes.objects.create(id=2, master=self.user, student=self.student, content="test 2"))
        self.notes.append(MemorizeNotes.objects.create(id=3, master=self.user, student=self.student, content="test 3"))


    def test_memorize_notes_create_view(self):
        url = reverse("students_notes_create_view")

        content = "test foo"

        res = self.client.post(url, {
            "student": self.student.pk,
            "content": content,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_201_CREATED)

        new_note = MemorizeNotes.objects.exclude(pk__in=map(lambda n: n.pk, self.notes)).first()

        self.assertEqual(new_note.content, content)


    def test_memorize_notes_delete_view(self):
        url = reverse("students_notes_delete_view", args=[1])

        res = self.client.delete(url, HTTP_AUTHORIZATION=f"Bearer {self.token}")

        self.assertEqual(res.status_code, HTTP_204_NO_CONTENT)

        ids = set(map(lambda m: m.pk, MemorizeNotes.objects.all()))

        self.assertSetEqual(ids, {2, 3})