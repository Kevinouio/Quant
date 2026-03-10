import type { ReactNode } from "react";

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

export function ChapterPageLayout({
  chapter,
  sectionContent,
  sectionExtras
}: {
  chapter: ChapterMeta;
  sectionContent: ChapterSectionContent[];
  sectionExtras?: Record<string, ReactNode>;
}) {
  const sectionIdByTitle = Object.fromEntries(
    sectionContent.map((section) => [section.title, toSectionId(section.title)])
  );

  const tocItems = [
    { href: "#overview", label: "Overview" },
    ...sectionContent.map((section) => ({
      href: `#${sectionIdByTitle[section.title]}`,
      label: section.title
    }))
  ];

  const sidebarGroups = chaptersByPart.map((part) => ({
    title: `Part ${part.partNumber}. ${part.partTitle}`,
    items: part.chapters.map((candidate) => ({
      href: chapterHref(candidate),
      label: chapterDisplayLabel(candidate),
      active: candidate.partSlug === chapter.partSlug && candidate.chapterSlug === chapter.chapterSlug
    }))
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

        {sectionContent.map((section) => (
          <section className="article-section" id={sectionIdByTitle[section.title]} key={section.title}>
            <h2>{section.title}</h2>
            {section.blocks ? (
              section.blocks.map((block, blockIndex) => {
                if (block.type === "paragraph") {
                  return <p key={`${section.title}-block-${blockIndex}`}>{block.text}</p>;
                }

                if (block.type === "subheading") {
                  return <h3 key={`${section.title}-block-${blockIndex}`}>{block.text}</h3>;
                }

                if (block.type === "unorderedList") {
                  return (
                    <ul key={`${section.title}-block-${blockIndex}`}>
                      {block.items.map((item) => (
                        <li key={`${section.title}-block-${blockIndex}-${item}`}>{item}</li>
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
                      <li key={`${section.title}-block-${blockIndex}-${item}`}>{item}</li>
                    ))}
                  </ol>
                );
              })
            ) : (
              <>
                {section.paragraphs?.map((paragraph, index) => (
                  <p key={`${section.title}-${index}`}>{paragraph}</p>
                ))}
                {section.orderedLists?.map((items, listIndex) => (
                  <ol key={`${section.title}-ol-${listIndex}`}>
                    {items.map((item) => (
                      <li key={`${section.title}-ol-${listIndex}-${item}`}>{item}</li>
                    ))}
                  </ol>
                ))}
                {section.unorderedLists?.map((items, listIndex) => (
                  <ul key={`${section.title}-ul-${listIndex}`}>
                    {items.map((item) => (
                      <li key={`${section.title}-ul-${listIndex}-${item}`}>{item}</li>
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
