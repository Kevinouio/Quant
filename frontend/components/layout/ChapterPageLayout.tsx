import type { ReactNode } from "react";

import { GlossaryInlineTerm } from "../glossary/GlossaryInlineTerm";
import { glossaryAnchorId, normalizeGlossaryKey, resolveGlossaryTermId } from "../../lib/glossary";
import { chapterHref, chaptersByPart, type ChapterMeta } from "../../lib/chapterMetadata";
import { DocsShell } from "./DocsShell";

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
  >;
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
      nodes.push(text.slice(lastIndex, match.index));
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
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }

    lastIndex = tokenPattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length === 0 ? text : nodes;
}

function glossaryHeadingFromParagraph(text: string): string | null {
  const match = /^\*\*([^*\n]+)\*\*$/.exec(text.trim());
  return match ? match[1].trim() : null;
}

export function ChapterPageLayout({
  chapter,
  sectionContent,
  sectionExtras
}: {
  chapter: ChapterMeta;
  sectionContent: ChapterSectionContent[];
  sectionExtras?: Record<string, ReactNode>;
}) {
  const chapterPrefix = chapterNumberPrefix(chapter);
  const sectionModels = sectionContent.map((section, sectionIndex) => {
    const sectionId = toSectionId(section.title);
    const sectionNumber = `${chapterPrefix}.${sectionIndex + 1}`;
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

      const children = isActiveChapter
        ? sectionModels.map(
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
      </article>
    </DocsShell>
  );
}
