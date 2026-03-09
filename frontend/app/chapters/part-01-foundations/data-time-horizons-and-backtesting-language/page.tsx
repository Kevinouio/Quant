import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-01-foundations";
const chapterSlug = "data-time-horizons-and-backtesting-language";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "End-of-day vs intraday data",
    "paragraphs": [
      "End-of-day vs intraday data placeholder for Data, time horizons, and backtesting language.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Lookback windows",
    "paragraphs": [
      "Lookback windows placeholder for Data, time horizons, and backtesting language.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Rebalancing frequency",
    "paragraphs": [
      "Rebalancing frequency placeholder for Data, time horizons, and backtesting language.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "In-sample vs out-of-sample",
    "paragraphs": [
      "In-sample vs out-of-sample placeholder for Data, time horizons, and backtesting language.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Overfitting and data leakage",
    "paragraphs": [
      "Overfitting and data leakage placeholder for Data, time horizons, and backtesting language.",
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
