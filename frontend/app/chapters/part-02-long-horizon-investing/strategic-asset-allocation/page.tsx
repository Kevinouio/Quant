import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-02-long-horizon-investing";
const chapterSlug = "strategic-asset-allocation";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Asset classes",
    "paragraphs": [
      "Asset classes placeholder for Strategic asset allocation.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Diversification",
    "paragraphs": [
      "Diversification placeholder for Strategic asset allocation.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Correlation and covariance",
    "paragraphs": [
      "Correlation and covariance placeholder for Strategic asset allocation.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Long-run portfolio weights",
    "paragraphs": [
      "Long-run portfolio weights placeholder for Strategic asset allocation.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Rebalancing policies",
    "paragraphs": [
      "Rebalancing policies placeholder for Strategic asset allocation.",
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
