"""Root routes. All application APIs are grouped under /api/v1/."""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("apps.core.urls")),
    path("api/v1/datasets/", include("apps.datasets.urls")),
    path("api/v1/", include("apps.experiments.urls")),
]
