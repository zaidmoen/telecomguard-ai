from rest_framework import serializers

from .models import Dataset


class DatasetPublicSerializer(serializers.ModelSerializer):
    """Never expose internal asset paths or database management fields."""

    class Meta:
        model = Dataset
        fields = (
            "slug",
            "name",
            "description",
            "classification_type",
            "target_column",
            "source_url",
        )
        read_only_fields = fields
