"""One-time Chapter 6 reconstruction pipeline (S&P + Dow + dividends)."""

from __future__ import annotations

import argparse
import json
import math
import shutil
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Iterable

import pandas as pd
import yfinance as yf

from app.schemas.backtest import (
    Chapter6ComparePoint,
    Chapter6ReconstructionCounts,
    Chapter6ReconstructionRequest,
    Chapter6ReconstructionResponse,
    Chapter6ReconstructionRunInfo,
    Chapter6ReconstructionRunParams,
    Chapter6ReconstructionRunsResponse,
    Chapter6ReconstructionViewResponse,
    Chapter6SummaryMetricRow,
    Chapter6TopWeightRow,
)

DEFAULT_START_DATE = date(2019, 1, 1)
USER_AGENT_HEADERS = {"User-Agent": "QuantChapter6Reconstruction/1.0"}


def _repo_root() -> Path:
    # backend/app/services -> backend -> repo root
    return Path(__file__).resolve().parents[3]


def _chapter6_processed_root() -> Path:
    return _repo_root() / "data" / "processed" / "chapter-06"


def _format_base_value(value: float) -> str:
    return f"{value:g}" if value % 1 else f"{value:.1f}"


def _run_key(snapshot_date: date, start_date: date, end_date: date, base_value: float) -> str:
    return (
        f"chapter6_{snapshot_date.isoformat()}_"
        f"{start_date.isoformat()}_{end_date.isoformat()}_{_format_base_value(base_value)}"
    )


def _extract_panel(frame: pd.DataFrame, panel_name: str) -> pd.DataFrame:
    if frame.empty:
        return pd.DataFrame()

    if isinstance(frame.columns, pd.MultiIndex):
        level0 = frame.columns.get_level_values(0)
        if panel_name not in level0:
            return pd.DataFrame(index=frame.index)
        panel = frame[panel_name]
    else:
        if panel_name not in frame.columns:
            return pd.DataFrame(index=frame.index)
        panel = frame[[panel_name]]

    if isinstance(panel, pd.Series):
        panel = panel.to_frame(name=panel_name)

    panel.index = pd.to_datetime(panel.index).tz_localize(None)
    return panel.sort_index()


def _normalize_yahoo_tickers(symbols: pd.Series) -> pd.Series:
    return symbols.astype(str).str.strip().str.replace(".", "-", regex=False)


def _load_sp500_constituents() -> pd.DataFrame:
    table = pd.read_html(
        "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies",
        storage_options=USER_AGENT_HEADERS,
    )[0]

    expected_cols = {"Symbol", "Security"}
    missing = expected_cols.difference(set(table.columns))
    if missing:
        raise RuntimeError(f"S&P constituents table missing columns: {sorted(missing)}")

    sp500 = table.rename(columns={"Symbol": "Ticker", "Security": "Company"})
    sp500["YahooTicker"] = _normalize_yahoo_tickers(sp500["Ticker"])
    return sp500


def _load_dow_constituents() -> pd.DataFrame:
    tables = pd.read_html(
        "https://en.wikipedia.org/wiki/Dow_Jones_Industrial_Average",
        storage_options=USER_AGENT_HEADERS,
    )

    dow: pd.DataFrame | None = None
    for candidate in tables:
        columns = set(map(str, candidate.columns))
        if {"Company", "Exchange", "Industry"}.issubset(columns):
            dow = candidate.copy()
            break

    if dow is None:
        raise RuntimeError("Failed to parse Dow constituents table from Wikipedia.")

    if "Symbol" in dow.columns:
        dow = dow.rename(columns={"Symbol": "Ticker"})
    if "Ticker" not in dow.columns:
        raise RuntimeError("Dow constituents table missing Ticker/Symbol column.")

    dow["YahooTicker"] = _normalize_yahoo_tickers(dow["Ticker"])
    return dow


def _fetch_daily_history_with_actions(
    tickers: list[str],
    start_date: date,
    end_date: date,
) -> pd.DataFrame:
    end_exclusive = end_date + timedelta(days=1)
    try:
        return yf.download(
            tickers=tickers,
            start=start_date.isoformat(),
            end=end_exclusive.isoformat(),
            interval="1d",
            auto_adjust=False,
            actions=True,
            progress=False,
            threads=True,
        )
    except Exception as exc:  # pragma: no cover - upstream/network variability
        raise RuntimeError("Failed to download market history from Yahoo Finance.") from exc


