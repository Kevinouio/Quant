# Quant

Quant is an online textbook project for quantitative finance, investing methods, trading systems, and financial algorithms.

## Architecture

```text
Quant/
  frontend/      # Public teaching site (UI, chapters, widgets)
  backend/       # API + compute engine (backtests, metrics, simulations)
  notebooks/     # Authoring/research lab (.qmd drafts, experiments)
  data/          # Raw/processed/cache/external datasets
  shared/        # Shared schemas, constants, and configs
  misc/          # One-off notes and non-core artifacts
```

## Workflow model

1. Draft and test ideas in `notebooks/`.
2. Promote finalized lesson content into `frontend/content/chapters/*.mdx`.
3. Render chapters with frontend pages/components.
4. Call backend APIs only when computation is too heavy for client-side execution.

This keeps writing/research and production UX separate while sharing a stable content contract.

## Current run command (static starter site)

The existing starter site is still plain HTML/CSS/JS.

```powershell
cd frontend
python -m http.server 5500
```

Open: `http://localhost:5500`

## Next implementation targets

1. Add frontend app routing and MDX rendering from `frontend/content/chapters/`.
2. Add backend `POST /backtest/passive-indexing` endpoint.
3. Add notebook -> chapter publish checklist so content stays synchronized.
