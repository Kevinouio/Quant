import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-09-appendix";
const chapterSlug = "mathematics";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Core mathematical tools",
    "paragraphs": [
      "Core mathematical tools placeholder for Mathematics.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Linear algebra refresher",
    "paragraphs": [
      "Linear algebra refresher placeholder for Mathematics.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Probability and statistics refresher",
    "paragraphs": [
      "Probability and statistics refresher placeholder for Mathematics.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Optimization basics",
    "paragraphs": [
      "Optimization basics placeholder for Mathematics.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Time-series math notes",
    "paragraphs": [
      "Time-series math notes placeholder for Mathematics.",
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
