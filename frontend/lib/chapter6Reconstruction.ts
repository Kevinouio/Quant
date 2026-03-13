const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "http://127.0.0.1:8000";

export type Chapter6ReconstructionCounts = {
  sp500Constituents: number;
  dowConstituents: number;
  sp500UsableTickers: number;
  dowUsableTickers: number;
  sp500Rows: number;
  dowRows: number;
  sp500ComparisonRows: number;
  dowComparisonRows: number;
};

export type Chapter6ReconstructionRunParams = {
  snapshotDate: string;
  startDate: string;
  endDate: string;
  baseValue: number;
};

export type Chapter6ReconstructionRunInfo = {
  runKey: string;
  generatedAt: string;
  params: Chapter6ReconstructionRunParams;
  counts: Chapter6ReconstructionCounts;
  warningsCount: number;
};

export type Chapter6ReconstructionRunsResponse = {
  runs: Chapter6ReconstructionRunInfo[];
};

export type Chapter6ComparePoint = {
  date: string;
  reconstructed: number;
  official: number;
};

export type Chapter6TopWeightRow = {
  ticker: string;
  company: string | null;
  weightPct: number;
};

export type Chapter6SummaryMetricRow = {
  series: string;
  start: number | null;
  end: number | null;
  totalReturnPct: number | null;
  annualizedReturnPct: number | null;
  annualizedVolatilityPct: number | null;
};

export type Chapter6ReconstructionViewResponse = {
  runKey: string;
  generatedAt: string;
  params: Chapter6ReconstructionRunParams;
  rawOutputDir: string;
  processedOutputDir: string;
  artifactPaths: Record<string, string>;
  counts: Chapter6ReconstructionCounts;
  warnings: string[];
  sp500ComparePoints: Chapter6ComparePoint[];
  dowComparePoints: Chapter6ComparePoint[];
  sp500TopWeights: Chapter6TopWeightRow[];
  dowTopWeights: Chapter6TopWeightRow[];
  summaryMetrics: Chapter6SummaryMetricRow[];
};

export type Chapter6ReconstructionRequest = {
  startDate?: string;
  endDate?: string;
  snapshotDate?: string;
  baseValue?: number;
  force?: boolean;
};

export type Chapter6ReconstructionResponse = {
  runKey: string;
  cached: boolean;
  rawOutputDir: string;
  processedOutputDir: string;
  artifactPaths: Record<string, string>;
  counts: Chapter6ReconstructionCounts;
  warnings: string[];
};

async function parseApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { detail?: string } | null;
    throw new Error(body?.detail ?? `Request failed (${response.status})`);
  }
  return (await response.json()) as T;
}

export async function fetchChapter6ReconstructionRuns(): Promise<Chapter6ReconstructionRunsResponse> {
  const response = await fetch(`${BACKEND_BASE_URL}/backtest/passive-indexing/chapter-6-reconstruction/runs`, {
    method: "GET"
  });
  return parseApiResponse<Chapter6ReconstructionRunsResponse>(response);
}

export async function fetchChapter6ReconstructionView(
  runKey?: string
): Promise<Chapter6ReconstructionViewResponse> {
  const query = runKey ? `?runKey=${encodeURIComponent(runKey)}` : "";
  const response = await fetch(
    `${BACKEND_BASE_URL}/backtest/passive-indexing/chapter-6-reconstruction/view${query}`,
    { method: "GET" }
  );
  return parseApiResponse<Chapter6ReconstructionViewResponse>(response);
}

export async function runChapter6Reconstruction(
  payload: Chapter6ReconstructionRequest
): Promise<Chapter6ReconstructionResponse> {
  const response = await fetch(`${BACKEND_BASE_URL}/backtest/passive-indexing/chapter-6-reconstruction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return parseApiResponse<Chapter6ReconstructionResponse>(response);
}

export function formatPercentFromPct(value: number | null): string {
  if (value === null || !Number.isFinite(value)) {
    return "N/A";
  }
  return `${value.toFixed(2)}%`;
}

export function formatIsoDateLabel(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.valueOf())) {
    return iso;
  }
  return parsed.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
