import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-05-derivatives-volatility";
const chapterSlug = "options-foundations";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Calls and puts",
    "paragraphs": [
      "Calls and puts placeholder for Options foundations.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Payoff diagrams",
    "paragraphs": [
      "Payoff diagrams placeholder for Options foundations.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Moneyness",
    "paragraphs": [
      "Moneyness placeholder for Options foundations.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Expiration",
    "paragraphs": [
      "Expiration placeholder for Options foundations.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why options are nonlinear",
    "paragraphs": [
      "Why options are nonlinear placeholder for Options foundations.",
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
