"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";

type NavItem = {
  href: string;
  label: string;
  active?: boolean;
  muted?: boolean;
};

type TocItem = {
  href: string;
  label: string;
};

type DocsShellProps = {
  children: ReactNode;
  guideItems: NavItem[];
  roadmapItems: NavItem[];
  tocItems: TocItem[];
  topbarBrandHref: string;
  topbarBrandLabel: string;
  searchPlaceholder?: string;
  navNote: string;
};

function getHashId(href: string): string | null {
  if (!href.startsWith("#")) {
    return null;
  }

  return href.slice(1) || null;
}

export function DocsShell({
  children,
  guideItems,
  roadmapItems,
  tocItems,
  topbarBrandHref,
  topbarBrandLabel,
  searchPlaceholder = "Search chapters (coming soon)",
  navNote
}: DocsShellProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionIds = useMemo(
    () => tocItems.map((item) => getHashId(item.href)).filter(Boolean) as string[],
    [tocItems]
  );

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 981px)").matches) {
        setIsNavOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isNavOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [isNavOpen]);

  useEffect(() => {
    if (!sectionIds.length) {
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) {
      return;
    }

    if (window.location.hash) {
      const current = window.location.hash.replace("#", "");
      if (sectionIds.includes(current)) {
        setActiveSection(current);
      }
    } else {
      setActiveSection(sections[0].id);
    }

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0.15
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  const closeNav = () => setIsNavOpen(false);
  const navOpenClass = isNavOpen ? "left-nav is-open" : "left-nav";

  return (
    <>
      <div className="docs-shell">
        <aside className={navOpenClass} id="sidebar">
          <div className="left-nav__inner">
            <a className="brand" href={topbarBrandHref} onClick={closeNav}>
              <span className="brand__name">Quant</span>
              <span className="brand__meta">Algorithmic Finance Handbook</span>
            </a>

            <nav className="nav-group" aria-label="Guide">
              <h2>Guide</h2>
              <ul className="nav-list">
                {guideItems.map((item) => {
                  const classNames = [
                    "sidebar-link",
                    item.active ? "is-active" : "",
                    item.muted ? "sidebar-link--muted" : ""
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <li key={item.href}>
                      {item.muted ? (
                        <span className={classNames}>{item.label}</span>
                      ) : (
                        <a className={classNames} href={item.href} onClick={closeNav}>
                          {item.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <nav className="nav-group" aria-label="Roadmap">
              <h2>Roadmap</h2>
              <ul className="nav-list">
                {roadmapItems.map((item) => {
                  const classNames = [
                    "sidebar-link",
                    item.active ? "is-active" : "",
                    item.muted ? "sidebar-link--muted" : ""
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <li key={item.href}>
                      {item.muted ? (
                        <span className={classNames}>{item.label}</span>
                      ) : (
                        <a className={classNames} href={item.href} onClick={closeNav}>
                          {item.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <p className="nav-note">{navNote}</p>
          </div>
        </aside>

        <div className="main-column">
          <header className="topbar">
            <div className="topbar__left">
              <button
                className="menu-btn"
                id="menuToggle"
                aria-controls="sidebar"
                aria-expanded={isNavOpen}
                onClick={() => setIsNavOpen((open) => !open)}
              >
                Menu
              </button>
              <a className="topbar__brand" href={topbarBrandHref}>
                {topbarBrandLabel}
              </a>
            </div>
            <form className="search-stub" role="search" aria-label="Search chapters">
              <input type="search" placeholder={searchPlaceholder} disabled />
            </form>
          </header>

          <main className="page-content" id="main-content">
            {children}
          </main>
        </div>

        <aside className="right-toc">
          <nav aria-label="On this page">
            <h2>On This Page</h2>
            <ul className="section-nav">
              {tocItems.map((item) => {
                const isActive = activeSection === getHashId(item.href);
                const className = isActive ? "is-active" : "";

                return (
                  <li key={item.href}>
                    <a className={className} href={item.href}>
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </div>

      <div
        className="nav-overlay"
        id="navOverlay"
        hidden={!isNavOpen}
        onClick={closeNav}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            closeNav();
          }
        }}
        role="button"
        tabIndex={isNavOpen ? 0 : -1}
        aria-label="Close navigation"
      />
    </>
  );
}
