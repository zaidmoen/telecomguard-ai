# API v1 contracts

Base path: `/api/v1/`

## Implemented (Phase 1)

### `GET /api/v1/health/`

200:
```json
{"status":"ok","service":"telecomguard-api","api_version":"v1"}
```

This is a liveness endpoint, not a readiness claim about datasets, training or storage.

### `GET /api/v1/datasets/`

200 (before adding any curated assets):
```json
{"results":[]}
```

Future active dataset records appear under `results` with `slug`, `name`, `description`, `classification_type`, `target_column`, and `source_url`.

### `GET /api/v1/datasets/<slug>/`

200 with the same public dataset fields, or 404 for unknown/inactive datasets. Internal paths never appear in the API.

### `GET /api/v1/model-types/`

200 with `results` containing `code` and `name` for:
`naive_bayes`, `decision_tree`, `random_forest`, `xgboost`, `svm`.
This is reference metadata only. It **does not** imply that classifiers have been installed or trained.

Unsupported methods return 405. There is **no upload handler**. Since `upload` is syntactically a dataset slug, `POST /api/v1/datasets/upload/` resolves to the read-only detail view and returns 405; `GET /api/v1/datasets/upload/` returns 404 when no dataset with that slug exists. No file-upload APIs will be created.

## Planned (NOT IMPLEMENTED)

These describe domain boundaries for the team; they are not callable yet.

| Method | Path | Planned behavior |
| --- | --- | --- |
| POST | `/api/v1/experiments/` | Create a run referencing a curated dataset slug and classifier code |
| POST | `/api/v1/experiments/<id>/train/` | Trigger real training, tuning and evaluation |
| GET | `/api/v1/experiments/<id>/` | Run status and measured metrics |
| GET | `/api/v1/models/` | Saved trained models, linked to their dataset and feature schema |
| POST | `/api/v1/predictions/` | Predict using a compatible saved model and validated feature values |

Future implementation must enforce dataset/model compatibility, prevent unsafe serialized model loading, avoid fake scores, bound resource use and use training-only preprocessing.

## Dataset catalog policy

Dataset records are maintained by the project team, not created via HTTP. The first planned example is a telecom customer churn dataset; other **predefined** classification datasets may be added by the team. This satisfies the assignment's `upload OR select a dataset` requirement through selection, without introducing upload.
