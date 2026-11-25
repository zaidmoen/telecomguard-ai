# TelecomGuard AI

An interactive **classification model comparison platform**, initially focused on telecom customer churn.

**Current milestone: Django REST API foundation only.** React, datasets, preprocessing and model training are intentionally out of scope for this first phase.

## Project decisions

- Backend: Django + Django REST Framework.
- Frontend: React + TypeScript (later phase).
- Users **select from predefined datasets** registered by the team. **CSV upload is not supported or planned.**
- Each dataset has its own target, feature schema, training runs and compatible saved models.
- Future models: Naive Bayes, Decision Tree, Random Forest, XGBoost, SVM.
- Future evaluation: stratified 70/30 split, stratified 5-fold CV, hyperparameter tuning, independent test metrics, feature importance.
- No sample metrics, fabricated predictions or pre-trained model artifacts are included in this foundation.

## Local setup

Requires Python 3.11+.

```bash
git clone https://github.com/zaidmoen/telecomguard-ai.git
cd telecomguard-ai/backend

# Windows (PowerShell)
py -m venv .venv
.venv\Scripts\Activate.ps1

# macOS/Linux alternative
# python3 -m venv .venv
# source .venv/bin/activate

pip install -r requirements-dev.txt
cp .env.example .env  # On PowerShell: Copy-Item .env.example .env
python manage.py migrate
python manage.py runserver
```

By default, the development API is served at `http://127.0.0.1:8000`.

## API endpoints implemented today

| Method | Endpoint | Behavior |
| --- | --- | --- |
| GET | `/api/v1/health/` | API liveness |
| GET | `/api/v1/datasets/` | Public catalog of active, predefined datasets (initially empty) |
| GET | `/api/v1/datasets/<slug>/` | Detail for an active catalog entry or 404 |
| GET | `/api/v1/model-types/` | Supported classifier choices, metadata only |

No upload endpoint, training endpoint, saved-model loading or prediction endpoint is active yet. See [API contracts](docs/api-contracts.md) for the planned boundaries.

## Checks

```bash
cd backend
python manage.py check
python manage.py makemigrations --check --dry-run
python manage.py test
```

## Dataset registration (future phase)

Datasets are **team-managed**, not user-uploaded. The `Dataset` database model stores metadata for curated assets; it does not load or analyze a file. When we later bundle datasets, add a controlled catalog registration command/fixture and an explicit safe file path resolver. Until then, `GET /datasets/` correctly returns an empty list.

## Repository structure

```text
backend/
  config/settings/             environment-specific Django settings
  apps/core/                  API liveness and shared utilities
  apps/datasets/              curated dataset catalog
  apps/experiments/           training run metadata (no engine yet)
  apps/model_registry/        saved model metadata (no artifacts yet)
  apps/predictions/           reserved domain package
  ml_engine/                  reserved for later ML implementation
  tests/                      future cross-app integration tests
docs/
frontend/                     future React app
```

See [architecture](docs/architecture.md), [contracts](docs/api-contracts.md), and [ML assignment checklist](docs/assignment-coverage.md).

## Team notes

Do not commit `.env`, databases, customer data, trained artifacts or authentication secrets. The frontend will call the versioned API rather than importing backend code.
