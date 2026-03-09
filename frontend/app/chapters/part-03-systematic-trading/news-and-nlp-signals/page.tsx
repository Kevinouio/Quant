import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-03-systematic-trading";
const chapterSlug = "news-and-nlp-signals";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Financial text as data",
    "paragraphs": [
      "Financial text as data placeholder for News and NLP signals.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Sentiment vs topic signals",
    "paragraphs": [
      "Sentiment vs topic signals placeholder for News and NLP signals.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Timestamp alignment",
    "paragraphs": [
      "Timestamp alignment placeholder for News and NLP signals.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Financial dictionaries vs generic sentiment",
    "paragraphs": [
      "Financial dictionaries vs generic sentiment placeholder for News and NLP signals.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Leakage and data licensing",
    "paragraphs": [
      "Leakage and data licensing placeholder for News and NLP signals.",
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
