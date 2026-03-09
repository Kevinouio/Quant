import { notFound } from "next/navigation";
import { DocsShell } from "../../../../components/layout/DocsShell";
import { chapterByRoute, chapterHref, chaptersByPart } from "../../../../lib/chapterMetadata";

type ChapterPageProps = {
  params: {
    partSlug: string;
    chapterSlug: string;
  };
};

function toSectionId(section: string): string {
  return section
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function chapterDisplayLabel(chapter: {
  chapterNumber: number;
  chapterCode: string | null;
  chapterTitle: string;
}): string {
  if (chapter.chapterCode) {
    return `Appendix ${chapter.chapterCode}. ${chapter.chapterTitle}`;
  }

  return `Chapter ${chapter.chapterNumber}. ${chapter.chapterTitle}`;
}

function PlaceholderChapterBody({
  chapter,
  sectionIdByTitle
}: {
  chapter: {
    chapterNumber: number;
    chapterCode: string | null;
    chapterTitle: string;
    summary: string;
    sections: string[];
  };
  sectionIdByTitle: Record<string, string>;
}) {
  const displayLabel = chapterDisplayLabel(chapter);

  return (
    <>
      <header className="hero" id="overview">
        <p className="eyebrow">{chapter.chapterCode ? `Appendix ${chapter.chapterCode}` : `Chapter ${chapter.chapterNumber}`}</p>
        <h1>{displayLabel}</h1>
        <p>{chapter.summary}</p>
      </header>

      {chapter.sections.map((section) => (
        <section className="article-section" id={sectionIdByTitle[section]} key={section}>
          <h2>{section}</h2>
          <p>{section} placeholder for {chapter.chapterTitle}.</p>
          <p>
            Add concrete definitions, formulas, edge cases, and implementation notes in a later
            pass.
          </p>
        </section>
      ))}
    </>
  );
}

function PassiveIndexingRichBody({
  sectionIdByTitle
}: {
  sectionIdByTitle: Record<string, string>;
}) {
  return (
    <>
      <header className="hero" id="overview">
        <p className="eyebrow">Chapter 6</p>
        <h1>Passive indexing and benchmarking</h1>
        <p>
          Passive indexing focuses on capturing broad market returns efficiently while benchmarking
          every decision against a transparent reference portfolio.
        </p>
      </header>

      <section className="article-section" id={sectionIdByTitle["What passive indexing is"]}>
        <h2>What passive indexing is</h2>
        <p>
          Passive indexing means tracking a market index through explicit, repeatable rules instead
          of forecasting individual asset winners.
        </p>
        <p>
          The objective is consistency, broad exposure, and minimized implementation drag over long
          horizons.
        </p>
      </section>

      <section className="article-section" id={sectionIdByTitle["Why benchmarking matters"]}>
        <h2>Why benchmarking matters</h2>
        <p>
          A benchmark defines the baseline risk/return profile your portfolio should beat or track.
          Without this baseline, performance claims are not comparable.
        </p>
        <p>
          Benchmark-relative thinking also forces explicit discussion of tracking error, costs, and
          portfolio constraints.
        </p>
      </section>

      <section className="article-section" id={sectionIdByTitle["Active vs passive"]}>
        <h2>Active vs passive</h2>
        <p>
          Active strategies seek excess return through selection, timing, or tactical tilts.
          Passive strategies seek broad exposure and cost efficiency.
        </p>
        <p>
          This chapter treats passive as the base case and active decisions as deviations that must
          justify additional complexity and cost.
        </p>
      </section>

      <section className="article-section" id={sectionIdByTitle["Tracking error"]}>
        <h2>Tracking error</h2>
        <p>
          Tracking error measures how far portfolio returns deviate from benchmark returns over
          time. It should be interpreted together with turnover and implementation assumptions.
        </p>
        <p>
          Even passive portfolios can accumulate meaningful tracking drift from rebalancing policy,
          cash drag, and operational constraints.
        </p>
      </section>

      <section
        className="article-section"
        id={sectionIdByTitle["Fees, taxes, and implementation frictions"]}
      >
        <h2>Fees, taxes, and implementation frictions</h2>
        <p>
          Net performance depends on expense ratio, trading costs, and tax impact. Small recurring
          frictions compound materially in long-horizon portfolios.
        </p>
        <p>
          Treat frictions as first-class model inputs rather than afterthoughts when comparing
          strategy outcomes.
        </p>
      </section>
    </>
  );
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const { partSlug, chapterSlug } = params;
  const chapter = chapterByRoute(partSlug, chapterSlug);

  if (!chapter) {
    notFound();
  }

  const sectionIdByTitle = Object.fromEntries(
    chapter.sections.map((section) => [section, toSectionId(section)])
  );

  const tocItems = [
    { href: "#overview", label: "Overview" },
    ...chapter.sections.map((section) => ({
      href: `#${sectionIdByTitle[section]}`,
      label: section
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
      navNote={`Part ${chapter.partNumber} scaffold. Chapter status: ${chapter.status}.`}
    >
      <article className="article">
        {chapter.chapterNumber === 6 ? (
          <PassiveIndexingRichBody sectionIdByTitle={sectionIdByTitle} />
        ) : (
          <PlaceholderChapterBody chapter={chapter} sectionIdByTitle={sectionIdByTitle} />
        )}
      </article>
    </DocsShell>
  );
}
