import type { ReactNode } from "react";

import { MarketTimeseriesChart } from "../interactive/MarketTimeseriesChart";
import { PassiveIndexingDemo } from "../interactive/PassiveIndexingDemo";

const sectionExtrasByRouteKey: Record<string, ReactNode> = {
  "part-01-foundations/financial-markets-and-instruments/s01-markets": (
    <MarketTimeseriesChart defaultSymbol="NVDA" />
  ),
  "part-02-long-horizon-investing/passive-indexing-and-benchmarking/s04-how-indexes-are-constructed": (
    <PassiveIndexingDemo />
  )
};

export function sectionExtraForRoute(
  partSlug: string,
  chapterSlug: string,
  sectionSlug: string
): ReactNode | undefined {
  return sectionExtrasByRouteKey[`${partSlug}/${chapterSlug}/${sectionSlug}`];
}
