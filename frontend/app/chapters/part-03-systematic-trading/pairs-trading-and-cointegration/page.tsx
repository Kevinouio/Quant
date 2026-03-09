import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-03-systematic-trading";
const chapterSlug = "pairs-trading-and-cointegration";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Correlation vs cointegration",
    "paragraphs": [
      "Correlation vs cointegration placeholder for Pairs trading and cointegration.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Distance-based pairs",
    "paragraphs": [
      "Distance-based pairs placeholder for Pairs trading and cointegration.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Spread construction",
    "paragraphs": [
      "Spread construction placeholder for Pairs trading and cointegration.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Entry/exit logic",
    "paragraphs": [
      "Entry/exit logic placeholder for Pairs trading and cointegration.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Structural breaks",
    "paragraphs": [
      "Structural breaks placeholder for Pairs trading and cointegration.",
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
