import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-02-long-horizon-investing";
const chapterSlug = "passive-indexing-and-benchmarking";

const sectionContent: ChapterSectionContent[] = [
  {
    title: "What passive indexing is",
    paragraphs: [
      "Passive indexing means tracking a broad market benchmark through explicit, repeatable rules instead of forecasting individual winners.",
      "The objective is reliable market exposure with low complexity and controlled implementation drag."
    ]
  },
  {
    title: "Why benchmarking matters",
    paragraphs: [
      "A benchmark sets the baseline risk and return profile your portfolio should track or beat.",
      "Without a benchmark, performance claims are hard to interpret and compare."
    ]
  },
  {
    title: "Active vs passive",
    paragraphs: [
      "Active strategies seek excess return through selection and timing; passive strategies prioritize broad exposure and cost discipline.",
      "This chapter treats passive as the default baseline and active decisions as explicit deviations from that baseline."
    ]
  },
  {
    title: "Tracking error",
    paragraphs: [
      "Tracking error measures how far portfolio returns deviate from benchmark returns over time.",
      "It should be monitored together with turnover and cost assumptions to understand implementation quality."
    ]
  },
  {
    title: "Fees, taxes, and implementation frictions",
    paragraphs: [
      "Net results depend on expense ratio, trading costs, and tax frictions, not just gross returns.",
      "Small recurring frictions can compound into large long-run performance gaps."
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
