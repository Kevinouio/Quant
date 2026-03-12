"use client";

import {
  formatMoney,
  formatWholeNumber
} from "../../../lib/passiveIndexingInteractive";
import { usePassiveIndexingDemo } from "./PassiveIndexingDemoContext";

export function PassiveIndexMarketDataWidget() {
  const { data, loading } = usePassiveIndexingDemo();

  return (
    <div className="index-demo__panel">
      <h4>Retrieved Market Data</h4>
      {!data ? (
        <p className="index-demo__message">
          {loading ? "Loading market data..." : "Run the demo above to populate this table."}
        </p>
      ) : (
        <div className="index-demo__table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Company</th>
                <th>Latest Price</th>
                <th>Shares Outstanding</th>
                <th>Market Cap</th>
                <th>Sector</th>
              </tr>
            </thead>
            <tbody>
              {data.universe.map((row) => (
                <tr key={`universe-${row.ticker}`}>
                  <td>{row.ticker}</td>
                  <td>{row.companyName}</td>
                  <td>{formatMoney(row.latestPrice)}</td>
                  <td>{row.sharesOutstanding !== null ? formatWholeNumber(row.sharesOutstanding) : "N/A"}</td>
                  <td>{formatMoney(row.marketCap)}</td>
                  <td>{row.sector ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
