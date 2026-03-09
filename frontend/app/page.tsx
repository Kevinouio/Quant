import { DocsShell } from "../components/layout/DocsShell";

const guideItems = [
  { href: "/", label: "Introduction", active: true },
  { href: "/chapters/passive-indexing", label: "Chapter 1: Passive Indexing" }
];

const roadmapItems = [
  { href: "#factor-investing", label: "Chapter 2: Factor Investing (Soon)", muted: true },
  { href: "#mean-reversion", label: "Chapter 3: Mean Reversion (Soon)", muted: true },
  { href: "#volatility-models", label: "Chapter 4: Volatility Models (Soon)", muted: true }
];

const tocItems = [
  { href: "#overview", label: "Overview" },
  { href: "#structure", label: "Project Structure" },
  { href: "#reading-path", label: "Reading Path" },
  { href: "#next-up", label: "Next Up" },
  { href: "#notes", label: "Notes" }
];

export default function HomePage() {
  return (
    <DocsShell
      guideItems={guideItems}
      roadmapItems={roadmapItems}
      tocItems={tocItems}
      topbarBrandHref="/"
      topbarBrandLabel="Quant Docs"
      navNote="Temporary TSX docs shell. Search, backend demos, and chapter auto-publish are in progress."
    >
      <article className="article">
        <header className="hero" id="overview">
          <p className="eyebrow">Quantitative Finance Textbook</p>
          <h1>Quant Documentation</h1>
          <p>
            Quant is a docs-style learning path for building practical intuition in market data,
            portfolio construction, and systematic strategy design.
          </p>
        </header>

        <section className="article-section" id="structure">
          <h2>How This Project Is Organized</h2>
          <p>
            The course flow is intentionally predictable. Each chapter has the same shape: concept
            first, assumptions second, implementation outline third, and testing guidance last.
          </p>
          <div className="card-grid">
            <article className="card">
              <h3>Notebook Draft</h3>
              <p>
                Research chapter ideas in <code>notebooks/chapters/*.qmd</code> before publishing.
              </p>
            </article>
            <article className="card">
              <h3>Published Content</h3>
              <p>Ship polished chapter copy into static pages and MDX content layers.</p>
            </article>
            <article className="card">
              <h3>Interactive Layer</h3>
              <p>Add backend-connected demos once assumptions and API contracts are stable.</p>
            </article>
          </div>
        </section>

        <section className="article-section" id="reading-path">
          <h2>Current Reading Path</h2>
          <div className="chapter-card">
            <h3>Chapter 1: Passive Indexing</h3>
            <p>
              Start with benchmark tracking logic, rebalancing mechanics, and practical measurement
              of tracking quality.
            </p>
            <a className="button-link" href="/chapters/passive-indexing">
              Read Chapter 1
            </a>
          </div>
        </section>

        <section className="article-section" id="next-up">
          <h2>What Comes Next</h2>
          <p>
            Next chapters will expand from passive allocation into factor tilts, mean reversion
            systems, and volatility-aware portfolio controls.
          </p>
          <ul>
            <li>Chapter 2: factor exposures and risk-adjusted benchmarking.</li>
            <li>Chapter 3: mean reversion setup and entry/exit logic.</li>
            <li>Chapter 4: volatility forecasting with EWMA and regime checks.</li>
          </ul>
        </section>

        <footer className="article-section" id="notes">
          <h2>Notes</h2>
          <p>
            This is a temporary TSX docs shell. It is intentionally simple so chapter design can
            move quickly before full framework migration.
          </p>
        </footer>
      </article>
    </DocsShell>
  );
}
