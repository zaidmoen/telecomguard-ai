# ML assignment coverage tracker

This document is a requirements checklist, **not a claim that ML is implemented**.

| Requirement from instructor | Planned implementation | Phase 1 |
| --- | --- | --- |
| Select or upload dataset | Select team-curated catalog entry only | Catalog GET implemented, no entries yet |
| Explore size, features, class balance, charts | Dataset Explorer | Not started |
| Missing values, categorical encoding, numeric normalization | Training-only sklearn preprocessing pipeline | Not started |
| Five classifiers: NB, DT, RF, XGBoost, SVM | Per-dataset training adapter | Choice metadata only |
| Stratified 70/30 train/test, fixed random seed | Split helper | Not started |
| Stratified 5-fold CV on train | Mean and std of accuracy and F1 | Not started |
| GridSearchCV / RandomizedSearchCV for every model | Tuned pipeline, training folds only | Not started |
| Final test once on untouched 30% | Accuracy, precision, recall, F1, confusion matrix, ROC/AUC | Not started |
| Compare CV and test side by side and justify winner | Comparison dashboard | Not started |
| Feature importance for best model | Appropriate model-specific/permutation method | Not started |
| Save and reload trained pipelines | Trusted server-owned joblib artifacts | Metadata model only |
| Enter features and predict | Dataset-aware prediction form | Not started |
| Deploy app and provide link | Hosting plan to be decided | Not started |
| GitHub code, README, requirements.txt | Monorepo and setup guide | Initial foundation |
| PDF report, PPTX, screenshots, short video, online discussion | Team deliverables | Not started |

Instructor's stated goal: all three team members must understand the actual code and ML methodology, not simply present AI-generated implementation.

### Important evaluation note

Do not select the best model using the final test set. Hyperparameter selection and candidate-model choice should rely on cross-validation within training data; disclose held-out test scores afterwards. Telecom churn may have an imbalanced target, so compare precision/recall/F1 alongside accuracy.
