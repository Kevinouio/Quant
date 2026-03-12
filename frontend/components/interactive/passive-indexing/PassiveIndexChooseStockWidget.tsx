"use client";

import type { FormEvent } from "react";

import { usePassiveIndexingDemo } from "./PassiveIndexingDemoContext";

export function PassiveIndexChooseStockWidget() {
  const {
    tickers,
    startDate,
    endDate,
    loading,
    validationError,
    error,
    hasLoaded,
    setTicker,
    setStartDate,
    setEndDate,
    run,
    reset
  } = usePassiveIndexingDemo();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void run();
  };

  return (
    <div className="index-demo__panel">
      <h4>Choose Stocks</h4>
      <form className="index-demo__form" onSubmit={onSubmit}>
        <div className="index-demo__ticker-grid">
          {tickers.map((ticker, index) => (
            <label key={`ticker-${index}`} className="index-demo__field">
              <span>{`Ticker ${index + 1}`}</span>
              <input
                value={ticker}
                onChange={(event) => setTicker(index, event.target.value)}
                placeholder="AAPL"
                maxLength={10}
              />
            </label>
          ))}
        </div>

        <div className="index-demo__dates">
          <label className="index-demo__field">
            <span>Start Date</span>
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </label>
          <label className="index-demo__field">
            <span>End Date</span>
            <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
          </label>
        </div>

        <div className="index-demo__actions">
          <button type="submit" disabled={loading}>
            {loading ? "Running..." : "Run Demo"}
          </button>
          <button
            type="button"
            className="index-demo__ghost-btn"
            onClick={() => {
              void reset();
            }}
            disabled={loading}
          >
            Reset to defaults
          </button>
        </div>
      </form>

      {validationError ? (
        <p className="index-demo__message index-demo__message--error">{validationError}</p>
      ) : null}
      {error ? <p className="index-demo__message index-demo__message--error">{error}</p> : null}
      {loading ? <p className="index-demo__message">Loading interactive index data...</p> : null}
      {!loading && hasLoaded ? <p className="index-demo__message">Latest run loaded below.</p> : null}
    </div>
  );
}
