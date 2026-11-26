# TelecomGuard AI · React Frontend

An enterprise-style, responsive React + TypeScript frontend for the Django REST API.

## What is functional in this phase

- Dashboard with **live backend health** and **real curated dataset count** (not fake analytics)
- Dataset Library fetching `GET /api/v1/datasets/`, with search and dataset selection
- Training Studio selecting one of the five required algorithms and showing the course evaluation protocol
- Comparison view with honest empty states, metric explanations and no fabricated results
- Prediction Lab shell (disabled until a compatible saved model and inference API exist)
- Desktop/mobile navigation, connection retry, loading/offline states and keyboard-visible focus
- No CSV upload UI, handler or API request

**Important:** Django does not yet expose training, experiments, saved-model retrieval or prediction endpoints. The frontend does not claim these actions work.

## Local run

Start Django in a different terminal:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
Copy-Item .env.example .env
python manage.py migrate
python manage.py runserver
```

Then:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api/*` calls to Django on `http://127.0.0.1:8000`.

## Checks

```bash
cd frontend
npm run typecheck
npm run build
```

## Environment

By default, the frontend calls `/api/v1`, so the Vite proxy handles development requests.

For a separately deployed React frontend, configure `VITE_API_BASE_URL` to the public Django base URL including `/api/v1`. Backend CORS origins must also be explicitly configured.

## Structure

```text
src/
  components/    reusable layout and display components
  config/        classifier definitions from assignment
  lib/           typed Django API client
  pages/         Overview, Datasets, Training, Comparison, Predictions
  state/         shared dataset choice, model choice, backend connectivity
  types.ts       API shapes
  styles.css     design system, desktop/mobile states
```

## Next implementation milestones

1. Register and activate team-curated datasets on Django.
2. Add dataset schema and exploration endpoints.
3. Implement training/tuning/evaluation and experiment lifecycle in Django.
4. Fetch measured results into Comparison.
5. Load saved compatible model schemas to enable Prediction Lab.

All metrics should come from actual experiments, and preprocessing must be fitted only to training folds.
