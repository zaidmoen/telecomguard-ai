# Loads a dataset selected from the project's predefined dataset library.
# Extracts the feature columns and target column for the ML workflow.
"""TG-02: load a predefined dataset, check it, and split it into X and y."""
from dataclasses import dataclass
from pathlib import Path

import pandas as pd

# Datasets live in backend/data/ (managed by the team, never uploaded by users).
DATA_DIR = Path(__file__).resolve().parents[1] / "data"

# Columns that only identify a customer. They do not help prediction, so we drop them.
ID_COLUMNS = ["customerID"]


@dataclass
class LoadedDataset:
    features: pd.DataFrame  # X: the input columns
    target: pd.Series       # y: the label we want to predict (0 or 1)
    metadata: dict          # simple info about the dataset


def load_dataset(asset_path: str, target_column: str) -> LoadedDataset:
    # 1) Find the file, and make sure it is really inside backend/data/ (safety check)
    path = (DATA_DIR / asset_path).resolve()
    if DATA_DIR.resolve() not in path.parents:
        raise ValueError("Dataset path must be inside the data folder.")
    if not path.is_file():
        raise FileNotFoundError(f"Dataset file not found: {asset_path}")

    # 2) Read the CSV
    df = pd.read_csv(path)

    # 3) Validate the schema
    if df.empty:
        raise ValueError("Dataset is empty.")
    if df.columns.duplicated().any():
        raise ValueError("Dataset has duplicate column names.")
    if target_column not in df.columns:
        raise ValueError(f"Target column '{target_column}' is missing.")
    if df[target_column].isna().any():
        raise ValueError("Target column has missing values.")
    if df[target_column].nunique() != 2:
        raise ValueError("Target column must have exactly 2 classes.")

    # 4) Separate the features (X) from the target (y)
    features = df.drop(columns=[target_column] + [c for c in ID_COLUMNS if c in df.columns])
    # Some values like TotalCharges are text with blanks, so turn them into numbers.
    for col in features.columns:
        if features[col].dtype == object:
            converted = pd.to_numeric(features[col], errors="coerce")
            # Only convert if the column is really numbers (blank cells become NaN)
            if converted.notna().sum() == features[col].str.strip().ne("").sum():
                features[col] = converted

    # Turn the labels into 0 / 1. For Churn: "No" -> 0, "Yes" -> 1.
    classes = sorted(df[target_column].astype(str).unique())
    positive = "Yes" if "Yes" in classes else classes[-1]
    target = (df[target_column].astype(str) == positive).astype(int)

    # 5) Basic info for the other ML steps
    metadata = {
        "target_column": target_column,
        "positive_class": positive,
        "n_rows": len(df),
        "n_features": features.shape[1],
        "feature_names": list(features.columns),
        "numeric_features": list(features.select_dtypes(include="number").columns),
        "categorical_features": list(features.select_dtypes(exclude="number").columns),
    }
    return LoadedDataset(features=features, target=target, metadata=metadata)
