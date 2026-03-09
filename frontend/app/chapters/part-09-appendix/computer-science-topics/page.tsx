import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-09-appendix";
const chapterSlug = "computer-science-topics";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Data structures and algorithms refresher",
    "paragraphs": [
      "Data structures and algorithms refresher placeholder for Computer Science Topics.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Complexity and performance thinking",
    "paragraphs": [
      "Complexity and performance thinking placeholder for Computer Science Topics.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Systems design notes",
    "paragraphs": [
      "Systems design notes placeholder for Computer Science Topics.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Data engineering patterns",
    "paragraphs": [
      "Data engineering patterns placeholder for Computer Science Topics.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Reproducibility and environment management",
    "paragraphs": [
      "Reproducibility and environment management placeholder for Computer Science Topics.",
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
