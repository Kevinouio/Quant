import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-07-discretionary-hybrid";
const chapterSlug = "technical-analysis";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Price and volume as inputs",
    "paragraphs": [
      "Price and volume as inputs placeholder for Technical analysis.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Trendlines and support/resistance",
    "paragraphs": [
      "Trendlines and support/resistance placeholder for Technical analysis.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Moving averages and oscillators",
    "paragraphs": [
      "Moving averages and oscillators placeholder for Technical analysis.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Rule-based vs visual charting",
    "paragraphs": [
      "Rule-based vs visual charting placeholder for Technical analysis.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Overfitting and narrative traps",
    "paragraphs": [
      "Overfitting and narrative traps placeholder for Technical analysis.",
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
