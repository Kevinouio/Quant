import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-03-systematic-trading";
const chapterSlug = "mean-reversion-basics";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "What mean reversion means",
    "paragraphs": [
      "What mean reversion means placeholder for Mean reversion basics.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "When it appears",
    "paragraphs": [
      "When it appears placeholder for Mean reversion basics.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Simple z-score logic",
    "paragraphs": [
      "Simple z-score logic placeholder for Mean reversion basics.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Regime dependence",
    "paragraphs": [
      "Regime dependence placeholder for Mean reversion basics.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why it can fail badly",
    "paragraphs": [
      "Why it can fail badly placeholder for Mean reversion basics.",
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
