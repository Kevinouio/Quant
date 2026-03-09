import { DocsShell } from "../components/layout/DocsShell";
import { chapterHref, chaptersByPart } from "../lib/chapterMetadata";

function chapterNavLabel(chapter: { chapterNumber: number; chapterCode: string | null; chapterTitle: string }) {
  if (chapter.chapterCode) {
    return `Appendix ${chapter.chapterCode}. ${chapter.chapterTitle}`;
  }

  return `Chapter ${chapter.chapterNumber}. ${chapter.chapterTitle}`;
}

const sidebarGroups = chaptersByPart.map((part) => ({
  title: `Part ${part.partNumber}. ${part.partTitle}`,
  items: part.chapters.map((chapter) => ({
    href: chapterHref(chapter),
    label: chapterNavLabel(chapter)
  }))
}));

const tocItems = [
  { href: "#overview", label: "Overview" },
  { href: "#structure", label: "Book Structure" },
  { href: "#learning-spine", label: "Learning Spine" },
  { href: "#parts-catalog", label: "Parts Catalog" },
  { href: "#notes", label: "Notes" }
];

export default function HomePage() {
  return (
    <DocsShell
      sidebarHomeLink={{ href: "/", label: "Home", active: true }}
      sidebarGroups={sidebarGroups}
      tocItems={tocItems}
      topbarBrandHref="/"
      topbarBrandLabel="Quant Docs"
      navNote="Book scaffold is now organized by part and chapter families. Content is placeholder-first for rapid iteration."
    >
      <article className="article">
        <header className="hero" id="overview">
          <p className="eyebrow">Quant Textbook</p>
          <h1>What is this?</h1>
          <p>
            This project is more for teaching a person about the world about finance along with myself also teaching myself the topics as I personally don't have the course space and the money to take the proper courses in the topics. So if you want to read along with me in teaching these topics of trading, quantative finance, and investing, feel free to follow along as the way that I wrote these chapters are in the order in which i learning from sections 0 - 43.  
          </p>
        </header>

        <section className="article-section" id="structure">
          <h2>How The Book Is Organized</h2>
          <p>
            The textbook is organized by progression and method family: foundations first, then
            investing, systematic trading, event-driven methods, derivatives, execution, hybrid
            workflows, and synthesis.
          </p>
          <div className="card-grid">
            <article className="card">
              <h3>Draft Layer (QMD)</h3>
              <p>
                Author chapter drafts in{" "}
                <code>notebooks/chapters/{"{part-slug}"}/chapter-{"{NN}"}-{"{chapter-slug}"}.qmd</code>.
              </p>
            </article>
            <article className="card">
              <h3>Chapter Pages (TSX)</h3>
              <p>
                Each chapter has its own route file at{" "}
                <code>frontend/app/chapters/{"{part-slug}"}/{"{chapter-slug}"}/page.tsx</code>.
              </p>
            </article>
            <article className="card">
              <h3>Route Contract</h3>
              <p>
                Render chapters via <code>/chapters/{"{part-slug}"}/{"{chapter-slug}"}</code> with
                a shared template route.
              </p>
            </article>
          </div>
        </section>

        <section className="article-section" id="learning-spine">
          <h2>Recommended Learning Spine</h2>
          <p>
            Suggested sequence for this project: foundations, volatility, momentum/trend, pairs,
            factors/benchmarking, then execution literacy.
          </p>
          <ul>
            <li>Start in Part I for definitions, risk language, and backtesting basics.</li>
            <li>Move to Part III for trading signal families and volatility forecasting.</li>
            <li>Use Part II to anchor long-horizon portfolio and benchmark thinking.</li>
            <li>Finish with Part VI and Part VIII to connect strategy and implementation.</li>
          </ul>
        </section>

        <section className="article-section" id="parts-catalog">
          <h2>Parts And Chapter Catalog</h2>
          <p>
            Every chapter currently has placeholder content and section headings ready for expansion.
          </p>
          <div className="card-grid">
            {chaptersByPart.map((part) => (
              <article className="card" key={part.partSlug}>
                <h3>
                  Part {part.partNumber}. {part.partTitle}
                </h3>
                <p>{part.chapters.length} chapter placeholders ready.</p>
                <a className="button-link" href={chapterHref(part.chapters[0])}>
                  Open First Chapter
                </a>
              </article>
            ))}
          </div>
        </section>

        <footer className="article-section" id="notes">
          <h2>Notes</h2>
          <p>
            Each chapter route now has its own TSX file, so you can edit chapter bodies directly
            without using MDX.
          </p>
        </footer>
      </article>
    </DocsShell>
  );
}
