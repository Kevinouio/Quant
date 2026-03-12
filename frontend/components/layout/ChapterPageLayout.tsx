import type { ReactNode } from "react";
import katex from "katex";

import { GlossaryInlineTerm } from "../glossary/GlossaryInlineTerm";
import { glossaryAnchorId, normalizeGlossaryKey, resolveGlossaryTermId } from "../../lib/glossary";
import { chapterHref, chaptersByPart, type ChapterMeta } from "../../lib/chapterMetadata";
import { getSectionPager } from "../../lib/readingFlow";
import { DocsShell } from "./DocsShell";
import { PagePager } from "./PagePager";

export type ChapterSectionContent = {
  title: string;
  paragraphs?: string[];
  orderedLists?: string[][];
  unorderedLists?: string[][];
  blocks?: Array<
    | { type: "paragraph"; text: string }
    | { type: "orderedList"; items: string[] }
    | { type: "unorderedList"; items: string[] }
    | { type: "subheading"; text: string }
    | { type: "codeBlock"; language?: string; code: string }
    | { type: "mathDisplay"; latex: string }
    | {
        type: "table";
        headers: string[];
        alignments: Array<"left" | "center" | "right" | null>;
        rows: string[][];
      }
  >;
};

export type ChapterSectionRouteLink = {
  index: number;
  title: string;
  slug: string;
  href: string;
};

function toSectionId(section: string): string {
  return section
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function chapterDisplayLabel(chapter: ChapterMeta): string {
  if (chapter.chapterCode) {
    return `Appendix ${chapter.chapterCode}. ${chapter.chapterTitle}`;
  }

  return `Chapter ${chapter.chapterNumber}. ${chapter.chapterTitle}`;
}

function chapterNumberPrefix(chapter: ChapterMeta): string {
  return chapter.chapterCode ?? `${chapter.chapterNumber}`;
}

function parseGlossaryToken(token: string): { lookup: string; displayText: string } | null {
  if (!token.startsWith("[[") || !token.endsWith("]]")) {
    return null;
  }

  const payload = token.slice(2, -2).trim();
  if (!payload) {
    return null;
  }

  const separatorIndex = payload.indexOf("|");
  if (separatorIndex === -1) {
    return { lookup: payload, displayText: payload };
  }

  const lookup = payload.slice(0, separatorIndex).trim();
  const displayText = payload.slice(separatorIndex + 1).trim();
  if (!lookup || !displayText) {
    return null;
  }

  return { lookup, displayText };
}

function isEscaped(text: string, index: number): boolean {
  let slashCount = 0;
  for (let i = index - 1; i >= 0 && text[i] === "\\"; i -= 1) {
    slashCount += 1;
  }
  return slashCount % 2 === 1;
}

function renderMathNode({
  latex,
  displayMode,
  key
}: {
  latex: string;
  displayMode: boolean;
  key: string;
}): ReactNode {
  try {
    const html = katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      strict: "ignore"
    });

    if (displayMode) {
      return <div className="math-display" key={key} dangerouslySetInnerHTML={{ __html: html }} />;
    }

    return <span className="math-inline" key={key} dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (_error) {
    return displayMode ? (
      <pre className="math-fallback" key={key}>
        {latex}
      </pre>
    ) : (
      <span className="math-fallback" key={key}>
        {`$${latex}$`}
      </span>
    );
  }
}

function isLikelyCurrencyValue(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) {
    return false;
  }

  return /^[+-]?\d{1,3}(?:,\d{3})*(?:\.\d+)?(?:[kKmMbB])?$/.test(trimmed) || /^[+-]?\d+(?:\.\d+)?(?:[kKmMbB])?$/.test(trimmed);
}

function isLikelyMathExpression(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) {
    return false;
  }

  if (isLikelyCurrencyValue(trimmed)) {
    return false;
  }

  if (/[\\^_=+\-*/<>()[\]{}]/.test(trimmed)) {
    return true;
  }

  if (/^[A-Za-z](?:_[A-Za-z0-9]+)?$/.test(trimmed)) {
    return true;
  }

  return false;
}

function normalizePlainText(text: string): string {
  return text.replace(/\\\$/g, "$");
}

