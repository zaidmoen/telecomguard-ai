"""Deployment settings: fail closed if secrets/hosts are missing."""
import os

from .base import *  # noqa: F403,F401

DEBUG = False
if not SECRET_KEY or SECRET_KEY == "replace-me-with-a-random-secret-in-production":
    raise RuntimeError("DJANGO_SECRET_KEY must be configured in production")
if not ALLOWED_HOSTS:
    raise RuntimeError("DJANGO_ALLOWED_HOSTS must be configured in production")

SECURE_SSL_REDIRECT = os.getenv("DJANGO_SECURE_SSL_REDIRECT", "true").lower() == "true"
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 3600
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False
