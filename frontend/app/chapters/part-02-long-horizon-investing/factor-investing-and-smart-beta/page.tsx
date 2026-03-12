import { notFound } from "next/navigation";
import { ChapterHubPageLayout } from "../../../../components/layout/ChapterHubPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";
import { chapterSectionHref, chapterSectionsByRoute, type ChapterSectionRouteRecord } from "../../../../lib/generatedChapterSections";

const partSlug = "part-02-long-horizon-investing";
const chapterSlug = "factor-investing-and-smart-beta";

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

  return <ChapterHubPageLayout chapter={chapter} sections={sections} />;
}
