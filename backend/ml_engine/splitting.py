"""Planned module: reproducible train/test splitting.

STATUS: Documentation only. No data split is performed.

Purpose:
    Protect an untouched test partition while preserving label proportions.

Planned input:
    Feature table X, target y and a reproducible split configuration.

Planned output:
    X_train, X_test, y_train, y_test plus split metadata.
"""

# TODO 1: Use train_test_split(test_size=0.30, stratify=y, random_state=42).
#         Keep 70% for training and 30% for the final held-out test.
#
# TODO 2: Check that every class has enough examples for stratification and
#         for the later 5-fold cross-validation on training data.
#
# TODO 3: Preserve stable row alignment between X and y after splitting.
#         Do not shuffle features and labels independently.
#
# TODO 4: Record split counts, class distributions and random seed for
#         reproducibility and the assignment PDF report.
#
# TODO 5: NEVER let the test subset influence preprocessing fit,
#         hyperparameter search or selection of the best model.
#
# TODO 6: Make the split reusable across the five classifiers for the same
#         dataset and experiment configuration so comparisons are fair.
#
# TODO 7: Add tests for repeatability, balanced class proportions, missing
#         classes, small datasets and row alignment.
