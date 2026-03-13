"use client";

import { Chapter6CompareChart } from "./Chapter6CompareChart";
import { useChapter6Reconstruction } from "./Chapter6ReconstructionContext";

export function Chapter6ReconDowCompareWidget() {
  const { viewData, loadingView } = useChapter6Reconstruction();

  return (
    <div className="index-demo__panel">
      <h4>Dow Comparison</h4>
      <p className="index-demo__panel-copy">
        This chart compares the Dow-style reconstruction with the official DJIA benchmark, again rebased
        to 100 so shape differences are easier to interpret.
      </p>

      {!viewData ? (
        <p className="index-demo__message">
          {loadingView
            ? "Loading Dow comparison series..."
            : "Run or select a reconstruction to populate this chart."}
        </p>
      ) : (
        <Chapter6CompareChart
          title="Dow-style reconstruction vs official DJIA"
          description="Green line is reconstructed Dow-style index, red line is official DJIA."
          points={viewData.dowComparePoints}
          reconstructedLabel="Dow-style reconstruction"
          officialLabel="Official DJIA"
          reconstructedColor="#1f8f55"
          officialColor="#ad3c3c"
        />
      )}
    </div>
  );
}
