from django.urls import path

from .views import model_types

urlpatterns = [
    path("model-types/", model_types, name="model-types"),
]
