const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..");
const notebooksRoot = path.join(repoRoot, "notebooks", "chapters");
const frontendChapterPagesRoot = path.join(repoRoot, "frontend", "app", "chapters");
const chapterMetadataPath = path.join(repoRoot, "frontend", "lib", "chapterMetadata.ts");
const forceRegenerate = process.argv.includes("--force");

const partDefinitions = [
  {
    partNumber: 0,
    partTitle: "Preface and how to use the book",
    partSlug: "part-00-preface",
    chapters: [
      {
        chapterNumber: 0,
        chapterTitle: "Preface",
        sections: [
          "Why I am learning finance this way",
          "What this site is and is not",
          "How math and CS will be used here",
          "How to read the book",
          "What counts as investing vs trading vs quant"
        ]
      }
    ]
  },
  {
    partNumber: 1,
    partTitle: "Foundations of finance",
    partSlug: "part-01-foundations",
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "Financial markets and instruments",
        sections: [
          "What a market is",
          "Stocks, bonds, ETFs, mutual funds",
          "Indexes and benchmarks",
          "Derivatives at a high level",
          "Exchanges, brokers, and market participants"
        ]
      },
      {
        chapterNumber: 2,
        chapterTitle: "Returns, compounding, and wealth growth",
        sections: [
          "Simple return vs log return",
          "Compounding",
          "Inflation and real return",
          "Cumulative return vs annualized return",
          "Why small edges compound"
        ]
      },
      {
        chapterNumber: 3,
        chapterTitle: "Risk, volatility, and drawdowns",
        sections: [
          "What risk means in practice",
          "Volatility",
          "Drawdown",
          "Tail risk",
          "Why return without risk context is misleading"
        ]
      },
      {
        chapterNumber: 4,
        chapterTitle: "Data, time horizons, and backtesting language",
        sections: [
          "End-of-day vs intraday data",
          "Lookback windows",
          "Rebalancing frequency",
          "In-sample vs out-of-sample",
          "Overfitting and data leakage"
        ]
      },
      {
        chapterNumber: 5,
        chapterTitle: "Stylized facts of returns",
        sections: [
          "Random walk intuition",
          "Fat tails",
          "Volatility clustering",
          "Autocorrelation and dependence",
          "Why naive models fail"
        ]
      }
    ]
  },
  {
    partNumber: 2,
    partTitle: "Long-horizon investing and portfolio construction",
    partSlug: "part-02-long-horizon-investing",
    chapters: [
      {
        chapterNumber: 6,
        chapterTitle: "Passive indexing and benchmarking",
        sections: [
          "What passive indexing is",
          "Why benchmarking matters",
          "Active vs passive",
          "Tracking error",
          "Fees, taxes, and implementation frictions"
        ]
      },
      {
        chapterNumber: 7,
        chapterTitle: "Strategic asset allocation",
        sections: [
          "Asset classes",
          "Diversification",
          "Correlation and covariance",
          "Long-run portfolio weights",
          "Rebalancing policies"
        ]
      },
      {
        chapterNumber: 8,
        chapterTitle: "Mean-variance portfolio construction",
        sections: [
          "Expected return",
          "Variance and covariance",
          "Efficient frontier",
          "Long-only constraints",
          "Why optimization is fragile"
        ]
      },
      {
        chapterNumber: 9,
        chapterTitle: "CAPM, beta, and risk budgeting",
        sections: [
          "Market beta",
          "Systematic vs idiosyncratic risk",
          "CAPM as a benchmark model",
          "Risk contribution",
          "Limits of beta-only thinking"
        ]
      },
      {
        chapterNumber: 10,
        chapterTitle: "Factor investing and smart beta",
        sections: [
          "What a factor is",
          "Value, momentum, quality, size",
          "Long-only tilts vs long-short factors",
          "Factor exposures",
          "Crowding and drawdowns"
        ]
      },
      {
        chapterNumber: 11,
        chapterTitle: "Risk parity and equal risk contribution",
        sections: [
          "Capital allocation vs risk allocation",
          "Volatility scaling",
          "Equal risk contribution",
          "Leverage issues",
          "Why 60/40 is not balanced in risk"
        ]
      },
      {
        chapterNumber: 12,
        chapterTitle: "Portfolio risk management",
        sections: [
          "VaR",
          "Expected shortfall",
          "Stress testing",
          "Scenario analysis",
          "CVaR as a tail-aware extension"
        ]
      }
    ]
  },
  {
    partNumber: 3,
    partTitle: "Systematic trading and risk premia",
    partSlug: "part-03-systematic-trading",
    chapters: [
      {
        chapterNumber: 13,
        chapterTitle: "Cross-sectional momentum",
        sections: [
          "Winners vs losers",
          "Formation and holding periods",
          "Ranking assets",
          "Volatility scaling",
          "Crash risk and turnover"
        ]
      },
      {
        chapterNumber: 14,
        chapterTitle: "Time-series momentum and trend following",
        sections: [
          "Absolute momentum idea",
          "Moving averages",
          "Sign-of-past-return rules",
          "Volatility targeting",
          "Cross-asset trend portfolios"
        ]
      },
      {
        chapterNumber: 15,
        chapterTitle: "Carry strategies",
        sections: [
          "What carry means",
          "Carry across asset classes",
          "Yield curves and futures curves",
          "Why carry can look good for long periods",
          "Crash and funding risk"
        ]
      },
      {
        chapterNumber: 16,
        chapterTitle: "Mean reversion basics",
        sections: [
          "What mean reversion means",
          "When it appears",
          "Simple z-score logic",
          "Regime dependence",
          "Why it can fail badly"
        ]
      },
      {
        chapterNumber: 17,
        chapterTitle: "Pairs trading and cointegration",
        sections: [
          "Correlation vs cointegration",
          "Distance-based pairs",
          "Spread construction",
          "Entry/exit logic",
          "Structural breaks"
        ]
      },
      {
        chapterNumber: 18,
        chapterTitle: "Equity statistical arbitrage",
        sections: [
          "Residuals and neutrality",
          "Factor-neutral baskets",
          "PCA intuition",
          "Optimization under constraints",
          "Borrow, crowding, and turnover"
        ]
      },
      {
        chapterNumber: 19,
        chapterTitle: "Short-term reversal",
        sections: [
          "What reversal is",
          "Relation to liquidity and microstructure",
          "Why gross alpha is not net alpha",
          "Turnover and costs",
          "Reversal vs momentum"
        ]
      },
      {
        chapterNumber: 20,
        chapterTitle: "Volatility forecasting and targeting",
        sections: [
          "Volatility clustering",
          "EWMA",
          "ARCH/GARCH",
          "Forecast intervals",
          "Volatility targeting"
        ]
      },
      {
        chapterNumber: 21,
        chapterTitle: "ML-based forecasting and features",
        sections: [
          "What makes ML different from classic factor/rule methods",
          "Feature engineering for finance",
          "Labeling targets",
          "Cross-validation for time series",
          "Why ML often fails in finance"
        ]
      },
      {
        chapterNumber: 22,
        chapterTitle: "News and NLP signals",
        sections: [
          "Financial text as data",
          "Sentiment vs topic signals",
          "Timestamp alignment",
          "Financial dictionaries vs generic sentiment",
          "Leakage and data licensing"
        ]
      }
    ]
  },
  {
    partNumber: 4,
    partTitle: "Event-driven and relative-value methods",
    partSlug: "part-04-event-driven-relative-value",
    chapters: [
      {
        chapterNumber: 23,
        chapterTitle: "Event-driven trading",
        sections: [
          "What an event is",
          "Why events create temporary mispricings",
          "Scheduled vs unscheduled events",
          "Event windows",
          "Implementation difficulty"
        ]
      },
      {
        chapterNumber: 24,
        chapterTitle: "Merger arbitrage",
        sections: [
          "Deal spreads",
          "Success vs break scenarios",
          "Asymmetric payoff",
          "Portfolio of deals",
          "Legal and operational risks"
        ]
      },
      {
        chapterNumber: 25,
        chapterTitle: "Futures basis and cash-and-carry",
        sections: [
          "Spot vs futures",
          "Basis",
          "Carry link",
          "Convergence",
          "Funding and execution risk"
        ]
      },
      {
        chapterNumber: 26,
        chapterTitle: "Options relative value and VRP",
        sections: [
          "Implied vs realized volatility",
          "Variance risk premium",
          "Skew and term structure",
          "VIX ecosystem",
          "Tail risk and convexity"
        ]
      }
    ]
  },
  {
    partNumber: 5,
    partTitle: "Derivatives and volatility",
    partSlug: "part-05-derivatives-volatility",
    chapters: [
      {
        chapterNumber: 27,
        chapterTitle: "Options foundations",
        sections: [
          "Calls and puts",
          "Payoff diagrams",
          "Moneyness",
          "Expiration",
          "Why options are nonlinear"
        ]
      },
      {
        chapterNumber: 28,
        chapterTitle: "Pricing and Greeks",
        sections: [
          "Black-Scholes intuition",
          "Delta, gamma, theta, vega",
          "Implied volatility",
          "Model assumptions",
          "Where the model breaks"
        ]
      },
      {
        chapterNumber: 29,
        chapterTitle: "Hedging and replication",
        sections: [
          "Delta hedging",
          "Discrete hedging error",
          "Jump risk",
          "Stochastic volatility idea",
          "Practical hedging frictions"
        ]
      },
      {
        chapterNumber: 30,
        chapterTitle: "Volatility as an asset class",
        sections: [
          "Realized vs implied vol",
          "VIX intuition",
          "Variance swaps at a high level",
          "Hedging with volatility products",
          "Why short-vol is dangerous"
        ]
      }
    ]
  },
  {
    partNumber: 6,
    partTitle: "Market microstructure and execution",
    partSlug: "part-06-microstructure-execution",
    chapters: [
      {
        chapterNumber: 31,
        chapterTitle: "Order types and trade lifecycle",
        sections: [
          "Market orders",
          "Limit orders",
          "Stop orders",
          "Partial fills",
          "Executable price vs quoted price"
        ]
      },
      {
        chapterNumber: 32,
        chapterTitle: "Transaction costs and slippage",
        sections: [
          "Explicit vs implicit costs",
          "Bid-ask spread",
          "Slippage",
          "Market impact",
          "Why backtests lie without costs"
        ]
      },
      {
        chapterNumber: 33,
        chapterTitle: "Optimal execution",
        sections: [
          "TWAP",
          "VWAP",
          "Implementation shortfall",
          "Cost-risk tradeoff",
          "Why execution is an optimization problem"
        ]
      },
      {
        chapterNumber: 34,
        chapterTitle: "Limit order books and market making",
        sections: [
          "Order book structure",
          "Spread capture",
          "Inventory risk",
          "Adverse selection",
          "Queue position and latency"
        ]
      },
      {
        chapterNumber: 35,
        chapterTitle: "HFT overview",
        sections: [
          "What HFT actually means",
          "Why infrastructure matters",
          "L1 vs L2 data",
          "Risk controls",
          "Why this is not an early build topic"
        ]
      }
    ]
  },
  {
    partNumber: 7,
    partTitle: "Discretionary and hybrid workflows",
    partSlug: "part-07-discretionary-hybrid",
    chapters: [
      {
        chapterNumber: 36,
        chapterTitle: "Discretionary fundamental investing",
        sections: [
          "Building an investment thesis",
          "Reading financial statements",
          "Valuation basics",
          "Catalysts and monitoring",
          "Thesis failure modes"
        ]
      },
      {
        chapterNumber: 37,
        chapterTitle: "Technical analysis",
        sections: [
          "Price and volume as inputs",
          "Trendlines and support/resistance",
          "Moving averages and oscillators",
          "Rule-based vs visual charting",
          "Overfitting and narrative traps"
        ]
      },
      {
        chapterNumber: 38,
        chapterTitle: "Behavioral decision-making",
        sections: [
          "Overconfidence",
          "Loss aversion",
          "Confirmation bias",
          "Prospect theory intuition",
          "How bias affects trading and investing"
        ]
      },
      {
        chapterNumber: 39,
        chapterTitle: "Hybrid workflows",
        sections: [
          "Quant screen + human review",
          "Regime filters",
          "Human override policies",
          "Execution plan after idea generation",
          "Where hybrid workflows are stronger than pure discretion"
        ]
      }
    ]
  },
  {
    partNumber: 8,
    partTitle: "Synthesis and comparison",
    partSlug: "part-08-synthesis",
    chapters: [
      {
        chapterNumber: 40,
        chapterTitle: "Comparing investing and trading styles",
        sections: [
          "Long horizon vs short horizon",
          "Beta vs alpha",
          "Premia vs pure forecasting",
          "Capacity and turnover",
          "Complexity vs edge"
        ]
      },
      {
        chapterNumber: 41,
        chapterTitle: "Matching methods to data and skill level",
        sections: [
          "End-of-day only methods",
          "Daily + fundamentals methods",
          "Intraday methods",
          "Options methods",
          "Text-data methods"
        ]
      },
      {
        chapterNumber: 42,
        chapterTitle: "What should come first for this project",
        sections: [
          "Foundations",
          "Volatility",
          "Momentum/trend",
          "Pairs",
          "Factors/benchmarking",
          "Execution literacy"
        ]
      },
      {
        chapterNumber: 43,
        chapterTitle: "What I still do not know",
        sections: [
          "Open questions",
          "Misunderstood topics",
          "Things to revisit later",
          "Topics that need stronger math",
          "Topics that need stronger data"
        ]
      }
    ]
  },
  {
    partNumber: 9,
    partTitle: "Appendix",
    partSlug: "part-09-appendix",
    chapters: [
      {
        chapterNumber: 44,
        chapterCode: "A",
        chapterTitle: "Mathematics",
        sections: [
          "Core mathematical tools",
          "Linear algebra refresher",
          "Probability and statistics refresher",
          "Optimization basics",
          "Time-series math notes"
        ]
      },
      {
        chapterNumber: 45,
        chapterCode: "B",
        chapterTitle: "Computer Science Topics",
        sections: [
          "Data structures and algorithms refresher",
          "Complexity and performance thinking",
          "Systems design notes",
          "Data engineering patterns",
          "Reproducibility and environment management"
        ]
      },
      {
        chapterNumber: 46,
        chapterCode: "C",
        chapterTitle: "Coding tools",
        sections: [
          "Python and notebook workflow",
          "Backtesting tooling checklist",
          "Version control workflow",
          "Testing, linting, and formatting",
          "Automation basics"
        ]
      }
    ]
  },
  {
    partNumber: 10,
    partTitle: "Glossary",
    partSlug: "part-10-glossary",
    chapters: [
      {
        chapterNumber: 47,
        chapterTitle: "Glossary",
        sections: [
          "How to use this glossary",
          "Finance and investing terms",
          "Trading and market microstructure terms",
          "Math and statistics terms",
          "Implementation and coding terms"
        ]
      }
    ]
  }
];

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/\+/g, " plus ")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function chapterFileName(chapter) {
  const padded = String(chapter.chapterNumber).padStart(2, "0");
  return `chapter-${padded}-${chapter.chapterSlug}`;
}

