import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-02-long-horizon-investing";
const chapterSlug = "capm-beta-and-risk-budgeting";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Market beta",
    "paragraphs": [
      "Market beta placeholder for CAPM, beta, and risk budgeting.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Systematic vs idiosyncratic risk",
    "paragraphs": [
      "Systematic vs idiosyncratic risk placeholder for CAPM, beta, and risk budgeting.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "CAPM as a benchmark model",
    "paragraphs": [
      "CAPM as a benchmark model placeholder for CAPM, beta, and risk budgeting.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Risk contribution",
    "paragraphs": [
      "Risk contribution placeholder for CAPM, beta, and risk budgeting.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Limits of beta-only thinking",
    "paragraphs": [
      "Limits of beta-only thinking placeholder for CAPM, beta, and risk budgeting.",
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
