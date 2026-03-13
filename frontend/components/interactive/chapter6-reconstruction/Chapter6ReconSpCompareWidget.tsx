"use client";

import { Chapter6CompareChart } from "./Chapter6CompareChart";
import { useChapter6Reconstruction } from "./Chapter6ReconstructionContext";

export function Chapter6ReconSpCompareWidget() {
  const { viewData, loadingView } = useChapter6Reconstruction();

  return (
    <div className="index-demo__panel">
      <h4>S&P Comparison</h4>
      <p className="index-demo__panel-copy">
        This chart compares the S&P 500-style reconstruction (based on the stored run artifacts) against
        the official S&P 500 benchmark, both rebased to 100.
      </p>

      {!viewData ? (
        <p className="index-demo__message">
          {loadingView
            ? "Loading S&P comparison series..."
            : "Run or select a reconstruction to populate this chart."}
        </p>
      ) : (
        <Chapter6CompareChart
          title="S&P-style reconstruction vs official S&P 500"
          description="Blue line is reconstructed S&P-style index, orange line is official S&P 500."
          points={viewData.sp500ComparePoints}
          reconstructedLabel="S&P-style reconstruction"
          officialLabel="Official S&P 500"
          reconstructedColor="#205a96"
          officialColor="#b86817"
        />
      )}
    </div>
  );
}
