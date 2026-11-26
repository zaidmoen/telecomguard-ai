"""Planned module: orchestrate a complete classification experiment.

STATUS: Documentation only. No model training is implemented.

Purpose:
    Coordinate the independent data, preprocessing, splitting, CV, tuning,
    evaluation, feature importance and persistence modules for Django.

Planned input:
    A curated dataset identifier and one of the five supported model codes.

Planned output:
    Training run metadata, best hyperparameters, measured CV/test metrics
    and a trusted saved-pipeline reference (only after real execution).
"""

# TODO 1: Validate the dataset slug, classifier code and execution settings.
#         Reject unknown/inactive datasets and incompatible configurations.
#
# TODO 2: Load X/y and the target/schema from data_loader. Do not accept a
#         user-uploaded CSV or arbitrary filesystem path.
#
# TODO 3: Split once into stratified 70% training / 30% test using
#         splitting.py and keep the test set untouched until final evaluation.
#
# TODO 4: Build a fresh, UNFITTED preprocessing Pipeline and estimator from
#         preprocessing.py and models.py for the selected dataset.
#
# TODO 5: Run stratified 5-fold cross-validation on training data; collect
#         mean/std accuracy and F1 for baseline or explicitly specified CV.
#
# TODO 6: Tune each classifier with GridSearchCV or RandomizedSearchCV
#         using training-only folds and record best hyperparameters.
#
# TODO 7: Evaluate the tuned model ONCE on the held-out test set.
#         Choose the best among the five models based on CV evidence.
#
# TODO 8: Compute feature importance for the selected best model using a
#         suitable method, and serialize the fitted full pipeline safely.
#
# TODO 9: Update apps.experiments.models.Experiment status from pending to
#         running/completed/failed, and save actual metric dictionaries.
#         Do not claim 'completed' until the model/artifact is actually ready.
#
# TODO 10: Keep long-running training outside the synchronous Django HTTP
#          request using a bounded worker/job mechanism (to be designed).
#
# TODO 11: Handle exceptions, timeouts, class-size validation, reproducibility
#          and partial failures without inventing scores or predictions.
#
# TODO 12: Add integration tests proving pipeline order, dataset association,
#          clean train/test isolation and saved-model compatibility.
