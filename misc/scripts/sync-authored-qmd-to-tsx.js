const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..");
const notebooksRoot = path.join(repoRoot, "notebooks", "chapters");
const frontendChaptersRoot = path.join(repoRoot, "frontend", "app", "chapters");
const chapterMetadataPath = path.join(repoRoot, "frontend", "lib", "chapterMetadata.ts");
const generatedChapterSectionsPath = path.join(
  repoRoot,
  "frontend",
  "lib",
  "generatedChapterSections.ts"
);
const glossaryQmdPath = path.join(
  repoRoot,
  "notebooks",
  "chapters",
  "part-10-glossary",
  "chapter-47-glossary.qmd"
);
const generatedGlossaryPath = path.join(repoRoot, "frontend", "lib", "generatedGlossary.ts");

const syncAll = process.argv.includes("--all");

const placeholderPatterns = [
  /placeholder for /i,
  /add concrete definitions, formulas, and implementation notes in a later pass\.?/i,
  /draft chapter \d+ content before turning it into a tsx chapter page\.?/i,
  /draft appendix [A-Z] content before turning it into a tsx chapter page\.?/i
];

const alwaysDetailedChapterKeys = new Set(["part-02-long-horizon-investing/passive-indexing-and-benchmarking"]);

function normalizeGlossaryKey(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseCommaSeparated(text) {
  return text
    .split(",")
    .map((part) => part.trim())
    .map((part) => part.replace(/[.;:]+$/, "").trim())
    .filter(Boolean);
}

function parseChapterReferences(text) {
  const cleaned = text.trim().replace(/[.;]+$/, "");
  const explicitMatches = cleaned.match(/(?:Chapter\s+\d+|Appendix\s+[A-Z])\s*\([^)]*\)/g);
  if (explicitMatches && explicitMatches.length > 0) {
    return explicitMatches.map((match) => match.trim());
  }

  return parseCommaSeparated(cleaned);
}

function parseGlossaryEntries(raw) {
  const source = removeFrontmatter(raw);
  const lines = source.split(/\r?\n/);
  const byId = new Map();
  let current = null;
  let currentField = null;

  const pushCurrent = () => {
    if (!current || !current.term || !current.definition) {
      current = null;
      currentField = null;
      return;
    }

    const id = normalizeGlossaryKey(current.id || current.term);
    const existing = byId.get(id);
    if (existing) {
      existing.aliases = Array.from(new Set([...existing.aliases, ...current.aliases]));
      existing.relatedTerms = Array.from(new Set([...existing.relatedTerms, ...current.relatedTerms]));
      existing.chapterReferences = Array.from(
        new Set([...existing.chapterReferences, ...current.chapterReferences])
      );
      if (!existing.definition && current.definition) {
        existing.definition = current.definition;
      }
      if (!existing.intuition && current.intuition) {
        existing.intuition = current.intuition;
      }
      if (!existing.whyItMatters && current.whyItMatters) {
        existing.whyItMatters = current.whyItMatters;
      }
    } else {
      byId.set(id, {
        id,
        term: current.term,
        aliases: current.aliases,
        definition: current.definition,
        intuition: current.intuition,
        whyItMatters: current.whyItMatters,
        relatedTerms: current.relatedTerms,
        chapterReferences: current.chapterReferences
      });
    }

    current = null;
    currentField = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      currentField = null;
      continue;
    }

    if (/^###\s+/.test(trimmed)) {
      pushCurrent();
      continue;
    }

    const termMatch = /^\*\*([^*\n]+)\*\*$/.exec(trimmed);
    if (termMatch) {
      pushCurrent();
      const term = termMatch[1].trim();
      current = {
        id: normalizeGlossaryKey(term),
        term,
        aliases: [],
        definition: "",
        intuition: "",
        whyItMatters: "",
        relatedTerms: [],
        chapterReferences: []
      };
      currentField = null;
      continue;
    }

    if (!current) {
      continue;
    }

    const aliasesMatch = /^Aliases:\s*(.+)$/i.exec(trimmed);
    if (aliasesMatch) {
      current.aliases = parseCommaSeparated(aliasesMatch[1]);
      currentField = "aliases";
      continue;
    }

    const definitionMatch = /^Definition:\s*(.+)$/i.exec(trimmed);
    if (definitionMatch) {
      current.definition = definitionMatch[1].trim();
      currentField = "definition";
      continue;
    }

    const intuitionMatch = /^Intuition:\s*(.+)$/i.exec(trimmed);
    if (intuitionMatch) {
      current.intuition = intuitionMatch[1].trim();
      currentField = "intuition";
      continue;
    }

    const whyItMattersMatch = /^Why it matters:\s*(.+)$/i.exec(trimmed);
    if (whyItMattersMatch) {
      current.whyItMatters = whyItMattersMatch[1].trim();
      currentField = "whyItMatters";
      continue;
    }

    const relatedTermsMatch = /^Related terms:\s*(.+)$/i.exec(trimmed);
    if (relatedTermsMatch) {
      current.relatedTerms = parseCommaSeparated(relatedTermsMatch[1]);
      currentField = "relatedTerms";
      continue;
    }

    const chapterReferencesMatch = /^Chapter references:\s*(.+)$/i.exec(trimmed);
    if (chapterReferencesMatch) {
      current.chapterReferences = parseChapterReferences(chapterReferencesMatch[1]);
      currentField = "chapterReferences";
      continue;
    }

    if (currentField === "definition") {
      current.definition = `${current.definition} ${trimmed}`.trim();
      continue;
    }
    if (currentField === "intuition") {
      current.intuition = `${current.intuition} ${trimmed}`.trim();
      continue;
    }
    if (currentField === "whyItMatters") {
      current.whyItMatters = `${current.whyItMatters} ${trimmed}`.trim();
    }
  }

  pushCurrent();
  return Array.from(byId.values());
}

