# Generated for the TelecomGuard AI curated dataset catalog.
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Dataset",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("slug", models.SlugField(max_length=100, unique=True)),
                ("name", models.CharField(max_length=200)),
                ("description", models.TextField(blank=True)),
                ("classification_type", models.CharField(choices=[("binary", "Binary classification"), ("multiclass", "Multiclass classification")], default="binary", max_length=16)),
                ("target_column", models.CharField(max_length=150)),
                ("asset_path", models.CharField(help_text="Team-managed relative path to a bundled dataset; never accept this from users.", max_length=300)),
                ("source_url", models.URLField(blank=True)),
                ("is_active", models.BooleanField(default=False, help_text="Only active curated datasets are visible to API clients.")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["name", "id"]},
        ),
    ]
