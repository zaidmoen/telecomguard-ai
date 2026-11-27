from django.urls import reverse
from rest_framework.test import APITestCase

from .models import Dataset


class DatasetCatalogAPITests(APITestCase):
    def test_empty_catalog_is_honestly_empty(self):
        response = self.client.get(reverse("dataset-list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"results": []})

    def test_only_active_curated_datasets_are_visible(self):
        self.create_dataset(slug="telco", name="Telecom Churn", is_active=True)
        self.create_dataset(slug="hidden", name="Unpublished", is_active=False)
        response = self.client.get(reverse("dataset-list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["slug"], "telco")
        self.assertNotIn("asset_path", response.data["results"][0])

    def test_dataset_detail_hides_internal_path(self):
        self.create_dataset(slug="telco", is_active=True)
        response = self.client.get(reverse("dataset-detail", kwargs={"slug": "telco"}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["target_column"], "Churn")
        self.assertNotIn("asset_path", response.data)

    def test_missing_and_inactive_datasets_404(self):
        self.create_dataset(slug="hidden", is_active=False)
        for slug in ("missing", "hidden"):
            response = self.client.get(reverse("dataset-detail", kwargs={"slug": slug}))
            self.assertEqual(response.status_code, 404)

    def test_no_upload_or_mutation_api(self):
        self.assertEqual(
            self.client.post(reverse("dataset-list"), {"name": "example"}).status_code,
            405,
        )
        # The generic <slug> URL matches "upload", but cannot accept POST.
        self.assertEqual(self.client.post("/api/v1/datasets/upload/").status_code, 405)
        self.assertEqual(self.client.get("/api/v1/datasets/upload/").status_code, 404)

    @staticmethod
    def create_dataset(slug="telco", name="Telco Churn", is_active=True):
        return Dataset.objects.create(
            slug=slug,
            name=name,
            target_column="Churn",
            asset_path="curated/telco.csv",
            is_active=is_active,
        )


class SeedDatasetsTests(APITestCase):
    def test_seed_registers_telco_and_is_repeatable(self):
        from django.core.management import call_command

        call_command("seed_datasets")
        call_command("seed_datasets")  # running twice must not duplicate
        self.assertEqual(Dataset.objects.count(), 1)
        response = self.client.get(reverse("dataset-detail", kwargs={"slug": "telco-churn"}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["target_column"], "Churn")
