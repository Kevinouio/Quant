# Frontend

Public-facing educational site for Quant.

## Current state

- `index.html`, `chapters/`, and `assets/` are the live static starter.
- `app/`, `components/`, and `content/` are the target production structure.

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

## Content contract

- Draft in `notebooks/`
- Publish in `frontend/content/chapters/*.mdx`
- Render via route page + shared chapter layout component
