# TelecomGuard AI

An interactive **classification model comparison platform**, initially focused on telecom customer churn.

**Current milestone: Django REST API foundation and initial ML data preparation (TG-01–TG-04).** The curated dataset catalog, dataset loader, exploratory statistics and preprocessing builder are implemented. Model training, evaluation, prediction and the React frontend are still pending.

## Project decisions

- Backend: Django + Django REST Framework.
- Frontend: React + TypeScript (planned).
- Users select from predefined, team-managed datasets. **CSV upload is not supported or planned.**
- Each dataset will have its own target, feature schema, training runs and compatible saved models.
- Required classifiers: Naive Bayes, Decision Tree, Random Forest, XGBoost and SVM.
- Evaluation plan: stratified 70/30 split, stratified 5-fold cross-validation, hyperparameter tuning, independent test metrics and feature importance where applicable.
- No fabricated metrics, predictions or pre-trained model artifacts.

## Implementation status

| Task | Status |
| --- | --- |
| Django REST API foundation | Implemented |
| TG-01 — Curated dataset registration | Implemented |
| TG-02 — Dataset loading and validation | Initial implementation |
| TG-03 — Data exploration | Initial implementation |
| TG-04 — Preprocessing | Initial implementation |
| Stratified train/test split | Pending |
| Five classifiers and training pipelines | Pending |
| Cross-validation and hyperparameter tuning | Pending |
| Evaluation and feature importance | Pending |
| Model persistence and prediction | Pending |
| React frontend and online deployment | Pending |

The ML data-preparation functions are Python engine functions, not yet exposed through dedicated API endpoints.

## Local setup

Requires Python 3.11+.

```powershell
git clone https://github.com/zaidmoen/telecomguard-ai.git
cd telecomguard-ai/backend
py -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements-dev.txt
Copy-Item .env.example .env
python manage.py migrate
python manage.py seed_datasets
python manage.py runserver
```

For macOS/Linux, use `python3 -m venv .venv`, `source .venv/bin/activate` and `cp .env.example .env` in place of the corresponding Windows commands.

By default, the development API is served at `http://127.0.0.1:8000`.

## Dataset catalog

| Dataset | Slug | Target | Classification |
| --- | --- | --- | --- |
| [Telco Customer Churn](https://www.kaggle.com/datasets/blastchar/telco-customer-churn) | `telco-churn` | `Churn` | Binary |

The bundled CSV is located at `backend/data/curated/telco_churn.csv`. The idempotent `seed_datasets` command registers or updates the catalog entry. Run it after database migrations; without seeding, the catalog can be empty. Only active datasets are returned by the API.

## ML data preparation

1. `load_dataset` validates the bundled asset path and basic dataset schema, removes the customer identifier, separates features from the target and encodes churn as No = 0 / Yes = 1.
2. `explore_dataset` calculates row and feature counts, numerical and categorical feature lists, missing-value statistics and class distribution.
3. `build_preprocessor` creates an **unfitted** scikit-learn ColumnTransformer:
   - Numerical features: median imputation and StandardScaler.
   - Categorical features: most-frequent imputation and OneHotEncoder with unknown-category handling.

See the [ML engine README](backend/ml_engine/README.md) for usage and remaining work.

When training is implemented, fit preprocessing only on training data and within each cross-validation fold by combining it with the estimator in a single pipeline. Keep the test set independent of tuning.

## API endpoints implemented today

| Method | Endpoint | Behavior |
| --- | --- | --- |
| GET | `/api/v1/health/` | API liveness |
| GET | `/api/v1/datasets/` | Catalog of active predefined datasets |
| GET | `/api/v1/datasets/<slug>/` | Active dataset metadata or 404 |
| GET | `/api/v1/model-types/` | Supported classifier choices, metadata only |

No upload, exploration, training, saved-model loading or prediction endpoint is active yet. See [API contracts](docs/api-contracts.md) for the planned boundaries.

## Checks

From the `backend/` directory:

```bash
python manage.py check
python manage.py makemigrations --check --dry-run
python manage.py test
```

The seed command has an automated repeatability/API test. Dedicated tests for loader validation, exploration statistics and preprocessing behavior are still needed. Also verify numeric type conversion, duplicate-header validation and estimator compatibility (including dense input for GaussianNB).

## Repository structure

```text
backend/
  config/settings/             environment-specific Django settings
  apps/core/                   API liveness and shared utilities
  apps/datasets/               curated catalog and seed command
  apps/experiments/            training run metadata
  apps/model_registry/         saved model metadata (no artifacts yet)
  apps/predictions/            reserved domain package
  data/curated/                bundled datasets
  ml_engine/                   loader, exploration, preprocessing and pending ML modules
  tests/                       cross-app integration test location
docs/
frontend/                      planned React app
```

See [architecture](docs/architecture.md), [contracts](docs/api-contracts.md), and [ML assignment checklist](docs/assignment-coverage.md) for the design and planned scope.

## Team notes

Do not commit `.env`, local databases, private customer data, trained artifacts or authentication secrets. Only approved public datasets may be bundled. The frontend will call the versioned API rather than importing backend code.
