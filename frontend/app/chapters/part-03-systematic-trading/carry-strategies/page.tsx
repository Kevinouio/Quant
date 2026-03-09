import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-03-systematic-trading";
const chapterSlug = "carry-strategies";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "What carry means",
    "paragraphs": [
      "What carry means placeholder for Carry strategies.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Carry across asset classes",
    "paragraphs": [
      "Carry across asset classes placeholder for Carry strategies.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Yield curves and futures curves",
    "paragraphs": [
      "Yield curves and futures curves placeholder for Carry strategies.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why carry can look good for long periods",
    "paragraphs": [
      "Why carry can look good for long periods placeholder for Carry strategies.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Crash and funding risk",
    "paragraphs": [
      "Crash and funding risk placeholder for Carry strategies.",
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