function chapterHeading(chapter) {
  if (chapter.chapterCode) {
    return `Appendix ${chapter.chapterCode}. ${chapter.chapterTitle}`;
  }

  return `Chapter ${chapter.chapterNumber}. ${chapter.chapterTitle}`;
}

function chapterDraftLabel(chapter) {
  if (chapter.chapterCode) {
    return `Appendix ${chapter.chapterCode}`;
  }

  return `Chapter ${chapter.chapterNumber}`;
}

function chapterIndexLabel(chapter) {
  if (chapter.chapterCode) {
    return `Appendix ${chapter.chapterCode}`;
  }

  return `Chapter ${chapter.chapterNumber}`;
}

function sectionPlaceholder(title, section) {
  return [
    `${section} placeholder for ${title}.`,
    "Add concrete definitions, formulas, and implementation notes in a later pass."
  ];
}

function toQmd(chapter) {
  const header = [
    "---",
    `title: "${chapterHeading(chapter)}"`,
    "format:",
    "  html: default",
    "  pdf: default",
    "---",
    "",
    "## Objective",
    "",
    `Draft ${chapterDraftLabel(chapter)} content before turning it into a TSX chapter page.`,
    "",
    "## Sections",
    ""
  ];

  const sections = chapter.sections.flatMap((section) => {
    const lines = sectionPlaceholder(chapter.chapterTitle, section);
    return [`### ${section}`, "", `- ${lines[0]}`, `- ${lines[1]}`, ""];
  });

  return [...header, ...sections].join("\n").trimEnd() + "\n";
}

