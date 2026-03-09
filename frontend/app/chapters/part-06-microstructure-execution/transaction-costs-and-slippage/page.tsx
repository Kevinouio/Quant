import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-06-microstructure-execution";
const chapterSlug = "transaction-costs-and-slippage";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Explicit vs implicit costs",
    "paragraphs": [
      "Explicit vs implicit costs placeholder for Transaction costs and slippage.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Bid-ask spread",
    "paragraphs": [
      "Bid-ask spread placeholder for Transaction costs and slippage.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Slippage",
    "paragraphs": [
      "Slippage placeholder for Transaction costs and slippage.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Market impact",
    "paragraphs": [
      "Market impact placeholder for Transaction costs and slippage.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why backtests lie without costs",
    "paragraphs": [
      "Why backtests lie without costs placeholder for Transaction costs and slippage.",
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
