# ML Engine

The ML engine contains the initial data preparation implementation (TG-01–TG-04) and placeholders for subsequent training and evaluation tasks. Datasets are selected from a predefined library; users cannot upload CSV files.

## Implemented modules

| Module | Purpose |
| --- | --- |
| `data_loader.py` | Loads and validates a curated CSV, removes customer identifiers, separates X and y, and returns feature metadata. |
| `data_exploration.py` | Summarizes row/feature counts, feature types, missing values and class distribution. |
| `preprocessing.py` | Builds an unfitted ColumnTransformer with imputation, numerical scaling and categorical one-hot encoding. |

## Usage example

From the `backend/` directory, after installing dependencies:

```python
from ml_engine.data_loader import load_dataset
from ml_engine.data_exploration import explore_dataset
from ml_engine.preprocessing import build_preprocessor

dataset = load_dataset("curated/telco_churn.csv", "Churn")
summary = explore_dataset(dataset)

preprocessor = build_preprocessor(
    dataset.metadata["numeric_features"],
    dataset.metadata["categorical_features"],
)
# Unfitted by design. Fit only within the training pipeline.
```

The Telco dataset uses No = 0 and Yes = 1 for the target. The loader currently supports binary classification.

## Pending modules and integration

- `splitting.py`: stratified 70/30 train/test split.
- `models.py` and `training.py`: five required classifiers and estimator pipelines.
- `cross_validation.py` and `tuning.py`: stratified 5-fold validation and hyperparameter search on training data.
- `evaluation.py` and `feature_importance.py`: held-out test metrics and suitable feature explanations.
- `persistence.py` and `inference.py`: compatible saved pipelines and predictions.
- Dedicated ML API endpoints and frontend integration.

## Review follow-ups

- Add unit tests for valid and invalid dataset paths, schema and target validation, exploration statistics and preprocessing.
- Improve numeric column inference with missing values and duplicate CSV header checks.
- Verify preprocessing output compatibility for all classifiers, including dense input if using GaussianNB.
- Combine the preprocessor and estimator in one pipeline to prevent leakage inside cross-validation. Fit on training folds only and reserve the test set for final evaluation.

No model training or prediction is implemented yet.
