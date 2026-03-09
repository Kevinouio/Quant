import { DocsShell } from "../../../components/layout/DocsShell";

const guideItems = [
  { href: "/", label: "Introduction" },
  { href: "/chapters/passive-indexing", label: "Chapter 1: Passive Indexing", active: true }
];

const roadmapItems = [
  { href: "#factor-investing", label: "Chapter 2: Factor Investing (Soon)", muted: true },
  { href: "#mean-reversion", label: "Chapter 3: Mean Reversion (Soon)", muted: true },
  { href: "#volatility-models", label: "Chapter 4: Volatility Models (Soon)", muted: true }
];

const tocItems = [
  { href: "#overview", label: "Overview" },
  { href: "#why-passive-works", label: "Why Passive Works" },
  { href: "#assumptions", label: "Assumptions" },
  { href: "#workflow", label: "Workflow" },
  { href: "#pseudocode", label: "Pseudocode" },
  { href: "#metrics", label: "Metrics" },
  { href: "#risks", label: "Risks" },
  { href: "#references", label: "References" }
];

export default function PassiveIndexingPage() {
  return (
    <DocsShell
      guideItems={guideItems}
      roadmapItems={roadmapItems}
      tocItems={tocItems}
      topbarBrandHref="/"
      topbarBrandLabel="Quant Docs"
      navNote="Focus chapter for now: passive indexing. Use this structure as the template for future chapters."
    >
      <article className="article">
        <header className="hero" id="overview">
          <p className="eyebrow">Chapter 1</p>
          <h1>Passive Indexing</h1>
          <p>
            Passive indexing is a rules-based way to track a market benchmark instead of
            forecasting individual winners. The key objective is reliable market exposure with low
            cost and low complexity.
          </p>
        </header>

        <section className="article-section" id="why-passive-works">
          <h2>Why Passive Works</h2>
          <p>
            Passive strategies avoid most timing and selection risk that comes from frequent active
            decisions. They are effective because they keep the portfolio close to the market
            return stream while controlling drag from turnover, taxes, and fees.
          </p>
          <p>
            In a quant curriculum, this is foundational because nearly every advanced strategy is
            evaluated against a passive benchmark.
          </p>
        </section>

        <section className="article-section" id="assumptions">
          <h2>Model Assumptions</h2>
          <ul>
            <li>Benchmark: broad market ETF proxy (for example SPY).</li>
            <li>Rebalancing: monthly schedule unless drift exceeds a tolerance band.</li>
            <li>Costs: explicit expense ratio plus trading friction per rebalance.</li>
            <li>Data hygiene: adjusted close prices only, with no look-ahead leakage.</li>
          </ul>
          <p className="callout">
            A passive backtest is still sensitive to data treatment. Corporate actions, missing
            sessions, and survivorship filtering can create false confidence if not handled
            explicitly.
          </p>
        </section>

        <section className="article-section" id="workflow">
          <h2>Implementation Workflow</h2>
          <ol>
            <li>Define benchmark symbol and simulation window.</li>
            <li>Build a normalized return series from adjusted prices.</li>
            <li>Apply allocation rule and rebalance schedule.</li>
            <li>Subtract expenses and transaction costs.</li>
            <li>Produce equity curve and tracking diagnostics.</li>
          </ol>
        </section>

        <section className="article-section" id="pseudocode">
          <h2>Rebalancing Pseudocode</h2>
          <p>
            This stripped-down template keeps the objective clear: track a benchmark while
            recording implementation drag.
          </p>
          <pre>
            <code className="language-python">{`def run_passive_backtest(prices, rebalance_dates, annual_fee_bps):
    equity = 1.0
    target_weight = 1.0   # single benchmark sleeve
    holdings = target_weight

    for date in prices.index:
        daily_return = prices.loc[date, "benchmark_return"]
        equity *= (1.0 + holdings * daily_return)

        if date in rebalance_dates:
            turnover = abs(holdings - target_weight)
            equity *= (1.0 - turnover * 0.0005)  # trading friction
            holdings = target_weight

        equity *= (1.0 - annual_fee_bps / 10000.0 / 252.0)

    return equity`}</code>
          </pre>
        </section>

        <section className="article-section" id="metrics">
          <h2>Metrics To Track</h2>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Why It Matters</th>
                <th>Typical Target</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tracking Error</td>
                <td>Shows how tightly portfolio returns follow benchmark returns.</td>
                <td>Low and stable over time</td>
              </tr>
              <tr>
                <td>Turnover</td>
                <td>Estimates implementation drag from trading and tax friction.</td>
                <td>As low as practical</td>
              </tr>
              <tr>
                <td>Max Drawdown</td>
                <td>Sets expectations for peak-to-trough losses during stress periods.</td>
                <td>Comparable to benchmark profile</td>
              </tr>
              <tr>
                <td>Net CAGR</td>
                <td>Captures compounded growth after all assumptions and costs.</td>
                <td>Close to benchmark net return</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="article-section" id="risks">
          <h2>Risks And Caveats</h2>
          <ul>
            <li>Benchmark concentration risk can remain high even in passive products.</li>
            <li>Behavioral risk still exists if investors abandon strategy during drawdowns.</li>
            <li>Backtest quality depends on realistic cost, slippage, and data assumptions.</li>
            <li>Index methodology changes can alter exposure without obvious narrative change.</li>
          </ul>
        </section>

        <footer className="article-section" id="references">
          <h2>References And Next Steps</h2>
          <ul>
            <li>Index provider methodology documents for constituent and rebalance rules.</li>
            <li>Low-cost ETF prospectus details for fee and tracking structure.</li>
            <li>Next chapter will compare passive benchmarking against simple factor tilts.</li>
          </ul>
        </footer>
      </article>
    </DocsShell>
  );
}
