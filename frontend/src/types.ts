export type Dataset = {
  slug: string;
  name: string;
  description: string;
  classification_type: "binary" | "multiclass";
  target_column: string;
  source_url: string;
};

export type ModelCode =
  | "naive_bayes"
  | "decision_tree"
  | "random_forest"
  | "xgboost"
  | "svm";

export type ModelType = {
  code: string;
  name: string;
};

export type Health = {
  status: "ok";
  service: string;
  api_version: string;
};

export type LoadState = "loading" | "ready" | "error";
