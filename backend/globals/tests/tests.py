from django.test import TestCase
from django.urls import reverse
from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.status import HTTP_200_OK
from globals.models import AssetsCategory, AssetFile
from typing import List
from shutil import rmtree


class GlobalsAppTestCase(TestCase):
    def test_asset_list_view(self):
        categories = [
            AssetsCategory.objects.create(id=1, name="test 1"),
            AssetsCategory.objects.create(id=2, name="test 2"),
            AssetsCategory.objects.create(id=3, name="test 3"),
        ]
        
        asset_files: List[AssetFile] = []

        for i in range(1, 10):
            with open(settings.BASE_DIR / "globals/tests/test.pdf", "rb") as file:
                asset_files.append(
                    AssetFile.objects.create(
                        id=i,
                        name=f"test_asset_{i}",
                        category=categories[i % 3],
                        file=SimpleUploadedFile(
                            name=f"test_asset_{i}.pdf",
                            content=file.read(),
                            content_type="pdf",
                        )
                    )
                )

        url = reverse("globals_asset_list_view")

        res = self.client.get(url)

        self.assertEqual(res.status_code, HTTP_200_OK, res.json())

        res_ids = set(map(lambda x: x["id"], res.json()))
        expected_ids = set(map(lambda c: c.pk, categories))

        self.assertSetEqual(res_ids, expected_ids)

        res_names = set(map(lambda x: x["name"], res.json()))
        expected_names = set(map(lambda c: c.name, categories))

        self.assertSetEqual(res_names, expected_names)

        def get_files_ids_helper(c: AssetsCategory):
            return set(map(lambda x: x.pk, c.files.all()))

        expected_files_ids = list(map(get_files_ids_helper, categories))
        res_files_ids = [0, 0, 0]

        for c in res.json():
            res_files_ids[c["id"] - 1] = set(map(lambda x: x["id"], c["files"]))

        self.assertListEqual(expected_files_ids, res_files_ids)

        rmtree(settings.BASE_DIR.parent / "media/assets")