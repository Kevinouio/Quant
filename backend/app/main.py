"""Backend API entry point scaffold."""

from fastapi import FastAPI

from app.api.passive_indexing import router as passive_indexing_router

app = FastAPI(title="Quant Backend", version="0.1.0")
app.include_router(passive_indexing_router, prefix="/backtest", tags=["backtest"])


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
