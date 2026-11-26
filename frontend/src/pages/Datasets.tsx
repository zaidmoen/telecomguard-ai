import { useMemo, useState } from "react";
import {
  ArrowRight, Check, Database as DatabaseIcon, ExternalLink,
  Filter, RefreshCw, Search, ServerOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { EmptyState, InfoNote, LoadingMessage, PageHeading, SectionHeading } from "../components/UI";
import { useWorkspace } from "../state/WorkspaceContext";

export default function Datasets() {
  const [query, setQuery] = useState("");
  const { datasets, datasetState, selectedDatasetSlug, selectDataset, refresh } = useWorkspace();
  const navigate = useNavigate();

  const visible = useMemo(() => datasets.filter((dataset) =>
    [dataset.name, dataset.description, dataset.target_column, dataset.slug]
      .join(" ").toLowerCase().includes(query.trim().toLowerCase())
  ), [datasets, query]);

  return (
    <div className="page-enter">
      <PageHeading eyebrow="DATA INTELLIGENCE" title="Dataset Library"
        description="Choose from trusted, team-curated classification datasets. Every model run will be tied to the dataset you select."
        action={<button className="button button-secondary" onClick={refresh}>
          <RefreshCw size={16}/> Refresh catalog
        </button>} />

      <div className="catalog-banner">
        <div className="catalog-banner-icon"><DatabaseIcon size={23}/></div>
        <div>
          <strong>Curated sources, reliable experiments.</strong>
          <p>Only datasets registered by the project team appear here. Uploading personal files is not part of this workspace.</p>
        </div>
      </div>

      <section className="surface-card library-panel">
        <SectionHeading title="Explore datasets" subtitle="Select a dataset to unlock experiment configuration"
          extra={<span className="counter-chip">{datasetState === "ready" ? datasets.length : "—"} available</span>}/>

        <div className="dataset-toolbar">
          <label className="search-field">
            <Search size={17}/>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)}
              placeholder="Search dataset names or targets…" aria-label="Search datasets"/>
          </label>
          <div className="filter-chip"><Filter size={16}/> Classification <Check size={14}/></div>
        </div>

        {datasetState === "loading" ? (
          <LoadingMessage label="Connecting to the curated dataset catalog…"/>
        ) : datasetState === "error" ? (
          <EmptyState icon={<ServerOff size={24}/>} title="Catalog is unreachable"
            description="Start the Django server on port 8000, then retry. No demo datasets are substituted for a disconnected API."
            action={<button className="button button-secondary" onClick={refresh}>
              <RefreshCw size={16}/> Retry connection
            </button>}/>
        ) : datasets.length === 0 ? (
          <EmptyState title="The library is ready for its first dataset"
            description="The Django catalog is connected but no curated datasets have been registered and activated yet. The team will add approved datasets in a later phase."/>
        ) : visible.length === 0 ? (
          <EmptyState icon={<Search size={24}/>} title="No matching datasets"
            description="Try a different search term. Only registered datasets are searchable."
            action={<button className="button button-secondary" onClick={() => setQuery("")}>Clear search</button>}/>
        ) : (
          <div className="dataset-grid">
            {visible.map((dataset) => {
              const active = selectedDatasetSlug === dataset.slug;
              return (
                <article className={`dataset-card ${active ? "dataset-card-selected" : ""}`} key={dataset.slug}>
                  <div className="dataset-card-top">
                    <div className="dataset-card-icon"><DatabaseIcon size={25}/></div>
                    <span className={`dataset-selection-tag ${active ? "is-selected" : ""}`}>{active ? "Selected" : "Available"}</span>
                  </div>
                  <h3>{dataset.name}</h3>
                  <p>{dataset.description || "A curated classification dataset registered by the team."}</p>
                  <div className="dataset-facts">
                    <div><span>Task</span><strong>{dataset.classification_type === "binary" ? "Binary classification" : "Multiclass classification"}</strong></div>
                    <div><span>Target</span><strong>{dataset.target_column}</strong></div>
                  </div>
                  <div className="dataset-actions">
                    <button className={`button ${active ? "button-secondary" : "button-primary"}`} onClick={() => {
                      selectDataset(dataset.slug);
                      navigate("/training");
                    }}>{active ? "Continue" : "Select dataset"} <ArrowRight size={15}/></button>
                    {dataset.source_url && (
                      <a href={dataset.source_url} target="_blank" rel="noreferrer"
                        className="icon-button source-button" aria-label={`Source of ${dataset.name}`}>
                        <ExternalLink size={17}/>
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
      <InfoNote>
        Selecting a dataset does not start model training. In a later phase, the training engine will run and evaluate each model against the selected dataset independently.
      </InfoNote>
      {selectedDatasetSlug && <div className="bottom-nudge">
        <span><Check size={18}/> Dataset selected</span>
        <Link to="/training" className="text-action">Go to Training Studio <ArrowRight size={15}/></Link>
      </div>}
    </div>
  );
}
