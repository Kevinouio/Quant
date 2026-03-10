"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type MarketPoint = {
  timestamp: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
};

type MarketTimeseriesResponse = {
  symbol: string;
  interval: string;
  period: string;
  asOf: string;
  points: MarketPoint[];
};

type ChartPoint = {
  x: number;
  y: number;
  timestamp: string;
  close: number;
};

const SVG_WIDTH = 920;
const SVG_HEIGHT = 280;
const SVG_PADDING = 28;
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "http://127.0.0.1:8000";

function toChartPoints(points: MarketPoint[]): ChartPoint[] {
  const clean = points
    .filter((point) => typeof point.close === "number" && Number.isFinite(point.close))
    .map((point) => ({ timestamp: point.timestamp, close: point.close as number }));

  if (clean.length === 0) {
    return [];
  }

  const minClose = Math.min(...clean.map((point) => point.close));
  const maxClose = Math.max(...clean.map((point) => point.close));
  const range = Math.max(maxClose - minClose, 1e-9);
  const chartWidth = SVG_WIDTH - SVG_PADDING * 2;
  const chartHeight = SVG_HEIGHT - SVG_PADDING * 2;

  return clean.map((point, index) => {
    const x =
      clean.length === 1 ? SVG_WIDTH / 2 : SVG_PADDING + (index / (clean.length - 1)) * chartWidth;
    const y = SVG_PADDING + ((maxClose - point.close) / range) * chartHeight;

    return { x, y, timestamp: point.timestamp, close: point.close };
  });
}

function pointsToPath(points: ChartPoint[]): string {
  if (points.length === 0) {
    return "";
  }

  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(" ");
}

export function MarketTimeseriesChart({ defaultSymbol = "NVDA" }: { defaultSymbol?: string }) {
  const [symbolInput, setSymbolInput] = useState(defaultSymbol);
  const [symbol, setSymbol] = useState(defaultSymbol.toUpperCase());
  const [response, setResponse] = useState<MarketTimeseriesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      symbol,
      interval: "1m",
      period: "1d",
      prepost: "true"
    });

    setLoading(true);
    setError(null);

    fetch(`${BACKEND_BASE_URL}/market/timeseries?${params.toString()}`, {
      method: "GET",
      signal: controller.signal
    })
      .then(async (result) => {
        if (!result.ok) {
          const payload = (await result.json().catch(() => null)) as { detail?: string } | null;
          throw new Error(payload?.detail ?? `Request failed (${result.status})`);
        }
        return (await result.json()) as MarketTimeseriesResponse;
      })
      .then((payload) => {
        setResponse(payload);
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === "AbortError") {
          return;
        }
        const message = err instanceof Error ? err.message : "Failed to fetch market data.";
        setError(message);
        setResponse(null);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [symbol]);

  const chartPoints = useMemo(() => toChartPoints(response?.points ?? []), [response]);
  const path = useMemo(() => pointsToPath(chartPoints), [chartPoints]);
  const firstPoint = chartPoints[0];
  const lastPoint = chartPoints[chartPoints.length - 1];

  const minClose = chartPoints.length > 0 ? Math.min(...chartPoints.map((point) => point.close)) : null;
  const maxClose = chartPoints.length > 0 ? Math.max(...chartPoints.map((point) => point.close)) : null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = symbolInput.trim().toUpperCase();
    if (!cleaned) {
      return;
    }
    setSymbol(cleaned);
  };

  return (
    <div className="market-widget">
      <form className="market-widget__controls" onSubmit={onSubmit}>
        <label htmlFor="ticker-input">Ticker</label>
        <input
          id="ticker-input"
          value={symbolInput}
          onChange={(event) => setSymbolInput(event.target.value.toUpperCase())}
          placeholder="NVDA"
        />
        <button type="submit">Load</button>
      </form>

      {loading && <p className="market-widget__message">Loading intraday data...</p>}
      {!loading && error && <p className="market-widget__message market-widget__message--error">{error}</p>}
      {!loading && !error && chartPoints.length === 0 && (
        <p className="market-widget__message">No intraday points available for this symbol.</p>
      )}

      {!loading && !error && chartPoints.length > 0 && (
        <div className="market-widget__chart-wrap">
          <svg className="market-widget__chart" viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img">
            <title>{`${symbol} intraday close chart`}</title>
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
            <path d={path} fill="none" stroke="#205a96" strokeWidth="2" />
          </svg>

          <div className="market-widget__stats">
            <span>{`Symbol: ${response?.symbol ?? symbol}`}</span>
            <span>{`Start: ${firstPoint.close.toFixed(2)}`}</span>
            <span>{`Latest: ${lastPoint.close.toFixed(2)}`}</span>
            <span>{`Low: ${(minClose as number).toFixed(2)}`}</span>
            <span>{`High: ${(maxClose as number).toFixed(2)}`}</span>
            <span>{`Points: ${chartPoints.length}`}</span>
          </div>
        </div>
      )}
    </div>
  );
}
