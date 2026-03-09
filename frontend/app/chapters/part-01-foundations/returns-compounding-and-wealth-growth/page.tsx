import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-01-foundations";
const chapterSlug = "returns-compounding-and-wealth-growth";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Simple return vs log return",
    "paragraphs": [
      "Simple return vs log return placeholder for Returns, compounding, and wealth growth.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Compounding",
    "paragraphs": [
      "Compounding placeholder for Returns, compounding, and wealth growth.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Inflation and real return",
    "paragraphs": [
      "Inflation and real return placeholder for Returns, compounding, and wealth growth.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Cumulative return vs annualized return",
    "paragraphs": [
      "Cumulative return vs annualized return placeholder for Returns, compounding, and wealth growth.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why small edges compound",
    "paragraphs": [
      "Why small edges compound placeholder for Returns, compounding, and wealth growth.",
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
