"""Read-only catalog. No upload, edit, or deletion API is exposed."""
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Dataset
from .serializers import DatasetPublicSerializer


@api_view(["GET"])
def dataset_list(request):
    catalog = Dataset.objects.filter(is_active=True)
    return Response({"results": DatasetPublicSerializer(catalog, many=True).data})


@api_view(["GET"])
def dataset_detail(request, slug: str):
    entry = get_object_or_404(Dataset, slug=slug, is_active=True)
    return Response(DatasetPublicSerializer(entry).data)
