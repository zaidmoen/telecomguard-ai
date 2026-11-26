import {
  ArrowRight, ArrowUpRight, BrainCircuit, CheckCircle2,
  ChevronRight, Database, GitCompareArrows, LockKeyhole,
  RadioTower, ScanLine, Server, Sparkles, Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useWorkspace } from "../state/WorkspaceContext";
import { algorithms } from "../config/models";
import { EmptyState, SectionHeading, StateLabel } from "../components/UI";

const stages = [
  { label: "Choose dataset", detail: "Curated catalog", icon: Database, link: "/datasets" },
  { label: "Train & tune", detail: "5 classifiers", icon: BrainCircuit, link: "/training" },
  { label: "Compare models", detail: "Honest metrics", icon: GitCompareArrows, link: "/comparison" },
  { label: "Run inference", detail: "Saved pipeline", icon: ScanLine, link: "/predictions" },
];

export default function Overview() {
  const { apiState, datasetState, datasets, selectedDataset } = useWorkspace();

  return (
    <div className="page-enter">
      <div className="overview-intro">
        <div className="intro-tag"><Sparkles size={13}/> INTELLIGENCE OPERATIONS CENTER</div>
        <h1>Make better decisions.<br/><span>Powered by machine learning.</span></h1>
        <p>Your dedicated workspace for exploring curated datasets, preparing model experiments, and understanding predictions — all in one place.</p>
      </div>

      <section className="hero-panel">
        <div className="hero-copy">
          <div className="hero-overline"><span className="hero-pulse"/> PLATFORM FOUNDATION · V1</div>
          <h2>From raw signals<br/>to <em>clear intelligence.</em></h2>
          <p>Build a reliable classification workflow with five machine learning models, transparent evaluation, and dataset-aware predictions.</p>
          <div className="hero-buttons">
            <Link className="button button-primary" to="/datasets">Explore datasets <ArrowUpRight size={17}/></Link>
            <Link className="button button-ghost-light" to="/training">Training studio <ArrowRight size={16}/></Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-orbit orbit-one"/>
          <div className="hero-orbit orbit-two"/>
          <div className="hero-orbit orbit-three"/>
          <div className="orbit-node node-a"/>
          <div className="orbit-node node-b"/>
          <div className="orbit-node node-c"/>
          <div className="hero-core"><RadioTower size={60} strokeWidth={1.3}/></div>
          <div className="floating-tag tag-one"><span className="mini-light"/> SYSTEM READY</div>
          <div className="floating-tag tag-two">05 <span>ML MODELS</span></div>
          <div className="grid-fade"/>
        </div>
      </section>

      <div className="overview-stats">
        <div className="stat-panel">
          <div className="stat-icon teal"><Database size={20}/></div>
          <div className="stat-body">
            <span>Available datasets</span>
            <strong>{datasetState === "ready" ? datasets.length.toString().padStart(2,"0") : "—"}</strong>
            <small>{datasetState === "ready" ? "Registered in the catalog" : "Waiting for backend"}</small>
          </div>
        </div>
        <div className="stat-panel">
          <div className="stat-icon purple"><BrainCircuit size={20}/></div>
          <div className="stat-body">
            <span>Supported algorithms</span><strong>{algorithms.length.toString().padStart(2,"0")}</strong>
            <small>Required classification models</small>
          </div>
        </div>
        <div className="stat-panel">
          <div className="stat-icon blue"><Server size={20}/></div>
          <div className="stat-body">
            <span>Backend service</span>
            <div className="stat-status"><StateLabel state={apiState} readyLabel="Online"/></div>
            <small>Live Django health endpoint</small>
          </div>
        </div>
        <div className="stat-panel">
          <div className="stat-icon amber"><LockKeyhole size={20}/></div>
          <div className="stat-body">
            <span>Training engine</span><strong className="stat-word">Pending</strong>
            <small>No runs executed yet</small>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        <section className="surface-card workflow-card">
          <SectionHeading title="Your ML workflow" subtitle="A clear path from dataset selection to predictions"
            extra={<span className="section-hint"><Workflow size={15}/> 4 stages</span>} />
          <div className="workflow-grid">
            {stages.map((stage, index) => (
              <Link key={stage.label} to={stage.link} className="workflow-step">
                <div className="workflow-number">{(index + 1).toString().padStart(2, "0")}</div>
                <div className="workflow-icon"><stage.icon size={20}/></div>
                <strong>{stage.label}</strong>
                <small>{stage.detail}</small>
                <ChevronRight size={17} className="workflow-arrow"/>
              </Link>
            ))}
          </div>
          <div className="workflow-notice">
            <CheckCircle2 size={17}/>
            <span>Datasets are selected from a curated library. File uploads are intentionally not supported.</span>
          </div>
        </section>

        <section className="surface-card quick-start-card">
          <SectionHeading title="Current workspace" subtitle="Your active dataset context"/>
          {selectedDataset ? (
            <div className="current-dataset">
              <div className="current-dataset-icon"><Database size={28}/></div>
              <strong>{selectedDataset.name}</strong>
              <p>Target column: {selectedDataset.target_column}</p>
              <Link className="button button-secondary" to="/training">Choose a model <ArrowRight size={16}/></Link>
            </div>
          ) : (
            <EmptyState compact title="No dataset selected"
              description="Choose an available dataset to configure your workspace."
              action={<Link to="/datasets" className="text-action">Open dataset catalog <ArrowRight size={15}/></Link>} />
          )}
        </section>
      </div>

      <section className="surface-card algorithms-strip">
        <SectionHeading title="Five models. One workflow." subtitle="Algorithms specified in the machine learning assignment"
          extra={<Link to="/training" className="text-action">Training Studio <ArrowUpRight size={15}/></Link>}/>
        <div className="algorithm-pills">
          {algorithms.map((model) => <div className="algorithm-pill" key={model.code}>
            <span className={`algorithm-pill-mark color-${model.color}`}>{model.short}</span>
            <div><strong>{model.label}</strong><small>{model.note}</small></div>
          </div>)}
        </div>
      </section>
    </div>
  );
}
