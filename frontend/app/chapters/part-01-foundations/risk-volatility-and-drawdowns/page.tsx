import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-01-foundations";
const chapterSlug = "risk-volatility-and-drawdowns";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "What risk means in practice",
    "paragraphs": [
      "What risk means in practice placeholder for Risk, volatility, and drawdowns.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Volatility",
    "paragraphs": [
      "Volatility placeholder for Risk, volatility, and drawdowns.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Drawdown",
    "paragraphs": [
      "Drawdown placeholder for Risk, volatility, and drawdowns.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Tail risk",
    "paragraphs": [
      "Tail risk placeholder for Risk, volatility, and drawdowns.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why return without risk context is misleading",
    "paragraphs": [
      "Why return without risk context is misleading placeholder for Risk, volatility, and drawdowns.",
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
