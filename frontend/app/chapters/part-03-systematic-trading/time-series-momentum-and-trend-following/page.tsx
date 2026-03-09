import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-03-systematic-trading";
const chapterSlug = "time-series-momentum-and-trend-following";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Absolute momentum idea",
    "paragraphs": [
      "Absolute momentum idea placeholder for Time-series momentum and trend following.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Moving averages",
    "paragraphs": [
      "Moving averages placeholder for Time-series momentum and trend following.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Sign-of-past-return rules",
    "paragraphs": [
      "Sign-of-past-return rules placeholder for Time-series momentum and trend following.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Volatility targeting",
    "paragraphs": [
      "Volatility targeting placeholder for Time-series momentum and trend following.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Cross-asset trend portfolios",
    "paragraphs": [
      "Cross-asset trend portfolios placeholder for Time-series momentum and trend following.",
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
