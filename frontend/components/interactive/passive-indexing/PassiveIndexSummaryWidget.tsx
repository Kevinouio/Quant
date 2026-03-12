"use client";

import {
  averageIncludedMarketCap,
  excludedTickerLabel,
  formatCompactNumber,
  formatPercent
} from "../../../lib/passiveIndexingInteractive";
import { usePassiveIndexingDemo } from "./PassiveIndexingDemoContext";

export function PassiveIndexSummaryWidget() {
  const { data, loading } = usePassiveIndexingDemo();

  return (
    <div className="index-demo__panel">
      <h4>What This Example Shows</h4>
      {!data ? (
        <p className="index-demo__message">
          {loading ? "Building interpretation summary..." : "Run the demo above to generate this summary."}
        </p>
      ) : (
        <>
          {data.warnings.length > 0 ? (
            <div className="index-demo__warning-box">
              <strong>Data warnings</strong>
              <ul>
                {data.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <ul className="index-demo__summary-list">
            <li>{`Largest market-cap weight: ${data.summary.largestMarketCapWeightTicker} (${formatPercent(
              data.summary.topMarketCapWeight
            )})`}</li>
            <li>{`Largest price influence: ${data.summary.largestPriceInfluenceTicker}`}</li>
            <li>{`Equal-weighted return: ${formatPercent(data.summary.totalReturnEqualWeighted)}`}</li>
            <li>{`Market-cap-weighted return: ${formatPercent(data.summary.totalReturnMarketCapWeighted)}`}</li>
            <li>{`Price-weighted return: ${formatPercent(data.summary.totalReturnPriceWeighted)}`}</li>
            <li>{`Return spread across methods: ${formatPercent(data.summary.returnSpread)}`}</li>
            <li>{`Top-2 market-cap concentration: ${formatPercent(data.summary.topTwoMarketCapWeight)}`}</li>
          </ul>

          <p>{data.summary.concentrationNote}</p>
          <p>{data.summary.equalWeightInfluenceNote}</p>

          {data.excluded.length > 0 ? (
            <p>{`Excluded tickers in this run: ${excludedTickerLabel(data)}`}</p>
          ) : null}

          <p>{`Average included market cap: ${formatCompactNumber(averageIncludedMarketCap(data))}`}</p>
        </>
      )}
    </div>
  );
}