function renderInlineMath(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let plainStart = 0;
  let mathIndex = 0;

  const pushPlain = (endExclusive: number) => {
    if (endExclusive <= plainStart) {
      return;
    }
    nodes.push(normalizePlainText(text.slice(plainStart, endExclusive)));
  };

  while (cursor < text.length) {
    const currentChar = text[cursor];
    if (currentChar !== "$" || isEscaped(text, cursor)) {
      cursor += 1;
      continue;
    }

    let closing = cursor + 1;
    while (closing < text.length) {
      if (text[closing] === "$" && !isEscaped(text, closing)) {
        break;
      }
      closing += 1;
    }

    if (closing >= text.length) {
      cursor += 1;
      continue;
    }

    const candidate = text.slice(cursor + 1, closing);
    if (!isLikelyMathExpression(candidate)) {
      cursor += 1;
      continue;
    }

    pushPlain(cursor);
    nodes.push(
      renderMathNode({
        latex: candidate.trim(),
        displayMode: false,
        key: `${keyPrefix}-math-${mathIndex}`
      })
    );
    mathIndex += 1;
    cursor = closing + 1;
    plainStart = cursor;
  }

  pushPlain(text.length);
  return nodes;
}

function renderInlineMarkdown(text: string): ReactNode {
  const tokenPattern = /(\[\[[^[\]\n]+\]\]|\*\*[^*\n]+\*\*|__[^_\n]+__|\*[^*\n]+\*|_[^_\n]+_)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null = null;

  while (true) {
    match = tokenPattern.exec(text);
    if (!match) {
      break;
    }

    if (match.index > lastIndex) {
      nodes.push(...renderInlineMath(text.slice(lastIndex, match.index), `plain-${match.index}`));
    }

    const token = match[0];
    const key = `${match.index}-${token}`;

    const glossaryToken = parseGlossaryToken(token);
    if (glossaryToken) {
      nodes.push(
        <GlossaryInlineTerm key={key} lookup={glossaryToken.lookup}>
          {glossaryToken.displayText}
        </GlossaryInlineTerm>
      );
    } else if (
      (token.startsWith("**") && token.endsWith("**")) ||
      (token.startsWith("__") && token.endsWith("__"))
    ) {
      nodes.push(<strong key={key}>{renderInlineMath(token.slice(2, -2), `${key}-strong`)}</strong>);
    } else {
      nodes.push(<em key={key}>{renderInlineMath(token.slice(1, -1), `${key}-em`)}</em>);
    }

    lastIndex = tokenPattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(...renderInlineMath(text.slice(lastIndex), `plain-tail-${lastIndex}`));
  }

  if (nodes.length === 0) {
    return normalizePlainText(text);
  }

  return nodes;
}

function glossaryHeadingFromParagraph(text: string): string | null {
  const match = /^\*\*([^*\n]+)\*\*$/.exec(text.trim());
  return match ? match[1].trim() : null;
}

