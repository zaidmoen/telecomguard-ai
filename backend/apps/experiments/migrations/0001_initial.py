# Experiment metadata schema; no training code in this migration.
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("datasets", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Experiment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("algorithm", models.CharField(choices=[("naive_bayes", "Naive Bayes"), ("decision_tree", "Decision Tree"), ("random_forest", "Random Forest"), ("xgboost", "XGBoost"), ("svm", "Support Vector Machine")], max_length=32)),
                ("status", models.CharField(choices=[("pending", "Pending"), ("running", "Running"), ("completed", "Completed"), ("failed", "Failed")], default="pending", max_length=16)),
                ("best_params", models.JSONField(blank=True, default=dict)),
                ("cv_results", models.JSONField(blank=True, default=dict)),
                ("test_results", models.JSONField(blank=True, default=dict)),
                ("error_message", models.TextField(blank=True)),
                ("started_at", models.DateTimeField(blank=True, null=True)),
                ("finished_at", models.DateTimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("dataset", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="experiments", to="datasets.dataset")),
            ],
            options={"ordering": ["-created_at", "-id"]},
        ),
    ]
