import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-03-systematic-trading";
const chapterSlug = "short-term-reversal";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "What reversal is",
    "paragraphs": [
      "What reversal is placeholder for Short-term reversal.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Relation to liquidity and microstructure",
    "paragraphs": [
      "Relation to liquidity and microstructure placeholder for Short-term reversal.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why gross alpha is not net alpha",
    "paragraphs": [
      "Why gross alpha is not net alpha placeholder for Short-term reversal.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Turnover and costs",
    "paragraphs": [
      "Turnover and costs placeholder for Short-term reversal.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Reversal vs momentum",
    "paragraphs": [
      "Reversal vs momentum placeholder for Short-term reversal.",
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