function toTsxPage(chapter) {
  const sectionContent = chapter.sections.map((section) => {
    const lines = sectionPlaceholder(chapter.chapterTitle, section);
    return {
      title: section,
      paragraphs: lines
    };
  });

  const lines = [
    'import { notFound } from "next/navigation";',
    'import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";',
    'import { chapterByRoute } from "../../../../lib/chapterMetadata";',
    "",
    `const partSlug = "${chapter.partSlug}";`,
    `const chapterSlug = "${chapter.chapterSlug}";`,
    "",
    `const sectionContent: ChapterSectionContent[] = ${JSON.stringify(sectionContent, null, 2)};`,
    "",
    "export default function Page() {",
    "  const chapter = chapterByRoute(partSlug, chapterSlug);",
    "",
    "  if (!chapter) {",
    "    notFound();",
    "  }",
    "",
    "  return <ChapterPageLayout chapter={chapter} sectionContent={sectionContent} />;",
    "}",
    ""
  ];

  return lines.join("\n");
}

function toIndexMarkdown(partsWithChapters, mode) {
  const title =
    mode === "notebooks"
      ? "# Chapters Draft Index (QMD)"
      : "# Chapters Route Index (TSX)";
  const intro =
    mode === "notebooks"
      ? "Generated index for notebook draft chapters."
      : "Generated index for frontend chapter route pages.";

  const lines = [title, "", intro, ""];

  partsWithChapters.forEach((part) => {
    lines.push(`## Part ${part.partNumber}. ${part.partTitle}`, "");
    part.chapters.forEach((chapter) => {
      const file = chapterFileName(chapter);
      const rel =
        mode === "notebooks"
          ? `${part.partSlug}/${file}.qmd`
          : `${part.partSlug}/${chapter.chapterSlug}/page.tsx`;
      lines.push(
        `- ${chapterIndexLabel(chapter)}: \`${rel}\` -> \`/chapters/${chapter.partSlug}/${chapter.chapterSlug}\``
      );
    });
    lines.push("");
  });

  return lines.join("\n").trimEnd() + "\n";
}

