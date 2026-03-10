# Notebooks

This is the authoring and experimentation layer for Quant. Use `.qmd` notebooks for derivations, data exploration, and early chapter drafts.

## Folder intent

```text
notebooks/
  chapters/       # Chapter-aligned notebook drafts
  experiments/    # Sandboxed algorithm tests
  drafts/         # In-progress writing not ready for publish
  figures/        # Generated charts/outputs for later reuse
  outputs/        # Quarto-rendered HTML/PDF output files
```

## Workflow guideline

1. Explore and write in `chapters/` and `experiments/`.
2. Refine explanations and visuals.
3. Sync authored `.qmd` content into chapter route files with `npm run sync:qmd`.
4. Move stable code into `backend/app/` if it is reused or computationally heavy.

## Render output location

Quarto project output is configured to compile into `notebooks/outputs/`.

```bash
cd notebooks
quarto render
```
