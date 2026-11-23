# Saved model metadata schema.
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("experiments", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="SavedModel",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("artifact_path", models.CharField(help_text="Server-managed relative path to a trusted serialized pipeline.", max_length=300)),
                ("feature_schema", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("experiment", models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name="saved_model", to="experiments.experiment")),
            ],
            options={"ordering": ["-created_at", "-id"]},
        ),
    ]
