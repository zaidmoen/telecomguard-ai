import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api } from "../lib/api";
import type { Dataset, LoadState, ModelCode, ModelType } from "../types";

type WorkspaceValue = {
  datasets: Dataset[];
  datasetState: LoadState;
  apiState: LoadState;
  modelTypes: ModelType[];
  selectedDatasetSlug: string | null;
  selectedDataset: Dataset | null;
  selectDataset: (slug: string | null) => void;
  selectedModel: ModelCode;
  selectModel: (model: ModelCode) => void;
  refresh: () => void;
};

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [datasetState, setDatasetState] = useState<LoadState>("loading");
  const [apiState, setApiState] = useState<LoadState>("loading");
  const [modelTypes, setModelTypes] = useState<ModelType[]>([]);
  const [selectedDatasetSlug, selectDataset] = useState<string | null>(null);
  const [selectedModel, selectModel] = useState<ModelCode>("random_forest");
  const [revision, setRevision] = useState(0);

  const refresh = useCallback(() => {
    setRevision((value) => value + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setApiState("loading");
    setDatasetState("loading");

    void api.health(controller.signal)
      .then(() => setApiState("ready"))
      .catch(() => {
        if (!controller.signal.aborted) setApiState("error");
      });

    void api.datasets(controller.signal)
      .then(({ results }) => {
        if (controller.signal.aborted) return;
        setDatasets(results);
        selectDataset((current) =>
          current && results.some((item) => item.slug === current) ? current : null
        );
        setDatasetState("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setDatasets([]);
          setDatasetState("error");
        }
      });

    void api.modelTypes(controller.signal)
      .then(({ results }) => {
        if (!controller.signal.aborted) setModelTypes(results);
      })
      .catch(() => {
        if (!controller.signal.aborted) setModelTypes([]);
      });

    return () => controller.abort();
  }, [revision]);

  const selectedDataset = useMemo(
    () => datasets.find((item) => item.slug === selectedDatasetSlug) ?? null,
    [datasets, selectedDatasetSlug]
  );

  const value = useMemo(
    () => ({
      datasets,
      datasetState,
      apiState,
      modelTypes,
      selectedDatasetSlug,
      selectedDataset,
      selectDataset,
      selectedModel,
      selectModel,
      refresh,
    }),
    [
      datasets, datasetState, apiState, modelTypes, selectedDatasetSlug,
      selectedDataset, selectedModel, refresh,
    ]
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return context;
}
