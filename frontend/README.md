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
  content/chapters/     # Published chapter content (MDX)
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
- Publish in `frontend/content/chapters/{part-slug}/chapter-{NN}-{chapter-slug}.mdx`
- Render via `/chapters/{partSlug}/{chapterSlug}` using the shared chapter route template
