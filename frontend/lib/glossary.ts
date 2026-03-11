import { glossaryEntries, type GlossaryEntry } from "./generatedGlossary";

export type { GlossaryEntry };

export function normalizeGlossaryKey(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function glossaryAnchorId(termId: string): string {
  return `term-${normalizeGlossaryKey(termId)}`;
}

export function glossaryEntryHref(termId: string): string {
  return `/chapters/part-10-glossary/glossary#${glossaryAnchorId(termId)}`;
}

const glossaryById = new Map<string, GlossaryEntry>();
const glossaryLookup = new Map<string, string>();

for (const entry of glossaryEntries) {
  const normalizedId = normalizeGlossaryKey(entry.id || entry.term);
  if (!normalizedId || glossaryById.has(normalizedId)) {
    continue;
  }

  glossaryById.set(normalizedId, { ...entry, id: normalizedId });

  const lookupCandidates = [entry.id, entry.term, ...entry.aliases];
  for (const candidate of lookupCandidates) {
    const normalizedCandidate = normalizeGlossaryKey(candidate ?? "");
    if (!normalizedCandidate || glossaryLookup.has(normalizedCandidate)) {
      continue;
    }
    glossaryLookup.set(normalizedCandidate, normalizedId);
  }
}

export function glossaryEntryById(termId: string): GlossaryEntry | undefined {
  return glossaryById.get(normalizeGlossaryKey(termId));
}

export function resolveGlossaryTermId(term: string): string | undefined {
  const normalized = normalizeGlossaryKey(term);
  if (!normalized) {
    return undefined;
  }

  return glossaryLookup.get(normalized) ?? (glossaryById.has(normalized) ? normalized : undefined);
}

export { glossaryEntries };
