"""Planned module: stratified cross-validation summaries.

STATUS: Documentation only. No validation folds are executed.

Purpose:
    Estimate each classifier's training-set generalization performance
    without touching the final held-out test partition.

Planned input:
    Training-only X/y and an UNFITTED preprocessing + estimator Pipeline.

Planned output:
    Fold scores, mean and standard deviation for accuracy and F1-score.
"""

# TODO 1: Create StratifiedKFold(n_splits=5, shuffle=True, random_state=42).
#         Apply it only to the 70% training partition.
#
# TODO 2: Evaluate the COMPLETE Pipeline inside each fold, ensuring each
#         fold fits its own imputation, encoding and scaling parameters.
#
# TODO 3: Report accuracy and F1 for every fold, plus mean/std across folds.
#         For binary labels, define the positive class explicitly.
#         For multiclass labels, choose/document macro or weighted averaging.
#
# TODO 4: Detect too-small minority classes before constructing 5 folds,
#         and return a clear user-facing validation error if unsuitable.
#
# TODO 5: Keep the scoring configuration consistent across all five models.
#         Avoid training/test contamination and repeated access to test data.
#
# TODO 6: Return JSON-friendly, labeled results for Django Experiment.cv_results
#         and later frontend comparison charts.
#
# TODO 7: Document whether scores are from baseline CV or tuned-model CV,
#         so the report never misrepresents where numbers originated.
#
# TODO 8: Test 5-fold counts, mean/std calculation, class imbalance,
#         per-fold preprocessing and deterministic repeatability.
