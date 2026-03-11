# Misc

This folder contains project utilities and non-runtime tooling.

In this project, `misc/scripts/` is important because it owns the content pipeline between notebook drafts (`.qmd`) and frontend chapter routes (`.tsx`).

## What lives here

- `misc/scripts/generate-book-scaffold.js`: one-time or occasional scaffold generator for full chapter structure.
- `misc/scripts/sync-authored-qmd-to-tsx.js`: ongoing sync pipeline for authored notebook content, chapter metadata status/summary, and generated glossary runtime data.

## Script docs

Detailed usage and behavior for both scripts is documented in:

- [`misc/scripts/README.md`](./scripts/README.md)

## Quick commands

From repo root:

```powershell
# Regular authoring sync (authored chapters only)
npm run sync:qmd

# Optional: force full scaffold regeneration
node misc/scripts/generate-book-scaffold.js --force
```

Use `--force` carefully on scaffold generation because it recreates scaffold trees.
