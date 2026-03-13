"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import { formatIsoDateLabel } from "../../../lib/chapter6Reconstruction";
import { useChapter6Reconstruction } from "./Chapter6ReconstructionContext";

export function Chapter6ReconRunControlsWidget() {
  const {
    runs,
    selectedRunKey,
    viewData,
    loadingRuns,
    loadingView,
    running,
    error,
    hasLoaded,
    selectRun,
    runReconstruction
  } = useChapter6Reconstruction();
  const [forceRun, setForceRun] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void runReconstruction(forceRun);
  };

  return (
    <div className="index-demo__panel">
      <h4>Run Controls</h4>
      <p className="index-demo__panel-copy">
        Run the full Chapter 6 reconstruction job once, then inspect cached runs. The selector always
        starts from the latest generated run.
      </p>

      <form className="index-demo__form" onSubmit={onSubmit}>
        <label className="index-demo__field">
          <span>Select a cached run</span>
          <select
            value={selectedRunKey ?? ""}
            onChange={(event) => {
              const nextRunKey = event.target.value;
              if (nextRunKey) {
                void selectRun(nextRunKey);
              }
            }}
            disabled={loadingRuns || loadingView || running || runs.length === 0}
          >
            {runs.length === 0 ? <option value="">No runs yet</option> : null}
            {runs.map((run) => (
              <option key={run.runKey} value={run.runKey}>
                {`${run.runKey} (${formatIsoDateLabel(run.generatedAt)})`}
              </option>
            ))}
          </select>
        </label>

        <label className="index-demo__checkbox">
          <input
            type="checkbox"
            checked={forceRun}
            onChange={(event) => setForceRun(event.target.checked)}
            disabled={running}
          />
          <span>Force recompute (ignore cached artifacts for this run key)</span>
        </label>

        <div className="index-demo__actions">
          <button type="submit" disabled={running}>
            {running ? "Running..." : "Run reconstruction"}
          </button>
        </div>
      </form>

      <div className="index-demo__status-row">
        <span className="index-demo__chip">{`Runs: ${runs.length}`}</span>
        <span className="index-demo__chip">
          {`Latest generated: ${viewData ? formatIsoDateLabel(viewData.generatedAt) : "N/A"}`}
        </span>
        <span className="index-demo__chip">{`Current run: ${selectedRunKey ?? "none"}`}</span>
      </div>

      {loadingRuns || loadingView ? (
        <p className="index-demo__message">Loading run metadata...</p>
      ) : null}
      {!loadingRuns && !loadingView && hasLoaded && runs.length === 0 ? (
        <p className="index-demo__message">
          No reconstruction run exists yet. Use the run button to generate one.
        </p>
      ) : null}
      {error ? <p className="index-demo__message index-demo__message--error">{error}</p> : null}
    </div>
  );
}
