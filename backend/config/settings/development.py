"""Local-only settings. Never use for a public deployment."""
from .base import *  # noqa: F403,F401

DEBUG = True
SECRET_KEY = SECRET_KEY or "insecure-local-development-key-only"
ALLOWED_HOSTS = sorted(set(ALLOWED_HOSTS + ["localhost", "127.0.0.1", "testserver"]))
if not CORS_ALLOWED_ORIGINS:
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]