function writeGeneratedGlossary(entries) {
  const fileContents = `/* AUTO-GENERATED FILE. DO NOT EDIT.
 *
 * Source: notebooks/chapters/part-10-glossary/chapter-47-glossary.qmd
 * Generated by: misc/scripts/sync-authored-qmd-to-tsx.js
 */

export type GlossaryEntry = {
  id: string;
  term: string;
  aliases: string[];
  definition: string;
  intuition: string;
  whyItMatters: string;
  relatedTerms: string[];
  chapterReferences: string[];
};

export const glossaryEntries: GlossaryEntry[] = ${JSON.stringify(entries, null, 2)};
`;

  fs.writeFileSync(generatedGlossaryPath, fileContents, "utf8");
}

function generateGlossaryData() {
  if (!fs.existsSync(glossaryQmdPath)) {
    writeGeneratedGlossary([]);
    return 0;
  }

  const source = fs.readFileSync(glossaryQmdPath, "utf8");
  const entries = parseGlossaryEntries(source);
  writeGeneratedGlossary(entries);
  return entries.length;
}

function walkQmdFiles(root) {
  const qmdFiles = [];

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const candidate = path.join(root, entry.name);
    if (entry.isDirectory()) {
      qmdFiles.push(...walkQmdFiles(candidate));
      continue;
    }

    if (entry.isFile() && candidate.endsWith(".qmd")) {
      qmdFiles.push(candidate);
    }
  }

  return qmdFiles;
}

function extractFrontmatterBlock(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  return match ? match[1] : null;
}

function parseFrontmatterSummary(raw) {
  const frontmatter = extractFrontmatterBlock(raw);
  if (!frontmatter) {
    return null;
  }

  const lines = frontmatter.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const match = /^\s*summary\s*:\s*(.*)$/.exec(lines[i]);
    if (!match) {
      continue;
    }

    const value = match[1].trim();
    if (!value) {
      return null;
    }

    if (value === "|" || value === ">") {
      const chunks = [];
      let j = i + 1;
      while (j < lines.length && /^\s+/.test(lines[j])) {
        chunks.push(lines[j].trim());
        j += 1;
      }
      const merged = chunks.join(" ").trim();
      return merged || null;
    }

    if (value.startsWith('"')) {
      try {
        const parsed = JSON.parse(value);
        if (typeof parsed === "string") {
          const normalized = parsed.trim();
          return normalized || null;
        }
      } catch (_error) {
        // fall through to return raw value
      }
    }

    if (value.startsWith("'") && value.endsWith("'") && value.length >= 2) {
      const normalized = value.slice(1, -1).trim();
      return normalized || null;
    }

    return value;
  }

  return null;
}

function removeFrontmatter(raw) {
  const frontmatter = extractFrontmatterBlock(raw);
  if (!frontmatter) {
    return raw;
  }

  const fullBlock = `---\n${frontmatter}\n---`;
  const fullBlockWindows = fullBlock.replace(/\n/g, "\r\n");
  if (raw.startsWith(fullBlock)) {
    return raw.slice(fullBlock.length).replace(/^\r?\n/, "");
  }
  if (raw.startsWith(fullBlockWindows)) {
    return raw.slice(fullBlockWindows.length).replace(/^\r?\n/, "");
  }

  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
}

