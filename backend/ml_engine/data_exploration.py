# Analyzes the selected dataset and summarizes its characteristics.
# Provides statistics and chart data for the Data Explorer page.
from ml_engine.data_loader import LoadedDataset


def explore_dataset(dataset: LoadedDataset) -> dict:
    """Return real statistics about the dataset as a plain dictionary."""
    X = dataset.features   # the input columns
    y = dataset.target     # the label column (0 or 1)

    # 1) Which columns are numbers and which are text categories
    numeric_features = list(X.select_dtypes(include="number").columns)
    categorical_features = list(X.select_dtypes(exclude="number").columns)

    # 2) Missing values: how many empty cells in each column, and what percent
    missing_counts = X.isna().sum()
    missing_values = {}
    for column in X.columns:
        count = int(missing_counts[column])
        missing_values[column] = {
            "count": count,
            "percent": round(count / len(X) * 100, 2),
        }

    # 3) Class distribution: how many 0s (stayed) and 1s (left)
    class_counts = y.value_counts().sort_index()
    class_distribution = {}
    for label, count in class_counts.items():
        class_distribution[str(label)] = {
            "count": int(count),
            "percent": round(count / len(y) * 100, 2),
        }

    return {
        "n_rows": len(X),
        "n_features": X.shape[1],
        "numeric_features": numeric_features,
        "categorical_features": categorical_features,
        "missing_values": missing_values,
        "class_distribution": class_distribution,
        "positive_class": dataset.metadata["positive_class"],
    }
