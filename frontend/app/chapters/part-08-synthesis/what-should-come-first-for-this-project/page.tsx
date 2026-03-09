import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-08-synthesis";
const chapterSlug = "what-should-come-first-for-this-project";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Foundations",
    "paragraphs": [
      "Foundations placeholder for What should come first for this project.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Volatility",
    "paragraphs": [
      "Volatility placeholder for What should come first for this project.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Momentum/trend",
    "paragraphs": [
      "Momentum/trend placeholder for What should come first for this project.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Pairs",
    "paragraphs": [
      "Pairs placeholder for What should come first for this project.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Factors/benchmarking",
    "paragraphs": [
      "Factors/benchmarking placeholder for What should come first for this project.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Execution literacy",
    "paragraphs": [
      "Execution literacy placeholder for What should come first for this project.",
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
