from django.test import TestCase
from django.urls import reverse
from rest_framework.status import HTTP_200_OK
from awqaf.models import AwqafTestNoQ

class AwqafAppTestCase(TestCase):
    def test_awqaf_test_no_q_list_view(self):
        tests = [
            AwqafTestNoQ.objects.create(id=1, name="test 1", points=1),
            AwqafTestNoQ.objects.create(id=2, name="test 2", points=2),
            AwqafTestNoQ.objects.create(id=3, name="test 3", points=3),
        ]

        url = reverse("awqaf_test_no_q_list_view")

        res = self.client.get(url)

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        res_ids = set(map(lambda x: x["id"], res.json()))
        expected_ids = set(map(lambda x: x.pk, tests))

        self.assertSetEqual(res_ids, expected_ids)