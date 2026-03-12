"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type InteractiveRequest = {
  tickers: string[];
  startDate: string;
  endDate: string;
};

type InteractiveExcludedTicker = {
  ticker: string;
  reason: string;
};

type InteractiveUniverseRow = {
  ticker: string;
  companyName: string;
  latestPrice: number;
  sharesOutstanding: number | null;
  marketCap: number;
  sector: string | null;
};

type InteractiveWeightRow = {
  ticker: string;
  equalWeight: number;
  marketCapWeight: number;
  priceInfluence: number;
};

type InteractiveIndexPoint = {
  date: string;
  equalWeighted: number;
  marketCapWeighted: number;
  priceWeighted: number;
};

type InteractiveSummary = {
  largestMarketCapWeightTicker: string;
  largestPriceInfluenceTicker: string;
  totalReturnEqualWeighted: number;
  totalReturnMarketCapWeighted: number;
  totalReturnPriceWeighted: number;
  returnSpread: number;
  topMarketCapWeight: number;
  topTwoMarketCapWeight: number;
  concentrationNote: string;
  equalWeightInfluenceNote: string;
};

type PassiveIndexInteractiveResponse = {
  requestedTickers: string[];
  includedTickers: string[];
  excluded: InteractiveExcludedTicker[];
  warnings: string[];
  universe: InteractiveUniverseRow[];
  weights: InteractiveWeightRow[];
  indexPoints: InteractiveIndexPoint[];
  summary: InteractiveSummary;
};

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "http://127.0.0.1:8000";
const DEFAULT_TICKERS = ["AAPL", "MSFT", "NVDA", "GOOGL", "AMZN"];
const SVG_WIDTH = 980;
const SVG_HEIGHT = 320;
const SVG_PADDING = 34;

