# Frontend

Public-facing educational site for Quant.

## Current state

- App Router-style TSX pages are the active frontend path.
- Shared docs layout lives in `components/layout/DocsShell.tsx`.

## Target structure

```text
frontend/
  app/                  # Route-level pages
  components/           # Reusable UI and interactive components
  lib/                  # Shared frontend utilities and metadata
  public/               # Static assets
  styles/               # App-level styles
```

## Run locally

```powershell
cd ..
npm install
npm run dev
```

Open: `http://localhost:3000`

## Content contract

- Draft in `notebooks/`
- Promote drafts into per-chapter route files at `frontend/app/chapters/{part-slug}/{chapter-slug}/page.tsx`
- Render via `/chapters/{partSlug}/{chapterSlug}`
