# Quant

Quant is a QMD-first online textbook project for quantitative finance, investing methods, trading systems, and financial algorithms.

## Repository layout

```text
Quant/
  frontend/      # Next.js docs site (chapter hubs, section pages, glossary drawer, widgets)
  backend/       # FastAPI services (market data + passive indexing interactive endpoint)
  notebooks/     # Authoring source of truth (.qmd chapter drafts)
  data/          # Local data notes and datasets
  shared/        # Shared schemas/configs
  misc/          # Scripts and utilities (including QMD sync)
```

## Current route model

- Chapter hub: `/chapters/{partSlug}/{chapterSlug}`
- Section page (from each `##` in QMD): `/chapters/{partSlug}/{chapterSlug}/{sectionSlug}`
- Section slugs are generated as `sNN-<section-slug>`.

## Quick start

### Frontend only

From repo root:

```powershell
npm install
npm run sync:qmd
npm run dev
```

Open: `http://localhost:3000`

### Frontend + backend

Backend:

```powershell
cd backend
python -m pip install -r requirements.txt
uvicorn app.main:app --reload
```

Then in a second terminal at repo root:

```powershell
npm run sync:qmd
npm run dev
```

Optional frontend env var:

```powershell
$env:NEXT_PUBLIC_BACKEND_BASE_URL="http://127.0.0.1:8000"
```

## Authoring workflow (QMD-first)

1. Write content in `notebooks/chapters/**/*.qmd`.
2. Run `npm run sync:qmd`.
3. Refresh the frontend route.

The sync script updates generated chapter sections and glossary runtime data used by the frontend.

## QMD syntax used by the site

### Glossary tokens

- `[[term]]`
- `[[term|display text]]`

### Inline widget markers

- `{{widget:<id>}}` on its own line.

Examples currently used:

- `{{widget:passive-index-choose-stock}}`
- `{{widget:passive-index-market-data}}`
- `{{widget:passive-index-weights-differ}}`
- `{{widget:passive-index-index-paths}}`
- `{{widget:passive-index-summary}}`

### Math and currency

- Inline math: `$...$`
- Display math: `$$...$$`
- Currency in prose is auto-protected by sync; explicit `\$` is also supported.

## Useful commands

From repo root:

```powershell
npm run sync:qmd
npm run dev
npm run build
npx tsc --noEmit -p frontend/tsconfig.json
```

## More docs

- Frontend details: `frontend/README.md`
- Backend details: `backend/README.md`
- QMD chapter index and authoring contract: `notebooks/chapters/README.md`
