# ML Engine — implementation map

> **Planning only.** Every `.py` file in this directory currently contains English
> docstrings and `# TODO` comments, **not implemented ML logic**. Teammates can
> expand and refine the comments before writing code. There is no dataset loading,
> cleaning, fitting, evaluation, serialization or inference yet.

## Project workflow

TelecomGuard AI lets the user **select from team-curated datasets** registered in
Django. **There is no CSV upload feature**. The selected dataset defines its own
target, feature schema, model experiments and compatible saved models.

```text
Choose a curated dataset (React -> Django)
                  |
           data_loader.py
                  |
       data_exploration.py       [EDA statistics for Dataset Explorer]
                  |
           splitting.py         [70% training / 30% held-out test]
                  |
      preprocessing.py          [unfitted transformer]
           + models.py          [one of five classifiers]
                  |
       cross_validation.py      [5 stratified folds on training only]
                  |
           tuning.py            [grid/randomized search on training only]
                  |
        evaluation.py           [final held-out test evaluation]
                  |
    feature_importance.py       [explain the selected model]
                  |
        persistence.py          [save trusted fitted pipeline]
                  |
          inference.py          [load compatible pipeline, predict]
```

**`training.py` coordinates these modules** and records an experiment through
the Django application. Long-running work should eventually be queued, not
executed synchronously in a public HTTP request.

## Who writes what?

| File | Planned responsibility |
| --- | --- |
| `data_loader.py` | Resolve team-curated assets, validate target and columns, separate X/y and provide a feature schema |
| `data_exploration.py` | Data shape, class balance, missing values, duplicates, summaries and chart-ready EDA |
| `preprocessing.py` | Missing-value handling, categorical encoding, numeric scaling inside a leakage-safe Pipeline |
| `splitting.py` | Reproducible stratified 70/30 train/test split |
| `models.py` | Five classifiers (NB, DT, RF, XGBoost, SVM) and per-model hyperparameter grids |
| `cross_validation.py` | Five-fold stratified train-only validation with accuracy/F1 mean and standard deviation |
| `tuning.py` | GridSearchCV/RandomizedSearchCV with five folds on the training portion only |
| `evaluation.py` | Final accuracy, precision, recall, F1, confusion matrix and ROC/AUC on untouched test data |
| `feature_importance.py` | Model-native or permutation feature importance with meaningful feature names |
| `training.py` | Orchestrate an experiment and record real metrics/status, never fabricate results |
| `persistence.py` | Save/reload only trusted application-generated full fitted pipelines |
| `inference.py` | Validate input schema and predict with the right saved model, no retraining |
| `__init__.py` | State the package's boundary and implementation status |

## Important requirements from the assignment

1. **Five required models:** Naive Bayes, Decision Tree, Random Forest, XGBoost,
   Support Vector Machine (SVM). Each needs its own tuning and evaluation.
2. **70/30 split:** stratified by class with a fixed random seed (e.g., 42).
3. **5-fold stratified CV:** use the training 70%; report mean and standard
   deviation for both accuracy and F1.
4. **Hyperparameter tuning:** use GridSearchCV or RandomizedSearchCV with
   the same five-fold training-only protocol; report best parameters.
5. **Final test:** evaluate each tuned model once on the untouched test portion
   with accuracy, precision, recall, F1, confusion matrix and ROC/AUC.
6. **Compare fairly:** show training CV and final test results side by side.
   Choose the best candidate based on training CV rather than optimizing
   against test scores.
7. **Feature importance:** show and explain meaningful features for the
   selected model, even if that algorithm has no native importances.
8. **Save/reload:** persist the trained Pipeline, including its preprocessing,
   and predict without training a second time.

## Coding rules when implementation begins

- Keep model logic out of Django HTTP views and out of React components.
- Never call `fit` on full-dataset preprocessing before the train/test split.
- Fit the complete Pipeline separately inside every cross-validation fold.
- Never use post-outcome or target-derived fields as input features.
- Respect dataset-specific feature schemas; a banking model cannot predict
  on telecom input columns without its own training.
- Return machine-readable real results; do not hardcode scores for the UI.
- Never deserialize artifacts supplied by the user; only load trusted files.
- Document assumptions and failure cases in English; add focused tests with
  each implementation file.

## Easy way to extend the planning comments

Each module has a header explaining the planned **input**, **output**, and
responsibility, followed by numbered `# TODO` items. Add notes directly below
the relevant TODO, or propose extra TODOs in a new commit. Please keep these
comments as the agreed team contract until real implementations land.

The Django side currently defines `Dataset`, `Experiment` and `SavedModel`
metadata. The React side is a separate frontend. Actual ML computation will
be added in a future development phase.
