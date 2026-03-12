"""Interactive index-construction service for Chapter 6."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date, datetime, timedelta

import pandas as pd
import yfinance as yf
from pandas import isna

from app.schemas.backtest import (
    PassiveIndexExcludedTicker,
    PassiveIndexInteractiveRequest,
    PassiveIndexInteractiveResponse,
    PassiveIndexPoint,
    PassiveIndexSummary,
    PassiveIndexUniverseRow,
    PassiveIndexWeightRow,
)


@dataclass
class _TickerPreparedData:
    symbol: str
    company_name: str
    sector: str | None
    latest_price: float
    shares_outstanding: float | None
    market_cap: float
    close_series: pd.Series


def _to_float(value: object) -> float | None:
    if value is None or isna(value):
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _normalize_ticker(value: str) -> str:
    return value.strip().upper()


def _safe_info_fetch(ticker: yf.Ticker) -> dict[str, object]:
    try:
        info = ticker.info
        if isinstance(info, dict):
            return info
        return {}
    except Exception:
        return {}


def _shares_outstanding(info: dict[str, object]) -> float | None:
    candidate = _to_float(info.get("sharesOutstanding"))
    if candidate and candidate > 0:
        return candidate

    fallback = _to_float(info.get("impliedSharesOutstanding"))
    if fallback and fallback > 0:
        return fallback

    return None


def _market_cap(info: dict[str, object]) -> float | None:
    candidate = _to_float(info.get("marketCap"))
    if candidate and candidate > 0:
        return candidate
    return None


def _company_name(info: dict[str, object], symbol: str) -> str:
    name = info.get("shortName") or info.get("longName")
    if isinstance(name, str) and name.strip():
        return name.strip()
    return symbol


def _fetch_daily_history(symbol: str, start_date: date, end_date: date) -> pd.Series:
    ticker = yf.Ticker(symbol)
    end_exclusive = end_date + timedelta(days=1)
    history = ticker.history(
        start=start_date.isoformat(),
        end=end_exclusive.isoformat(),
        interval="1d",
        auto_adjust=False,
    )
    if history.empty or "Close" not in history.columns:
        raise ValueError("no daily close history returned")

    close = history["Close"].dropna().astype("float64")
    if close.empty:
        raise ValueError("daily close history is empty")

    close.name = symbol
    return close


def build_passive_index_interactive(
    payload: PassiveIndexInteractiveRequest,
) -> PassiveIndexInteractiveResponse:
    today = datetime.now().date()
    end_date = payload.endDate or today
    start_date = payload.startDate or (end_date - timedelta(days=365))
    if start_date >= end_date:
        raise ValueError("startDate must be earlier than endDate")

    requested_tickers = [_normalize_ticker(ticker) for ticker in payload.tickers]
    if any(not ticker for ticker in requested_tickers):
        raise ValueError("all tickers must be non-empty")

    excluded: list[PassiveIndexExcludedTicker] = []
    warnings: list[str] = []
    prepared: list[_TickerPreparedData] = []
    unique_tickers: list[str] = []
    seen: set[str] = set()

    for symbol in requested_tickers:
        if symbol in seen:
            reason = f"{symbol}: duplicate ticker ignored"
            excluded.append(PassiveIndexExcludedTicker(ticker=symbol, reason=reason))
            warnings.append(reason)
            continue
        seen.add(symbol)
        unique_tickers.append(symbol)

    for symbol in unique_tickers:
        try:
            close_series = _fetch_daily_history(symbol, start_date, end_date)
        except Exception as exc:
            reason = f"{symbol}: unavailable price history ({exc})"
            excluded.append(PassiveIndexExcludedTicker(ticker=symbol, reason=reason))
            warnings.append(reason)
            continue

        latest_price = _to_float(close_series.iloc[-1])
        if latest_price is None or latest_price <= 0:
            reason = f"{symbol}: latest close price is unavailable"
            excluded.append(PassiveIndexExcludedTicker(ticker=symbol, reason=reason))
            warnings.append(reason)
            continue

        ticker = yf.Ticker(symbol)
        info = _safe_info_fetch(ticker)
        shares = _shares_outstanding(info)
        market_cap = _market_cap(info)
        if market_cap is None and shares is not None:
            market_cap = latest_price * shares

        if market_cap is None or market_cap <= 0:
            reason = f"{symbol}: market cap unavailable (missing direct value and shares outstanding)"
            excluded.append(PassiveIndexExcludedTicker(ticker=symbol, reason=reason))
            warnings.append(reason)
            continue

        prepared.append(
            _TickerPreparedData(
                symbol=symbol,
                company_name=_company_name(info, symbol),
                sector=(info.get("sector") if isinstance(info.get("sector"), str) else None),
                latest_price=latest_price,
                shares_outstanding=shares,
                market_cap=market_cap,
                close_series=close_series,
            )
        )

    if len(prepared) < 2:
        raise ValueError("at least 2 valid tickers are required after exclusions")

    close_frame = pd.concat([entry.close_series for entry in prepared], axis=1, join="inner").dropna(how="any")
    if close_frame.empty:
        raise ValueError("no overlapping price history remains for included tickers")

    included_tickers = [entry.symbol for entry in prepared]
    close_frame = close_frame[included_tickers]
    base_prices = close_frame.iloc[0]
    relative = close_frame.divide(base_prices)

    security_count = len(prepared)
    equal_weight = 1.0 / security_count
    equal_index = relative.mean(axis=1) * 100.0

    market_caps = pd.Series([entry.market_cap for entry in prepared], index=included_tickers, dtype="float64")
    market_cap_weights = market_caps / market_caps.sum()
    market_cap_index = relative.mul(market_cap_weights, axis=1).sum(axis=1) * 100.0

    latest_prices = pd.Series([entry.latest_price for entry in prepared], index=included_tickers, dtype="float64")
    price_influences = latest_prices / latest_prices.sum()
    divisor_0 = close_frame.sum(axis=1).iloc[0] / 100.0
    price_weighted_index = close_frame.sum(axis=1) / divisor_0

    universe_rows = [
        PassiveIndexUniverseRow(
            ticker=entry.symbol,
            companyName=entry.company_name,
            latestPrice=entry.latest_price,
            sharesOutstanding=entry.shares_outstanding,
            marketCap=entry.market_cap,
            sector=entry.sector,
        )
        for entry in prepared
    ]

    weights = [
        PassiveIndexWeightRow(
            ticker=symbol,
            equalWeight=equal_weight,
            marketCapWeight=float(market_cap_weights[symbol]),
            priceInfluence=float(price_influences[symbol]),
        )
        for symbol in included_tickers
    ]

    index_points: list[PassiveIndexPoint] = []
    for idx in close_frame.index:
        if hasattr(idx, "date"):
            date_value = idx.date().isoformat()
        else:
            date_value = str(idx)
        index_points.append(
            PassiveIndexPoint(
                date=date_value,
                equalWeighted=float(equal_index.loc[idx]),
                marketCapWeighted=float(market_cap_index.loc[idx]),
                priceWeighted=float(price_weighted_index.loc[idx]),
            )
        )

    total_return_equal = float(equal_index.iloc[-1] / 100.0 - 1.0)
    total_return_market_cap = float(market_cap_index.iloc[-1] / 100.0 - 1.0)
    total_return_price = float(price_weighted_index.iloc[-1] / 100.0 - 1.0)
    return_spread = max(total_return_equal, total_return_market_cap, total_return_price) - min(
        total_return_equal, total_return_market_cap, total_return_price
    )

    top_market_cap = sorted(weights, key=lambda row: row.marketCapWeight, reverse=True)
    largest_market_cap = top_market_cap[0]
    largest_price_influence = max(weights, key=lambda row: row.priceInfluence)
    smallest_market_cap = min(weights, key=lambda row: row.marketCapWeight)

    summary = PassiveIndexSummary(
        largestMarketCapWeightTicker=largest_market_cap.ticker,
        largestPriceInfluenceTicker=largest_price_influence.ticker,
        totalReturnEqualWeighted=total_return_equal,
        totalReturnMarketCapWeighted=total_return_market_cap,
        totalReturnPriceWeighted=total_return_price,
        returnSpread=float(return_spread),
        topMarketCapWeight=float(largest_market_cap.marketCapWeight),
        topTwoMarketCapWeight=float(sum(row.marketCapWeight for row in top_market_cap[:2])),
        concentrationNote=(
            f"{largest_market_cap.ticker} is the largest market-cap holding at "
            f"{largest_market_cap.marketCapWeight * 100:.1f}%. "
            f"The top two holdings combine to {sum(row.marketCapWeight for row in top_market_cap[:2]) * 100:.1f}%."
        ),
        equalWeightInfluenceNote=(
            f"Equal weighting gives every included stock {equal_weight * 100:.1f}% influence. "
            f"For {smallest_market_cap.ticker}, that is higher than its "
            f"market-cap weight of {smallest_market_cap.marketCapWeight * 100:.1f}%."
        ),
    )

    return PassiveIndexInteractiveResponse(
        requestedTickers=requested_tickers,
        includedTickers=included_tickers,
        excluded=excluded,
        warnings=warnings,
        universe=universe_rows,
        weights=weights,
        indexPoints=index_points,
        summary=summary,
    )
