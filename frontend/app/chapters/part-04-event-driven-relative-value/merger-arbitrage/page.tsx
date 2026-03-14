import { notFound } from "next/navigation";
import { ChapterHubPageLayout } from "../../../../components/layout/ChapterHubPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";
import { chapterHubIntroByRoute, chapterSectionHref, chapterSectionsByRoute, type ChapterSectionRouteRecord } from "../../../../lib/generatedChapterSections";

const partSlug = "part-04-event-driven-relative-value";
const chapterSlug = "merger-arbitrage";

export default function Page() {
  const chapter = chapterByRoute(partSlug, chapterSlug);

  if (!chapter) {
    notFound();
  }

  const sections = chapterSectionsByRoute(partSlug, chapterSlug).map((section: ChapterSectionRouteRecord) => ({
    index: section.index,
    title: section.title,
    slug: section.slug,
    href: chapterSectionHref(partSlug, chapterSlug, section.slug)
  }));
  const hubIntro = chapterHubIntroByRoute(partSlug, chapterSlug);

  return <ChapterHubPageLayout chapter={chapter} sections={sections} hubIntroTitle={hubIntro?.title} hubIntroBlocks={hubIntro?.blocks} />;
}
