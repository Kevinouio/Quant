import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-04-event-driven-relative-value";
const chapterSlug = "event-driven-trading";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "What an event is",
    "paragraphs": [
      "What an event is placeholder for Event-driven trading.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Why events create temporary mispricings",
    "paragraphs": [
      "Why events create temporary mispricings placeholder for Event-driven trading.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Scheduled vs unscheduled events",
    "paragraphs": [
      "Scheduled vs unscheduled events placeholder for Event-driven trading.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Event windows",
    "paragraphs": [
      "Event windows placeholder for Event-driven trading.",
      "Add concrete definitions, formulas, and implementation notes in a later pass."
    ]
  },
  {
    "title": "Implementation difficulty",
    "paragraphs": [
      "Implementation difficulty placeholder for Event-driven trading.",
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
