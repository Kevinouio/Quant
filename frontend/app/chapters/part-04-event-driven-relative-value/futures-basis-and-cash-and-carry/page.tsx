import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-04-event-driven-relative-value";
const chapterSlug = "futures-basis-and-cash-and-carry";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Spot vs futures",
    "paragraphs": [
      "Spot vs futures placeholder for Futures basis and cash-and-carry.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Basis",
    "paragraphs": [
      "Basis placeholder for Futures basis and cash-and-carry.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Carry link",
    "paragraphs": [
      "Carry link placeholder for Futures basis and cash-and-carry.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Convergence",
    "paragraphs": [
      "Convergence placeholder for Futures basis and cash-and-carry.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Funding and execution risk",
    "paragraphs": [
      "Funding and execution risk placeholder for Futures basis and cash-and-carry.",
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
