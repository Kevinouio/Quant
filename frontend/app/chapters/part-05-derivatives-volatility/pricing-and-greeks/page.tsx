import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-05-derivatives-volatility";
const chapterSlug = "pricing-and-greeks";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Black-Scholes intuition",
    "paragraphs": [
      "Black-Scholes intuition placeholder for Pricing and Greeks.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Delta, gamma, theta, vega",
    "paragraphs": [
      "Delta, gamma, theta, vega placeholder for Pricing and Greeks.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Implied volatility",
    "paragraphs": [
      "Implied volatility placeholder for Pricing and Greeks.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Model assumptions",
    "paragraphs": [
      "Model assumptions placeholder for Pricing and Greeks.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Where the model breaks",
    "paragraphs": [
      "Where the model breaks placeholder for Pricing and Greeks.",
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
