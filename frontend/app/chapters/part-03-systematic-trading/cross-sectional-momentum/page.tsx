import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-03-systematic-trading";
const chapterSlug = "cross-sectional-momentum";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Winners vs losers",
    "paragraphs": [
      "Winners vs losers placeholder for Cross-sectional momentum.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Formation and holding periods",
    "paragraphs": [
      "Formation and holding periods placeholder for Cross-sectional momentum.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Ranking assets",
    "paragraphs": [
      "Ranking assets placeholder for Cross-sectional momentum.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Volatility scaling",
    "paragraphs": [
      "Volatility scaling placeholder for Cross-sectional momentum.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Crash risk and turnover",
    "paragraphs": [
      "Crash risk and turnover placeholder for Cross-sectional momentum.",
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
