"""Planned module: final evaluation of a tuned classifier.

STATUS: Documentation only. No metrics or charts are computed.

Purpose:
    Measure a selected tuned model's performance once on the held-out test
    partition and provide reproducible numeric/chart data to the Django API.

Planned input:
    A fitted pipeline and untouched X_test/y_test.

Planned output:
    Accuracy, precision, recall, F1, confusion matrix and ROC/AUC results.
"""

# TODO 1: Run predict() on the untouched 30% test set only AFTER tuning
#         and selection are complete.
#
# TODO 2: Compute accuracy_score, precision_score, recall_score and f1_score.
#         Set and document positive label / averaging (binary vs multiclass).
#
# TODO 3: Compute confusion_matrix with an explicit, stable class order
#         and clear TP/FP/TN/FN labels when the task is binary.
#
# TODO 4: Extract prediction scores from predict_proba() or decision_function()
#         when supported; compute ROC curve and AUC using correctly aligned
#         class labels. Handle binary and multiclass cases deliberately.
#
# TODO 5: Explain undefined metrics or unavailable ROC scores instead of
#         silently inventing numeric values; use zero_division policy.
#
# TODO 6: Return chart-ready arrays as JSON-compatible data, not Matplotlib
#         objects, so React can render real confusion matrices and ROC curves.
#
# TODO 7: Compare CV and test results side-by-side in reporting, but never
#         choose the winning model by repeatedly optimizing on test results.
#
# TODO 8: Make this a read/evaluate step: no fitting, tuning or saving occurs.
#
# TODO 9: Test correct metric calculation, class ordering, missing positive
#         predictions, ROC-unavailable cases and imbalanced labels.