function writeFileEnsured(targetPath, content) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, content, "utf8");
}

function writeScaffoldFile(targetPath, content) {
  if (!forceRegenerate && fs.existsSync(targetPath)) {
    return;
  }

  writeFileEnsured(targetPath, content);
}

function makeSummary(chapterTitle) {
  return `Placeholder summary for ${chapterTitle}.`;
}

const chapters = partDefinitions.flatMap((part) =>
  part.chapters.map((chapter) => ({
    ...chapter,
    chapterSlug: slugify(chapter.chapterTitle),
    chapterCode: chapter.chapterCode ?? null,
    partNumber: part.partNumber,
    partTitle: part.partTitle,
    partSlug: part.partSlug,
    summary: makeSummary(chapter.chapterTitle),
    status:
      chapter.chapterNumber === 0 || chapter.chapterNumber === 6
        ? "detailed"
        : "placeholder"
  }))
);

const parts = partDefinitions.map((part) => ({
  partNumber: part.partNumber,
  partTitle: part.partTitle,
  partSlug: part.partSlug
}));

const partsWithChapters = partDefinitions.map((part) => ({
  ...part,
  chapters: chapters.filter((chapter) => chapter.partSlug === part.partSlug)
}));

if (forceRegenerate) {
  fs.rmSync(notebooksRoot, { recursive: true, force: true });
  fs.rmSync(frontendChapterPagesRoot, { recursive: true, force: true });
}

