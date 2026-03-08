"""Passive indexing backtest API scaffold."""

from fastapi import APIRouter

from app.schemas.backtest import BacktestRequest, BacktestResponse, MetricPoint

router = APIRouter()


@router.post("/passive-indexing", response_model=BacktestResponse)
def run_passive_indexing_backtest(payload: BacktestRequest) -> BacktestResponse:
    # Placeholder implementation so frontend integration can start now.
    mock_curve = [
        MetricPoint(timestamp="2020-01-01", value=1.00),
        MetricPoint(timestamp="2021-01-01", value=1.11),
        MetricPoint(timestamp="2022-01-01", value=1.06),
        MetricPoint(timestamp="2023-01-01", value=1.20),
    ]

    return BacktestResponse(
        strategy="passive-indexing",
        benchmark=payload.benchmark,
        equity_curve=mock_curve,
        metrics={"cagr": 0.063, "max_drawdown": -0.082, "sharpe": 0.74},
        assumptions={
            "rebalance_frequency": payload.rebalance_frequency,
            "expense_ratio_bps": payload.expense_ratio_bps,
        },
    )
