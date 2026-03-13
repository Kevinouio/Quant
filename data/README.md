# Data

Shared datasets and data artifacts across notebooks and backend.

```text
data/
  raw/        # Untouched source files
  processed/  # Cleaned and transformed datasets
  external/   # Third-party static references/benchmarks
  cache/      # Regenerable cached outputs
```

Guideline: never overwrite `raw/`; write transformed outputs to `processed/` or `cache/`.

## Chapter 6 reconstruction artifacts

The backend one-shot Chapter 6 pipeline writes artifacts to:

```text
data/
  raw/
    chapter-06/
      <runKey>/
        sp500_constituents.csv
        djia_constituents.csv
        sp500_close.csv
        djia_close.csv
        sp500_shares_history.csv
        sp500_dividends.csv
        djia_dividends.csv
        djia_splits.csv
        official_sp500_close.csv
        official_djia_close.csv
  processed/
    chapter-06/
      <runKey>/
        sp500_style_index.csv
        dow_style_index.csv
        dow_style_divisor.csv
        sp500_compare.csv
        dow_compare.csv
        sp500_top_weights.csv
        dow_top_weights.csv
        reconstruction_summary.csv
        manifest.json
```

Run key format:

`chapter6_{snapshotDate}_{startDate}_{endDate}_{baseValue}`

Idempotency behavior:

- Existing run key + `force=false` => no recompute (`cached=true` in API response).
- `force=true` => rebuild that run key output set.
