import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-06-microstructure-execution";
const chapterSlug = "limit-order-books-and-market-making";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Order book structure",
    "paragraphs": [
      "Order book structure placeholder for Limit order books and market making.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Spread capture",
    "paragraphs": [
      "Spread capture placeholder for Limit order books and market making.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Inventory risk",
    "paragraphs": [
      "Inventory risk placeholder for Limit order books and market making.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Adverse selection",
    "paragraphs": [
      "Adverse selection placeholder for Limit order books and market making.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Queue position and latency",
    "paragraphs": [
      "Queue position and latency placeholder for Limit order books and market making.",
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
