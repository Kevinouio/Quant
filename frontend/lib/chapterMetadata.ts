export type ChapterStatus = "placeholder" | "detailed";

export type PartMeta = {
  partNumber: number;
  partTitle: string;
  partSlug: string;
};

export type ChapterMeta = {
  partNumber: number;
  partTitle: string;
  partSlug: string;
  chapterNumber: number;
  chapterCode: string | null;
  chapterTitle: string;
  chapterSlug: string;
  summary: string;
  sections: string[];
  status: ChapterStatus;
};

export const partMetadata: PartMeta[] = [
  {
    "partNumber": 0,
    "partTitle": "Preface and how to use the book",
    "partSlug": "part-00-preface"
  },
  {
    "partNumber": 1,
    "partTitle": "Foundations of finance",
    "partSlug": "part-01-foundations"
  },
  {
    "partNumber": 2,
    "partTitle": "Long-horizon investing and portfolio construction",
    "partSlug": "part-02-long-horizon-investing"
  },
  {
    "partNumber": 3,
    "partTitle": "Systematic trading and risk premia",
    "partSlug": "part-03-systematic-trading"
  },
  {
    "partNumber": 4,
    "partTitle": "Event-driven and relative-value methods",
    "partSlug": "part-04-event-driven-relative-value"
  },
  {
    "partNumber": 5,
    "partTitle": "Derivatives and volatility",
    "partSlug": "part-05-derivatives-volatility"
  },
  {
    "partNumber": 6,
    "partTitle": "Market microstructure and execution",
    "partSlug": "part-06-microstructure-execution"
  },
  {
    "partNumber": 7,
    "partTitle": "Discretionary and hybrid workflows",
    "partSlug": "part-07-discretionary-hybrid"
  },
  {
    "partNumber": 8,
    "partTitle": "Synthesis and comparison",
    "partSlug": "part-08-synthesis"
  },
  {
    "partNumber": 9,
    "partTitle": "Appendix",
    "partSlug": "part-09-appendix"
  }
];

