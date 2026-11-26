import {
  ArrowRight, BrainCircuit, Check, CircleHelp, Database,
  LockKeyhole, RadioTower, ScanLine, ShieldAlert, SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { algorithms } from "../config/models";
import { InfoNote, PageHeading, SectionHeading } from "../components/UI";
import { useWorkspace } from "../state/WorkspaceContext";

export default function Predictions() {
  const { selectedDataset, selectedModel, selectModel } = useWorkspace();

  return (
    <div className="page-enter">
      <PageHeading eyebrow="INFERENCE WORKSPACE" title="Prediction Lab"
        description="Apply a saved model to new feature values. Inputs will be generated from the selected dataset's schema once model training is implemented."
        action={<div className="phase-flag"><span/> Integration pending</div>}/>

      <div className="predictions-layout">
        <div className="predictions-main">
          <section className="surface-card prediction-form-card">
            <SectionHeading title="Prepare a prediction" subtitle="Choose a compatible dataset and model before submitting feature values."/>
            <div className="prediction-field">
              <label>Dataset</label>
              <div className="select-visual"><Database size={18}/>
                <span>{selectedDataset?.name || "No dataset selected"}</span>
                <Link to="/datasets">Choose <ArrowRight size={14}/></Link>
              </div>
            </div>
            <div className="prediction-field">
              <label htmlFor="prediction-model">Algorithm</label>
              <div className="select-wrap">
                <BrainCircuit size={18}/>
                <select id="prediction-model" value={selectedModel}
                  onChange={(event) => selectModel(event.target.value as typeof selectedModel)}>
                  {algorithms.map((model) => (
                    <option key={model.code} value={model.code}>{model.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="prediction-schema-note">
              <SlidersHorizontal size={20}/>
              <div><strong>Feature inputs not yet available</strong>
                <p>Dataset-specific input fields will be shown only after the backend provides a validated feature schema and a compatible saved model.</p>
              </div>
            </div>
            <button className="button button-primary predict-button" disabled
              title="The prediction API and saved models are not available yet">
              <LockKeyhole size={17}/> Run prediction <ArrowRight size={16}/>
            </button>
          </section>

          <div className="prediction-assurance"><ShieldAlert size={19}/>
            <p><strong>Model compatibility matters.</strong> A model trained on telecom customer data cannot be reused to predict outcomes for an unrelated dataset.</p>
          </div>
        </div>

        <aside className="prediction-side">
          <section className="surface-card inference-result">
            <div className="result-card-top"><span><ScanLine size={17}/> INFERENCE OUTPUT</span><span className="result-id">—</span></div>
            <div className="result-symbol"><RadioTower size={33}/></div>
            <h3>Prediction not available</h3>
            <p>No trained pipeline has been loaded. Predictions will appear here when the backend inference API is connected.</p>
            <div className="result-placeholder"><span>Predicted class</span><strong>—</strong></div>
            <div className="result-placeholder"><span>Model confidence</span><strong>—</strong></div>
            <div className="result-placeholder"><span>Active dataset</span><strong>{selectedDataset?.slug || "—"}</strong></div>
          </section>

          <section className="surface-card how-it-works">
            <div className="side-summary-heading"><CircleHelp size={18}/><strong>How it will work</strong></div>
            <div><Check size={17}/><span>Select an active dataset</span></div>
            <div><Check size={17}/><span>Load a model trained on that dataset</span></div>
            <div><Check size={17}/><span>Enter the required feature values</span></div>
            <div><Check size={17}/><span>Receive a real model prediction</span></div>
            <Link className="text-action" to="/training">Explore Training Studio <ArrowRight size={15}/></Link>
          </section>
        </aside>
      </div>

      <InfoNote>
        This page is a frontend foundation. No prediction is computed, and no confidence or customer outcome is fabricated.
      </InfoNote>
    </div>
  );
}
