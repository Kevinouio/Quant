export type PassiveIndexInteractiveRequest = {
  tickers: string[];
  startDate: string;
  endDate: string;
};

export type PassiveIndexExcludedTicker = {
  ticker: string;
  reason: string;
};

export type PassiveIndexUniverseRow = {
  ticker: string;
  companyName: string;
  latestPrice: number;
  sharesOutstanding: number | null;
  marketCap: number;
  sector: string | null;
};

export type PassiveIndexWeightRow = {
  ticker: string;
  equalWeight: number;
  marketCapWeight: number;
  priceInfluence: number;
};

export type PassiveIndexPoint = {
  date: string;
  equalWeighted: number;
  marketCapWeighted: number;
  priceWeighted: number;
};

export type PassiveIndexSummary = {
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

export type PassiveIndexInteractiveResponse = {
  requestedTickers: string[];
  includedTickers: string[];
  excluded: PassiveIndexExcludedTicker[];
  warnings: string[];
  universe: PassiveIndexUniverseRow[];
  weights: PassiveIndexWeightRow[];
  indexPoints: PassiveIndexPoint[];
  summary: PassiveIndexSummary;
};

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "http://127.0.0.1:8000";

export const PASSIVE_INDEX_DEFAULT_TICKERS = ["AAPL", "MSFT", "NVDA", "GOOGL", "AMZN"];

function toDateInputValue(input: Date): string {
  const year = input.getFullYear();
  const month = `${input.getMonth() + 1}`.padStart(2, "0");
  const day = `${input.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function buildDefaultDateRange(): { startDate: string; endDate: string } {
  const end = new Date();
  const start = new Date(end);
  start.setFullYear(end.getFullYear() - 1);
  return { startDate: toDateInputValue(start), endDate: toDateInputValue(end) };
}

export function normalizeTickers(tickers: string[]): string[] {
  return tickers.map((ticker) => ticker.trim().toUpperCase());
}

export function validatePassiveIndexInputs(
  tickers: string[],
  startDate: string,
  endDate: string
): string | null {
  if (tickers.length !== 5 || tickers.some((ticker) => ticker.length === 0)) {
    return "Please provide exactly five tickers before running the demo.";
  }

  if (!startDate || !endDate) {
    return "Please choose both a start date and an end date.";
  }

  if (startDate > endDate) {
    return "Start date must be earlier than end date.";
  }

  return null;
}

export async function fetchPassiveIndexInteractive(
  payload: PassiveIndexInteractiveRequest
): Promise<PassiveIndexInteractiveResponse> {
  const response = await fetch(`${BACKEND_BASE_URL}/backtest/passive-indexing/interactive`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { detail?: string } | null;
    throw new Error(body?.detail ?? `Request failed (${response.status})`);
  }

  return (await response.json()) as PassiveIndexInteractiveResponse;
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(2)}%`;
}

export function formatMoney(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2
  }).format(value);
}

export function formatWholeNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(value);
}

export function indexSeriesValues(data: PassiveIndexInteractiveResponse): number[] {
  return data.indexPoints.flatMap((point) => [
    point.equalWeighted,
    point.marketCapWeighted,
    point.priceWeighted
  ]);
}

export function averageIncludedMarketCap(data: PassiveIndexInteractiveResponse): number {
  return data.universe.reduce((total, row) => total + row.marketCap, 0) / data.universe.length;
}

export function excludedTickerLabel(data: PassiveIndexInteractiveResponse): string {
  return data.excluded.map((item) => item.ticker).join(", ");
}
