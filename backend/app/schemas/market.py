"""Market data API response schemas."""

from pydantic import BaseModel


class MarketTimeseriesPoint(BaseModel):
    timestamp: str
    open: float | None
    high: float | None
    low: float | None
    close: float | None
    volume: int | None


class MarketTimeseriesResponse(BaseModel):
    symbol: str
    interval: str
    period: str
    asOf: str
    points: list[MarketTimeseriesPoint]
