import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-06-microstructure-execution";
const chapterSlug = "order-types-and-trade-lifecycle";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Market orders",
    "paragraphs": [
      "Market orders placeholder for Order types and trade lifecycle.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Limit orders",
    "paragraphs": [
      "Limit orders placeholder for Order types and trade lifecycle.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Stop orders",
    "paragraphs": [
      "Stop orders placeholder for Order types and trade lifecycle.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Partial fills",
    "paragraphs": [
      "Partial fills placeholder for Order types and trade lifecycle.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Executable price vs quoted price",
    "paragraphs": [
      "Executable price vs quoted price placeholder for Order types and trade lifecycle.",
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
