"""Market data service using yfinance."""

from __future__ import annotations

from datetime import datetime, timezone

import yfinance as yf
from pandas import isna

from app.schemas.market import MarketTimeseriesPoint, MarketTimeseriesResponse


def _as_float(value: object) -> float | None:
    if value is None or isna(value):
        return None
    return float(value)


def _as_int(value: object) -> int | None:
    if value is None or isna(value):
        return None
    return int(value)


def fetch_market_timeseries(
    symbol: str,
    interval: str = "1m",
    period: str = "1d",
    prepost: bool = True,
) -> MarketTimeseriesResponse:
    normalized_symbol = symbol.strip().upper()
    if not normalized_symbol:
        raise ValueError("symbol must be provided")

    try:
        frame = yf.Ticker(normalized_symbol).history(
            period=period,
            interval=interval,
            prepost=prepost,
            auto_adjust=False,
        )
    except Exception as exc:  # pragma: no cover - provider/network variability
        raise RuntimeError("failed to fetch market data from upstream provider") from exc

    if frame.empty:
        raise ValueError(f"no timeseries data returned for symbol '{normalized_symbol}'")

    points: list[MarketTimeseriesPoint] = []
    for timestamp, row in frame.iterrows():
        if hasattr(timestamp, "to_pydatetime"):
            iso_timestamp = timestamp.to_pydatetime().isoformat()
        else:
            iso_timestamp = str(timestamp)

        points.append(
            MarketTimeseriesPoint(
                timestamp=iso_timestamp,
                open=_as_float(row.get("Open")),
                high=_as_float(row.get("High")),
                low=_as_float(row.get("Low")),
                close=_as_float(row.get("Close")),
                volume=_as_int(row.get("Volume")),
            )
        )

    return MarketTimeseriesResponse(
        symbol=normalized_symbol,
        interval=interval,
        period=period,
        asOf=datetime.now(timezone.utc).isoformat(),
        points=points,
    )
