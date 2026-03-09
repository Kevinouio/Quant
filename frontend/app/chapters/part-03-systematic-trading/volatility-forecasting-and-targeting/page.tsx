import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-03-systematic-trading";
const chapterSlug = "volatility-forecasting-and-targeting";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Volatility clustering",
    "paragraphs": [
      "Volatility clustering placeholder for Volatility forecasting and targeting.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "EWMA",
    "paragraphs": [
      "EWMA placeholder for Volatility forecasting and targeting.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "ARCH/GARCH",
    "paragraphs": [
      "ARCH/GARCH placeholder for Volatility forecasting and targeting.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Forecast intervals",
    "paragraphs": [
      "Forecast intervals placeholder for Volatility forecasting and targeting.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Volatility targeting",
    "paragraphs": [
      "Volatility targeting placeholder for Volatility forecasting and targeting.",
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
