from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from students.models import Student, StudentCategory, StudentGroup, MemorizeMessage, MemorizeNotes
from students.constants import NEW
from comings.models import Coming, ComingCategory
from adminstration.models import ControlSettings
from typing import List
from random import randint
from time import sleep


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

        self.assertEqual(res.status_code, 200, res.json())

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

        self.assertEqual(res.status_code, 200, res.json())

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

        self.assertEqual(res.status_code, 200, res.json())

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

        self.assertEqual(res.status_code, 200, res.json())

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

            self.assertEqual(res.status_code, 200, res.json())

            self.assertEqual(rand, res.json()["id"])


class StudentUpdateTestCase(TestCase):
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

        self.assertEqual(res.status_code, 200, res.json())

        self.token = res.json()["access"]

        self.students: List[Student] = []
        self.total_count = 100

        for i in range(1, self.total_count + 1):
            self.students.append(
                Student.objects.create(
                    id=i,
                    name=f"test {i}"
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
            }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

            self.assertEqual(res.status_code, 200, res.json())

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
            }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

            self.assertEqual(res.status_code, 200, res.json())

            refetched_student = Student.objects.get(pk=student.pk)

            expected_value = set([index for index, value in enumerate(refetched_student.q_test) if value == NEW])

            self.assertSetEqual(expected_value, set(q_test))

            message = MemorizeMessage.objects.get(student=student)

            self.assertEqual(set(message.changes), set(q_test))
            self.assertEqual(self.control_settings.double_points, message.is_doubled)
            

    def test_update_student_parts_recevied(self):
        student = self.students[0]

        parts_received = "test"

        url = reverse("students_update_parts_received_view", args=[student.pk])

        res = self.client.put(url, {
            "parts_received": parts_received
        }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

        self.assertEqual(res.status_code, 200)

        new_fetched_student = Student.objects.get(pk=student.pk)

        self.assertEqual(new_fetched_student.parts_received, parts_received)


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


class MemorizeNotesTestCase(TestCase):
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

        self.assertEqual(res.status_code, 200, res.json())

        self.token = res.json()["access"]

        self.student = Student.objects.create(
            name="test"
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

        self.assertEqual(res.status_code, 201)

        new_note = MemorizeNotes.objects.exclude(pk__in=map(lambda n: n.pk, self.notes)).first()

        self.assertEqual(new_note.content, content)


    def test_memorize_notes_delete_view(self):
        url = reverse("students_notes_delete_view", args=[1])

        res = self.client.delete(url, HTTP_AUTHORIZATION=f"Bearer {self.token}")

        self.assertEqual(res.status_code, 204)

        ids = set(map(lambda m: m.pk, MemorizeNotes.objects.all()))

        self.assertSetEqual(ids, {2, 3})