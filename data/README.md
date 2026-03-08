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