def _fetch_single_close_series(symbol: str, start_date: date, end_date: date) -> pd.Series:
    end_exclusive = end_date + timedelta(days=1)
    try:
        frame = yf.download(
            tickers=symbol,
            start=start_date.isoformat(),
            end=end_exclusive.isoformat(),
            auto_adjust=False,
            progress=False,
            threads=False,
        )
    except Exception as exc:  # pragma: no cover - upstream/network variability
        raise RuntimeError(f"Failed to download benchmark series for {symbol}.") from exc

    close = frame["Close"] if "Close" in frame.columns else pd.Series(dtype="float64")
    if isinstance(close, pd.DataFrame):
        close = close.squeeze()
    close = close.dropna()
    if close.empty:
        raise RuntimeError(f"Benchmark series {symbol} returned no close prices.")
    close.index = pd.to_datetime(close.index).tz_localize(None)
    close.name = symbol
    return close.sort_index()


def _pull_shares_history(
    tickers: list[str],
    start_date: date,
    end_date: date,
    warnings: list[str],
) -> pd.DataFrame:
    series_by_ticker: dict[str, pd.Series] = {}

    for ticker in tickers:
        try:
            shares = yf.Ticker(ticker).get_shares_full(
                start=start_date.isoformat(),
                end=(end_date + timedelta(days=1)).isoformat(),
            )
        except Exception:
            warnings.append(f"{ticker}: failed to pull shares history")
            continue

        if shares is None or len(shares) == 0:
            warnings.append(f"{ticker}: shares history unavailable")
            continue

        series = pd.Series(shares).copy()
        series.index = pd.to_datetime(series.index).tz_localize(None)
        series = series[~series.index.isna()]
        series = series[~series.index.duplicated(keep="last")]
        series = series.sort_index()
        if series.empty:
            warnings.append(f"{ticker}: shares history resolved to empty panel")
            continue
        series_by_ticker[ticker] = series.rename(ticker)

    if not series_by_ticker:
        return pd.DataFrame()

    return pd.concat(series_by_ticker.values(), axis=1, keys=series_by_ticker.keys()).sort_index()


def _normalize_to_base(series: pd.Series, base_value: float) -> pd.Series:
    if series.empty:
        return series
    return base_value * series / series.iloc[0]


def _summarize_index(label: str, series: pd.Series) -> dict[str, float | str]:
    clean = series.dropna()
    if clean.empty:
        return {
            "Series": label,
            "Start": math.nan,
            "End": math.nan,
            "Total Return (%)": math.nan,
            "Annualized Return (%)": math.nan,
            "Annualized Volatility (%)": math.nan,
        }

    rets = clean.pct_change().dropna()
    if rets.empty:
        ann_return = math.nan
        ann_vol = math.nan
    else:
        ann_return = (1 + rets).prod() ** (252 / len(rets)) - 1
        ann_vol = rets.std() * math.sqrt(252)

    return {
        "Series": label,
        "Start": round(float(clean.iloc[0]), 6),
        "End": round(float(clean.iloc[-1]), 6),
        "Total Return (%)": round((float(clean.iloc[-1]) / float(clean.iloc[0]) - 1) * 100, 6),
        "Annualized Return (%)": round(float(ann_return) * 100, 6) if not math.isnan(ann_return) else math.nan,
        "Annualized Volatility (%)": round(float(ann_vol) * 100, 6) if not math.isnan(ann_vol) else math.nan,
    }


def _write_series_csv(series: pd.Series, output_path: Path, value_name: str) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    series.to_frame(name=value_name).to_csv(output_path)


