"""TG-01: register the team-approved datasets.

Run with:  python manage.py seed_datasets
Safe to run many times (it updates the record instead of duplicating it).
"""
from django.core.management.base import BaseCommand

from apps.datasets.models import Dataset

# The list of datasets the team approved. To add a new dataset, add one more item here.
CURATED_DATASETS = [
    {
        "slug": "telco-churn",
        "name": "Telecom Customer Churn",
        "description": "Telecom customers (21 columns). Goal: predict if a customer will leave the service.",
        "classification_type": Dataset.ClassificationType.BINARY,
        "target_column": "Churn",
        "asset_path": "curated/telco_churn.csv",  # relative to backend/data/
        "source_url": "https://www.kaggle.com/datasets/blastchar/telco-customer-churn",
        "is_active": True,
    },
]


class Command(BaseCommand):
    help = "Register the predefined datasets in the database."

    def handle(self, *args, **options):
        for item in CURATED_DATASETS:
            slug = item["slug"]
            values = {key: value for key, value in item.items() if key != "slug"}
            _, created = Dataset.objects.update_or_create(slug=slug, defaults=values)
            self.stdout.write(f"{'Created' if created else 'Updated'}: {slug}")
