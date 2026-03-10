"""Market data routes."""

from fastapi import APIRouter, HTTPException, Query

from app.schemas.market import MarketTimeseriesResponse
from app.services.market_data import fetch_market_timeseries

router = APIRouter()


@router.get("/timeseries", response_model=MarketTimeseriesResponse)
def get_market_timeseries(
    symbol: str = Query(..., min_length=1, description="Ticker symbol, e.g. NVDA"),
    interval: str = Query("1m"),
    period: str = Query("1d"),
    prepost: bool = Query(True),
) -> MarketTimeseriesResponse:
    try:
        return fetch_market_timeseries(
            symbol=symbol,
            interval=interval,
            period=period,
            prepost=prepost,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
