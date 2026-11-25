"""Metadata for team-curated datasets, never a user-uploaded file."""
from django.db import models


class Dataset(models.Model):
    class ClassificationType(models.TextChoices):
        BINARY = "binary", "Binary classification"
        MULTICLASS = "multiclass", "Multiclass classification"

    slug = models.SlugField(max_length=100, unique=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    classification_type = models.CharField(
        max_length=16, choices=ClassificationType.choices, default=ClassificationType.BINARY
    )
    target_column = models.CharField(max_length=150)
    asset_path = models.CharField(
        max_length=300,
        help_text="Team-managed relative path to a bundled dataset; never accept this from users.",
    )
    source_url = models.URLField(blank=True)
    is_active = models.BooleanField(
        default=False,
        help_text="Only active curated datasets are visible to API clients.",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name", "id"]

    def __str__(self) -> str:
        return self.name
