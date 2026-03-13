"use client";

import {
  formatIsoDateLabel,
  formatPercentFromPct
} from "../../../lib/chapter6Reconstruction";
import { useChapter6Reconstruction } from "./Chapter6ReconstructionContext";

function formatMetricValue(value: number | null): string {
  if (value === null || !Number.isFinite(value)) {
    return "N/A";
  }
  return value.toFixed(2);
}

export function Chapter6ReconSummaryWidget() {
  const { viewData, loadingView } = useChapter6Reconstruction();

  return (
    <div className="index-demo__panel">
      <h4>Run Summary</h4>
      <p className="index-demo__panel-copy">
        This panel summarizes the selected run, shows warnings, and lists artifact paths so you can inspect
        the exact files generated under the data directory.
      </p>

      {!viewData ? (
        <p className="index-demo__message">
          {loadingView ? "Loading summary..." : "Run or select a reconstruction to load summary outputs."}
        </p>
      ) : (
        <>
          <ul className="index-demo__summary-list">
            <li>{`Run key: ${viewData.runKey}`}</li>
            <li>{`Generated: ${formatIsoDateLabel(viewData.generatedAt)}`}</li>
            <li>{`Date range: ${viewData.params.startDate} to ${viewData.params.endDate}`}</li>
            <li>{`Base value: ${viewData.params.baseValue}`}</li>
            <li>{`S&P comparison rows: ${viewData.counts.sp500ComparisonRows}`}</li>
            <li>{`Dow comparison rows: ${viewData.counts.dowComparisonRows}`}</li>
          </ul>

          {viewData.summaryMetrics.length > 0 ? (
            <div className="index-demo__table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Series</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Total Return</th>
                    <th>Annualized Return</th>
                    <th>Annualized Volatility</th>
                  </tr>
                </thead>
                <tbody>
                  {viewData.summaryMetrics.map((row) => (
                    <tr key={`summary-${row.series}`}>
                      <td>{row.series}</td>
                      <td>{formatMetricValue(row.start)}</td>
                      <td>{formatMetricValue(row.end)}</td>
                      <td>{formatPercentFromPct(row.totalReturnPct)}</td>
                      <td>{formatPercentFromPct(row.annualizedReturnPct)}</td>
                      <td>{formatPercentFromPct(row.annualizedVolatilityPct)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="index-demo__message">Summary metrics were not available for this run.</p>
          )}

          {viewData.warnings.length > 0 ? (
            <div className="index-demo__warning-box">
              <strong>Warnings</strong>
              <ul>
                {viewData.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <details className="index-demo__artifacts">
            <summary>Artifact paths</summary>
            <ul>
              {Object.entries(viewData.artifactPaths).map(([name, location]) => (
                <li key={name}>
                  <strong>{name}:</strong> <code>{location}</code>
                </li>
              ))}
            </ul>
          </details>
        </>
      )}
    </div>
  );
}
