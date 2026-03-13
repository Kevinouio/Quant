"""Request and response schema stubs for backtests."""

from datetime import date

from pydantic import BaseModel, Field


class BacktestRequest(BaseModel):
    benchmark: str = Field(default="SPY")
    rebalance_frequency: str = Field(default="monthly")
    expense_ratio_bps: float = Field(default=3.0, ge=0.0)


class MetricPoint(BaseModel):
    timestamp: str
    value: float


class BacktestResponse(BaseModel):
    strategy: str
    benchmark: str
    equity_curve: list[MetricPoint]
    metrics: dict[str, float]
    assumptions: dict[str, str | float]


class PassiveIndexInteractiveRequest(BaseModel):
    tickers: list[str] = Field(min_length=5, max_length=5)
    startDate: date | None = None
    endDate: date | None = None


class PassiveIndexExcludedTicker(BaseModel):
    ticker: str
    reason: str


class PassiveIndexUniverseRow(BaseModel):
    ticker: str
    companyName: str
    latestPrice: float
    sharesOutstanding: float | None
    marketCap: float
    sector: str | None


class PassiveIndexWeightRow(BaseModel):
    ticker: str
    equalWeight: float
    marketCapWeight: float
    priceInfluence: float


class PassiveIndexPoint(BaseModel):
    date: str
    equalWeighted: float
    marketCapWeighted: float
    priceWeighted: float


class PassiveIndexSummary(BaseModel):
    largestMarketCapWeightTicker: str
    largestPriceInfluenceTicker: str
    totalReturnEqualWeighted: float
    totalReturnMarketCapWeighted: float
    totalReturnPriceWeighted: float
    returnSpread: float
    topMarketCapWeight: float
    topTwoMarketCapWeight: float
    concentrationNote: str
    equalWeightInfluenceNote: str


class PassiveIndexInteractiveResponse(BaseModel):
    requestedTickers: list[str]
    includedTickers: list[str]
    excluded: list[PassiveIndexExcludedTicker]
    warnings: list[str]
    universe: list[PassiveIndexUniverseRow]
    weights: list[PassiveIndexWeightRow]
    indexPoints: list[PassiveIndexPoint]
    summary: PassiveIndexSummary


class Chapter6ReconstructionRequest(BaseModel):
    startDate: date | None = None
    endDate: date | None = None
    snapshotDate: date | None = None
    baseValue: float = Field(default=100.0, gt=0.0)
    force: bool = False


class Chapter6ReconstructionCounts(BaseModel):
    sp500Constituents: int
    dowConstituents: int
    sp500UsableTickers: int
    dowUsableTickers: int
    sp500Rows: int
    dowRows: int
    sp500ComparisonRows: int
    dowComparisonRows: int


class Chapter6ReconstructionResponse(BaseModel):
    runKey: str
    cached: bool
    rawOutputDir: str
    processedOutputDir: str
    artifactPaths: dict[str, str]
    counts: Chapter6ReconstructionCounts
    warnings: list[str]


class Chapter6ReconstructionRunParams(BaseModel):
    snapshotDate: str
    startDate: str
    endDate: str
    baseValue: float


class Chapter6ReconstructionRunInfo(BaseModel):
    runKey: str
    generatedAt: str
    params: Chapter6ReconstructionRunParams
    counts: Chapter6ReconstructionCounts
    warningsCount: int


class Chapter6ReconstructionRunsResponse(BaseModel):
    runs: list[Chapter6ReconstructionRunInfo]


class Chapter6ComparePoint(BaseModel):
    date: str
    reconstructed: float
    official: float


class Chapter6TopWeightRow(BaseModel):
    ticker: str
    company: str | None
    weightPct: float


class Chapter6SummaryMetricRow(BaseModel):
    series: str
    start: float | None
    end: float | None
    totalReturnPct: float | None
    annualizedReturnPct: float | None
    annualizedVolatilityPct: float | None


class Chapter6ReconstructionViewResponse(BaseModel):
    runKey: str
    generatedAt: str
    params: Chapter6ReconstructionRunParams
    rawOutputDir: str
    processedOutputDir: str
    artifactPaths: dict[str, str]
    counts: Chapter6ReconstructionCounts
    warnings: list[str]
    sp500ComparePoints: list[Chapter6ComparePoint]
    dowComparePoints: list[Chapter6ComparePoint]
    sp500TopWeights: list[Chapter6TopWeightRow]
    dowTopWeights: list[Chapter6TopWeightRow]
    summaryMetrics: list[Chapter6SummaryMetricRow]
