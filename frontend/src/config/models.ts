import type { ModelCode } from "../types";

export type Algorithm = {
  code: ModelCode;
  label: string;
  short: string;
  description: string;
  note: string;
  color: "cyan" | "purple" | "amber" | "green" | "blue";
};

export const algorithms: Algorithm[] = [
  {
    code: "naive_bayes",
    label: "Naive Bayes",
    short: "NB",
    description: "Probabilistic classification based on Bayes' theorem.",
    note: "Fast probabilistic baseline",
    color: "cyan",
  },
  {
    code: "decision_tree",
    label: "Decision Tree",
    short: "DT",
    description: "Interpretable decisions organized as a branching tree.",
    note: "Human-readable rules",
    color: "purple",
  },
  {
    code: "random_forest",
    label: "Random Forest",
    short: "RF",
    description: "An ensemble of trees working together to classify.",
    note: "Ensemble learner",
    color: "green",
  },
  {
    code: "xgboost",
    label: "XGBoost",
    short: "XGB",
    description: "Gradient-boosted decision trees for tabular data.",
    note: "Boosted trees",
    color: "amber",
  },
  {
    code: "svm",
    label: "Support Vector Machine",
    short: "SVM",
    description: "Separates classes using a decision boundary.",
    note: "Margin-based classifier",
    color: "blue",
  },
];
