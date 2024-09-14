from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.conf import settings
from django.utils import timezone
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_403_FORBIDDEN
from students.models import Student, StudentMasjedChoice, StudentCategory, StudentGroup, MemorizeMessage
from students.constants import COMING_GROUP, ADD_STUDENTS_GROUP
from comings.models import Coming, ComingCategory
from adminstration.models import ControlSettings
from awqaf.models import AwqafTestNoQ, AwqafNoQStudentRelation
from typing import List
from random import randint
from time import sleep


class StudentListAndDetailsAndCreateTestCase(TestCase):
    def setUp(self):
        User = get_user_model()

        self.control_settings = ControlSettings.objects.first()

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

        self.coming_category = ComingCategory.objects.create(id=settings.Q_COMING_CATEGORY_ID)

        self.students: List[Student] = []
        self.total_count = 100
        self.hidden_count = 0
        self.registerd_count = 0

        for i in range(1, self.total_count + 1):
            new_student = Student.objects.create(
                id=i,
                name=f"test name {i}",
                mother_name=f"test mother name {i}",
                masjed=StudentMasjedChoice.HASANIN,
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
        url = reverse("students_create_list_view") + "?query=test"

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
        url = reverse("students_create_list_view") + "?query=test"

        res = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token}")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.assertEqual(res.json()["count"], self.total_count)

        res_ids = list(map(lambda x: x["id"], res.json()["results"]))

        while res.json()["next"] is not None:
            res = self.client.get(res.json()["next"], HTTP_AUTHORIZATION=f"Bearer {self.token}")
            res_ids += list(map(lambda x: x["id"], res.json()["results"]))

        expected_ids = [s.pk for s in self.students]

        self.assertListEqual(res_ids, expected_ids)


    def test_students_with_coming_registeration_list_view(self):
        url = reverse("students_with_coming_registeration_list_view", args=[self.coming_category.pk]) + "?query=test"

        res = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token}")

        self.assertEqual(res.status_code, HTTP_403_FORBIDDEN, res.json())

        self.user.groups.add(Group.objects.get(name=COMING_GROUP))

        res = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {self.token}")
        
        self.assertEqual(res.json()["count"], self.total_count)

        res_filtered_ids = list(
            map(
                lambda x: x["id"], 
                filter(
                    lambda x: not x["is_registered_today"], 
                    res.json()["results"],
                ),
            ),
        )

        while res.json()["next"] is not None:
            res = self.client.get(res.json()["next"], HTTP_AUTHORIZATION=f"Bearer {self.token}")
            
            res_filtered_ids += list(
                map(
                    lambda x: x["id"], 
                    filter(
                        lambda x: not x["is_registered_today"], 
                        res.json()["results"],
                    ),
                ),
            )

        expected_filtered_ids = [s.pk for s in self.students if s.pk % 3 != 2]

        self.assertEqual(self.total_count - self.registerd_count, len(res_filtered_ids))

        self.assertListEqual(res_filtered_ids, expected_filtered_ids)


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


    def test_student_details_for_nested_relations(self):
        student = Student.objects.create(
            name="testy testy",
            mother_name="test",
            masjed=StudentMasjedChoice.HASANIN,
        )

        for _ in range(11):
            Coming.objects.create(master=self.user, student=student, category=self.coming_category)
            sleep(0.1)

        test1 = AwqafTestNoQ.objects.create(name="test1", points=10)
        test2 = AwqafTestNoQ.objects.create(name="test2", points=10)

        awqaf_relations_ids = [
            AwqafNoQStudentRelation.objects.create(student=student, test=test1).pk,
            AwqafNoQStudentRelation.objects.create(student=student, test=test2).pk,
        ]

        current_week_messages: List[MemorizeMessage] = []
        previous_week_messages: List[MemorizeMessage] = []

        for _ in range(3):
            current_week_messages.append(
                MemorizeMessage.objects.create(
                    master=self.user,
                    student=student,
                    changes=[1],
                    student_level=student.level,
                )
            )

        for _ in range(3):
            message = MemorizeMessage.objects.create(
                master=self.user,
                student=student,
                changes=[1],
                student_level=student.level,
            )
            message.sended_at = timezone.localtime() - timezone.timedelta(days=7)
            message.save()

            previous_week_messages.append(message)

        url = reverse("students_details_view", args=[student.pk])

        res = self.client.get(url)

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.assertEqual(len(res.json()["last_comings"]), 10)

        res_awqaf_relations_ids = set(map(lambda r: r["id"], res.json()["awqaf_relations"]))

        self.assertSetEqual(res_awqaf_relations_ids, set(awqaf_relations_ids))
        
        expected_current_week_messages_ids = set(map(lambda m: m.pk, current_week_messages))
        res_current_week_messages_ids = set(map(lambda m: m["id"], res.json()["current_week_messages"]))

        expected_previous_week_messages_ids = set(map(lambda m: m.pk, previous_week_messages))
        res_previous_week_messages_ids = set(map(lambda m: m["id"], res.json()["previous_week_messages"]))

        self.assertSetEqual(expected_current_week_messages_ids, res_current_week_messages_ids)
        self.assertSetEqual(expected_previous_week_messages_ids, res_previous_week_messages_ids)

        # reset memorize messges
        MemorizeMessage.objects.all().delete()

        first_half_month_messages: List[MemorizeMessage] = []
        second_half_month_messages: List[MemorizeMessage] = []

        now = timezone.localtime()

        for _ in range(3):
            message = MemorizeMessage.objects.create(
                master=self.user,
                student=student,
                changes=[1],
                student_level=student.level,
            )

            message.sended_at = timezone.make_aware(timezone.datetime(year=now.year, month=now.month, day=10), now.tzinfo)
            message.save()

            first_half_month_messages.append(message)

        for _ in range(3):
            message = MemorizeMessage.objects.create(
                master=self.user,
                student=student,
                changes=[1],
                student_level=student.level,
            )
            if now.day <= 15:
                previous_month = now.month - 1 if now.month != 1 else 12
                year_for_previous_month = now.year if previous_month != 12 else now.year - 1
                message.sended_at = timezone.make_aware(timezone.datetime(year=year_for_previous_month, month=previous_month, day=20), now.tzinfo)
            else:
                message.sended_at = timezone.make_aware(timezone.datetime(year=now.year, month=now.month, day=20), now.tzinfo)

            message.save()

            second_half_month_messages.append(message)

        url = reverse("students_details_view", args=[student.pk])

        res = self.client.get(url)

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        expected_first_half_month_messages_ids = set(map(lambda m: m.pk, first_half_month_messages))
        res_first_half_month_messages_ids = set(map(lambda m: m["id"], res.json()["first_half_month_messages"]))
        
        expected_second_half_month_messages_ids = set(map(lambda m: m.pk, second_half_month_messages))
        res_second_half_month_messages_ids = set(map(lambda m: m["id"], res.json()["second_half_month_messages"]))

        self.assertSetEqual(expected_first_half_month_messages_ids, res_first_half_month_messages_ids)
        self.assertSetEqual(expected_second_half_month_messages_ids, res_second_half_month_messages_ids)

    def test_student_create(self):
        url = reverse("students_create_list_view")

        res = self.client.post(url, {
            "name": "test create",
            "mother_name": "testify",
            "masjed": StudentMasjedChoice.HASANIN,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_403_FORBIDDEN)

        self.user.groups.add(Group.objects.get(name=ADD_STUDENTS_GROUP))

        res = self.client.post(url, {
            "name": "test create",
            "mother_name": "testify",
            "masjed": StudentMasjedChoice.HASANIN,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_201_CREATED, res.json())

        res = self.client.post(url, {
            "name": "test create",
            "mother_name": "testify",
            "masjed": StudentMasjedChoice.HASANIN,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_400_BAD_REQUEST)

        res = self.client.post(url, {
            "name": self.students[0].name,
            "mother_name": "test mother name",
            "masjed": StudentMasjedChoice.HASANIN,
        }, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")

        self.assertEqual(res.status_code, HTTP_201_CREATED)