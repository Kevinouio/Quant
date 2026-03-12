"use client";

import { PassiveIndexingDemoProvider } from "./passive-indexing/PassiveIndexingDemoContext";
import { PassiveIndexChooseStockWidget } from "./passive-indexing/PassiveIndexChooseStockWidget";
import { PassiveIndexMarketDataWidget } from "./passive-indexing/PassiveIndexMarketDataWidget";
import { PassiveIndexPathsWidget } from "./passive-indexing/PassiveIndexPathsWidget";
import { PassiveIndexSummaryWidget } from "./passive-indexing/PassiveIndexSummaryWidget";
import { PassiveIndexWeightsDifferWidget } from "./passive-indexing/PassiveIndexWeightsDifferWidget";

export function PassiveIndexingDemo() {
  return (
    <PassiveIndexingDemoProvider>
      <section className="index-demo">
        <PassiveIndexChooseStockWidget />
        <PassiveIndexMarketDataWidget />
        <PassiveIndexWeightsDifferWidget />
        <PassiveIndexPathsWidget />
        <PassiveIndexSummaryWidget />
      </section>
    </PassiveIndexingDemoProvider>
  );
}
