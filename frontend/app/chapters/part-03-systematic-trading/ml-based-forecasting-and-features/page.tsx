import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-03-systematic-trading";
const chapterSlug = "ml-based-forecasting-and-features";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "What makes ML different from classic factor/rule methods",
    "paragraphs": [
      "What makes ML different from classic factor/rule methods placeholder for ML-based forecasting and features.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Feature engineering for finance",
    "paragraphs": [
      "Feature engineering for finance placeholder for ML-based forecasting and features.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Labeling targets",
    "paragraphs": [
      "Labeling targets placeholder for ML-based forecasting and features.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Cross-validation for time series",
    "paragraphs": [
      "Cross-validation for time series placeholder for ML-based forecasting and features.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why ML often fails in finance",
    "paragraphs": [
      "Why ML often fails in finance placeholder for ML-based forecasting and features.",
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
