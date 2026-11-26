import {
  Activity, ArrowRight, Binary, CheckCircle2, CircleAlert,
  Clock3, Database, GitBranch, Info, Layers, LockKeyhole,
  SlidersHorizontal, Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { algorithms } from "../config/models";
import { InfoNote, PageHeading, ProgressStep, SectionHeading } from "../components/UI";
import { useWorkspace } from "../state/WorkspaceContext";

export default function Training() {
  const {
    selectedDataset, selectedModel, selectModel, modelTypes,
    apiState, datasetState,
  } = useWorkspace();
  const availableAlgorithms = new Set(modelTypes.map((item) => item.code));
  const currentModel = algorithms.find((item) => item.code === selectedModel) ?? algorithms[2];
  const isReadyForTraining = !!selectedDataset && apiState === "ready" &&
    availableAlgorithms.has(selectedModel);

  return (
    <div className="page-enter">
      <PageHeading eyebrow="EXPERIMENT WORKSPACE" title="Training Studio"
        description="Configure a dataset and one of the five required classifiers. The training engine will be connected in the next development phase."
        action={<div className="phase-flag"><span/> Configuration only</div>}/>

      <div className="studio-layout">
        <div className="studio-primary">
          <section className="surface-card studio-section">
            <div className="step-heading"><span className="step-index">01</span><div><h2>Select your dataset</h2><p>All training runs are linked to a curated dataset.</p></div></div>
            {selectedDataset ? (
              <div className="selected-dataset-tile">
                <div className="selected-dataset-glyph"><Database size={23}/></div>
                <div><strong>{selectedDataset.name}</strong><small>Target: {selectedDataset.target_column} · {selectedDataset.classification_type}</small></div>
                <Link to="/datasets" className="text-action">Change <ArrowRight size={15}/></Link>
              </div>
            ) : (
              <div className="dataset-required">
                <div className="required-icon"><Database size={20}/></div>
                <div><strong>No dataset selected</strong><p>{datasetState === "error" ? "Connect to the backend to load the catalog." : "Choose a dataset from the library before training."}</p></div>
                <Link className="button button-secondary" to="/datasets">Browse <ArrowRight size={15}/></Link>
              </div>
            )}
          </section>

          <section className="surface-card studio-section">
            <div className="step-heading"><span className="step-index">02</span><div><h2>Choose an algorithm</h2><p>Pick one classifier to configure its future training run.</p></div></div>
            <div className="model-grid" role="radiogroup" aria-label="Choose a machine learning model">
              {algorithms.map((model) => {
                const active = selectedModel === model.code;
                return (
                  <button key={model.code} type="button" role="radio" aria-checked={active}
                    className={`model-option ${active ? "model-option-active" : ""}`}
                    onClick={() => selectModel(model.code)}>
                    <span className={`model-option-badge color-${model.color}`}>{model.short}</span>
                    <span className="model-option-info"><strong>{model.label}</strong><small>{model.note}</small></span>
                    <span className={`model-radio ${active ? "model-radio-checked" : ""}`}>{active && <CheckCircle2 size={15}/>}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="surface-card studio-section">
            <div className="step-heading"><span className="step-index">03</span><div><h2>Evaluation protocol</h2><p>Defined by the course assignment and applied to each classifier.</p></div></div>
            <div className="protocol-grid">
              <div className="protocol-tile"><GitBranch size={18}/><span>Train / test split</span><strong>70% / 30%</strong><small>Stratified, fixed seed</small></div>
              <div className="protocol-tile"><Layers size={18}/><span>Cross-validation</span><strong>5 folds</strong><small>Stratified on training only</small></div>
              <div className="protocol-tile"><SlidersHorizontal size={18}/><span>Hyperparameter tuning</span><strong>Grid / Random</strong><small>Search within train folds</small></div>
              <div className="protocol-tile"><Binary size={18}/><span>Final evaluation</span><strong>Held-out test</strong><small>Once per tuned model</small></div>
            </div>
          </section>

          <div className="training-action-panel">
            <div className="training-lock"><LockKeyhole size={19}/></div>
            <div className="training-action-copy">
              <strong>Training execution is not connected yet</strong>
              <p>{isReadyForTraining
                ? "Your selection is ready. Once the Django ML endpoint is implemented, this area will start a real training job."
                : "Choose an available dataset and model. The backend ML engine still needs to be implemented."}</p>
            </div>
            <button className="button button-primary button-unavailable" disabled title="The ML training API is not implemented yet">Start training <ArrowRight size={17}/></button>
          </div>
        </div>

        <aside className="studio-aside">
          <section className="surface-card side-summary">
            <div className="side-summary-heading"><Activity size={18}/><strong>Experiment setup</strong></div>
            <div className="summary-field"><span>Dataset</span><strong>{selectedDataset?.name || "Not selected"}</strong></div>
            <div className="summary-field"><span>Algorithm</span><strong>{currentModel?.label}</strong></div>
            <div className="summary-field"><span>Execution</span><strong className="muted-value">Not available yet</strong></div>
            <div className="summary-divider"/>
            <div className="summary-description"><Sparkles size={18}/><span>{currentModel?.description}</span></div>
          </section>

          <section className="surface-card roadmap-card">
            <div className="side-summary-heading"><Clock3 size={18}/><strong>Experiment lifecycle</strong></div>
            <div className="roadmap-steps">
              <ProgressStep step={1} label="Choose inputs" detail="Dataset + algorithm" active/>
              <ProgressStep step={2} label="Train & tune" detail="Pending ML integration"/>
              <ProgressStep step={3} label="Evaluate" detail="CV and held-out test"/>
              <ProgressStep step={4} label="Save pipeline" detail="Trusted model registry"/>
            </div>
          </section>

          <div className="aside-hint"><Info size={18}/><p>Training-time preprocessing must be fitted only on the training partition to prevent data leakage.</p></div>
        </aside>
      </div>

      <InfoNote>
        The five classifiers and evaluation settings shown here describe the planned experiment workflow. This screen does not perform training and displays no invented scores.
      </InfoNote>
    </div>
  );
}