function normalizeText(text) {
  return text.trim().replace(/\s+/g, " ");
}

function escapeCurrencyDollarSigns(text) {
  if (!text || !text.includes("$")) {
    return text;
  }

  let output = "";
  let i = 0;

  while (i < text.length) {
    const current = text[i];
    if (current !== "$") {
      output += current;
      i += 1;
      continue;
    }

    // Respect already-escaped dollar signs.
    if (i > 0 && text[i - 1] === "\\") {
      output += current;
      i += 1;
      continue;
    }

    const rest = text.slice(i + 1);
    const amountMatch = /^([+-]?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?(?:[kKmMbB])?)/.exec(rest);
    if (!amountMatch) {
      output += current;
      i += 1;
      continue;
    }

    const amountToken = amountMatch[1];
    const nextChar = rest[amountToken.length] ?? "";
    const remainder = rest.slice(amountToken.length);
    const nextNonSpaceMatch = /^\s*(.)/.exec(remainder);
    const nextNonSpace = nextNonSpaceMatch ? nextNonSpaceMatch[1] : "";

    // Keep explicit LaTeX math-like continuations untouched.
    if (nextChar === "$" || nextNonSpace === "$" || /[\/\\^_=*<>+\-]/.test(nextChar) || /[\/\\^_=*<>+\-]/.test(nextNonSpace)) {
      output += current;
      i += 1;
      continue;
    }

    // Treat as currency only when the numeric token is followed by a prose boundary.
    if (nextChar && !/[\s)\]}.,;:!?'"%]/.test(nextChar)) {
      output += current;
      i += 1;
      continue;
    }

    output += `\\$${amountToken}`;
    i += 1 + amountToken.length;
  }

  return output;
}

