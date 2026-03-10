"""Backend API entry point scaffold."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.market import router as market_router
from app.api.passive_indexing import router as passive_indexing_router

app = FastAPI(title="Quant Backend", version="0.1.0")
app.include_router(passive_indexing_router, prefix="/backtest", tags=["backtest"])
app.include_router(market_router, prefix="/market", tags=["market"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
