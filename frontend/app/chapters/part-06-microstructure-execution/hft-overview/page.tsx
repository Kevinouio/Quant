import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-06-microstructure-execution";
const chapterSlug = "hft-overview";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "What HFT actually means",
    "paragraphs": [
      "What HFT actually means placeholder for HFT overview.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why infrastructure matters",
    "paragraphs": [
      "Why infrastructure matters placeholder for HFT overview.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "L1 vs L2 data",
    "paragraphs": [
      "L1 vs L2 data placeholder for HFT overview.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Risk controls",
    "paragraphs": [
      "Risk controls placeholder for HFT overview.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why this is not an early build topic",
    "paragraphs": [
      "Why this is not an early build topic placeholder for HFT overview.",
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
