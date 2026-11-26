# Frontend architecture

The frontend is built independently from the Django ML engine.

## Principles

- **Actual API data only:** Dataset cards are populated from Django. The initial empty catalog displays an empty state. Model choices are static curriculum metadata; training is not implemented.
- **No user upload:** Dataset selection only. No upload controls or upload requests.
- **No misleading metrics:** Training buttons are disabled until supported by real endpoints. Comparison and prediction results remain empty, rather than generating demo scores.
- **Modular:** Pages do not store their own duplicate dataset/model selection. Shared workspace state is managed by `WorkspaceContext`.
- **Typed API boundary:** `lib/api.ts` provides a single API base URL mechanism, Vite proxy for local Django, and typed response shapes.
- **Accessible:** Semantic links and buttons, keyboard focus, form labels, visible loading/offline feedback, reduced-motion support.
- **Responsive:** Sticky desktop sidebar, mobile drawer, adaptive columns, mobile-friendly panels.

## Current routes

| Path | What it does |
| --- | --- |
| `/` | Overview, backend health, curated dataset count, 5 models |
| `/datasets` | Read-only catalog, search, choose dataset |
| `/training` | Model selection and protocol, no training requests yet |
| `/comparison` | Requirements and empty results state |
| `/predictions` | Compatible-model workflow shell, no inference yet |

## Integration dependencies

1. `GET /api/v1/datasets/`: existing read-only catalog.
2. `GET /api/v1/model-types/`: existing model-type metadata.
3. `GET /api/v1/health/`: existing liveness check.
4. Training jobs, evaluation, model registry and prediction: will require future Django API endpoints. Frontend buttons must not be enabled before these endpoints exist.

The project README and Django architecture docs describe the backend phase.
