import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-05-derivatives-volatility";
const chapterSlug = "hedging-and-replication";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Delta hedging",
    "paragraphs": [
      "Delta hedging placeholder for Hedging and replication.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Discrete hedging error",
    "paragraphs": [
      "Discrete hedging error placeholder for Hedging and replication.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Jump risk",
    "paragraphs": [
      "Jump risk placeholder for Hedging and replication.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Stochastic volatility idea",
    "paragraphs": [
      "Stochastic volatility idea placeholder for Hedging and replication.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Practical hedging frictions",
    "paragraphs": [
      "Practical hedging frictions placeholder for Hedging and replication.",
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
