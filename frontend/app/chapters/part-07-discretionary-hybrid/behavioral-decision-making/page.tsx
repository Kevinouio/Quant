import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-07-discretionary-hybrid";
const chapterSlug = "behavioral-decision-making";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Overconfidence",
    "paragraphs": [
      "Overconfidence placeholder for Behavioral decision-making.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Loss aversion",
    "paragraphs": [
      "Loss aversion placeholder for Behavioral decision-making.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Confirmation bias",
    "paragraphs": [
      "Confirmation bias placeholder for Behavioral decision-making.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Prospect theory intuition",
    "paragraphs": [
      "Prospect theory intuition placeholder for Behavioral decision-making.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "How bias affects trading and investing",
    "paragraphs": [
      "How bias affects trading and investing placeholder for Behavioral decision-making.",
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
