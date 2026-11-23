"""Low-cost liveness check; does not claim a model or dataset is available."""
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def health(request):
    return Response(
        {
            "status": "ok",
            "service": "telecomguard-api",
            "api_version": "v1",
        }
    )