fs.mkdirSync(notebooksRoot, { recursive: true });
fs.mkdirSync(frontendChapterPagesRoot, { recursive: true });

partDefinitions.forEach((part) => {
  const chapterRows = chapters.filter((chapter) => chapter.partSlug === part.partSlug);
  chapterRows.forEach((chapter) => {
    const file = chapterFileName(chapter);
    const notebookPath = path.join(notebooksRoot, part.partSlug, `${file}.qmd`);
    const pagePath = path.join(
      frontendChapterPagesRoot,
      part.partSlug,
      chapter.chapterSlug,
      "page.tsx"
    );
    writeScaffoldFile(notebookPath, toQmd(chapter));
    writeScaffoldFile(pagePath, toTsxPage(chapter));
  });
});

writeFileEnsured(
  path.join(notebooksRoot, "README.md"),
  toIndexMarkdown(partsWithChapters, "notebooks")
);
writeFileEnsured(
  path.join(frontendChapterPagesRoot, "README.md"),
  toIndexMarkdown(partsWithChapters, "frontend")
);

const metadataLines = [
  "export type ChapterStatus = \"placeholder\" | \"detailed\";",
  "",
  "export type PartMeta = {",
  "  partNumber: number;",
  "  partTitle: string;",
  "  partSlug: string;",
  "};",
  "",
  "export type ChapterMeta = {",
  "  partNumber: number;",
  "  partTitle: string;",
  "  partSlug: string;",
  "  chapterNumber: number;",
  "  chapterCode: string | null;",
  "  chapterTitle: string;",
  "  chapterSlug: string;",
  "  summary: string;",
  "  sections: string[];",
  "  status: ChapterStatus;",
  "};",
  "",
  `export const partMetadata: PartMeta[] = ${JSON.stringify(parts, null, 2)};`,
  "",
  `export const chapterMetadata: ChapterMeta[] = ${JSON.stringify(chapters, null, 2)};`,
  "",
  "export const chapterByRoute = (partSlug: string, chapterSlug: string): ChapterMeta | undefined =>",
  "  chapterMetadata.find(",
  "    (chapter) => chapter.partSlug === partSlug && chapter.chapterSlug === chapterSlug",
  "  );",
  "",
  "export const chaptersByPart = partMetadata.map((part) => ({",
  "  ...part,",
  "  chapters: chapterMetadata",
  "    .filter((chapter) => chapter.partSlug === part.partSlug)",
  "    .sort((a, b) => a.chapterNumber - b.chapterNumber)",
  "}));",
  "",
  "export const chapterHref = (chapter: ChapterMeta): string =>",
  "  `/chapters/${chapter.partSlug}/${chapter.chapterSlug}`;",
  ""
];

writeFileEnsured(chapterMetadataPath, metadataLines.join("\n"));

if (forceRegenerate) {
  console.log(`Force regenerated ${chapters.length} chapter scaffolds in notebooks and frontend TSX routes.`);
} else {
  console.log(`Scaffold sync complete. Existing chapter files were preserved unless missing.`);
}
