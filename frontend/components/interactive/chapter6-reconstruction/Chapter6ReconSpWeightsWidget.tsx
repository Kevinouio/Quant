"use client";

import { formatPercentFromPct } from "../../../lib/chapter6Reconstruction";
import { useChapter6Reconstruction } from "./Chapter6ReconstructionContext";

export function Chapter6ReconSpWeightsWidget() {
  const { viewData, loadingView } = useChapter6Reconstruction();

  return (
    <div className="index-demo__panel">
      <h4>S&P Top Weights</h4>
      <p className="index-demo__panel-copy">
        These are the largest constituent weights from the stored S&P-style run, using the latest date in
        the sample. It shows concentration in the reconstructed benchmark.
      </p>

      {!viewData ? (
        <p className="index-demo__message">
          {loadingView ? "Loading S&P top weights..." : "Run or select a reconstruction to view top weights."}
        </p>
      ) : viewData.sp500TopWeights.length === 0 ? (
        <p className="index-demo__message">No top-weight table was available for this run.</p>
      ) : (
        <div className="index-demo__table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Company</th>
                <th>Weight (%)</th>
              </tr>
            </thead>
            <tbody>
              {viewData.sp500TopWeights.map((row) => (
                <tr key={`sp-top-weight-${row.ticker}`}>
                  <td>{row.ticker}</td>
                  <td>{row.company ?? "N/A"}</td>
                  <td>{formatPercentFromPct(row.weightPct)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
