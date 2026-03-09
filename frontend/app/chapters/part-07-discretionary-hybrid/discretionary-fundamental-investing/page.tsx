import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-07-discretionary-hybrid";
const chapterSlug = "discretionary-fundamental-investing";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Building an investment thesis",
    "paragraphs": [
      "Building an investment thesis placeholder for Discretionary fundamental investing.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Reading financial statements",
    "paragraphs": [
      "Reading financial statements placeholder for Discretionary fundamental investing.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Valuation basics",
    "paragraphs": [
      "Valuation basics placeholder for Discretionary fundamental investing.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Catalysts and monitoring",
    "paragraphs": [
      "Catalysts and monitoring placeholder for Discretionary fundamental investing.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Thesis failure modes",
    "paragraphs": [
      "Thesis failure modes placeholder for Discretionary fundamental investing.",
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
