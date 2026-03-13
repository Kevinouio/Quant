"use client";

import { formatPercentFromPct } from "../../../lib/chapter6Reconstruction";
import { useChapter6Reconstruction } from "./Chapter6ReconstructionContext";

export function Chapter6ReconDowWeightsWidget() {
  const { viewData, loadingView } = useChapter6Reconstruction();

  return (
    <div className="index-demo__panel">
      <h4>Dow Top Weights</h4>
      <p className="index-demo__panel-copy">
        These weights are price-based contributions from the Dow-style run. Unlike cap-weighting, higher
        share prices drive larger influence here.
      </p>

      {!viewData ? (
        <p className="index-demo__message">
          {loadingView ? "Loading Dow top weights..." : "Run or select a reconstruction to view top weights."}
        </p>
      ) : viewData.dowTopWeights.length === 0 ? (
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
              {viewData.dowTopWeights.map((row) => (
                <tr key={`dow-top-weight-${row.ticker}`}>
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
