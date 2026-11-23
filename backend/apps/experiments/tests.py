from django.test import SimpleTestCase
from django.urls import reverse
from rest_framework.test import APIClient


class ModelTypeAPITests(SimpleTestCase):
    def test_five_required_classifiers_are_exposed(self):
        response = APIClient().get(reverse("model-types"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            {item["code"] for item in response.data["results"]},
            {"naive_bayes", "decision_tree", "random_forest", "xgboost", "svm"},
        )

    def test_model_types_endpoint_is_read_only(self):
        response = APIClient().post(reverse("model-types"), {})
        self.assertEqual(response.status_code, 405)
