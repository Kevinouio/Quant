import { chapterHref, chaptersByPart, type ChapterMeta } from "../../lib/chapterMetadata";
import { getHubPager } from "../../lib/readingFlow";
import { DocsShell } from "./DocsShell";
import type { ChapterSectionRouteLink } from "./ChapterPageLayout";
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
  sections
}: {
  chapter: ChapterMeta;
  sections: ChapterSectionRouteLink[];
}) {
  const chapterPrefix = chapterNumberPrefix(chapter);
  const pager = getHubPager(chapter.partSlug, chapter.chapterSlug);

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

        <PagePager prev={pager.prev} next={pager.next} />
      </article>
    </DocsShell>
  );
}