export function ChapterPageLayout({
  chapter,
  sectionContent,
  sectionExtras,
  chapterSections,
  activeSectionSlug,
  sectionIndexOffset = 0
}: {
  chapter: ChapterMeta;
  sectionContent: ChapterSectionContent[];
  sectionExtras?: Record<string, ReactNode>;
  chapterSections?: ChapterSectionRouteLink[];
  activeSectionSlug?: string;
  sectionIndexOffset?: number;
}) {
  const renderCell = (row: string[], columnIndex: number): ReactNode =>
    renderInlineMarkdown(row[columnIndex] ?? "");

  const chapterPrefix = chapterNumberPrefix(chapter);
  const pager = getSectionPager(chapter.partSlug, chapter.chapterSlug, activeSectionSlug);
  const rightChapterContextItems = chapterSections?.map((chapterSection) => ({
    id: `${chapter.partSlug}/${chapter.chapterSlug}/${chapterSection.slug}`,
    href: chapterSection.href,
    label: `${chapterPrefix}.${chapterSection.index} ${chapterSection.title}`,
    active: chapterSection.slug === activeSectionSlug
  }));
  const sectionModels = sectionContent.map((section, sectionIndex) => {
    const sectionId = toSectionId(section.title);
    const sectionNumber = `${chapterPrefix}.${sectionIndexOffset + sectionIndex + 1}`;
    const sectionLabel = `${sectionNumber} ${section.title}`;
    const subheadingIdsByBlockIndex = new Map<number, string>();
    const subheadingLabelsByBlockIndex = new Map<number, string>();
    let subheadingCount = 0;

    section.blocks?.forEach((block, blockIndex) => {
      if (block.type === "subheading") {
        subheadingCount += 1;
        const subheadingId = toSectionId(`${section.title}-${block.text}-${subheadingCount}`);
        const subheadingLabel = `${sectionNumber}.${subheadingCount} ${block.text}`;
        subheadingIdsByBlockIndex.set(blockIndex, subheadingId);
        subheadingLabelsByBlockIndex.set(blockIndex, subheadingLabel);
      }
    });

    return { section, sectionId, sectionIndex, sectionLabel, subheadingIdsByBlockIndex, subheadingLabelsByBlockIndex };
  });

  const tocItems = [
    { href: "#overview", label: "Overview", level: 1 },
    ...sectionModels.flatMap(({ section, sectionId, sectionLabel, subheadingIdsByBlockIndex, subheadingLabelsByBlockIndex }) => {
      const items: { href: string; label: string; level: number }[] = [
        { href: `#${sectionId}`, label: sectionLabel, level: 2 }
      ];

      section.blocks?.forEach((block, blockIndex) => {
        if (block.type === "subheading") {
          const subheadingId = subheadingIdsByBlockIndex.get(blockIndex);
          const subheadingLabel = subheadingLabelsByBlockIndex.get(blockIndex);
          if (subheadingId) {
            items.push({ href: `#${subheadingId}`, label: subheadingLabel ?? block.text, level: 3 });
          }
        }
      });

      return items;
    })
  ];

  const sidebarGroups = chaptersByPart.map((part) => ({
    title: `Part ${part.partNumber}. ${part.partTitle}`,
    items: part.chapters.map((candidate) => {
      const isActiveChapter =
        candidate.partSlug === chapter.partSlug && candidate.chapterSlug === chapter.chapterSlug;
      const chapterId = `${candidate.partSlug}/${candidate.chapterSlug}`;
      const activeSectionModel = sectionModels[0];

      const children = isActiveChapter
        ? chapterSections
          ? chapterSections.map((chapterSection) => {
              const sectionNavId = `${chapterId}:${chapterSection.slug}`;
              const isActiveSection = chapterSection.slug === activeSectionSlug;
              const label = `${chapterPrefix}.${chapterSection.index} ${chapterSection.title}`;
              const subheadingChildren =
                isActiveSection && activeSectionModel
                  ? activeSectionModel.section.blocks
                      ?.map((block, blockIndex) => {
                        if (block.type !== "subheading") {
                          return null;
                        }

                        const subheadingId = activeSectionModel.subheadingIdsByBlockIndex.get(blockIndex);
                        if (!subheadingId) {
                          return null;
                        }

                        return {
                          id: `${sectionNavId}:${subheadingId}`,
                          href: `#${subheadingId}`,
                          label:
                            activeSectionModel.subheadingLabelsByBlockIndex.get(blockIndex) ?? block.text
                        };
                      })
                      .filter(
                        (
                          subheading
                        ): subheading is {
                          id: string;
                          href: string;
                          label: string;
                        } => Boolean(subheading)
                      )
                  : undefined;

              return {
                id: sectionNavId,
                href: chapterSection.href,
                label,
                active: isActiveSection,
                children: subheadingChildren
              };
            })
          : sectionModels.map(
              ({
                sectionId,
                sectionLabel,
                section,
                subheadingIdsByBlockIndex,
                subheadingLabelsByBlockIndex
              }) => ({
                id: `${chapterId}:${sectionId}`,
                href: `#${sectionId}`,
                label: sectionLabel,
                children: section.blocks
                  ?.map((block, blockIndex) => {
                    if (block.type !== "subheading") {
                      return null;
                    }

                    const subheadingId = subheadingIdsByBlockIndex.get(blockIndex);
                    if (!subheadingId) {
                      return null;
                    }

                    return {
                      id: `${chapterId}:${sectionId}:${subheadingId}`,
                      href: `#${subheadingId}`,
                      label: subheadingLabelsByBlockIndex.get(blockIndex) ?? block.text
                    };
                  })
                  .filter((subheading): subheading is { id: string; href: string; label: string } => Boolean(subheading))
              })
            )
        : undefined;

      return {
        id: chapterId,
        href: chapterHref(candidate),
        label: chapterDisplayLabel(candidate),
        active: isActiveChapter,
        children
      };
    })
  }));

  return (
    <DocsShell
      sidebarHomeLink={{ href: "/", label: "Home" }}
      sidebarGroups={sidebarGroups}
      tocItems={tocItems}
      chapterContextItems={rightChapterContextItems}
      rightPanelTitle="On This Chapter"
      topbarBrandHref="/"
      topbarBrandLabel="Quant Docs"
      navNote={`Part ${chapter.partNumber} chapter page. Status: ${chapter.status}.`}
    >
      <article className="article">
        <header className="hero" id="overview">
          <p className="eyebrow">
            {chapter.chapterCode ? `Appendix ${chapter.chapterCode}` : `Chapter ${chapter.chapterNumber}`}
          </p>
          <h1>{chapterDisplayLabel(chapter)}</h1>
          <p>{chapter.summary}</p>
        </header>

        {sectionModels.map(({ section, sectionId, sectionLabel, subheadingIdsByBlockIndex, subheadingLabelsByBlockIndex }) => (
          <section className="article-section" id={sectionId} key={section.title}>
            <h2>{sectionLabel}</h2>
            {section.blocks ? (
              section.blocks.map((block, blockIndex) => {
                if (block.type === "paragraph") {
                  const glossaryHeading =
                    chapter.partSlug === "part-10-glossary" ? glossaryHeadingFromParagraph(block.text) : null;

                  if (glossaryHeading) {
                    const glossaryTermId = resolveGlossaryTermId(glossaryHeading) ?? normalizeGlossaryKey(glossaryHeading);
                    return (
                      <h3
                        id={glossaryAnchorId(glossaryTermId)}
                        className="glossary-entry-heading"
                        key={`${section.title}-block-${blockIndex}`}
                      >
                        {glossaryHeading}
                      </h3>
                    );
                  }

                  return <p key={`${section.title}-block-${blockIndex}`}>{renderInlineMarkdown(block.text)}</p>;
                }

                if (block.type === "subheading") {
                  const subheadingId = subheadingIdsByBlockIndex.get(blockIndex);
                  const subheadingLabel = subheadingLabelsByBlockIndex.get(blockIndex) ?? block.text;
                  return (
                    <h3 id={subheadingId} key={`${section.title}-block-${blockIndex}`}>
                      {renderInlineMarkdown(subheadingLabel)}
                    </h3>
                  );
                }

                if (block.type === "unorderedList") {
                  return (
                    <ul key={`${section.title}-block-${blockIndex}`}>
                      {block.items.map((item) => (
                        <li key={`${section.title}-block-${blockIndex}-${item}`}>{renderInlineMarkdown(item)}</li>
                      ))}
                    </ul>
                  );
                }

                if (block.type === "mathDisplay") {
                  return renderMathNode({
                    latex: block.latex,
                    displayMode: true,
                    key: `${section.title}-block-${blockIndex}`
                  });
                }

                if (block.type === "table") {
                  return (
                    <table key={`${section.title}-block-${blockIndex}`}>
                      <thead>
                        <tr>
                          {block.headers.map((header, columnIndex) => (
                            <th
                              key={`${section.title}-block-${blockIndex}-header-${columnIndex}`}
                              style={{ textAlign: block.alignments[columnIndex] ?? undefined }}
                            >
                              {renderInlineMarkdown(header)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, rowIndex) => (
                          <tr key={`${section.title}-block-${blockIndex}-row-${rowIndex}`}>
                            {block.headers.map((_header, columnIndex) => (
                              <td
                                key={`${section.title}-block-${blockIndex}-row-${rowIndex}-cell-${columnIndex}`}
                                style={{ textAlign: block.alignments[columnIndex] ?? undefined }}
                              >
                                {renderCell(row, columnIndex)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                }

                if (block.type === "codeBlock") {
                  const languageClass = block.language ? `language-${block.language}` : undefined;
                  return (
                    <pre key={`${section.title}-block-${blockIndex}`}>
                      <code className={languageClass}>{block.code}</code>
                    </pre>
                  );
                }

                return (
                  <ol key={`${section.title}-block-${blockIndex}`}>
                    {block.items.map((item) => (
                      <li key={`${section.title}-block-${blockIndex}-${item}`}>{renderInlineMarkdown(item)}</li>
                    ))}
                  </ol>
                );
              })
            ) : (
              <>
                {section.paragraphs?.map((paragraph, index) => (
                  <p key={`${section.title}-${index}`}>{renderInlineMarkdown(paragraph)}</p>
                ))}
                {section.orderedLists?.map((items, listIndex) => (
                  <ol key={`${section.title}-ol-${listIndex}`}>
                    {items.map((item) => (
                      <li key={`${section.title}-ol-${listIndex}-${item}`}>{renderInlineMarkdown(item)}</li>
                    ))}
                  </ol>
                ))}
                {section.unorderedLists?.map((items, listIndex) => (
                  <ul key={`${section.title}-ul-${listIndex}`}>
                    {items.map((item) => (
                      <li key={`${section.title}-ul-${listIndex}-${item}`}>{renderInlineMarkdown(item)}</li>
                    ))}
                  </ul>
                ))}
              </>
            )}
            {sectionExtras?.[section.title]}
          </section>
        ))}

        <PagePager prev={pager.prev} next={pager.next} />
      </article>
    </DocsShell>
  );
}
