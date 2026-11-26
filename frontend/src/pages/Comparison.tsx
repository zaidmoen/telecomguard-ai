import {
  ArrowRight, BarChart3, ChartNoAxesCombined, CheckCircle2,
  GitCompareArrows, Layers, Target, TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { EmptyState, InfoNote, PageHeading, SectionHeading } from "../components/UI";

const metrics = [
  { label: "Accuracy", text: "Share of all predictions classified correctly", icon: Target },
  { label: "Precision", text: "How reliable positive predictions are", icon: CheckCircle2 },
  { label: "Recall", text: "How many actual positives are detected", icon: TrendingUp },
  { label: "F1-score", text: "Balance between precision and recall", icon: Layers },
];

export default function Comparison() {
  return (
    <div className="page-enter">
      <PageHeading eyebrow="MODEL EVALUATION" title="Model Comparison"
        description="A clear, consistent view of cross-validation and held-out test results for every classifier."
        action={<div className="phase-flag"><span/> Awaiting real experiments</div>}/>

      <div className="comparison-banner">
        <div><span className="comparison-banner-label"><ChartNoAxesCombined size={17}/> EVALUATION CENTER</span>
          <h2>Measure performance.<br/><em>Not assumptions.</em></h2>
          <p>All reported metrics will come from actual trained models and test data. The comparison dashboard will become available after training integration.</p>
        </div>
        <div className="comparison-graphic" aria-hidden="true">
          <div className="graph-grid"/>
          <div className="graph-bars"><i/><i/><i/><i/><i/><i/><i/></div>
          <span className="graphic-caption">CHART FRAMEWORK READY · NO METRICS YET</span>
        </div>
      </div>

      <div className="section-space">
        <SectionHeading title="How we'll evaluate" subtitle="Four key classification metrics across all five models"/>
        <div className="metric-explain-grid">
          {metrics.map(({ label, text, icon: Icon }) => (
            <div className="metric-explain-card" key={label}>
              <span className="metric-explain-icon"><Icon size={19}/></span>
              <strong>{label}</strong><p>{text}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="surface-card comparison-empty-panel">
        <SectionHeading title="Cross-validation vs. test results"
          subtitle="5-fold mean ± standard deviation and final held-out metrics"/>
        <div className="comparison-table-head" aria-hidden="true">
          <span>MODEL</span><span>CV ACCURACY</span><span>CV F1</span><span>TEST F1</span><span>TEST AUC</span>
        </div>
        <EmptyState icon={<GitCompareArrows size={25}/>}
          title="No evaluation results to compare"
          description="Once a real training experiment finishes, model metrics, confusion matrices, ROC curves and feature importance will appear here."
          action={<Link className="button button-secondary" to="/training">Go to Training Studio <ArrowRight size={16}/></Link>}/>
      </section>

      <InfoNote>
        The best model should be selected using cross-validation on the training portion, then evaluated on the untouched test split. No charts on this page represent measured results yet.
      </InfoNote>
    </div>
  );
}