def _write_manifest(path: Path, manifest: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")


def _load_manifest(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def _manifest_generated_at(manifest: dict[str, Any]) -> datetime:
    value = str(manifest.get("generatedAt", "")).strip()
    if not value:
        return datetime.min.replace(tzinfo=timezone.utc)

    normalized = value.replace("Z", "+00:00")
    try:
        parsed = datetime.fromisoformat(normalized)
    except ValueError:
        return datetime.min.replace(tzinfo=timezone.utc)

    if parsed.tzinfo is None:
        return parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def _iter_chapter6_manifest_paths() -> Iterable[Path]:
    root = _chapter6_processed_root()
    if not root.exists():
        return []

    paths = []
    for run_dir in root.iterdir():
        if not run_dir.is_dir():
            continue
        manifest_path = run_dir / "manifest.json"
        if manifest_path.exists():
            paths.append(manifest_path)
    return paths


def _series_points_from_compare_csv(path: Path) -> list[Chapter6ComparePoint]:
    if not path.exists():
        return []

    frame = pd.read_csv(path, index_col=0)
    if frame.empty or frame.shape[1] < 2:
        return []

    reconstructed_col = frame.columns[0]
    official_col = frame.columns[1]
    points: list[Chapter6ComparePoint] = []
    for index_value, series in frame.iterrows():
        reconstructed = _float_or_none(series.get(reconstructed_col))
        official = _float_or_none(series.get(official_col))
        if reconstructed is None or official is None:
            continue
        points.append(
            Chapter6ComparePoint(
                date=pd.to_datetime(index_value).strftime("%Y-%m-%d"),
                reconstructed=reconstructed,
                official=official,
            )
        )
    return points


def _float_or_none(value: Any) -> float | None:
    if value is None:
        return None
    try:
        numeric = float(value)
    except (TypeError, ValueError):
        return None
    if math.isnan(numeric):
        return None
    return numeric


def _top_weights_rows_from_csv(path: Path) -> list[Chapter6TopWeightRow]:
    if not path.exists():
        return []

    frame = pd.read_csv(path)
    expected_columns = {"Ticker", "Company", "Weight (%)"}
    if frame.empty or not expected_columns.issubset(set(frame.columns)):
        return []

    rows: list[Chapter6TopWeightRow] = []
    for _, row in frame.iterrows():
        ticker = str(row.get("Ticker", "")).strip()
        company_raw = row.get("Company")
        company = str(company_raw).strip() if company_raw is not None and not pd.isna(company_raw) else None
        weight = _float_or_none(row.get("Weight (%)"))
        if not ticker or weight is None:
            continue

        rows.append(Chapter6TopWeightRow(ticker=ticker, company=company, weightPct=weight))
    return rows


def _summary_rows_from_csv(path: Path) -> list[Chapter6SummaryMetricRow]:
    if not path.exists():
        return []

    frame = pd.read_csv(path, index_col=0)
    if frame.empty:
        return []

    rows: list[Chapter6SummaryMetricRow] = []
    for series_name, row in frame.iterrows():
        rows.append(
            Chapter6SummaryMetricRow(
                series=str(series_name),
                start=_float_or_none(row.get("Start")),
                end=_float_or_none(row.get("End")),
                totalReturnPct=_float_or_none(row.get("Total Return (%)")),
                annualizedReturnPct=_float_or_none(row.get("Annualized Return (%)")),
                annualizedVolatilityPct=_float_or_none(row.get("Annualized Volatility (%)")),
            )
        )
    return rows


def run_chapter6_reconstruction_job(
    payload: Chapter6ReconstructionRequest,
) -> Chapter6ReconstructionResponse:
    today = datetime.now(tz=timezone.utc).date()
    start_date = payload.startDate or DEFAULT_START_DATE
    end_date = payload.endDate or today
    snapshot_date = payload.snapshotDate or today
    base_value = payload.baseValue

    if start_date >= end_date:
        raise ValueError("startDate must be earlier than endDate")
    if base_value <= 0:
        raise ValueError("baseValue must be greater than 0")

    run_key = _run_key(snapshot_date, start_date, end_date, base_value)

    repo_root = _repo_root()
    raw_output_dir = repo_root / "data" / "raw" / "chapter-06" / run_key
    processed_output_dir = repo_root / "data" / "processed" / "chapter-06" / run_key
    manifest_path = processed_output_dir / "manifest.json"

    if manifest_path.exists() and not payload.force:
        manifest = _load_manifest(manifest_path)
        counts = Chapter6ReconstructionCounts(**manifest["counts"])
        return Chapter6ReconstructionResponse(
            runKey=manifest["runKey"],
            cached=True,
            rawOutputDir=manifest["rawOutputDir"],
            processedOutputDir=manifest["processedOutputDir"],
            artifactPaths=manifest["artifactPaths"],
            counts=counts,
            warnings=list(manifest.get("warnings", [])),
        )

    if payload.force:
        if raw_output_dir.exists():
            shutil.rmtree(raw_output_dir)
        if processed_output_dir.exists():
            shutil.rmtree(processed_output_dir)

    raw_output_dir.mkdir(parents=True, exist_ok=True)
    processed_output_dir.mkdir(parents=True, exist_ok=True)

    warnings: list[str] = []

    sp500 = _load_sp500_constituents()
    dow = _load_dow_constituents()

    raw_artifacts: dict[str, Path] = {
        "sp500Constituents": raw_output_dir / "sp500_constituents.csv",
        "djiaConstituents": raw_output_dir / "djia_constituents.csv",
        "sp500Close": raw_output_dir / "sp500_close.csv",
        "djiaClose": raw_output_dir / "djia_close.csv",
        "sp500SharesHistory": raw_output_dir / "sp500_shares_history.csv",
        "sp500Dividends": raw_output_dir / "sp500_dividends.csv",
        "djiaDividends": raw_output_dir / "djia_dividends.csv",
        "djiaSplits": raw_output_dir / "djia_splits.csv",
        "officialSp500Close": raw_output_dir / "official_sp500_close.csv",
        "officialDjiaClose": raw_output_dir / "official_djia_close.csv",
    }
    processed_artifacts: dict[str, Path] = {
        "sp500StyleIndex": processed_output_dir / "sp500_style_index.csv",
        "dowStyleIndex": processed_output_dir / "dow_style_index.csv",
        "dowStyleDivisor": processed_output_dir / "dow_style_divisor.csv",
        "sp500Compare": processed_output_dir / "sp500_compare.csv",
        "dowCompare": processed_output_dir / "dow_compare.csv",
        "sp500TopWeights": processed_output_dir / "sp500_top_weights.csv",
        "dowTopWeights": processed_output_dir / "dow_top_weights.csv",
        "reconstructionSummary": processed_output_dir / "reconstruction_summary.csv",
        "manifest": manifest_path,
    }

    sp500.to_csv(raw_artifacts["sp500Constituents"], index=False)
    dow.to_csv(raw_artifacts["djiaConstituents"], index=False)

    sp_tickers = sorted(sp500["YahooTicker"].dropna().astype(str).unique())
    dow_tickers = sorted(dow["YahooTicker"].dropna().astype(str).unique())

    sp_raw = _fetch_daily_history_with_actions(sp_tickers, start_date, end_date)
    dow_raw = _fetch_daily_history_with_actions(dow_tickers, start_date, end_date)

    sp_close = _extract_panel(sp_raw, "Close").dropna(axis=1, how="all").sort_index()
    dow_close = _extract_panel(dow_raw, "Close").dropna(axis=1, how="all").sort_index()
    if sp_close.empty:
        raise RuntimeError("S&P close panel is empty after download.")
    if dow_close.empty:
        raise RuntimeError("Dow close panel is empty after download.")

    sp_dividends = (
        _extract_panel(sp_raw, "Dividends")
        .reindex(index=sp_close.index, columns=sp_close.columns)
        .fillna(0.0)
    )
    dow_dividends = (
        _extract_panel(dow_raw, "Dividends")
        .reindex(index=dow_close.index, columns=dow_close.columns)
        .fillna(0.0)
    )
    dow_splits = (
        _extract_panel(dow_raw, "Stock Splits")
        .reindex(index=dow_close.index, columns=dow_close.columns)
        .fillna(0.0)
    )

    sp_close.to_csv(raw_artifacts["sp500Close"])
    dow_close.to_csv(raw_artifacts["djiaClose"])
    sp_dividends.to_csv(raw_artifacts["sp500Dividends"])
    dow_dividends.to_csv(raw_artifacts["djiaDividends"])
    dow_splits.to_csv(raw_artifacts["djiaSplits"])

    sp_shares = _pull_shares_history(sp_tickers, start_date, end_date, warnings)
    if sp_shares.empty:
        raise RuntimeError("S&P shares history panel is empty; cannot compute market-cap weights.")
    sp_shares = sp_shares.reindex(sp_close.index).ffill()
    sp_shares.to_csv(raw_artifacts["sp500SharesHistory"])

    common_sp = sorted(sp_close.columns.intersection(sp_shares.columns))
    if not common_sp:
        raise RuntimeError("No overlapping S&P tickers between close prices and shares history.")

    sp_close_aligned = sp_close[common_sp]
    sp_shares_aligned = sp_shares[common_sp]
    sp_market_cap = sp_close_aligned * sp_shares_aligned
    sp_weights = sp_market_cap.div(sp_market_cap.sum(axis=1), axis=0)
    sp_returns = sp_close_aligned.pct_change(fill_method=None)
    sp_style_returns = (sp_weights.shift(1) * sp_returns).sum(axis=1, min_count=1).fillna(0.0)
    sp_style_index = base_value * (1 + sp_style_returns).cumprod()
    sp_style_index.name = "S&P 500-style reconstruction"
    _write_series_csv(sp_style_index, processed_artifacts["sp500StyleIndex"], sp_style_index.name)

    official_sp = _fetch_single_close_series("^GSPC", start_date, end_date)
    official_sp = _normalize_to_base(official_sp, base_value)
    official_sp.name = "Official S&P 500"
    _write_series_csv(official_sp, raw_artifacts["officialSp500Close"], official_sp.name)

    sp_compare = pd.concat([sp_style_index, official_sp], axis=1).dropna()
    if sp_compare.empty:
        raise RuntimeError("S&P comparison series is empty after alignment.")
    sp_compare.to_csv(processed_artifacts["sp500Compare"])

    sp_name_map = sp500.set_index("YahooTicker")["Company"]
    last_sp_weights = (
        sp_weights.dropna(how="all")
        .iloc[-1]
        .sort_values(ascending=False)
        .head(10)
        .mul(100)
        .round(4)
        .rename("Weight (%)")
        .to_frame()
    )
    last_sp_weights["Ticker"] = last_sp_weights.index
    last_sp_weights["Company"] = sp_name_map.reindex(last_sp_weights.index)
    last_sp_weights[["Ticker", "Company", "Weight (%)"]].to_csv(
        processed_artifacts["sp500TopWeights"], index=False
    )

    dow_price_sum = dow_close.sum(axis=1)
    if dow_price_sum.empty:
        raise RuntimeError("Dow price sum series is empty.")

    dow_divisor = pd.Series(index=dow_close.index, dtype="float64")
    dow_style_index = pd.Series(index=dow_close.index, dtype="float64")
    dow_divisor.iloc[0] = dow_price_sum.iloc[0] / base_value
    dow_style_index.iloc[0] = base_value

    for i in range(1, len(dow_close.index)):
        current = dow_close.index[i]
        previous = dow_close.index[i - 1]
        split_row = dow_splits.loc[current].replace(0.0, 1.0)

        if (split_row != 1.0).any():
            synthetic_split_sum = (dow_close.loc[previous] / split_row).sum()
            dow_divisor.iloc[i] = synthetic_split_sum / dow_style_index.iloc[i - 1]
        else:
            dow_divisor.iloc[i] = dow_divisor.iloc[i - 1]

        dow_style_index.iloc[i] = dow_price_sum.iloc[i] / dow_divisor.iloc[i]

    dow_style_index.name = "Dow-style reconstruction"
    dow_divisor.name = "Implied divisor"
    _write_series_csv(dow_style_index, processed_artifacts["dowStyleIndex"], dow_style_index.name)
    _write_series_csv(dow_divisor, processed_artifacts["dowStyleDivisor"], dow_divisor.name)

    official_dow = _fetch_single_close_series("^DJI", start_date, end_date)
    official_dow = _normalize_to_base(official_dow, base_value)
    official_dow.name = "Official DJIA"
    _write_series_csv(official_dow, raw_artifacts["officialDjiaClose"], official_dow.name)

    dow_compare = pd.concat([dow_style_index, official_dow], axis=1).dropna()
    if dow_compare.empty:
        raise RuntimeError("Dow comparison series is empty after alignment.")
    dow_compare.to_csv(processed_artifacts["dowCompare"])

    dow_name_map = dow.set_index("YahooTicker")["Company"]
    dow_weights = dow_close.div(dow_close.sum(axis=1), axis=0)
    last_dow_weights = (
        dow_weights.dropna(how="all")
        .iloc[-1]
        .sort_values(ascending=False)
        .head(10)
        .mul(100)
        .round(4)
        .rename("Weight (%)")
        .to_frame()
    )
    last_dow_weights["Ticker"] = last_dow_weights.index
    last_dow_weights["Company"] = dow_name_map.reindex(last_dow_weights.index)
    last_dow_weights[["Ticker", "Company", "Weight (%)"]].to_csv(
        processed_artifacts["dowTopWeights"], index=False
    )

    summary_rows = [
        _summarize_index("S&P-style reconstruction", sp_compare.iloc[:, 0]),
        _summarize_index("Official S&P 500", sp_compare.iloc[:, 1]),
        _summarize_index("Dow-style reconstruction", dow_compare.iloc[:, 0]),
        _summarize_index("Official DJIA", dow_compare.iloc[:, 1]),
    ]
    reconstruction_summary = pd.DataFrame(summary_rows).set_index("Series")
    reconstruction_summary.to_csv(processed_artifacts["reconstructionSummary"])

    counts = Chapter6ReconstructionCounts(
        sp500Constituents=int(len(sp500)),
        dowConstituents=int(len(dow)),
        sp500UsableTickers=int(len(common_sp)),
        dowUsableTickers=int(len(dow_close.columns)),
        sp500Rows=int(len(sp_style_index)),
        dowRows=int(len(dow_style_index)),
        sp500ComparisonRows=int(len(sp_compare)),
        dowComparisonRows=int(len(dow_compare)),
    )

    artifact_paths: dict[str, str] = {
        **{name: str(path.resolve()) for name, path in raw_artifacts.items()},
        **{name: str(path.resolve()) for name, path in processed_artifacts.items()},
    }

    manifest = {
        "runKey": run_key,
        "cached": False,
        "rawOutputDir": str(raw_output_dir.resolve()),
        "processedOutputDir": str(processed_output_dir.resolve()),
        "artifactPaths": artifact_paths,
        "counts": counts.model_dump(),
        "warnings": warnings,
        "params": {
            "snapshotDate": snapshot_date.isoformat(),
            "startDate": start_date.isoformat(),
            "endDate": end_date.isoformat(),
            "baseValue": base_value,
        },
        "generatedAt": datetime.now(tz=timezone.utc).isoformat(),
    }
    _write_manifest(manifest_path, manifest)

    return Chapter6ReconstructionResponse(
        runKey=run_key,
        cached=False,
        rawOutputDir=manifest["rawOutputDir"],
        processedOutputDir=manifest["processedOutputDir"],
        artifactPaths=artifact_paths,
        counts=counts,
        warnings=warnings,
    )


def _run_info_from_manifest(manifest: dict[str, Any]) -> Chapter6ReconstructionRunInfo:
    try:
        counts = Chapter6ReconstructionCounts(**manifest.get("counts", {}))
    except Exception:
        counts = Chapter6ReconstructionCounts(
            sp500Constituents=0,
            dowConstituents=0,
            sp500UsableTickers=0,
            dowUsableTickers=0,
            sp500Rows=0,
            dowRows=0,
            sp500ComparisonRows=0,
            dowComparisonRows=0,
        )

    try:
        params = Chapter6ReconstructionRunParams(**manifest.get("params", {}))
    except Exception:
        params = Chapter6ReconstructionRunParams(
            snapshotDate="",
            startDate="",
            endDate="",
            baseValue=100.0,
        )
    warnings = manifest.get("warnings", [])
    warnings_count = len(warnings) if isinstance(warnings, list) else 0

    return Chapter6ReconstructionRunInfo(
        runKey=str(manifest.get("runKey", "")),
        generatedAt=str(manifest.get("generatedAt", "")),
        params=params,
        counts=counts,
        warningsCount=warnings_count,
    )


def list_chapter6_reconstruction_runs() -> Chapter6ReconstructionRunsResponse:
    manifests: list[dict[str, Any]] = []
    for manifest_path in _iter_chapter6_manifest_paths():
        try:
            manifest = _load_manifest(manifest_path)
        except (OSError, json.JSONDecodeError):
            continue
        manifests.append(manifest)

    manifests.sort(key=_manifest_generated_at, reverse=True)
    runs = [_run_info_from_manifest(manifest) for manifest in manifests if manifest.get("runKey")]
    return Chapter6ReconstructionRunsResponse(runs=runs)


def load_chapter6_reconstruction_view(run_key: str | None = None) -> Chapter6ReconstructionViewResponse:
    runs = list_chapter6_reconstruction_runs().runs
    if not runs:
        raise ValueError("No reconstruction runs found. Trigger a run first.")

    selected = runs[0] if run_key is None else next((run for run in runs if run.runKey == run_key), None)
    if selected is None:
        raise ValueError(f"Run key not found: {run_key}")

    manifest_path = _chapter6_processed_root() / selected.runKey / "manifest.json"
    if not manifest_path.exists():
        raise RuntimeError(f"Manifest missing for run: {selected.runKey}")

    manifest = _load_manifest(manifest_path)
    artifact_paths = {
        str(name): str(value)
        for name, value in dict(manifest.get("artifactPaths", {})).items()
        if isinstance(name, str)
    }

    processed_dir = Path(str(manifest.get("processedOutputDir", "")))
    sp500_compare_path = Path(artifact_paths.get("sp500Compare", processed_dir / "sp500_compare.csv"))
    dow_compare_path = Path(artifact_paths.get("dowCompare", processed_dir / "dow_compare.csv"))
    sp500_top_weights_path = Path(
        artifact_paths.get("sp500TopWeights", processed_dir / "sp500_top_weights.csv")
    )
    dow_top_weights_path = Path(artifact_paths.get("dowTopWeights", processed_dir / "dow_top_weights.csv"))
    summary_path = Path(
        artifact_paths.get("reconstructionSummary", processed_dir / "reconstruction_summary.csv")
    )

    try:
        params = Chapter6ReconstructionRunParams(**manifest.get("params", {}))
    except Exception:
        params = selected.params

    try:
        counts = Chapter6ReconstructionCounts(**manifest.get("counts", {}))
    except Exception:
        counts = selected.counts

    return Chapter6ReconstructionViewResponse(
        runKey=selected.runKey,
        generatedAt=str(manifest.get("generatedAt", selected.generatedAt)),
        params=params,
        rawOutputDir=str(manifest.get("rawOutputDir", "")),
        processedOutputDir=str(manifest.get("processedOutputDir", "")),
        artifactPaths=artifact_paths,
        counts=counts,
        warnings=list(manifest.get("warnings", [])),
        sp500ComparePoints=_series_points_from_compare_csv(sp500_compare_path),
        dowComparePoints=_series_points_from_compare_csv(dow_compare_path),
        sp500TopWeights=_top_weights_rows_from_csv(sp500_top_weights_path),
        dowTopWeights=_top_weights_rows_from_csv(dow_top_weights_path),
        summaryMetrics=_summary_rows_from_csv(summary_path),
    )


def _build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run Chapter 6 one-time reconstruction pipeline.")
    parser.add_argument("--start", dest="start_date", default=DEFAULT_START_DATE.isoformat())
    parser.add_argument("--end", dest="end_date", default=None)
    parser.add_argument("--snapshot", dest="snapshot_date", default=None)
    parser.add_argument("--base", dest="base_value", type=float, default=100.0)
    parser.add_argument("--force", action="store_true")
    return parser


def main() -> None:
    parser = _build_arg_parser()
    args = parser.parse_args()

    today = datetime.now(tz=timezone.utc).date()
    end_date = date.fromisoformat(args.end_date) if args.end_date else today
    snapshot_date = date.fromisoformat(args.snapshot_date) if args.snapshot_date else today
    start_date = date.fromisoformat(args.start_date)

    payload = Chapter6ReconstructionRequest(
        startDate=start_date,
        endDate=end_date,
        snapshotDate=snapshot_date,
        baseValue=args.base_value,
        force=args.force,
    )

    result = run_chapter6_reconstruction_job(payload)
    print(f"runKey: {result.runKey}")
    print(f"cached: {result.cached}")
    print(f"rawOutputDir: {result.rawOutputDir}")
    print(f"processedOutputDir: {result.processedOutputDir}")
    print("counts:")
    for key, value in result.counts.model_dump().items():
        print(f"  - {key}: {value}")
    print(f"artifacts: {len(result.artifactPaths)} files")
    if result.warnings:
        print(f"warnings: {len(result.warnings)}")
        for warning in result.warnings[:10]:
            print(f"  - {warning}")


if __name__ == "__main__":
    main()
