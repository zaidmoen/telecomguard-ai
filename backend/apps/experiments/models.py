"""Experiment metadata only. ML execution will be added in a later phase."""
from django.db import models


class ModelKind(models.TextChoices):
    NAIVE_BAYES = "naive_bayes", "Naive Bayes"
    DECISION_TREE = "decision_tree", "Decision Tree"
    RANDOM_FOREST = "random_forest", "Random Forest"
    XGBOOST = "xgboost", "XGBoost"
    SVM = "svm", "Support Vector Machine"


class Experiment(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        RUNNING = "running", "Running"
        COMPLETED = "completed", "Completed"
        FAILED = "failed", "Failed"

    dataset = models.ForeignKey(
        "datasets.Dataset", on_delete=models.PROTECT, related_name="experiments"
    )
    algorithm = models.CharField(max_length=32, choices=ModelKind.choices)
    status = models.CharField(
        max_length=16, choices=Status.choices, default=Status.PENDING
    )
    best_params = models.JSONField(default=dict, blank=True)
    cv_results = models.JSONField(default=dict, blank=True)
    test_results = models.JSONField(default=dict, blank=True)
    error_message = models.TextField(blank=True)
    started_at = models.DateTimeField(null=True, blank=True)
    finished_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at", "-id"]

    def __str__(self) -> str:
        return f"{self.dataset.slug}: {self.algorithm} ({self.status})"
