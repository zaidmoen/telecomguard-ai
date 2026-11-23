"""Saved model metadata (not executable pickle content)."""
from django.db import models


class SavedModel(models.Model):
    experiment = models.OneToOneField(
        "experiments.Experiment",
        on_delete=models.PROTECT,
        related_name="saved_model",
    )
    artifact_path = models.CharField(
        max_length=300,
        help_text="Server-managed relative path to a trusted serialized pipeline.",
    )
    feature_schema = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at", "-id"]

    def __str__(self) -> str:
        return f"Saved model for experiment {self.experiment_id}"