function normalizeInlineText(text) {
  return escapeCurrencyDollarSigns(normalizeText(text));
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sectionSlugFromTitle(title, index) {
  const prefix = `s${String(index).padStart(2, "0")}`;
  const base = slugify(title) || `section-${String(index).padStart(2, "0")}`;
  return `${prefix}-${base}`;
}

function writeFileIfChanged(targetPath, nextContent) {
  if (fs.existsSync(targetPath)) {
    const current = fs.readFileSync(targetPath, "utf8");
    if (current === nextContent) {
      return false;
    }
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, nextContent, "utf8");
  return true;
}

function buildChapterHubPageSource(partSlug, chapterSlug) {
  return [
    "import { notFound } from \"next/navigation\";",
    "import { ChapterHubPageLayout } from \"../../../../components/layout/ChapterHubPageLayout\";",
    "import { chapterByRoute } from \"../../../../lib/chapterMetadata\";",
    "import { chapterHubIntroByRoute, chapterSectionHref, chapterSectionsByRoute, type ChapterSectionRouteRecord } from \"../../../../lib/generatedChapterSections\";",
    "",
    `const partSlug = \"${partSlug}\";`,
    `const chapterSlug = \"${chapterSlug}\";`,
    "",
    "export default function Page() {",
    "  const chapter = chapterByRoute(partSlug, chapterSlug);",
    "",
    "  if (!chapter) {",
    "    notFound();",
    "  }",
    "",
    "  const sections = chapterSectionsByRoute(partSlug, chapterSlug).map((section: ChapterSectionRouteRecord) => ({",
    "    index: section.index,",
    "    title: section.title,",
    "    slug: section.slug,",
    "    href: chapterSectionHref(partSlug, chapterSlug, section.slug)",
    "  }));",
    "  const hubIntro = chapterHubIntroByRoute(partSlug, chapterSlug);",
    "",
    "  return <ChapterHubPageLayout chapter={chapter} sections={sections} hubIntroTitle={hubIntro?.title} hubIntroBlocks={hubIntro?.blocks} />;",
    "}",
    ""
  ].join("\n");
}

function buildSectionPageSource(partSlug, chapterSlug, sectionSlug) {
  return [
    "import { notFound } from \"next/navigation\";",
    "import { ChapterPageLayout } from \"../../../../../components/layout/ChapterPageLayout\";",
    "import { sectionExtraForRoute } from \"../../../../../components/layout/sectionExtrasRegistry\";",
    "import { chapterByRoute } from \"../../../../../lib/chapterMetadata\";",
    "import { chapterSectionByRoute, chapterSectionHref, chapterSectionsByRoute, type ChapterSectionRouteRecord } from \"../../../../../lib/generatedChapterSections\";",
    "",
    `const partSlug = \"${partSlug}\";`,
    `const chapterSlug = \"${chapterSlug}\";`,
    `const sectionSlug = \"${sectionSlug}\";`,
    "",
    "export default function Page() {",
    "  const chapter = chapterByRoute(partSlug, chapterSlug);",
    "  const section = chapterSectionByRoute(partSlug, chapterSlug, sectionSlug);",
    "",
    "  if (!chapter || !section) {",
    "    notFound();",
    "  }",
    "",
    "  const chapterSections = chapterSectionsByRoute(partSlug, chapterSlug).map((entry: ChapterSectionRouteRecord) => ({",
    "    index: entry.index,",
    "    title: entry.title,",
    "    slug: entry.slug,",
    "    href: chapterSectionHref(partSlug, chapterSlug, entry.slug)",
    "  }));",
    "  const sectionExtra = sectionExtraForRoute(partSlug, chapterSlug, section.slug);",
    "  const sectionExtras = sectionExtra ? { [section.content.title]: sectionExtra } : undefined;",
    "",
    "  return (",
    "    <ChapterPageLayout",
    "      chapter={chapter}",
    "      sectionContent={[section.content]}",
    "      sectionExtras={sectionExtras}",
    "      chapterSections={chapterSections}",
    "      activeSectionSlug={section.slug}",
    "      sectionIndexOffset={section.index - 1}",
    "    />",
    "  );",
    "}",
    ""
  ].join("\n");
}

function writeGeneratedChapterSections(records) {
  const manifestObject = {};
  for (const record of records) {
    const key = `${record.partSlug}/${record.chapterSlug}`;
    manifestObject[key] = {
      sections: record.sections,
      hubIntroTitle: record.hubIntroTitle,
      hubIntroBlocks: record.hubIntroBlocks
    };
  }

  const source = `/* AUTO-GENERATED FILE. DO NOT EDIT.
 *
 * Source: notebooks/chapters (all chapter .qmd files)
 * Generated by: misc/scripts/sync-authored-qmd-to-tsx.js
 */

import type { ChapterSectionContent } from "../components/layout/ChapterPageLayout";

export type ChapterSectionRouteRecord = {
  index: number;
  title: string;
  slug: string;
  content: ChapterSectionContent;
};

export type ChapterSectionManifestRecord = {
  sections: ChapterSectionRouteRecord[];
  hubIntroTitle?: string;
  hubIntroBlocks?: ChapterSectionContent["blocks"];
};

export type ChapterHubIntroRecord = {
  title?: string;
  blocks?: ChapterSectionContent["blocks"];
};

export const chapterSectionManifest: Record<string, ChapterSectionManifestRecord> = ${JSON.stringify(
    manifestObject,
    null,
    2
  )};

export const chapterManifestByRoute = (partSlug: string, chapterSlug: string): ChapterSectionManifestRecord | undefined =>
  chapterSectionManifest[\`\${partSlug}/\${chapterSlug}\`];

export const chapterSectionsByRoute = (partSlug: string, chapterSlug: string): ChapterSectionRouteRecord[] =>
  chapterManifestByRoute(partSlug, chapterSlug)?.sections ?? [];

export const chapterSectionByRoute = (
  partSlug: string,
  chapterSlug: string,
  sectionSlug: string
): ChapterSectionRouteRecord | undefined =>
  chapterSectionsByRoute(partSlug, chapterSlug).find((section) => section.slug === sectionSlug);

export const chapterSectionHref = (partSlug: string, chapterSlug: string, sectionSlug: string): string =>
  \`/chapters/\${partSlug}/\${chapterSlug}/\${sectionSlug}\`;

export const chapterHubIntroByRoute = (
  partSlug: string,
  chapterSlug: string
): ChapterHubIntroRecord | undefined => {
  const manifest = chapterManifestByRoute(partSlug, chapterSlug);
  if (!manifest) {
    return undefined;
  }

  if (!manifest.hubIntroTitle && (!manifest.hubIntroBlocks || manifest.hubIntroBlocks.length === 0)) {
    return undefined;
  }

  return {
    title: manifest.hubIntroTitle,
    blocks: manifest.hubIntroBlocks
  };
};
`;

  return writeFileIfChanged(generatedChapterSectionsPath, source);
}

function syncChapterAndSectionPages(records) {
  let updatedHubPages = 0;
  let updatedSectionPages = 0;
  let removedSectionPages = 0;

  for (const record of records) {
    const chapterDir = path.join(frontendChaptersRoot, record.partSlug, record.chapterSlug);
    const hubPagePath = path.join(chapterDir, "page.tsx");
    const hubSource = buildChapterHubPageSource(record.partSlug, record.chapterSlug);
    if (writeFileIfChanged(hubPagePath, hubSource)) {
      updatedHubPages += 1;
    }

    const expectedSectionSlugs = new Set(record.sections.map((section) => section.slug));
    for (const section of record.sections) {
      const sectionPagePath = path.join(chapterDir, section.slug, "page.tsx");
      const sectionSource = buildSectionPageSource(record.partSlug, record.chapterSlug, section.slug);
      if (writeFileIfChanged(sectionPagePath, sectionSource)) {
        updatedSectionPages += 1;
      }
    }

    if (fs.existsSync(chapterDir)) {
      for (const entry of fs.readdirSync(chapterDir, { withFileTypes: true })) {
        if (!entry.isDirectory()) {
          continue;
        }
        if (!/^s\d{2}-/.test(entry.name)) {
          continue;
        }
        if (expectedSectionSlugs.has(entry.name)) {
          continue;
        }

        fs.rmSync(path.join(chapterDir, entry.name), { recursive: true, force: true });
        removedSectionPages += 1;
      }
    }
  }

  return { updatedHubPages, updatedSectionPages, removedSectionPages };
}

function extractFenceLanguage(line) {
  const trimmed = line.trim();
  const quartoMatch = /^```\{([^}\s,]+)[^}]*\}/.exec(trimmed);
  if (quartoMatch) {
    return quartoMatch[1].trim().toLowerCase();
  }

  const markdownMatch = /^```([A-Za-z0-9_+\-#.]+)?/.exec(trimmed);
  if (!markdownMatch || !markdownMatch[1]) {
    return undefined;
  }

  return markdownMatch[1].trim().toLowerCase();
}

function isOrderedListLine(line) {
  return /^\s*\d+\.\s+/.test(line);
}

function isUnorderedListLine(line) {
  return /^\s*[-*]\s+/.test(line);
}

function isDisplayMathDelimiter(line) {
  return line.trim().startsWith("$$");
}

function parseTableRow(line) {
  const trimmed = line.trim();
  if (!trimmed.includes("|")) {
    return null;
  }

  const rawCells = trimmed.replace(/^\|/, "").replace(/\|$/, "").split("|");
  if (rawCells.length === 0) {
    return null;
  }

  return rawCells.map((cell) => cell.trim());
}

function isTableSeparatorCell(cell) {
  return /^:?-{3,}:?$/.test(cell.trim());
}

function isGfmTableStart(lines, index) {
  if (index + 1 >= lines.length) {
    return false;
  }

  const header = parseTableRow(lines[index]);
  const separator = parseTableRow(lines[index + 1]);
  if (!header || !separator || header.length === 0 || separator.length === 0) {
    return false;
  }

  if (header.length !== separator.length) {
    return false;
  }

  return separator.every((cell) => isTableSeparatorCell(cell));
}

function tableAlignmentsFromSeparator(separatorCells) {
  return separatorCells.map((cell) => {
    const normalized = cell.trim();
    if (/^:-{3,}:$/.test(normalized)) {
      return "center";
    }
    if (/^-{3,}:$/.test(normalized)) {
      return "right";
    }
    if (/^:-{3,}$/.test(normalized)) {
      return "left";
    }
    return null;
  });
}

function startsNewBlock(line) {
  const trimmed = line.trim();
  return (
    Boolean(parseWidgetMarker(trimmed)) ||
    trimmed.startsWith("```") ||
    isDisplayMathDelimiter(trimmed) ||
    /^#{1,3}\s+/.test(trimmed) ||
    isOrderedListLine(line) ||
    isUnorderedListLine(line)
  );
}

function parseWidgetMarker(line) {
  const match = /^\{\{widget:([a-z0-9][a-z0-9-]*)\}\}$/i.exec(line.trim());
  return match ? match[1].toLowerCase() : null;
}

function parseQmdSections(raw) {
  const source = removeFrontmatter(raw);
  const lines = source.split(/\r?\n/);

  const sections = [];
  const hubIntroBlocks = [];
  let hubIntroTitle = null;
  let currentSection = null;
  let hasSeenSectionHeading = false;
  let i = 0;

  const pushBlock = (block) => {
    if (currentSection) {
      currentSection.blocks.push(block);
      return;
    }
    hubIntroBlocks.push(block);
  };

  const pushSection = () => {
    if (!currentSection) {
      return;
    }

    if (currentSection.blocks.length > 0) {
      sections.push(currentSection);
    }
    currentSection = null;
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") {
      i += 1;
      continue;
    }

    const h2Match = /^##\s+(.+)$/.exec(trimmed);
    if (h2Match) {
      pushSection();
      hasSeenSectionHeading = true;
      currentSection = {
        title: normalizeText(h2Match[1]),
        blocks: []
      };
      i += 1;
      continue;
    }

    const h1Match = /^#\s+(.+)$/.exec(trimmed);
    if (h1Match) {
      if (!hasSeenSectionHeading && !hubIntroTitle) {
        hubIntroTitle = normalizeText(h1Match[1]);
      }
      i += 1;
      continue;
    }

    const h3Match = /^###\s+(.+)$/.exec(trimmed);
    if (h3Match) {
      pushBlock({ type: "subheading", text: normalizeInlineText(h3Match[1]) });
      i += 1;
      continue;
    }

    const widgetId = parseWidgetMarker(trimmed);
    if (widgetId) {
      pushBlock({ type: "widgetEmbed", widgetId });
      i += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const language = extractFenceLanguage(trimmed);
      const codeLines = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i += 1;
      }

      if (i < lines.length && lines[i].trim().startsWith("```")) {
        i += 1;
      }

      pushBlock({
        type: "codeBlock",
        language,
        code: codeLines.join("\n")
      });
      continue;
    }

    if (isDisplayMathDelimiter(trimmed)) {
      let latex = "";

      if (trimmed === "$$") {
        const mathLines = [];
        i += 1;
        while (i < lines.length && !isDisplayMathDelimiter(lines[i])) {
          mathLines.push(lines[i]);
          i += 1;
        }
        if (i < lines.length && isDisplayMathDelimiter(lines[i])) {
          i += 1;
        }
        latex = mathLines.join("\n").trim();
      } else {
        const inlineMatch = /^\$\$(.+)\$\$$/.exec(trimmed);
        if (inlineMatch) {
          latex = inlineMatch[1].trim();
          i += 1;
        } else {
          latex = trimmed.replace(/^\$\$/, "").trim();
          i += 1;
        }
      }

      if (latex) {
        pushBlock({ type: "mathDisplay", latex });
      }
      continue;
    }

    if (isGfmTableStart(lines, i)) {
      const headerCells = parseTableRow(lines[i]) ?? [];
      const separatorCells = parseTableRow(lines[i + 1]) ?? [];
      const alignments = tableAlignmentsFromSeparator(separatorCells);
      i += 2;

      const rows = [];
      while (i < lines.length) {
        const candidate = lines[i];
        if (candidate.trim() === "" || startsNewBlock(candidate) || /^##\s+/.test(candidate.trim())) {
          break;
        }

        const rowCells = parseTableRow(candidate);
        if (!rowCells || rowCells.length !== headerCells.length) {
          break;
        }

        rows.push(rowCells);
        i += 1;
      }

      if (headerCells.length > 0) {
        pushBlock({
          type: "table",
          headers: headerCells.map((cell) => normalizeInlineText(cell)),
          alignments,
          rows: rows.map((row) => row.map((cell) => normalizeInlineText(cell)))
        });
      }
      continue;
    }

    if (isOrderedListLine(line)) {
      const items = [];
      while (i < lines.length && isOrderedListLine(lines[i])) {
        const itemMatch = /^\s*\d+\.\s+(.+)$/.exec(lines[i]);
        if (itemMatch) {
          items.push(normalizeInlineText(itemMatch[1]));
        }
        i += 1;
      }

      if (items.length > 0) {
        pushBlock({ type: "orderedList", items });
      }
      continue;
    }

    if (isUnorderedListLine(line)) {
      const items = [];
      while (i < lines.length && isUnorderedListLine(lines[i])) {
        const itemMatch = /^\s*[-*]\s+(.+)$/.exec(lines[i]);
        if (itemMatch) {
          items.push(normalizeInlineText(itemMatch[1]));
        }
        i += 1;
      }

      if (items.length > 0) {
        pushBlock({ type: "unorderedList", items });
      }
      continue;
    }

    const paragraphLines = [];
    while (i < lines.length) {
      const candidate = lines[i];
      if (
        candidate.trim() === "" ||
        startsNewBlock(candidate) ||
        isGfmTableStart(lines, i) ||
        /^##\s+/.test(candidate.trim())
      ) {
        break;
      }
      paragraphLines.push(candidate);
      i += 1;
    }

    const paragraphText = normalizeInlineText(paragraphLines.join(" "));
    if (paragraphText) {
      pushBlock({ type: "paragraph", text: paragraphText });
    } else {
      i += 1;
    }
  }

  pushSection();

  return {
    sections,
    hubIntroTitle: hubIntroTitle ?? undefined,
    hubIntroBlocks: hubIntroBlocks.length > 0 ? hubIntroBlocks : undefined
  };
}

function hasMeaningfulText(text) {
  const candidate = normalizeText(text);
  if (!candidate) {
    return false;
  }

  return !placeholderPatterns.some((pattern) => pattern.test(candidate));
}

function isAuthoredSection(section) {
  for (const block of section.blocks) {
    if (block.type === "codeBlock" && block.code.trim().length > 0) {
      return true;
    }

    if (block.type === "mathDisplay") {
      if (hasMeaningfulText(block.latex)) {
        return true;
      }
      continue;
    }

    if (block.type === "table") {
      if (
        block.headers.some((header) => hasMeaningfulText(header)) ||
        block.rows.some((row) => row.some((cell) => hasMeaningfulText(cell)))
      ) {
        return true;
      }
      continue;
    }

    if (block.type === "paragraph") {
      if (hasMeaningfulText(block.text)) {
        return true;
      }
      continue;
    }

    if (block.type === "orderedList" || block.type === "unorderedList") {
      if (block.items.some((item) => hasMeaningfulText(item))) {
        return true;
      }
    }

    if (block.type === "widgetEmbed") {
      return true;
    }
  }

  return false;
}

function chapterIsAuthored(sections) {
  return sections.some((section) => isAuthoredSection(section));
}

function findSectionContentRange(pageSource) {
  const anchor = "const sectionContent: ChapterSectionContent[] = ";
  const start = pageSource.indexOf(anchor);
  if (start === -1) {
    return null;
  }

  const equalsIndex = pageSource.indexOf("=", start);
  if (equalsIndex === -1) {
    return null;
  }

  const arrayStart = pageSource.indexOf("[", equalsIndex);
  if (arrayStart === -1) {
    return null;
  }

  let i = arrayStart;
  let depth = 0;
  let inString = false;
  let stringQuote = "";
  let escaped = false;
  let arrayEnd = -1;

  while (i < pageSource.length) {
    const ch = pageSource[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === stringQuote) {
        inString = false;
      }
      i += 1;
      continue;
    }

    if (ch === '"' || ch === "'") {
      inString = true;
      stringQuote = ch;
      i += 1;
      continue;
    }

    if (ch === "[") {
      depth += 1;
    } else if (ch === "]") {
      depth -= 1;
      if (depth === 0) {
        arrayEnd = i;
        break;
      }
    }

    i += 1;
  }

  if (arrayEnd === -1) {
    return null;
  }

  const semicolonIndex = pageSource.indexOf(";", arrayEnd);
  if (semicolonIndex === -1) {
    return null;
  }

  return { start, end: semicolonIndex + 1 };
}

