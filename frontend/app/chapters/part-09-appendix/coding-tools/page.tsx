import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-09-appendix";
const chapterSlug = "coding-tools";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Python and notebook workflow",
    "paragraphs": [
      "Python and notebook workflow placeholder for Coding tools.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Backtesting tooling checklist",
    "paragraphs": [
      "Backtesting tooling checklist placeholder for Coding tools.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Version control workflow",
    "paragraphs": [
      "Version control workflow placeholder for Coding tools.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Testing, linting, and formatting",
    "paragraphs": [
      "Testing, linting, and formatting placeholder for Coding tools.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Automation basics",
    "paragraphs": [
      "Automation basics placeholder for Coding tools.",
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
