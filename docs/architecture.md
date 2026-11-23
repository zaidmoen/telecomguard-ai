# TelecomGuard AI — architecture (Phase 1)

## Scope

**Now:** Django API foundation, curated dataset catalog metadata, experiment/model metadata, environment configuration, health and classifier choice endpoints, tests.

**Later:** React, curated dataset assets, preprocessing, cross-validation, tuning, evaluation, persistence, model inference, deployment.

No user file upload. The backend is deliberately not a general-purpose arbitrary CSV execution service.

## Components

```text
React (later)
    |
    | JSON /api/v1/
    v
Django REST Framework
    |--- core: liveness endpoint
    |--- datasets: READ-ONLY curated dataset catalog
    |--- experiments: classifier choices + future run lifecycle
    |--- model_registry: future saved pipeline metadata
    |--- predictions: future inference adapter
    |
    +--- SQLite (development metadata only)
    +--- ml_engine (future; separate from HTTP request/response layer)
```

### Dataset selection

Each future catalog entry has a stable slug, label, task type, target column and a **server-managed relative path**. The path is intentionally excluded from public JSON. Catalog records are unpublished by default. The team controls which datasets are enabled.

The database is **not** a storage mechanism for dataset content or serialized models. Future asset loading must be restricted to an allowlisted project directory, and must verify that a curated entry points to an existing trusted dataset. Never pass user-supplied file paths to filesystem loaders.

### Training jobs (future)

A run belongs to exactly one dataset and one classifier. Training and tuning must use training data only, not the final test partition. Preprocessing should be inside a sklearn Pipeline/ColumnTransformer. Cross-validation is stratified 5-fold; final test split is stratified 70/30. Model artifacts must be associated with their dataset/feature schema, and only trusted application-created artifacts may be deserialized. Never unpickle user content.

Do not run long model-training jobs synchronously in a public Django request. A later phase can use a bounded worker/queue and explicit statuses; the metadata model already reserves pending/running/completed/failed.

### API boundaries

Only GET routes are exposed today. All future state-changing APIs will require server-side validation and some form of access protection/usage limit before public deployment. Authentication is not needed for the current read-only demo API.

SQLite is suitable for the current local development phase, not a durable multi-instance training service. Production persistence and artifact storage will need separate decisions.

### Settings

`config.settings.development`: local testing defaults; no production use.

`config.settings.production`: fail-closed startup if SECRET_KEY or ALLOWED_HOSTS is missing, HTTPS-only cookies and optional forced HTTPS redirect. Set CORS origins explicitly for the React host; do not use wildcard CORS origins.
