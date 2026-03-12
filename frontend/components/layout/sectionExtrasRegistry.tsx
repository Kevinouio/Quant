import type { ReactNode } from "react";

import { MarketTimeseriesChart } from "../interactive/MarketTimeseriesChart";
import { PassiveIndexingDemo } from "../interactive/PassiveIndexingDemo";
import { PassiveIndexChooseStockWidget } from "../interactive/passive-indexing/PassiveIndexChooseStockWidget";
import { PassiveIndexMarketDataWidget } from "../interactive/passive-indexing/PassiveIndexMarketDataWidget";
import { PassiveIndexPathsWidget } from "../interactive/passive-indexing/PassiveIndexPathsWidget";
import { PassiveIndexSummaryWidget } from "../interactive/passive-indexing/PassiveIndexSummaryWidget";
import { PassiveIndexWeightsDifferWidget } from "../interactive/passive-indexing/PassiveIndexWeightsDifferWidget";

type WidgetFactory = () => ReactNode;

const widgetByIdMap: Record<string, WidgetFactory> = {
  "market-timeseries-nvda": () => <MarketTimeseriesChart defaultSymbol="NVDA" />,
  "passive-index-choose-stock": () => <PassiveIndexChooseStockWidget />,
  "passive-index-market-data": () => <PassiveIndexMarketDataWidget />,
  "passive-index-weights-differ": () => <PassiveIndexWeightsDifferWidget />,
  "passive-index-index-paths": () => <PassiveIndexPathsWidget />,
  "passive-index-summary": () => <PassiveIndexSummaryWidget />,
  "passive-index-demo": () => <PassiveIndexingDemo />
};

const sectionExtraWidgetByRoute: Record<string, string> = {
  "part-01-foundations/financial-markets-and-instruments/s01-markets": "market-timeseries-nvda",
  "part-02-long-horizon-investing/passive-indexing-and-benchmarking/s04-how-indexes-are-constructed":
    "passive-index-demo"
};

export function sectionExtraForRoute(
  partSlug: string,
  chapterSlug: string,
  sectionSlug: string
): ReactNode | undefined {
  const widgetId = sectionExtraWidgetByRoute[`${partSlug}/${chapterSlug}/${sectionSlug}`];
  if (!widgetId) {
    return undefined;
  }
  return widgetById(widgetId);
}

export function widgetById(widgetId: string): ReactNode | undefined {
  const factory = widgetByIdMap[widgetId.trim().toLowerCase()];
  return factory ? factory() : undefined;
}
