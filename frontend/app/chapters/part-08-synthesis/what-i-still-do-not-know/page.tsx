import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-08-synthesis";
const chapterSlug = "what-i-still-do-not-know";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Open questions",
    "paragraphs": [
      "Open questions placeholder for What I still do not know.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Misunderstood topics",
    "paragraphs": [
      "Misunderstood topics placeholder for What I still do not know.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Things to revisit later",
    "paragraphs": [
      "Things to revisit later placeholder for What I still do not know.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Topics that need stronger math",
    "paragraphs": [
      "Topics that need stronger math placeholder for What I still do not know.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Topics that need stronger data",
    "paragraphs": [
      "Topics that need stronger data placeholder for What I still do not know.",
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
