import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-04-event-driven-relative-value";
const chapterSlug = "merger-arbitrage";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Deal spreads",
    "paragraphs": [
      "Deal spreads placeholder for Merger arbitrage.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Success vs break scenarios",
    "paragraphs": [
      "Success vs break scenarios placeholder for Merger arbitrage.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Asymmetric payoff",
    "paragraphs": [
      "Asymmetric payoff placeholder for Merger arbitrage.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Portfolio of deals",
    "paragraphs": [
      "Portfolio of deals placeholder for Merger arbitrage.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Legal and operational risks",
    "paragraphs": [
      "Legal and operational risks placeholder for Merger arbitrage.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  }
];

export default function Page() {
  const chapter = chapterByRoute(partSlug, chapterSlug);

  if (!chapter) {
    notFound();
  }

  return <ChapterPageLayout chapter={chapter} sectionContent={sectionContent} />;
}
