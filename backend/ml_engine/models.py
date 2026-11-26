"""Planned module: classifier factories and hyperparameter search spaces.

STATUS: Documentation only. No estimators are constructed or trained.

Purpose:
    Define one consistent configuration entry for each of the five classifiers
    explicitly required by the machine learning assignment.

Planned input:
    A model identifier such as 'random_forest' and reproducibility settings.

Planned output:
    A new UNFITTED estimator and a compatible hyperparameter search space.
"""

# TODO 1: Support exactly the agreed model identifiers:
#           naive_bayes, decision_tree, random_forest, xgboost, svm.
#         Keep them aligned with apps.experiments.models.ModelKind.
#
# TODO 2: Instantiate Naive Bayes with a variant appropriate for the
#         transformed feature matrix (e.g., GaussianNB for dense data).
#         Document any sparse/dense compatibility requirements.
#
# TODO 3: Instantiate DecisionTreeClassifier with reproducible settings.
#
# TODO 4: Instantiate RandomForestClassifier with a fixed random_state.
#
# TODO 5: Instantiate XGBClassifier using settings appropriate to the
#         target's label encoding and binary/multiclass classification.
#
# TODO 6: Instantiate SVC with a deliberate decision_function or calibrated/
#         probability strategy for later ROC/AUC analysis.
#
# TODO 7: Define small, justified tuning search spaces for each estimator,
#         such as max_depth, n_estimators, C, kernel or smoothing strength.
#
# TODO 8: Consider class imbalance options only when supported and justified.
#         Do not assume 'class_weight' is available for every classifier.
#
# TODO 9: Return independent estimator instances for independent runs.
#         No model training, metric calculation or HTTP logic belongs here.
#
# TODO 10: Add tests for model identifiers, estimator type, valid parameter
#          names, reproducibility and unsupported model selection.
