from django.urls import path

from .views import dataset_detail, dataset_list

urlpatterns = [
    path("", dataset_list, name="dataset-list"),
    path("<slug:slug>/", dataset_detail, name="dataset-detail"),
]
