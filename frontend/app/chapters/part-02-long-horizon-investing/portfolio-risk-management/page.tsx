import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-02-long-horizon-investing";
const chapterSlug = "portfolio-risk-management";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "VaR",
    "paragraphs": [
      "VaR placeholder for Portfolio risk management.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Expected shortfall",
    "paragraphs": [
      "Expected shortfall placeholder for Portfolio risk management.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Stress testing",
    "paragraphs": [
      "Stress testing placeholder for Portfolio risk management.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Scenario analysis",
    "paragraphs": [
      "Scenario analysis placeholder for Portfolio risk management.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "CVaR as a tail-aware extension",
    "paragraphs": [
      "CVaR as a tail-aware extension placeholder for Portfolio risk management.",
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
