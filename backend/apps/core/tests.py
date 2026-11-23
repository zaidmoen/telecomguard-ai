from django.test import SimpleTestCase
from django.urls import reverse
from rest_framework.test import APIClient


class HealthAPITests(SimpleTestCase):
    def setUp(self):
        self.client = APIClient()

    def test_health_response(self):
        response = self.client.get(reverse("api-health"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            "status": "ok",
            "service": "telecomguard-api",
            "api_version": "v1",
        })

    def test_health_is_read_only(self):
        self.assertEqual(self.client.post(reverse("api-health"), {}).status_code, 405)
