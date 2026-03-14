import { chapterHref, chaptersByPart, type ChapterMeta } from "../../lib/chapterMetadata";
import { getHubPager } from "../../lib/readingFlow";
import { DocsShell } from "./DocsShell";
import {
  renderInlineMarkdown,
  renderMathNode,
  type ChapterSectionContent,
  type ChapterSectionRouteLink
} from "./ChapterPageLayout";
import { PagePager } from "./PagePager";

function chapterDisplayLabel(chapter: ChapterMeta): string {
  if (chapter.chapterCode) {
    return `Appendix ${chapter.chapterCode}. ${chapter.chapterTitle}`;
  }

  return `Chapter ${chapter.chapterNumber}. ${chapter.chapterTitle}`;
}

function chapterNumberPrefix(chapter: ChapterMeta): string {
  return chapter.chapterCode ?? `${chapter.chapterNumber}`;
}

export function ChapterHubPageLayout({
  chapter,
  sections,
  hubIntroTitle,
  hubIntroBlocks
}: {
  chapter: ChapterMeta;
  sections: ChapterSectionRouteLink[];
  hubIntroTitle?: string;
  hubIntroBlocks?: ChapterSectionContent["blocks"];
}) {
  const chapterPrefix = chapterNumberPrefix(chapter);
  const pager = getHubPager(chapter.partSlug, chapter.chapterSlug);
  const hasHubIntro = Boolean(hubIntroBlocks && hubIntroBlocks.length > 0);

  const sidebarGroups = chaptersByPart.map((part) => ({
    title: `Part ${part.partNumber}. ${part.partTitle}`,
    items: part.chapters.map((candidate) => {
      const isActiveChapter =
        candidate.partSlug === chapter.partSlug && candidate.chapterSlug === chapter.chapterSlug;
      const chapterId = `${candidate.partSlug}/${candidate.chapterSlug}`;

      const children = isActiveChapter
        ? sections.map((section) => ({
            id: `${chapterId}:${section.slug}`,
            href: section.href,
            label: `${chapterPrefix}.${section.index} ${section.title}`
          }))
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

  const tocItems = [
    { href: "#overview", label: "Overview", level: 1 },
    ...sections.map((section) => ({
      href: section.href,
      label: `${chapterPrefix}.${section.index} ${section.title}`,
      level: 1
    }))
  ];

  return (
    <DocsShell
      sidebarHomeLink={{ href: "/", label: "Home" }}
      sidebarGroups={sidebarGroups}
      tocItems={tocItems}
      rightPanelTitle="On This Chapter"
      topbarBrandHref="/"
      topbarBrandLabel="Quant Docs"
      navNote={`Part ${chapter.partNumber} chapter hub. Status: ${chapter.status}.`}
    >
      <article className="article">
        <header className="hero" id="overview">
          <p className="eyebrow">
            {chapter.chapterCode ? `Appendix ${chapter.chapterCode}` : `Chapter ${chapter.chapterNumber}`}
          </p>
          <h1>{chapterDisplayLabel(chapter)}</h1>
          <p>{chapter.summary}</p>
        </header>

        <section className="article-section" id="sections">
          <h2>Sections</h2>
          <ul>
            {sections.map((section) => (
              <li key={section.slug}>
                <a href={section.href}>{`${chapterPrefix}.${section.index} ${section.title}`}</a>
              </li>
            ))}
          </ul>
        </section>

        {hasHubIntro ? (
          <section className="article-section" id="chapter-introduction">
            <h2>{hubIntroTitle?.trim() || "Introduction"}</h2>
            {hubIntroBlocks?.map((block, blockIndex) => {
              if (block.type === "paragraph") {
                return (
                  <p key={`hub-intro-block-${blockIndex}`}>{renderInlineMarkdown(block.text)}</p>
                );
              }

              if (block.type === "subheading") {
                return (
                  <h3 id={`chapter-introduction-subheading-${blockIndex + 1}`} key={`hub-intro-block-${blockIndex}`}>
                    {renderInlineMarkdown(block.text)}
                  </h3>
                );
              }

              if (block.type === "unorderedList") {
                return (
                  <ul key={`hub-intro-block-${blockIndex}`}>
                    {block.items.map((item) => (
                      <li key={`hub-intro-block-${blockIndex}-${item}`}>{renderInlineMarkdown(item)}</li>
                    ))}
                  </ul>
                );
              }

              if (block.type === "orderedList") {
                return (
                  <ol key={`hub-intro-block-${blockIndex}`}>
                    {block.items.map((item) => (
                      <li key={`hub-intro-block-${blockIndex}-${item}`}>{renderInlineMarkdown(item)}</li>
                    ))}
                  </ol>
                );
              }

              if (block.type === "mathDisplay") {
                return renderMathNode({
                  latex: block.latex,
                  displayMode: true,
                  key: `hub-intro-block-${blockIndex}`
                });
              }

              if (block.type === "table") {
                return (
                  <table key={`hub-intro-block-${blockIndex}`}>
                    <thead>
                      <tr>
                        {block.headers.map((header, columnIndex) => (
                          <th
                            key={`hub-intro-block-${blockIndex}-header-${columnIndex}`}
                            style={{ textAlign: block.alignments[columnIndex] ?? undefined }}
                          >
                            {renderInlineMarkdown(header)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr key={`hub-intro-block-${blockIndex}-row-${rowIndex}`}>
                          {block.headers.map((_header, columnIndex) => (
                            <td
                              key={`hub-intro-block-${blockIndex}-row-${rowIndex}-cell-${columnIndex}`}
                              style={{ textAlign: block.alignments[columnIndex] ?? undefined }}
                            >
                              {renderInlineMarkdown(row[columnIndex] ?? "")}
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
                  <pre key={`hub-intro-block-${blockIndex}`}>
                    <code className={languageClass}>{block.code}</code>
                  </pre>
                );
              }

              return (
                <div className="callout widget-embed-warning" key={`hub-intro-block-${blockIndex}`}>
                  {`Widgets are not supported in chapter introductions: ${block.widgetId}`}
                </div>
              );
            })}
          </section>
        ) : null}

        <PagePager prev={pager.prev} next={pager.next} />
      </article>
    </DocsShell>
  );
}
