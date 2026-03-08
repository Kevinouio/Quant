"""Request and response schema stubs for backtests."""

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
