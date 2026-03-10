# Backend

Backend services for quant computations used by interactive textbook chapters.

## Folder intent

```text
backend/
  app/
    main.py         # API entry point
    api/            # Route handlers
    services/       # Business logic and orchestration
    models/         # Domain models
    backtests/      # Strategy runners and evaluation
    schemas/        # Request/response shapes
    utils/          # Shared backend helpers
```

## Immediate goal

Implement `POST /backtest/passive-indexing` and return:

- equity curve points
- summary metrics
- assumptions used in run

## Local setup

```powershell
cd backend
python -m pip install -r requirements.txt
uvicorn app.main:app --reload
```

API base: `http://127.0.0.1:8000`

## Market data endpoint

`GET /market/timeseries`

Query params:

- `symbol` (required, e.g. `NVDA`)
- `interval` (default `1m`)
- `period` (default `1d`)
- `prepost` (default `true`)
