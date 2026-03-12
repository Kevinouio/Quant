import { notFound } from "next/navigation";
import { ChapterPageLayout } from "../../../../../components/layout/ChapterPageLayout";
import { sectionExtraForRoute } from "../../../../../components/layout/sectionExtrasRegistry";
import { chapterByRoute } from "../../../../../lib/chapterMetadata";
import { chapterSectionByRoute, chapterSectionHref, chapterSectionsByRoute, type ChapterSectionRouteRecord } from "../../../../../lib/generatedChapterSections";

const partSlug = "part-01-foundations";
const chapterSlug = "risk-volatility-and-drawdowns";
const sectionSlug = "s02-sections";

export default function Page() {
  const chapter = chapterByRoute(partSlug, chapterSlug);
  const section = chapterSectionByRoute(partSlug, chapterSlug, sectionSlug);

  if (!chapter || !section) {
    notFound();
  }

  const chapterSections = chapterSectionsByRoute(partSlug, chapterSlug).map((entry: ChapterSectionRouteRecord) => ({
    index: entry.index,
    title: entry.title,
    slug: entry.slug,
    href: chapterSectionHref(partSlug, chapterSlug, entry.slug)
  }));
  const sectionExtra = sectionExtraForRoute(partSlug, chapterSlug, section.slug);
  const sectionExtras = sectionExtra ? { [section.content.title]: sectionExtra } : undefined;

  return (
    <ChapterPageLayout
      chapter={chapter}
      sectionContent={[section.content]}
      sectionExtras={sectionExtras}
      chapterSections={chapterSections}
      activeSectionSlug={section.slug}
      sectionIndexOffset={section.index - 1}
    />
  );
}