export const chapterMetadata: ChapterMeta[] = [
  {
    "chapterNumber": 0,
    "chapterTitle": "Preface",
    "sections": [
      "Why I am learning finance this way",
      "What this site is and is not",
      "How math and CS will be used here",
      "How to read the book",
      "What counts as investing vs trading vs quant"
    ],
    "chapterSlug": "preface",
    "chapterCode": null,
    "partNumber": 0,
    "partTitle": "Preface and how to use the book",
    "partSlug": "part-00-preface",
    "summary": "Placeholder summary for Preface.",
    "status": "detailed"
  },
  {
    "chapterNumber": 1,
    "chapterTitle": "Financial markets and instruments",
    "sections": [
      "What a market is",
      "Stocks, bonds, ETFs, mutual funds",
      "Indexes and benchmarks",
      "Derivatives at a high level",
      "Exchanges, brokers, and market participants"
    ],
    "chapterSlug": "financial-markets-and-instruments",
    "chapterCode": null,
    "partNumber": 1,
    "partTitle": "Foundations of finance",
    "partSlug": "part-01-foundations",
    "summary": "Placeholder summary for Financial markets and instruments.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 2,
    "chapterTitle": "Returns, compounding, and wealth growth",
    "sections": [
      "Simple return vs log return",
      "Compounding",
      "Inflation and real return",
      "Cumulative return vs annualized return",
      "Why small edges compound"
    ],
    "chapterSlug": "returns-compounding-and-wealth-growth",
    "chapterCode": null,
    "partNumber": 1,
    "partTitle": "Foundations of finance",
    "partSlug": "part-01-foundations",
    "summary": "Placeholder summary for Returns, compounding, and wealth growth.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 3,
    "chapterTitle": "Risk, volatility, and drawdowns",
    "sections": [
      "What risk means in practice",
      "Volatility",
      "Drawdown",
      "Tail risk",
      "Why return without risk context is misleading"
    ],
    "chapterSlug": "risk-volatility-and-drawdowns",
    "chapterCode": null,
    "partNumber": 1,
    "partTitle": "Foundations of finance",
    "partSlug": "part-01-foundations",
    "summary": "Placeholder summary for Risk, volatility, and drawdowns.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 4,
    "chapterTitle": "Data, time horizons, and backtesting language",
    "sections": [
      "End-of-day vs intraday data",
      "Lookback windows",
      "Rebalancing frequency",
      "In-sample vs out-of-sample",
      "Overfitting and data leakage"
    ],
    "chapterSlug": "data-time-horizons-and-backtesting-language",
    "chapterCode": null,
    "partNumber": 1,
    "partTitle": "Foundations of finance",
    "partSlug": "part-01-foundations",
    "summary": "Placeholder summary for Data, time horizons, and backtesting language.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 5,
    "chapterTitle": "Stylized facts of returns",
    "sections": [
      "Random walk intuition",
      "Fat tails",
      "Volatility clustering",
      "Autocorrelation and dependence",
      "Why naive models fail"
    ],
    "chapterSlug": "stylized-facts-of-returns",
    "chapterCode": null,
    "partNumber": 1,
    "partTitle": "Foundations of finance",
    "partSlug": "part-01-foundations",
    "summary": "Placeholder summary for Stylized facts of returns.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 6,
    "chapterTitle": "Passive indexing and benchmarking",
    "sections": [
      "What passive indexing is",
      "Why benchmarking matters",
      "Active vs passive",
      "Tracking error",
      "Fees, taxes, and implementation frictions"
    ],
    "chapterSlug": "passive-indexing-and-benchmarking",
    "chapterCode": null,
    "partNumber": 2,
    "partTitle": "Long-horizon investing and portfolio construction",
    "partSlug": "part-02-long-horizon-investing",
    "summary": "Placeholder summary for Passive indexing and benchmarking.",
    "status": "detailed"
  },
  {
    "chapterNumber": 7,
    "chapterTitle": "Strategic asset allocation",
    "sections": [
      "Asset classes",
      "Diversification",
      "Correlation and covariance",
      "Long-run portfolio weights",
      "Rebalancing policies"
    ],
    "chapterSlug": "strategic-asset-allocation",
    "chapterCode": null,
    "partNumber": 2,
    "partTitle": "Long-horizon investing and portfolio construction",
    "partSlug": "part-02-long-horizon-investing",
    "summary": "Placeholder summary for Strategic asset allocation.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 8,
    "chapterTitle": "Mean-variance portfolio construction",
    "sections": [
      "Expected return",
      "Variance and covariance",
      "Efficient frontier",
      "Long-only constraints",
      "Why optimization is fragile"
    ],
    "chapterSlug": "mean-variance-portfolio-construction",
    "chapterCode": null,
    "partNumber": 2,
    "partTitle": "Long-horizon investing and portfolio construction",
    "partSlug": "part-02-long-horizon-investing",
    "summary": "Placeholder summary for Mean-variance portfolio construction.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 9,
    "chapterTitle": "CAPM, beta, and risk budgeting",
    "sections": [
      "Market beta",
      "Systematic vs idiosyncratic risk",
      "CAPM as a benchmark model",
      "Risk contribution",
      "Limits of beta-only thinking"
    ],
    "chapterSlug": "capm-beta-and-risk-budgeting",
    "chapterCode": null,
    "partNumber": 2,
    "partTitle": "Long-horizon investing and portfolio construction",
    "partSlug": "part-02-long-horizon-investing",
    "summary": "Placeholder summary for CAPM, beta, and risk budgeting.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 10,
    "chapterTitle": "Factor investing and smart beta",
    "sections": [
      "What a factor is",
      "Value, momentum, quality, size",
      "Long-only tilts vs long-short factors",
      "Factor exposures",
      "Crowding and drawdowns"
    ],
    "chapterSlug": "factor-investing-and-smart-beta",
    "chapterCode": null,
    "partNumber": 2,
    "partTitle": "Long-horizon investing and portfolio construction",
    "partSlug": "part-02-long-horizon-investing",
    "summary": "Placeholder summary for Factor investing and smart beta.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 11,
    "chapterTitle": "Risk parity and equal risk contribution",
    "sections": [
      "Capital allocation vs risk allocation",
      "Volatility scaling",
      "Equal risk contribution",
      "Leverage issues",
      "Why 60/40 is not balanced in risk"
    ],
    "chapterSlug": "risk-parity-and-equal-risk-contribution",
    "chapterCode": null,
    "partNumber": 2,
    "partTitle": "Long-horizon investing and portfolio construction",
    "partSlug": "part-02-long-horizon-investing",
    "summary": "Placeholder summary for Risk parity and equal risk contribution.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 12,
    "chapterTitle": "Portfolio risk management",
    "sections": [
      "VaR",
      "Expected shortfall",
      "Stress testing",
      "Scenario analysis",
      "CVaR as a tail-aware extension"
    ],
    "chapterSlug": "portfolio-risk-management",
    "chapterCode": null,
    "partNumber": 2,
    "partTitle": "Long-horizon investing and portfolio construction",
    "partSlug": "part-02-long-horizon-investing",
    "summary": "Placeholder summary for Portfolio risk management.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 13,
    "chapterTitle": "Cross-sectional momentum",
    "sections": [
      "Winners vs losers",
      "Formation and holding periods",
      "Ranking assets",
      "Volatility scaling",
      "Crash risk and turnover"
    ],
    "chapterSlug": "cross-sectional-momentum",
    "chapterCode": null,
    "partNumber": 3,
    "partTitle": "Systematic trading and risk premia",
    "partSlug": "part-03-systematic-trading",
    "summary": "Placeholder summary for Cross-sectional momentum.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 14,
    "chapterTitle": "Time-series momentum and trend following",
    "sections": [
      "Absolute momentum idea",
      "Moving averages",
      "Sign-of-past-return rules",
      "Volatility targeting",
      "Cross-asset trend portfolios"
    ],
    "chapterSlug": "time-series-momentum-and-trend-following",
    "chapterCode": null,
    "partNumber": 3,
    "partTitle": "Systematic trading and risk premia",
    "partSlug": "part-03-systematic-trading",
    "summary": "Placeholder summary for Time-series momentum and trend following.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 15,
    "chapterTitle": "Carry strategies",
    "sections": [
      "What carry means",
      "Carry across asset classes",
      "Yield curves and futures curves",
      "Why carry can look good for long periods",
      "Crash and funding risk"
    ],
    "chapterSlug": "carry-strategies",
    "chapterCode": null,
    "partNumber": 3,
    "partTitle": "Systematic trading and risk premia",
    "partSlug": "part-03-systematic-trading",
    "summary": "Placeholder summary for Carry strategies.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 16,
    "chapterTitle": "Mean reversion basics",
    "sections": [
      "What mean reversion means",
      "When it appears",
      "Simple z-score logic",
      "Regime dependence",
      "Why it can fail badly"
    ],
    "chapterSlug": "mean-reversion-basics",
    "chapterCode": null,
    "partNumber": 3,
    "partTitle": "Systematic trading and risk premia",
    "partSlug": "part-03-systematic-trading",
    "summary": "Placeholder summary for Mean reversion basics.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 17,
    "chapterTitle": "Pairs trading and cointegration",
    "sections": [
      "Correlation vs cointegration",
      "Distance-based pairs",
      "Spread construction",
      "Entry/exit logic",
      "Structural breaks"
    ],
    "chapterSlug": "pairs-trading-and-cointegration",
    "chapterCode": null,
    "partNumber": 3,
    "partTitle": "Systematic trading and risk premia",
    "partSlug": "part-03-systematic-trading",
    "summary": "Placeholder summary for Pairs trading and cointegration.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 18,
    "chapterTitle": "Equity statistical arbitrage",
    "sections": [
      "Residuals and neutrality",
      "Factor-neutral baskets",
      "PCA intuition",
      "Optimization under constraints",
      "Borrow, crowding, and turnover"
    ],
    "chapterSlug": "equity-statistical-arbitrage",
    "chapterCode": null,
    "partNumber": 3,
    "partTitle": "Systematic trading and risk premia",
    "partSlug": "part-03-systematic-trading",
    "summary": "Placeholder summary for Equity statistical arbitrage.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 19,
    "chapterTitle": "Short-term reversal",
    "sections": [
      "What reversal is",
      "Relation to liquidity and microstructure",
      "Why gross alpha is not net alpha",
      "Turnover and costs",
      "Reversal vs momentum"
    ],
    "chapterSlug": "short-term-reversal",
    "chapterCode": null,
    "partNumber": 3,
    "partTitle": "Systematic trading and risk premia",
    "partSlug": "part-03-systematic-trading",
    "summary": "Placeholder summary for Short-term reversal.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 20,
    "chapterTitle": "Volatility forecasting and targeting",
    "sections": [
      "Volatility clustering",
      "EWMA",
      "ARCH/GARCH",
      "Forecast intervals",
      "Volatility targeting"
    ],
    "chapterSlug": "volatility-forecasting-and-targeting",
    "chapterCode": null,
    "partNumber": 3,
    "partTitle": "Systematic trading and risk premia",
    "partSlug": "part-03-systematic-trading",
    "summary": "Placeholder summary for Volatility forecasting and targeting.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 21,
    "chapterTitle": "ML-based forecasting and features",
    "sections": [
      "What makes ML different from classic factor/rule methods",
      "Feature engineering for finance",
      "Labeling targets",
      "Cross-validation for time series",
      "Why ML often fails in finance"
    ],
    "chapterSlug": "ml-based-forecasting-and-features",
    "chapterCode": null,
    "partNumber": 3,
    "partTitle": "Systematic trading and risk premia",
    "partSlug": "part-03-systematic-trading",
    "summary": "Placeholder summary for ML-based forecasting and features.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 22,
    "chapterTitle": "News and NLP signals",
    "sections": [
      "Financial text as data",
      "Sentiment vs topic signals",
      "Timestamp alignment",
      "Financial dictionaries vs generic sentiment",
      "Leakage and data licensing"
    ],
    "chapterSlug": "news-and-nlp-signals",
    "chapterCode": null,
    "partNumber": 3,
    "partTitle": "Systematic trading and risk premia",
    "partSlug": "part-03-systematic-trading",
    "summary": "Placeholder summary for News and NLP signals.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 23,
    "chapterTitle": "Event-driven trading",
    "sections": [
      "What an event is",
      "Why events create temporary mispricings",
      "Scheduled vs unscheduled events",
      "Event windows",
      "Implementation difficulty"
    ],
    "chapterSlug": "event-driven-trading",
    "chapterCode": null,
    "partNumber": 4,
    "partTitle": "Event-driven and relative-value methods",
    "partSlug": "part-04-event-driven-relative-value",
    "summary": "Placeholder summary for Event-driven trading.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 24,
    "chapterTitle": "Merger arbitrage",
    "sections": [
      "Deal spreads",
      "Success vs break scenarios",
      "Asymmetric payoff",
      "Portfolio of deals",
      "Legal and operational risks"
    ],
    "chapterSlug": "merger-arbitrage",
    "chapterCode": null,
    "partNumber": 4,
    "partTitle": "Event-driven and relative-value methods",
    "partSlug": "part-04-event-driven-relative-value",
    "summary": "Placeholder summary for Merger arbitrage.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 25,
    "chapterTitle": "Futures basis and cash-and-carry",
    "sections": [
      "Spot vs futures",
      "Basis",
      "Carry link",
      "Convergence",
      "Funding and execution risk"
    ],
    "chapterSlug": "futures-basis-and-cash-and-carry",
    "chapterCode": null,
    "partNumber": 4,
    "partTitle": "Event-driven and relative-value methods",
    "partSlug": "part-04-event-driven-relative-value",
    "summary": "Placeholder summary for Futures basis and cash-and-carry.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 26,
    "chapterTitle": "Options relative value and VRP",
    "sections": [
      "Implied vs realized volatility",
      "Variance risk premium",
      "Skew and term structure",
      "VIX ecosystem",
      "Tail risk and convexity"
    ],
    "chapterSlug": "options-relative-value-and-vrp",
    "chapterCode": null,
    "partNumber": 4,
    "partTitle": "Event-driven and relative-value methods",
    "partSlug": "part-04-event-driven-relative-value",
    "summary": "Placeholder summary for Options relative value and VRP.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 27,
    "chapterTitle": "Options foundations",
    "sections": [
      "Calls and puts",
      "Payoff diagrams",
      "Moneyness",
      "Expiration",
      "Why options are nonlinear"
    ],
    "chapterSlug": "options-foundations",
    "chapterCode": null,
    "partNumber": 5,
    "partTitle": "Derivatives and volatility",
    "partSlug": "part-05-derivatives-volatility",
    "summary": "Placeholder summary for Options foundations.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 28,
    "chapterTitle": "Pricing and Greeks",
    "sections": [
      "Black-Scholes intuition",
      "Delta, gamma, theta, vega",
      "Implied volatility",
      "Model assumptions",
      "Where the model breaks"
    ],
    "chapterSlug": "pricing-and-greeks",
    "chapterCode": null,
    "partNumber": 5,
    "partTitle": "Derivatives and volatility",
    "partSlug": "part-05-derivatives-volatility",
    "summary": "Placeholder summary for Pricing and Greeks.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 29,
    "chapterTitle": "Hedging and replication",
    "sections": [
      "Delta hedging",
      "Discrete hedging error",
      "Jump risk",
      "Stochastic volatility idea",
      "Practical hedging frictions"
    ],
    "chapterSlug": "hedging-and-replication",
    "chapterCode": null,
    "partNumber": 5,
    "partTitle": "Derivatives and volatility",
    "partSlug": "part-05-derivatives-volatility",
    "summary": "Placeholder summary for Hedging and replication.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 30,
    "chapterTitle": "Volatility as an asset class",
    "sections": [
      "Realized vs implied vol",
      "VIX intuition",
      "Variance swaps at a high level",
      "Hedging with volatility products",
      "Why short-vol is dangerous"
    ],
    "chapterSlug": "volatility-as-an-asset-class",
    "chapterCode": null,
    "partNumber": 5,
    "partTitle": "Derivatives and volatility",
    "partSlug": "part-05-derivatives-volatility",
    "summary": "Placeholder summary for Volatility as an asset class.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 31,
    "chapterTitle": "Order types and trade lifecycle",
    "sections": [
      "Market orders",
      "Limit orders",
      "Stop orders",
      "Partial fills",
      "Executable price vs quoted price"
    ],
    "chapterSlug": "order-types-and-trade-lifecycle",
    "chapterCode": null,
    "partNumber": 6,
    "partTitle": "Market microstructure and execution",
    "partSlug": "part-06-microstructure-execution",
    "summary": "Placeholder summary for Order types and trade lifecycle.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 32,
    "chapterTitle": "Transaction costs and slippage",
    "sections": [
      "Explicit vs implicit costs",
      "Bid-ask spread",
      "Slippage",
      "Market impact",
      "Why backtests lie without costs"
    ],
    "chapterSlug": "transaction-costs-and-slippage",
    "chapterCode": null,
    "partNumber": 6,
    "partTitle": "Market microstructure and execution",
    "partSlug": "part-06-microstructure-execution",
    "summary": "Placeholder summary for Transaction costs and slippage.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 33,
    "chapterTitle": "Optimal execution",
    "sections": [
      "TWAP",
      "VWAP",
      "Implementation shortfall",
      "Cost-risk tradeoff",
      "Why execution is an optimization problem"
    ],
    "chapterSlug": "optimal-execution",
    "chapterCode": null,
    "partNumber": 6,
    "partTitle": "Market microstructure and execution",
    "partSlug": "part-06-microstructure-execution",
    "summary": "Placeholder summary for Optimal execution.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 34,
    "chapterTitle": "Limit order books and market making",
    "sections": [
      "Order book structure",
      "Spread capture",
      "Inventory risk",
      "Adverse selection",
      "Queue position and latency"
    ],
    "chapterSlug": "limit-order-books-and-market-making",
    "chapterCode": null,
    "partNumber": 6,
    "partTitle": "Market microstructure and execution",
    "partSlug": "part-06-microstructure-execution",
    "summary": "Placeholder summary for Limit order books and market making.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 35,
    "chapterTitle": "HFT overview",
    "sections": [
      "What HFT actually means",
      "Why infrastructure matters",
      "L1 vs L2 data",
      "Risk controls",
      "Why this is not an early build topic"
    ],
    "chapterSlug": "hft-overview",
    "chapterCode": null,
    "partNumber": 6,
    "partTitle": "Market microstructure and execution",
    "partSlug": "part-06-microstructure-execution",
    "summary": "Placeholder summary for HFT overview.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 36,
    "chapterTitle": "Discretionary fundamental investing",
    "sections": [
      "Building an investment thesis",
      "Reading financial statements",
      "Valuation basics",
      "Catalysts and monitoring",
      "Thesis failure modes"
    ],
    "chapterSlug": "discretionary-fundamental-investing",
    "chapterCode": null,
    "partNumber": 7,
    "partTitle": "Discretionary and hybrid workflows",
    "partSlug": "part-07-discretionary-hybrid",
    "summary": "Placeholder summary for Discretionary fundamental investing.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 37,
    "chapterTitle": "Technical analysis",
    "sections": [
      "Price and volume as inputs",
      "Trendlines and support/resistance",
      "Moving averages and oscillators",
      "Rule-based vs visual charting",
      "Overfitting and narrative traps"
    ],
    "chapterSlug": "technical-analysis",
    "chapterCode": null,
    "partNumber": 7,
    "partTitle": "Discretionary and hybrid workflows",
    "partSlug": "part-07-discretionary-hybrid",
    "summary": "Placeholder summary for Technical analysis.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 38,
    "chapterTitle": "Behavioral decision-making",
    "sections": [
      "Overconfidence",
      "Loss aversion",
      "Confirmation bias",
      "Prospect theory intuition",
      "How bias affects trading and investing"
    ],
    "chapterSlug": "behavioral-decision-making",
    "chapterCode": null,
    "partNumber": 7,
    "partTitle": "Discretionary and hybrid workflows",
    "partSlug": "part-07-discretionary-hybrid",
    "summary": "Placeholder summary for Behavioral decision-making.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 39,
    "chapterTitle": "Hybrid workflows",
    "sections": [
      "Quant screen + human review",
      "Regime filters",
      "Human override policies",
      "Execution plan after idea generation",
      "Where hybrid workflows are stronger than pure discretion"
    ],
    "chapterSlug": "hybrid-workflows",
    "chapterCode": null,
    "partNumber": 7,
    "partTitle": "Discretionary and hybrid workflows",
    "partSlug": "part-07-discretionary-hybrid",
    "summary": "Placeholder summary for Hybrid workflows.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 40,
    "chapterTitle": "Comparing investing and trading styles",
    "sections": [
      "Long horizon vs short horizon",
      "Beta vs alpha",
      "Premia vs pure forecasting",
      "Capacity and turnover",
      "Complexity vs edge"
    ],
    "chapterSlug": "comparing-investing-and-trading-styles",
    "chapterCode": null,
    "partNumber": 8,
    "partTitle": "Synthesis and comparison",
    "partSlug": "part-08-synthesis",
    "summary": "Placeholder summary for Comparing investing and trading styles.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 41,
    "chapterTitle": "Matching methods to data and skill level",
    "sections": [
      "End-of-day only methods",
      "Daily + fundamentals methods",
      "Intraday methods",
      "Options methods",
      "Text-data methods"
    ],
    "chapterSlug": "matching-methods-to-data-and-skill-level",
    "chapterCode": null,
    "partNumber": 8,
    "partTitle": "Synthesis and comparison",
    "partSlug": "part-08-synthesis",
    "summary": "Placeholder summary for Matching methods to data and skill level.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 42,
    "chapterTitle": "What should come first for this project",
    "sections": [
      "Foundations",
      "Volatility",
      "Momentum/trend",
      "Pairs",
      "Factors/benchmarking",
      "Execution literacy"
    ],
    "chapterSlug": "what-should-come-first-for-this-project",
    "chapterCode": null,
    "partNumber": 8,
    "partTitle": "Synthesis and comparison",
    "partSlug": "part-08-synthesis",
    "summary": "Placeholder summary for What should come first for this project.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 43,
    "chapterTitle": "What I still do not know",
    "sections": [
      "Open questions",
      "Misunderstood topics",
      "Things to revisit later",
      "Topics that need stronger math",
      "Topics that need stronger data"
    ],
    "chapterSlug": "what-i-still-do-not-know",
    "chapterCode": null,
    "partNumber": 8,
    "partTitle": "Synthesis and comparison",
    "partSlug": "part-08-synthesis",
    "summary": "Placeholder summary for What I still do not know.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 44,
    "chapterCode": "A",
    "chapterTitle": "Mathematics",
    "sections": [
      "Core mathematical tools",
      "Linear algebra refresher",
      "Probability and statistics refresher",
      "Optimization basics",
      "Time-series math notes"
    ],
    "chapterSlug": "mathematics",
    "partNumber": 9,
    "partTitle": "Appendix",
    "partSlug": "part-09-appendix",
    "summary": "Placeholder summary for Mathematics.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 45,
    "chapterCode": "B",
    "chapterTitle": "Computer Science Topics",
    "sections": [
      "Data structures and algorithms refresher",
      "Complexity and performance thinking",
      "Systems design notes",
      "Data engineering patterns",
      "Reproducibility and environment management"
    ],
    "chapterSlug": "computer-science-topics",
    "partNumber": 9,
    "partTitle": "Appendix",
    "partSlug": "part-09-appendix",
    "summary": "Placeholder summary for Computer Science Topics.",
    "status": "placeholder"
  },
  {
    "chapterNumber": 46,
    "chapterCode": "C",
    "chapterTitle": "Coding tools",
    "sections": [
      "Python and notebook workflow",
      "Backtesting tooling checklist",
      "Version control workflow",
      "Testing, linting, and formatting",
      "Automation basics"
    ],
    "chapterSlug": "coding-tools",
    "partNumber": 9,
    "partTitle": "Appendix",
    "partSlug": "part-09-appendix",
    "summary": "Placeholder summary for Coding tools.",
    "status": "placeholder"
  }
];

export const chapterByRoute = (partSlug: string, chapterSlug: string): ChapterMeta | undefined =>
  chapterMetadata.find(
    (chapter) => chapter.partSlug === partSlug && chapter.chapterSlug === chapterSlug
  );

export const chaptersByPart = partMetadata.map((part) => ({
  ...part,
  chapters: chapterMetadata
    .filter((chapter) => chapter.partSlug === part.partSlug)
    .sort((a, b) => a.chapterNumber - b.chapterNumber)
}));

export const chapterHref = (chapter: ChapterMeta): string =>
  `/chapters/${chapter.partSlug}/${chapter.chapterSlug}`;
