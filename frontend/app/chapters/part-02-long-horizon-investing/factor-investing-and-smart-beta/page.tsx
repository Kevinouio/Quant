import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-02-long-horizon-investing";
const chapterSlug = "factor-investing-and-smart-beta";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "What a factor is",
    "paragraphs": [
      "What a factor is placeholder for Factor investing and smart beta.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Value, momentum, quality, size",
    "paragraphs": [
      "Value, momentum, quality, size placeholder for Factor investing and smart beta.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Long-only tilts vs long-short factors",
    "paragraphs": [
      "Long-only tilts vs long-short factors placeholder for Factor investing and smart beta.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Factor exposures",
    "paragraphs": [
      "Factor exposures placeholder for Factor investing and smart beta.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Crowding and drawdowns",
    "paragraphs": [
      "Crowding and drawdowns placeholder for Factor investing and smart beta.",
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
