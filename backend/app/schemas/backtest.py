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