function updateSectionContentInPage(tsxPath, sections) {
  const pageSource = fs.readFileSync(tsxPath, "utf8");
  const range = findSectionContentRange(pageSource);
  if (!range) {
    return { updated: false, reason: "sectionContent declaration not found" };
  }

  const replacement = `const sectionContent: ChapterSectionContent[] = ${JSON.stringify(sections, null, 2)};`;
  const nextSource = `${pageSource.slice(0, range.start)}${replacement}${pageSource.slice(range.end)}`;

  if (nextSource === pageSource) {
    return { updated: false, reason: "no content change" };
  }

  fs.writeFileSync(tsxPath, nextSource, "utf8");
  return { updated: true };
}

function updateMetadataStatus(partSlug, chapterSlug) {
  const key = `${partSlug}/${chapterSlug}`;
  return key;
}

function syncMetadataStatuses(detailedChapterKeys) {
  if (!fs.existsSync(chapterMetadataPath)) {
    return 0;
  }

  const metadataSource = fs.readFileSync(chapterMetadataPath, "utf8");
  let nextSource = metadataSource.replace(
    /"status":\s*"(placeholder|detailed)"/g,
    '"status": "placeholder"'
  );

  for (const chapterKey of detailedChapterKeys) {
    const [partSlug, chapterSlug] = chapterKey.split("/");
    const escapedPart = partSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedChapter = chapterSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const objectPattern = new RegExp(
      `("chapterSlug":\\s*"${escapedChapter}"[\\s\\S]*?"partSlug":\\s*"${escapedPart}"[\\s\\S]*?"status":\\s*")placeholder(")`,
      "g"
    );
    nextSource = nextSource.replace(objectPattern, "$1detailed$2");
  }

  if (nextSource === metadataSource) {
    return 0;
  }

  fs.writeFileSync(chapterMetadataPath, nextSource, "utf8");
  return 1;
}

