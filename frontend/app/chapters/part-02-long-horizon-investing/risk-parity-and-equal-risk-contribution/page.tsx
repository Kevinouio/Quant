import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-02-long-horizon-investing";
const chapterSlug = "risk-parity-and-equal-risk-contribution";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Capital allocation vs risk allocation",
    "paragraphs": [
      "Capital allocation vs risk allocation placeholder for Risk parity and equal risk contribution.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Volatility scaling",
    "paragraphs": [
      "Volatility scaling placeholder for Risk parity and equal risk contribution.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Equal risk contribution",
    "paragraphs": [
      "Equal risk contribution placeholder for Risk parity and equal risk contribution.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Leverage issues",
    "paragraphs": [
      "Leverage issues placeholder for Risk parity and equal risk contribution.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why 60/40 is not balanced in risk",
    "paragraphs": [
      "Why 60/40 is not balanced in risk placeholder for Risk parity and equal risk contribution.",
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
