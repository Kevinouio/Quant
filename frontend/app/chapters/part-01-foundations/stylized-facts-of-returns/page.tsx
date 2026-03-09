import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-01-foundations";
const chapterSlug = "stylized-facts-of-returns";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Random walk intuition",
    "paragraphs": [
      "Random walk intuition placeholder for Stylized facts of returns.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Fat tails",
    "paragraphs": [
      "Fat tails placeholder for Stylized facts of returns.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Volatility clustering",
    "paragraphs": [
      "Volatility clustering placeholder for Stylized facts of returns.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Autocorrelation and dependence",
    "paragraphs": [
      "Autocorrelation and dependence placeholder for Stylized facts of returns.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why naive models fail",
    "paragraphs": [
      "Why naive models fail placeholder for Stylized facts of returns.",
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
