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
2. Promote finalized lesson content into `frontend/content/chapters/{part-slug}/chapter-{NN}-{chapter-slug}.mdx`.
3. Render chapters with the app route contract `/chapters/{partSlug}/{chapterSlug}`.
4. Call backend APIs only when computation is too heavy for client-side execution.

This keeps writing/research and production UX separate while sharing a stable content contract.

## Current run command (frontend app)

```powershell
npm install
npm run dev
```

Open: `http://localhost:3000`

## Next implementation targets

1. Replace placeholder chapter bodies with full instructional content.
2. Add MDX loading/rendering so publish files drive live chapter pages.
3. Add backend-powered interactive demos where computation is needed.