function toDateInputValue(input: Date): string {
  const year = input.getFullYear();
  const month = `${input.getMonth() + 1}`.padStart(2, "0");
  const day = `${input.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildDefaultRange(): { startDate: string; endDate: string } {
  const end = new Date();
  const start = new Date(end);
  start.setFullYear(end.getFullYear() - 1);
  return { startDate: toDateInputValue(start), endDate: toDateInputValue(end) };
}

function pct(value: number): string {
  return `${(value * 100).toFixed(2)}%`;
}

function money(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

function numberCompact(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2
  }).format(value);
}

function numberPlain(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(value);
}

function buildSeriesPath(
  points: InteractiveIndexPoint[],
  key: "equalWeighted" | "marketCapWeighted" | "priceWeighted",
  minValue: number,
  maxValue: number
): string {
  if (points.length === 0) {
    return "";
  }

  const chartWidth = SVG_WIDTH - SVG_PADDING * 2;
  const chartHeight = SVG_HEIGHT - SVG_PADDING * 2;
  const range = Math.max(maxValue - minValue, 1e-9);

  return points
    .map((point, index) => {
      const x =
        points.length === 1
          ? SVG_WIDTH / 2
          : SVG_PADDING + (index / (points.length - 1)) * chartWidth;
      const value = point[key];
      const y = SVG_PADDING + ((maxValue - value) / range) * chartHeight;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export function PassiveIndexingDemo() {
  const defaultRange = useMemo(() => buildDefaultRange(), []);
  const [tickers, setTickers] = useState<string[]>([...DEFAULT_TICKERS]);
  const [startDate, setStartDate] = useState(defaultRange.startDate);
  const [endDate, setEndDate] = useState(defaultRange.endDate);
  const [data, setData] = useState<PassiveIndexInteractiveResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const allValues = data
    ? data.indexPoints.flatMap((point) => [
        point.equalWeighted,
        point.marketCapWeighted,
        point.priceWeighted
      ])
    : [];
  const minChartValue = allValues.length > 0 ? Math.min(...allValues) : 99;
  const maxChartValue = allValues.length > 0 ? Math.max(...allValues) : 101;
  const equalPath = data
    ? buildSeriesPath(data.indexPoints, "equalWeighted", minChartValue, maxChartValue)
    : "";
  const marketCapPath = data
    ? buildSeriesPath(data.indexPoints, "marketCapWeighted", minChartValue, maxChartValue)
    : "";
  const pricePath = data
    ? buildSeriesPath(data.indexPoints, "priceWeighted", minChartValue, maxChartValue)
    : "";

  async function runQuery(payload: InteractiveRequest): Promise<void> {
    setValidationError(null);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/backtest/passive-indexing/interactive`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { detail?: string } | null;
        throw new Error(body?.detail ?? `Request failed (${response.status})`);
      }

      const result = (await response.json()) as PassiveIndexInteractiveResponse;
      setData(result);
      setHasLoaded(true);
    } catch (requestError: unknown) {
      setData(null);
      setHasLoaded(true);
      setError(requestError instanceof Error ? requestError.message : "Failed to run interactive demo.");
    } finally {
      setLoading(false);
    }
  }

  function validateInputs(candidateTickers: string[], candidateStart: string, candidateEnd: string): string | null {
    if (candidateTickers.length !== 5 || candidateTickers.some((ticker) => ticker.length === 0)) {
      return "Please provide exactly five tickers before running the demo.";
    }
    if (!candidateStart || !candidateEnd) {
      return "Please choose both a start date and an end date.";
    }
    if (candidateStart > candidateEnd) {
      return "Start date must be earlier than end date.";
    }
    return null;
  }

  function normalizedTickers(input: string[]): string[] {
    return input.map((ticker) => ticker.trim().toUpperCase());
  }

  function executeWithCurrentState(): Promise<void> {
    const currentTickers = normalizedTickers(tickers);
    const validationMessage = validateInputs(currentTickers, startDate, endDate);
    if (validationMessage) {
      setValidationError(validationMessage);
      return Promise.resolve();
    }

    return runQuery({
      tickers: currentTickers,
      startDate,
      endDate
    });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void executeWithCurrentState();
  }

  function onReset(): void {
    const nextTickers = [...DEFAULT_TICKERS];
    setTickers(nextTickers);
    setStartDate(defaultRange.startDate);
    setEndDate(defaultRange.endDate);
    void runQuery({
      tickers: nextTickers,
      startDate: defaultRange.startDate,
      endDate: defaultRange.endDate
    });
  }

  useEffect(() => {
    void runQuery({
      tickers: [...DEFAULT_TICKERS],
      startDate: defaultRange.startDate,
      endDate: defaultRange.endDate
    });
  }, [defaultRange.endDate, defaultRange.startDate]);

  return (
    <section className="index-demo">
      <h2>Interactive Example: Build an Index from 5 Stocks</h2>
      <p className="index-demo__intro">
        Use this to compare three index construction rules over the same stock universe.
      </p>

      <div className="index-demo__panel">
        <h3>Choose Stocks</h3>
        <form className="index-demo__form" onSubmit={onSubmit}>
          <div className="index-demo__ticker-grid">
            {tickers.map((ticker, index) => (
              <label key={`ticker-${index}`} className="index-demo__field">
                <span>{`Ticker ${index + 1}`}</span>
                <input
                  value={ticker}
                  onChange={(event) => {
                    const next = [...tickers];
                    next[index] = event.target.value.toUpperCase();
                    setTickers(next);
                  }}
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
            <button type="button" className="index-demo__ghost-btn" onClick={onReset} disabled={loading}>
              Reset to defaults
            </button>
          </div>
        </form>
      </div>

      {validationError ? (
        <p className="index-demo__message index-demo__message--error">{validationError}</p>
      ) : null}
      {error ? <p className="index-demo__message index-demo__message--error">{error}</p> : null}
      {loading ? <p className="index-demo__message">Loading interactive index data...</p> : null}
      {!loading && hasLoaded && data && data.warnings.length > 0 ? (
        <div className="index-demo__warning-box">
          <strong>Data warnings</strong>
          <ul>
            {data.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {!loading && data ? (
        <>
          <div className="index-demo__panel">
            <h3>Retrieved Market Data</h3>
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
                      <td>{money(row.latestPrice)}</td>
                      <td>{row.sharesOutstanding !== null ? numberPlain(row.sharesOutstanding) : "N/A"}</td>
                      <td>{money(row.marketCap)}</td>
                      <td>{row.sector ?? "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="index-demo__panel">
            <h3>How the Weights Differ</h3>
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
                      <td>{pct(row.equalWeight)}</td>
                      <td>{pct(row.marketCapWeight)}</td>
                      <td>{pct(row.priceInfluence)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="index-demo__panel">
            <h3>Index Paths Starting at 100</h3>
            {data.indexPoints.length > 0 ? (
              <>
                <div className="index-demo__chart-wrap">
                  <svg className="index-demo__chart" viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img">
                    <title>Equal-weighted vs market-cap-weighted vs price-weighted index paths</title>
                    <line
                      x1={SVG_PADDING}
                      y1={SVG_HEIGHT - SVG_PADDING}
                      x2={SVG_WIDTH - SVG_PADDING}
                      y2={SVG_HEIGHT - SVG_PADDING}
                      stroke="#c5d3e4"
                      strokeWidth="1"
                    />
                    <line
                      x1={SVG_PADDING}
                      y1={SVG_PADDING}
                      x2={SVG_PADDING}
                      y2={SVG_HEIGHT - SVG_PADDING}
                      stroke="#c5d3e4"
                      strokeWidth="1"
                    />
                    <path d={equalPath} fill="none" stroke="#205a96" strokeWidth="2.2" />
                    <path d={marketCapPath} fill="none" stroke="#1f8f55" strokeWidth="2.2" />
                    <path d={pricePath} fill="none" stroke="#b86817" strokeWidth="2.2" />
                  </svg>
                </div>
                <div className="index-demo__legend">
                  <span>
                    <i className="index-demo__legend-dot index-demo__legend-dot--equal" />
                    Equal-weighted
                  </span>
                  <span>
                    <i className="index-demo__legend-dot index-demo__legend-dot--mcap" />
                    Market-cap-weighted
                  </span>
                  <span>
                    <i className="index-demo__legend-dot index-demo__legend-dot--price" />
                    Price-weighted
                  </span>
                  <span>
                    Range: {data.indexPoints[0].date} to {data.indexPoints[data.indexPoints.length - 1].date}
                  </span>
                </div>
              </>
            ) : (
              <p className="index-demo__message">No overlapping index points were available for this run.</p>
            )}
          </div>

          <div className="index-demo__panel">
            <h3>What This Example Shows</h3>
            <ul className="index-demo__summary-list">
              <li>{`Largest market-cap weight: ${data.summary.largestMarketCapWeightTicker} (${pct(
                data.summary.topMarketCapWeight
              )})`}</li>
              <li>{`Largest price influence: ${data.summary.largestPriceInfluenceTicker}`}</li>
              <li>{`Equal-weighted return: ${pct(data.summary.totalReturnEqualWeighted)}`}</li>
              <li>{`Market-cap-weighted return: ${pct(data.summary.totalReturnMarketCapWeighted)}`}</li>
              <li>{`Price-weighted return: ${pct(data.summary.totalReturnPriceWeighted)}`}</li>
              <li>{`Return spread across methods: ${pct(data.summary.returnSpread)}`}</li>
              <li>{`Top-2 market-cap concentration: ${pct(data.summary.topTwoMarketCapWeight)}`}</li>
            </ul>
            <p>{data.summary.concentrationNote}</p>
            <p>{data.summary.equalWeightInfluenceNote}</p>
            {data.excluded.length > 0 ? (
              <p>{`Excluded tickers in this run: ${data.excluded.map((item) => item.ticker).join(", ")}`}</p>
            ) : null}
            <p>{`Average included market cap: ${numberCompact(
              data.universe.reduce((total, row) => total + row.marketCap, 0) / data.universe.length
            )}`}</p>
          </div>
        </>
      ) : null}
    </section>
  );
}
