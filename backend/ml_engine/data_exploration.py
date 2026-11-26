"""Planned module: exploratory data analysis (EDA) for a curated dataset.

STATUS: Documentation only. No EDA calculations are implemented.

Purpose:
    Supply the Dataset Explorer page and report with facts about the selected
    dataset before any model is trained.

Planned input:
    A validated dataset and its configured target/feature metadata.

Planned output:
    JSON-serializable statistics and chart-ready data; never fake metrics.
"""

# TODO 1: Report dataset shape (number of rows and columns), target name,
#         feature names, feature types and a short dataset description.
#
# TODO 2: Count target classes and compute their proportions to reveal class
#         imbalance, particularly in telecom churn classification.
#
# TODO 3: Count missing values and duplicate rows, while distinguishing
#         genuinely missing data from valid numeric zero values.
#
# TODO 4: Summarize numeric columns (min, median, mean, standard deviation
#         and useful quantiles) and categorical value distributions.
#
# TODO 5: Prepare chart-ready data for class balance, missing-value patterns,
#         feature distributions and selected feature/target comparisons.
#
# TODO 6: Limit expensive or huge chart payloads; handle empty or unusually
#         high-cardinality columns gracefully.
#
# TODO 7: Treat EDA as descriptive; do not fit encoders, imputers, scalers
#         or estimators on the full dataset before splitting for training.
#
# TODO 8: Add tests for categorical-only, numeric-only, imbalanced and
#         partially missing datasets, including empty dataset errors.
