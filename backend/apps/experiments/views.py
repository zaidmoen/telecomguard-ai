"""Static classifier names. Returning metadata does not train a model."""
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ModelKind


@api_view(["GET"])
def model_types(request):
    return Response({
        "results": [
            {"code": item.value, "name": item.label}
            for item in ModelKind
        ]
    })
