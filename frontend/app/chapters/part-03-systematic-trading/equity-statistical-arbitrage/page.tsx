import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-03-systematic-trading";
const chapterSlug = "equity-statistical-arbitrage";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Residuals and neutrality",
    "paragraphs": [
      "Residuals and neutrality placeholder for Equity statistical arbitrage.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Factor-neutral baskets",
    "paragraphs": [
      "Factor-neutral baskets placeholder for Equity statistical arbitrage.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "PCA intuition",
    "paragraphs": [
      "PCA intuition placeholder for Equity statistical arbitrage.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Optimization under constraints",
    "paragraphs": [
      "Optimization under constraints placeholder for Equity statistical arbitrage.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Borrow, crowding, and turnover",
    "paragraphs": [
      "Borrow, crowding, and turnover placeholder for Equity statistical arbitrage.",
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
