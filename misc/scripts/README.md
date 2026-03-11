# Scripts: Content Pipeline

This folder contains the two scripts that control chapter scaffolding and QMD-to-frontend sync.

## 1) `generate-book-scaffold.js`

Purpose:

- Creates the full part/chapter scaffold for notebooks and frontend chapter routes.
- Generates baseline metadata and index files for navigation.

Primary outputs:

- `notebooks/chapters/{part-slug}/chapter-{NN}-{chapter-slug}.qmd`
- `frontend/app/chapters/{part-slug}/{chapter-slug}/page.tsx`
- `frontend/lib/chapterMetadata.ts`
- `notebooks/chapters/README.md`
- `frontend/app/chapters/README.md`

Behavior:

- Default mode preserves existing files and only fills in missing scaffold files.
- `--force` mode removes and regenerates notebook/frontend chapter scaffold trees before writing new scaffold files.

Run:

```powershell
node misc/scripts/generate-book-scaffold.js
node misc/scripts/generate-book-scaffold.js --force
```

When to use:

- You changed the canonical book outline (parts/chapters/sections) and need a regenerated scaffold.
- You are setting up a fresh clone and want all baseline chapter files present.

## 2) `sync-authored-qmd-to-tsx.js`

Purpose:

- Syncs authored chapter content from QMD into route-local TSX chapter pages.
- Updates chapter metadata status (`placeholder`/`detailed`) based on authored content detection.
- Syncs chapter hero summaries from QMD frontmatter (`summary:`) into `frontend/lib/chapterMetadata.ts`.
- Generates runtime glossary dataset from glossary QMD.

Primary inputs:

- `notebooks/chapters/**/*.qmd`
- `notebooks/chapters/part-10-glossary/chapter-47-glossary.qmd`

Primary outputs:

- `frontend/app/chapters/{part-slug}/{chapter-slug}/page.tsx` (updates `sectionContent`)
- `frontend/lib/chapterMetadata.ts` (updates `status` and `summary`)
- `frontend/lib/generatedGlossary.ts` (auto-generated glossary data module)

Current npm alias:

```powershell
npm run sync:qmd
```

Equivalent direct command:

```powershell
node misc/scripts/sync-authored-qmd-to-tsx.js
node misc/scripts/sync-authored-qmd-to-tsx.js --all
```

### Sync rules

Authored-only mode (default):

- Only chapters detected as authored are synced into TSX.
- Placeholder-only chapters are skipped.

All mode (`--all`):

- Syncs all QMD chapters regardless of authored status.

Section parsing model:

- `##` -> chapter section
- `###` -> subsection block
- Paragraphs, ordered/unordered lists, and fenced code blocks are preserved as structured blocks.

Summary sync model:

- Reads optional `summary:` from QMD frontmatter.
- If present and non-empty, updates matching chapter summary in metadata.
- If missing/empty, existing metadata summary remains unchanged.

Glossary generation model:

- Reads glossary term cards from `chapter-47-glossary.qmd`.
- Writes normalized data to `frontend/lib/generatedGlossary.ts`.

## Recommended authoring workflow

1. Write chapter content in QMD files under `notebooks/chapters/...`.
2. Add/update frontmatter summary if needed:
   - `summary: "Your chapter summary text."`
3. Run:
   - `npm run sync:qmd`
4. Run typecheck/dev build as needed:
   - `npx tsc --noEmit -p frontend/tsconfig.json`
   - `npm run dev`

## Notes

- `generatedGlossary.ts` is generated; do not edit it manually.
- For glossary-linked inline terms in QMD, use token format:
  - `[[term]]`
  - `[[term|display text]]`
- If a glossary token does not resolve, frontend rendering degrades to plain text for safety.