function syncMetadataSummaries(summaryByChapterKey) {
  if (!fs.existsSync(chapterMetadataPath) || summaryByChapterKey.size === 0) {
    return 0;
  }

  const metadataSource = fs.readFileSync(chapterMetadataPath, "utf8");
  let nextSource = metadataSource;
  let summaryUpdates = 0;

  for (const [chapterKey, summary] of summaryByChapterKey) {
    const normalizedSummary = summary.trim();
    if (!normalizedSummary) {
      continue;
    }

    const [partSlug, chapterSlug] = chapterKey.split("/");
    if (!partSlug || !chapterSlug) {
      continue;
    }

    const escapedPart = partSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedChapter = chapterSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const summaryLiteral = JSON.stringify(normalizedSummary).slice(1, -1);
    const objectPattern = new RegExp(
      `("chapterSlug":\\s*"${escapedChapter}"[\\s\\S]*?"partSlug":\\s*"${escapedPart}"[\\s\\S]*?"summary":\\s*")((?:[^"\\\\]|\\\\.)*)(")`,
      "g"
    );

    let updatedForChapter = false;
    nextSource = nextSource.replace(objectPattern, (_match, before, existing, after) => {
      if (existing === summaryLiteral) {
        return `${before}${existing}${after}`;
      }
      updatedForChapter = true;
      return `${before}${summaryLiteral}${after}`;
    });

    if (updatedForChapter) {
      summaryUpdates += 1;
    }
  }

  if (nextSource === metadataSource) {
    return 0;
  }

  fs.writeFileSync(chapterMetadataPath, nextSource, "utf8");
  return summaryUpdates;
}

