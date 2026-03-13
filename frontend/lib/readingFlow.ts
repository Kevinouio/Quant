import {
  chapterHref,
  chaptersByPart,
  type ChapterMeta
} from "./chapterMetadata";
import {
  chapterSectionHref,
  chapterSectionsByRoute,
  type ChapterSectionRouteRecord
} from "./generatedChapterSections";

export type PagerTarget = {
  href: string;
  actionLabel: string;
  detailLabel: string;
};

export type PagerLinks = {
  prev: PagerTarget | null;
  next: PagerTarget | null;
};

type ChapterWithSections = {
  chapter: ChapterMeta;
  sections: ChapterSectionRouteRecord[];
};

const orderedChapters: ChapterMeta[] = chaptersByPart.flatMap((part) => part.chapters);

const chapterSequence: ChapterWithSections[] = orderedChapters.map((chapter) => ({
  chapter,
  sections: [...chapterSectionsByRoute(chapter.partSlug, chapter.chapterSlug)].sort(
    (left, right) => left.index - right.index
  )
}));

function chapterDisplayLabel(chapter: ChapterMeta): string {
  if (chapter.chapterCode) {
    return `Appendix ${chapter.chapterCode}. ${chapter.chapterTitle}`;
  }
  return `Chapter ${chapter.chapterNumber}. ${chapter.chapterTitle}`;
}

function sectionDisplayLabel(chapter: ChapterMeta, section: ChapterSectionRouteRecord): string {
  const chapterPrefix = chapter.chapterCode ?? `${chapter.chapterNumber}`;
  return `${chapterPrefix}.${section.index} ${section.title}`;
}

function chapterIndexByRoute(partSlug: string, chapterSlug: string): number {
  return chapterSequence.findIndex(
    ({ chapter }) => chapter.partSlug === partSlug && chapter.chapterSlug === chapterSlug
  );
}

function firstSectionOf(chapterIndex: number): ChapterSectionRouteRecord | null {
  const chapterRecord = chapterSequence[chapterIndex];
  return chapterRecord?.sections[0] ?? null;
}

function lastSectionOf(chapterIndex: number): ChapterSectionRouteRecord | null {
  const chapterRecord = chapterSequence[chapterIndex];
  if (!chapterRecord || chapterRecord.sections.length === 0) {
    return null;
  }
  return chapterRecord.sections[chapterRecord.sections.length - 1];
}

export function getStartReadingHref(): string {
  const firstChapter = chapterSequence[0]?.chapter;
  return firstChapter ? chapterHref(firstChapter) : "/";
}

export function getHubPager(partSlug: string, chapterSlug: string): PagerLinks {
  const currentIndex = chapterIndexByRoute(partSlug, chapterSlug);
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const previousChapterRecord = chapterSequence[currentIndex - 1];
  const nextChapterRecord = chapterSequence[currentIndex + 1];
  const previousSection = previousChapterRecord
    ? lastSectionOf(currentIndex - 1)
    : null;
  const nextSection = nextChapterRecord ? firstSectionOf(currentIndex + 1) : null;

  const prev: PagerTarget = previousChapterRecord
    ? {
        href: previousSection
          ? chapterSectionHref(
              previousChapterRecord.chapter.partSlug,
              previousChapterRecord.chapter.chapterSlug,
              previousSection.slug
            )
          : chapterHref(previousChapterRecord.chapter),
        actionLabel: "Previous Chapter",
        detailLabel: previousSection
          ? `${chapterDisplayLabel(previousChapterRecord.chapter)} - ${sectionDisplayLabel(previousChapterRecord.chapter, previousSection)}`
          : chapterDisplayLabel(previousChapterRecord.chapter)
      }
    : {
        href: "/",
        actionLabel: "Previous",
        detailLabel: "Home"
      };

  const next: PagerTarget | null = nextChapterRecord
    ? {
        href: nextSection
          ? chapterSectionHref(
              nextChapterRecord.chapter.partSlug,
              nextChapterRecord.chapter.chapterSlug,
              nextSection.slug
            )
          : chapterHref(nextChapterRecord.chapter),
        actionLabel: "Next Chapter",
        detailLabel: nextSection
          ? `${chapterDisplayLabel(nextChapterRecord.chapter)} - ${sectionDisplayLabel(nextChapterRecord.chapter, nextSection)}`
          : chapterDisplayLabel(nextChapterRecord.chapter)
      }
    : null;

  return { prev, next };
}

export function getSectionPager(
  partSlug: string,
  chapterSlug: string,
  sectionSlug: string | undefined
): PagerLinks {
  if (!sectionSlug) {
    return { prev: null, next: null };
  }

  const currentChapterIndex = chapterIndexByRoute(partSlug, chapterSlug);
  if (currentChapterIndex === -1) {
    return { prev: null, next: null };
  }

  const currentChapterRecord = chapterSequence[currentChapterIndex];
  const currentSectionIndex = currentChapterRecord.sections.findIndex(
    (section) => section.slug === sectionSlug
  );
  if (currentSectionIndex === -1) {
    return { prev: null, next: null };
  }

  const previousSection = currentChapterRecord.sections[currentSectionIndex - 1] ?? null;
  const nextSection = currentChapterRecord.sections[currentSectionIndex + 1] ?? null;

  let prev: PagerTarget | null = null;
  if (previousSection) {
    prev = {
      href: chapterSectionHref(partSlug, chapterSlug, previousSection.slug),
      actionLabel: "Previous Section",
      detailLabel: sectionDisplayLabel(currentChapterRecord.chapter, previousSection)
    };
  } else {
    prev = {
      href: chapterHref(currentChapterRecord.chapter),
      actionLabel: "Section Navigator",
      detailLabel: chapterDisplayLabel(currentChapterRecord.chapter)
    };
  }

  let next: PagerTarget | null = null;
  if (nextSection) {
    next = {
      href: chapterSectionHref(partSlug, chapterSlug, nextSection.slug),
      actionLabel: "Next Section",
      detailLabel: sectionDisplayLabel(currentChapterRecord.chapter, nextSection)
    };
  } else {
    const nextChapterRecord = chapterSequence[currentChapterIndex + 1] ?? null;
    if (nextChapterRecord) {
      next = {
        href: chapterHref(nextChapterRecord.chapter),
        actionLabel: "Next Chapter",
        detailLabel: chapterDisplayLabel(nextChapterRecord.chapter)
      };
    }
  }

  return { prev, next };
}
