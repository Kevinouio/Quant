import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-08-synthesis";
const chapterSlug = "comparing-investing-and-trading-styles";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Long horizon vs short horizon",
    "paragraphs": [
      "Long horizon vs short horizon placeholder for Comparing investing and trading styles.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Beta vs alpha",
    "paragraphs": [
      "Beta vs alpha placeholder for Comparing investing and trading styles.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Premia vs pure forecasting",
    "paragraphs": [
      "Premia vs pure forecasting placeholder for Comparing investing and trading styles.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Capacity and turnover",
    "paragraphs": [
      "Capacity and turnover placeholder for Comparing investing and trading styles.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Complexity vs edge",
    "paragraphs": [
      "Complexity vs edge placeholder for Comparing investing and trading styles.",
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