function main() {
  const glossaryEntryCount = generateGlossaryData();
  const qmdFiles = walkQmdFiles(notebooksRoot);
  let metadataStatusUpdates = 0;
  let metadataSummaryUpdates = 0;
  const authoredChapterKeys = new Set();
  const summaryByChapterKey = new Map();
  const chapterSectionRecords = [];

  for (const qmdPath of qmdFiles) {
    const relative = path.relative(notebooksRoot, qmdPath);
    const parts = relative.split(path.sep);
    const partSlug = parts[0];
    const fileName = path.basename(qmdPath);
    const chapterSlug = fileName.replace(/^chapter-\d{2}-/, "").replace(/\.qmd$/, "");
    const chapterKey = updateMetadataStatus(partSlug, chapterSlug);

    const source = fs.readFileSync(qmdPath, "utf8");
    const summary = parseFrontmatterSummary(source);
    if (summary && summary.trim().length > 0) {
      summaryByChapterKey.set(chapterKey, summary.trim());
    }
    const { sections, hubIntroTitle, hubIntroBlocks } = parseQmdSections(source);
    const authored = chapterIsAuthored(sections);
    const sectionRecords = sections.map((section, sectionIndex) => ({
      index: sectionIndex + 1,
      title: section.title,
      slug: sectionSlugFromTitle(section.title, sectionIndex + 1),
      content: section
    }));

    chapterSectionRecords.push({
      partSlug,
      chapterSlug,
      sections: sectionRecords,
      hubIntroTitle,
      hubIntroBlocks
    });

    if (authored) {
      authoredChapterKeys.add(chapterKey);
    }
  }

  for (const pinnedKey of alwaysDetailedChapterKeys) {
    authoredChapterKeys.add(pinnedKey);
  }

  const manifestUpdated = writeGeneratedChapterSections(chapterSectionRecords);
  const { updatedHubPages, updatedSectionPages, removedSectionPages } = syncChapterAndSectionPages(
    chapterSectionRecords
  );
  metadataStatusUpdates = syncMetadataStatuses(authoredChapterKeys);
  metadataSummaryUpdates = syncMetadataSummaries(summaryByChapterKey);

  console.log(
    [
      `QMD -> TSX sync complete.`,
      `updated chapter hubs: ${updatedHubPages}`,
      `updated section pages: ${updatedSectionPages}`,
      `removed section pages: ${removedSectionPages}`,
      `updated section manifest: ${manifestUpdated ? 1 : 0}`,
      `metadata status updates: ${metadataStatusUpdates}`,
      `metadata summary updates: ${metadataSummaryUpdates}`,
      `generated glossary entries: ${glossaryEntryCount}`
    ].join(" ")
  );
}

main();
