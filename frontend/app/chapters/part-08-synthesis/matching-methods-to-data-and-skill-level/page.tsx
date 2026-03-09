import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-08-synthesis";
const chapterSlug = "matching-methods-to-data-and-skill-level";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "End-of-day only methods",
    "paragraphs": [
      "End-of-day only methods placeholder for Matching methods to data and skill level.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Daily + fundamentals methods",
    "paragraphs": [
      "Daily + fundamentals methods placeholder for Matching methods to data and skill level.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Intraday methods",
    "paragraphs": [
      "Intraday methods placeholder for Matching methods to data and skill level.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Options methods",
    "paragraphs": [
      "Options methods placeholder for Matching methods to data and skill level.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Text-data methods",
    "paragraphs": [
      "Text-data methods placeholder for Matching methods to data and skill level.",
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
