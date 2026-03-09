import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-04-event-driven-relative-value";
const chapterSlug = "options-relative-value-and-vrp";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Implied vs realized volatility",
    "paragraphs": [
      "Implied vs realized volatility placeholder for Options relative value and VRP.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Variance risk premium",
    "paragraphs": [
      "Variance risk premium placeholder for Options relative value and VRP.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Skew and term structure",
    "paragraphs": [
      "Skew and term structure placeholder for Options relative value and VRP.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "VIX ecosystem",
    "paragraphs": [
      "VIX ecosystem placeholder for Options relative value and VRP.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Tail risk and convexity",
    "paragraphs": [
      "Tail risk and convexity placeholder for Options relative value and VRP.",
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
