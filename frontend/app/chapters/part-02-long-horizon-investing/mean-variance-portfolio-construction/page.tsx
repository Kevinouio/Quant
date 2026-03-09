import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-02-long-horizon-investing";
const chapterSlug = "mean-variance-portfolio-construction";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Expected return",
    "paragraphs": [
      "Expected return placeholder for Mean-variance portfolio construction.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Variance and covariance",
    "paragraphs": [
      "Variance and covariance placeholder for Mean-variance portfolio construction.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Efficient frontier",
    "paragraphs": [
      "Efficient frontier placeholder for Mean-variance portfolio construction.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Long-only constraints",
    "paragraphs": [
      "Long-only constraints placeholder for Mean-variance portfolio construction.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why optimization is fragile",
    "paragraphs": [
      "Why optimization is fragile placeholder for Mean-variance portfolio construction.",
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
