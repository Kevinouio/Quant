import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-06-microstructure-execution";
const chapterSlug = "optimal-execution";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "TWAP",
    "paragraphs": [
      "TWAP placeholder for Optimal execution.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "VWAP",
    "paragraphs": [
      "VWAP placeholder for Optimal execution.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Implementation shortfall",
    "paragraphs": [
      "Implementation shortfall placeholder for Optimal execution.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Cost-risk tradeoff",
    "paragraphs": [
      "Cost-risk tradeoff placeholder for Optimal execution.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why execution is an optimization problem",
    "paragraphs": [
      "Why execution is an optimization problem placeholder for Optimal execution.",
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
