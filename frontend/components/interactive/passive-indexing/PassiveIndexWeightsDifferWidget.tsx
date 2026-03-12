"use client";

import { formatPercent } from "../../../lib/passiveIndexingInteractive";
import { usePassiveIndexingDemo } from "./PassiveIndexingDemoContext";

export function PassiveIndexWeightsDifferWidget() {
  const { data, loading } = usePassiveIndexingDemo();

  return (
    <div className="index-demo__panel">
      <h4>How the Weights Differ</h4>
      {!data ? (
        <p className="index-demo__message">
          {loading ? "Loading weight comparison..." : "Run the demo above to populate weight differences."}
        </p>
      ) : (
        <div className="index-demo__table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Equal Weight</th>
                <th>Market-Cap Weight</th>
                <th>Price Influence</th>
              </tr>
            </thead>
            <tbody>
              {data.weights.map((row) => (
                <tr key={`weights-${row.ticker}`}>
                  <td>{row.ticker}</td>
                  <td>{formatPercent(row.equalWeight)}</td>
                  <td>{formatPercent(row.marketCapWeight)}</td>
                  <td>{formatPercent(row.priceInfluence)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
