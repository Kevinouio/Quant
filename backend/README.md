# Backend

FastAPI service layer for interactive textbook features (market data + strategy/backtest endpoints).

## Current architecture

```text
backend/
  app/
    main.py                 # FastAPI app, router wiring, CORS, health check
    api/
      market.py             # /market routes
      passive_indexing.py   # /backtest routes
    services/
      market_data.py        # yfinance-backed timeseries fetch
    schemas/
      market.py             # market request/response models
      backtest.py           # passive indexing request/response models
```

## Local setup

From repo root:

```powershell
cd backend
python -m pip install -r requirements.txt
uvicorn app.main:app --reload
```

API base URL: `http://127.0.0.1:8000`

## CORS

Currently allowed frontend origins:

- `http://localhost:3000`
- `http://127.0.0.1:3000`

If your frontend runs on a different origin, add it in `backend/app/main.py`.

## Endpoints

### Health

- `GET /health`
- Response:

```json
{ "status": "ok" }
```

### Market timeseries

- `GET /market/timeseries`
- Query params:
  - `symbol` (required): ticker symbol, for example `NVDA`
  - `interval` (optional, default `1m`)
  - `period` (optional, default `1d`)
  - `prepost` (optional, default `true`)

Response shape:

- `symbol`
- `interval`
- `period`
- `asOf` (UTC ISO timestamp)
- `points[]` with:
  - `timestamp`
  - `open`
  - `high`
  - `low`
  - `close`
  - `volume`

Example request:

```powershell
curl "http://127.0.0.1:8000/market/timeseries?symbol=NVDA&period=1d&interval=1m&prepost=true"
```

Error behavior:

- `400` for invalid/no symbol or no data returned.
- `502` for upstream provider/network failures.

### Passive indexing backtest (scaffold)

- `POST /backtest/passive-indexing`
- Current status: placeholder response for frontend integration.

Example request:

```powershell
curl -X POST "http://127.0.0.1:8000/backtest/passive-indexing" `
  -H "Content-Type: application/json" `
  -d "{\"benchmark\":\"SPY\",\"rebalance_frequency\":\"monthly\",\"expense_ratio_bps\":3.0}"
```

Request fields:

- `benchmark` (default `SPY`)
- `rebalance_frequency` (default `monthly`)
- `expense_ratio_bps` (default `3.0`, must be `>= 0`)

Response includes:

- `strategy`
- `benchmark`
- `equity_curve[]`
- `metrics`
- `assumptions`

## Dependencies

From `backend/requirements.txt`:

- `fastapi`
- `uvicorn`
- `yfinance`
- `pandas`

## Frontend integration note

Frontend expects backend at:

- `NEXT_PUBLIC_BACKEND_BASE_URL` (fallback: `http://127.0.0.1:8000`)

If you run backend on a different port/host, update that env var before `npm run dev`.

## Troubleshooting

- `ModuleNotFoundError: No module named 'yfinance'`
  - Run `python -m pip install -r backend/requirements.txt` in the same Python environment used by `uvicorn`.
- Frontend can't fetch backend
  - Confirm backend is running on `127.0.0.1:8000` and CORS origin includes your frontend URL.
- `/market/timeseries` returns no data
  - Try another symbol, interval, or period; upstream source can return empty data depending on symbol/session.
