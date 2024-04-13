from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT
from students.models import Student, StudentMasjedChoice, MemorizeMessage
from students.constants import NEW, NON, MEMO_GROUP, HADEETH_GROUP
from adminstration.models import ControlSettings


class MemorizeMessageSignal(TestCase):
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
        self.user.groups.add(Group.objects.get(name=HADEETH_GROUP))

        self.user.save()

        url_token = reverse("accounts_token_obtain_pair")

        res = self.client.post(url_token, {
            "username": self.username,
            "password": self.password,
        }, content_type="application/json")

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        self.token = res.json()["access"]

        student = Student.objects.create(
            name="test",
            masjed=StudentMasjedChoice.HASANIN,
        )

        self.existing_qmemo = [0, 530, 100]
        for qm in self.existing_qmemo:
            student.q_memorizing[qm] = NEW

        self.existing_qtest = [100, 120]
        for qt in self.existing_qtest:
            student.q_test[qt] = NEW
        
        self.existing_alarbaein_alnawawia = 20
        student.alarbaein_alnawawia_new = self.existing_alarbaein_alnawawia

        self.existing_riad_alsaalihin = 30
        student.riad_alsaalihin_new = self.existing_riad_alsaalihin

        student.save()

        self.student_pk = student.pk

        # sending updates for creating messages and update student fields
        url1 = reverse("students_update_qmemo_view", args=[self.student_pk])
        url2 = reverse("students_update_qtest_view", args=[self.student_pk])
        url3 = reverse("students_update_alarbaein_alnawawia_view", args=[self.student_pk])
        url4 = reverse("students_update_riad_alsaalihin_view", args=[self.student_pk])
        url5 = reverse("students_update_allah_names_view", args=[self.student_pk])

        self.value1 = [0, 34, 165, 342, 600, 202]
        self.value2 = [34, 65, 13, 100]
        self.value3 = self.existing_alarbaein_alnawawia + 14
        self.value4 = self.existing_riad_alsaalihin + 30

        res1 = self.client.put(url1, {"q_memo": self.value1}, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")
        res2 = self.client.put(url2, {"q_test": self.value2}, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")
        res3 = self.client.put(url3, {"value": self.value3}, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")
        res4 = self.client.put(url4, {"value": self.value4}, HTTP_AUTHORIZATION=f"Bearer {self.token}", content_type="application/json")
        res5 = self.client.put(url5, HTTP_AUTHORIZATION=f"Bearer {self.token}")

        self.assertEqual(res1.status_code, HTTP_200_OK)
        self.assertEqual(res2.status_code, HTTP_200_OK)
        self.assertEqual(res3.status_code, HTTP_204_NO_CONTENT)
        self.assertEqual(res4.status_code, HTTP_204_NO_CONTENT)
        self.assertEqual(res5.status_code, HTTP_204_NO_CONTENT)


    def test_delete_memorize_message_signal(self):
        student_before_delete = Student.objects.get(pk=self.student_pk)

        self.assertEqual(len(student_before_delete.q_memorizing), 618)
        self.assertEqual(len(student_before_delete.q_test), 240)

        for i in range(618):
            if i in self.existing_qmemo + self.value1:
                self.assertEqual(student_before_delete.q_memorizing[i], NEW)
            else:
                self.assertEqual(student_before_delete.q_memorizing[i], NON)

        for i in range(240):
            if i in self.existing_qtest + self.value2:
                self.assertEqual(student_before_delete.q_test[i], NEW)
            else:
                self.assertEqual(student_before_delete.q_test[i], NON)

        self.assertEqual(student_before_delete.alarbaein_alnawawia_new, self.value3)
        self.assertEqual(student_before_delete.riad_alsaalihin_new, self.value4)
        self.assertTrue(student_before_delete.allah_names_new)

        MemorizeMessage.objects.all().delete()

        student_after_delete = Student.objects.get(pk=self.student_pk)

        for i in range(618):
            if i in self.existing_qmemo:
                self.assertEqual(student_after_delete.q_memorizing[i], NEW)
            else:
                self.assertEqual(student_after_delete.q_memorizing[i], NON)

        for i in range(240):
            if i in self.existing_qtest:
                self.assertEqual(student_after_delete.q_test[i], NEW)
            else:
                self.assertEqual(student_after_delete.q_test[i], NON)

        self.assertEqual(student_after_delete.alarbaein_alnawawia_new, self.existing_alarbaein_alnawawia)
        self.assertEqual(student_after_delete.riad_alsaalihin_new, self.existing_riad_alsaalihin)
        self.assertFalse(student_after_delete.allah_names_new)
