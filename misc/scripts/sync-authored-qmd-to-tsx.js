const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..");
const notebooksRoot = path.join(repoRoot, "notebooks", "chapters");
const frontendChaptersRoot = path.join(repoRoot, "frontend", "app", "chapters");
const chapterMetadataPath = path.join(repoRoot, "frontend", "lib", "chapterMetadata.ts");

const syncAll = process.argv.includes("--all");

const placeholderPatterns = [
  /placeholder for /i,
  /add concrete definitions, formulas, and implementation notes in a later pass\.?/i,
  /draft chapter \d+ content before turning it into a tsx chapter page\.?/i,
  /draft appendix [A-Z] content before turning it into a tsx chapter page\.?/i
];

const alwaysDetailedChapterKeys = new Set(["part-02-long-horizon-investing/passive-indexing-and-benchmarking"]);

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

function removeFrontmatter(raw) {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
}

function normalizeText(text) {
  return text.trim().replace(/\s+/g, " ");
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

function startsNewBlock(line) {
  const trimmed = line.trim();
  return (
    trimmed.startsWith("```") ||
    /^#{1,3}\s+/.test(trimmed) ||
    isOrderedListLine(line) ||
    isUnorderedListLine(line)
  );
}

function parseQmdSections(raw) {
  const source = removeFrontmatter(raw);
  const lines = source.split(/\r?\n/);

  const sections = [];
  const preambleBlocks = [];
  let currentSection = null;
  let i = 0;

  const pushBlock = (block) => {
    if (currentSection) {
      currentSection.blocks.push(block);
      return;
    }
    preambleBlocks.push(block);
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
      currentSection = {
        title: normalizeText(h2Match[1]),
        blocks: []
      };
      i += 1;
      continue;
    }

    // Ignore top-level structural headings in the notebook body.
    if (/^#\s+/.test(trimmed)) {
      i += 1;
      continue;
    }

    const h3Match = /^###\s+(.+)$/.exec(trimmed);
    if (h3Match) {
      pushBlock({ type: "subheading", text: normalizeText(h3Match[1]) });
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

    if (isOrderedListLine(line)) {
      const items = [];
      while (i < lines.length && isOrderedListLine(lines[i])) {
        const itemMatch = /^\s*\d+\.\s+(.+)$/.exec(lines[i]);
        if (itemMatch) {
          items.push(normalizeText(itemMatch[1]));
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
          items.push(normalizeText(itemMatch[1]));
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
      if (candidate.trim() === "" || startsNewBlock(candidate) || /^##\s+/.test(candidate.trim())) {
        break;
      }
      paragraphLines.push(candidate);
      i += 1;
    }

    const paragraphText = normalizeText(paragraphLines.join(" "));
    if (paragraphText) {
      pushBlock({ type: "paragraph", text: paragraphText });
    } else {
      i += 1;
    }
  }

  pushSection();

  if (preambleBlocks.length > 0) {
    if (sections.length === 0) {
      sections.push({ title: "Notes", blocks: preambleBlocks });
    } else {
      sections[0].blocks = [...preambleBlocks, ...sections[0].blocks];
    }
  }

  return sections;
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

  const arrayStart = pageSource.indexOf("[", start);
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

function main() {
  const qmdFiles = walkQmdFiles(notebooksRoot);
  let updatedPages = 0;
  let skippedScaffold = 0;
  let missingPage = 0;
  let metadataUpdates = 0;
  let unchangedPages = 0;
  const authoredChapterKeys = new Set();

  for (const qmdPath of qmdFiles) {
    const relative = path.relative(notebooksRoot, qmdPath);
    const parts = relative.split(path.sep);
    const partSlug = parts[0];
    const fileName = path.basename(qmdPath);
    const chapterSlug = fileName.replace(/^chapter-\d{2}-/, "").replace(/\.qmd$/, "");

    const source = fs.readFileSync(qmdPath, "utf8");
    const sections = parseQmdSections(source);
    const authored = chapterIsAuthored(sections);
    const chapterKey = updateMetadataStatus(partSlug, chapterSlug);

    if (authored) {
      authoredChapterKeys.add(chapterKey);
    }

    if (!syncAll && !authored) {
      skippedScaffold += 1;
      continue;
    }

    const tsxPath = path.join(frontendChaptersRoot, partSlug, chapterSlug, "page.tsx");
    if (!fs.existsSync(tsxPath)) {
      missingPage += 1;
      continue;
    }

    const result = updateSectionContentInPage(tsxPath, sections);
    if (result.updated) {
      updatedPages += 1;
    } else {
      unchangedPages += 1;
    }

  }

  if (syncAll) {
    for (const qmdPath of qmdFiles) {
      const relative = path.relative(notebooksRoot, qmdPath);
      const parts = relative.split(path.sep);
      const partSlug = parts[0];
      const fileName = path.basename(qmdPath);
      const chapterSlug = fileName.replace(/^chapter-\d{2}-/, "").replace(/\.qmd$/, "");
      authoredChapterKeys.add(`${partSlug}/${chapterSlug}`);
    }
  }

  for (const pinnedKey of alwaysDetailedChapterKeys) {
    authoredChapterKeys.add(pinnedKey);
  }

  metadataUpdates = syncMetadataStatuses(authoredChapterKeys);

  console.log(
    [
      `QMD -> TSX sync complete.`,
      `updated pages: ${updatedPages}`,
      `unchanged pages: ${unchangedPages}`,
      `skipped scaffold chapters: ${skippedScaffold}`,
      `missing chapter pages: ${missingPage}`,
      `metadata status updates: ${metadataUpdates}`,
      `mode: ${syncAll ? "all chapters" : "authored only"}`
    ].join(" ")
  );
}

main();
