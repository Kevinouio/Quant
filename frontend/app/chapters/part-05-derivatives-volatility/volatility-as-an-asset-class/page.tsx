import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-05-derivatives-volatility";
const chapterSlug = "volatility-as-an-asset-class";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Realized vs implied vol",
    "paragraphs": [
      "Realized vs implied vol placeholder for Volatility as an asset class.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "VIX intuition",
    "paragraphs": [
      "VIX intuition placeholder for Volatility as an asset class.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Variance swaps at a high level",
    "paragraphs": [
      "Variance swaps at a high level placeholder for Volatility as an asset class.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Hedging with volatility products",
    "paragraphs": [
      "Hedging with volatility products placeholder for Volatility as an asset class.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why short-vol is dangerous",
    "paragraphs": [
      "Why short-vol is dangerous placeholder for Volatility as an asset class.",
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
