import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-01-foundations";
const chapterSlug = "financial-markets-and-instruments";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "What a market is",
    "paragraphs": [
      "What a market is placeholder for Financial markets and instruments.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Stocks, bonds, ETFs, mutual funds",
    "paragraphs": [
      "Stocks, bonds, ETFs, mutual funds placeholder for Financial markets and instruments.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Indexes and benchmarks",
    "paragraphs": [
      "Indexes and benchmarks placeholder for Financial markets and instruments.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Derivatives at a high level",
    "paragraphs": [
      "Derivatives at a high level placeholder for Financial markets and instruments.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Exchanges, brokers, and market participants",
    "paragraphs": [
      "Exchanges, brokers, and market participants placeholder for Financial markets and instruments.",
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
