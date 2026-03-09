import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-07-discretionary-hybrid";
const chapterSlug = "hybrid-workflows";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Quant screen + human review",
    "paragraphs": [
      "Quant screen + human review placeholder for Hybrid workflows.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Regime filters",
    "paragraphs": [
      "Regime filters placeholder for Hybrid workflows.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Human override policies",
    "paragraphs": [
      "Human override policies placeholder for Hybrid workflows.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Execution plan after idea generation",
    "paragraphs": [
      "Execution plan after idea generation placeholder for Hybrid workflows.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Where hybrid workflows are stronger than pure discretion",
    "paragraphs": [
      "Where hybrid workflows are stronger than pure discretion placeholder for Hybrid workflows.",
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
