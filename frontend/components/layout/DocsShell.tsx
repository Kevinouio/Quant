"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { GlossaryPanelProvider } from "../glossary/GlossaryPanelContext";
import { GlossarySidePanel } from "../glossary/GlossarySidePanel";

type SidebarSubsectionItem = {
  id: string;
  href: string;
  label: string;
};

type SidebarSectionItem = {
  id: string;
  href: string;
  label: string;
  children?: SidebarSubsectionItem[];
};

type NavItem = {
  id: string;
  href: string;
  label: string;
  active?: boolean;
  children?: SidebarSectionItem[];
};

type SidebarGroup = {
  title: string;
  items: NavItem[];
};

type SidebarHomeLink = {
  href: string;
  label: string;
  active?: boolean;
};

type TocItem = {
  href: string;
  label: string;
  level?: number;
};

type DocsShellProps = {
  children: ReactNode;
  sidebarHomeLink?: SidebarHomeLink;
  sidebarGroups: SidebarGroup[];
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

function toDomId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function DocsShell({
  children,
  sidebarHomeLink,
  sidebarGroups,
  tocItems,
  topbarBrandHref,
  topbarBrandLabel,
  searchPlaceholder = "Search chapters (coming soon)",
  navNote
}: DocsShellProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(null);
  const [expandedSectionByChapter, setExpandedSectionByChapter] = useState<Record<string, string | null>>({});
  const tocContainerRef = useRef<HTMLElement | null>(null);
  const tocLinkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const sectionIds = useMemo(
    () => tocItems.map((item) => getHashId(item.href)).filter(Boolean) as string[],
    [tocItems]
  );
  const activeChapterId = useMemo(() => {
    for (const group of sidebarGroups) {
      const match = group.items.find((item) => item.active);
      if (match) {
        return match.id;
      }
    }
    return null;
  }, [sidebarGroups]);

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
      setActiveSection(null);
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) {
      setActiveSection(null);
      return;
    }

    const getReadingOffset = () => {
      const topbar = document.querySelector(".topbar") as HTMLElement | null;
      const topbarHeight = topbar?.offsetHeight ?? 60;
      return topbarHeight + 24;
    };

    const computeActiveSection = () => {
      const readingLine = getReadingOffset();
      let candidateId = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) {
          candidateId = section.id;
        } else {
          break;
        }
      }

      return candidateId;
    };

    const getHashTarget = () => {
      const hash = window.location.hash.replace("#", "");
      return sectionIds.includes(hash) ? hash : null;
    };

    let frameId: number | null = null;

    const syncActiveSection = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        const nextId = computeActiveSection();
        setActiveSection((current) => (current === nextId ? current : nextId));
      });
    };

    const hashTarget = getHashTarget();
    if (hashTarget) {
      setActiveSection(hashTarget);
    } else {
      syncActiveSection();
    }

    const onHashChange = () => {
      const nextHashTarget = getHashTarget();
      if (nextHashTarget) {
        setActiveSection(nextHashTarget);
      }
      syncActiveSection();
    };

    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [sectionIds]);

  useEffect(() => {
    if (!activeSection) {
      return;
    }

    const container = tocContainerRef.current;
    const activeLink = tocLinkRefs.current.get(activeSection);
    if (!container || !activeLink || !container.contains(activeLink)) {
      return;
    }

    activeLink.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "auto" });
  }, [activeSection]);

  useEffect(() => {
    if (!activeChapterId) {
      return;
    }

    setExpandedChapterId(activeChapterId);
    setExpandedSectionByChapter((current) => ({ ...current, [activeChapterId]: null }));
  }, [activeChapterId]);

  const closeNav = () => setIsNavOpen(false);
  const navOpenClass = isNavOpen ? "left-nav is-open" : "left-nav";

  const toggleChapter = (chapterId: string) => {
    setExpandedChapterId((current) => (current === chapterId ? null : chapterId));
    setExpandedSectionByChapter((current) => ({ ...current, [chapterId]: null }));
  };

  const toggleSection = (chapterId: string, sectionId: string) => {
    setExpandedSectionByChapter((current) => ({
      ...current,
      [chapterId]: current[chapterId] === sectionId ? null : sectionId
    }));
  };

  return (
    <GlossaryPanelProvider>
      <>
        <div className="docs-shell">
          <aside className={navOpenClass} id="sidebar">
            <div className="left-nav__inner">
              <a className="brand" href={topbarBrandHref} onClick={closeNav}>
                <span className="brand__name">Quant</span>
                <span className="brand__meta">Algorithmic Finance Handbook</span>
              </a>

              {sidebarHomeLink ? (
                <nav className="nav-group" aria-label="Guide">
                  <h2>Guide</h2>
                  <ul className="nav-list">
                    <li>
                      <a
                        className={`sidebar-link${sidebarHomeLink.active ? " is-active" : ""}`}
                        href={sidebarHomeLink.href}
                        onClick={closeNav}
                      >
                        {sidebarHomeLink.label}
                      </a>
                    </li>
                  </ul>
                </nav>
              ) : null}

              {sidebarGroups.map((group) => (
                <nav className="nav-group" aria-label={group.title} key={group.title}>
                  <h2>{group.title}</h2>
                  <ul className="nav-list">
                    {group.items.map((item) => {
                      const chapterHasChildren = Boolean(item.children && item.children.length > 0);
                      const chapterChildrenId = `sidebar-chapter-${toDomId(item.id)}-children`;
                      const isChapterExpanded = expandedChapterId === item.id;
                      const classNames = [
                        "sidebar-link",
                        item.active ? "is-active" : ""
                      ]
                        .filter(Boolean)
                        .join(" ");

                      return (
                        <li key={item.id}>
                          <div className="nav-item-row">
                            <a className={classNames} href={item.href} onClick={closeNav}>
                              {item.label}
                            </a>
                            {chapterHasChildren ? (
                              <button
                                type="button"
                                className="sidebar-toggle"
                                aria-label={`${isChapterExpanded ? "Collapse" : "Expand"} ${item.label}`}
                                aria-expanded={isChapterExpanded}
                                aria-controls={chapterChildrenId}
                                onClick={() => toggleChapter(item.id)}
                              >
                                <span className="sidebar-toggle__chevron" aria-hidden="true">
                                  ▸
                                </span>
                              </button>
                            ) : null}
                          </div>

                          {chapterHasChildren && isChapterExpanded ? (
                            <ul className="nav-sublist" id={chapterChildrenId}>
                              {item.children?.map((section) => {
                                const sectionHash = getHashId(section.href);
                                const sectionHasChildren = Boolean(
                                  section.children && section.children.length > 0
                                );
                                const sectionChildrenId = `sidebar-section-${toDomId(section.id)}-children`;
                                const isSectionExpanded = expandedSectionByChapter[item.id] === section.id;
                                const hasActiveSubsection =
                                  section.children?.some(
                                    (subsection) => activeSection === getHashId(subsection.href)
                                  ) ?? false;
                                const isSectionActive =
                                  (sectionHash ? sectionHash === activeSection : false) || hasActiveSubsection;
                                const sectionClassName = [
                                  "sidebar-sublink",
                                  "sidebar-section-link",
                                  isSectionActive ? "is-active" : ""
                                ]
                                  .filter(Boolean)
                                  .join(" ");

                                return (
                                  <li key={section.id}>
                                    <div className="nav-item-row nav-item-row--section">
                                      <a className={sectionClassName} href={section.href} onClick={closeNav}>
                                        {section.label}
                                      </a>
                                      {sectionHasChildren ? (
                                        <button
                                          type="button"
                                          className="sidebar-toggle"
                                          aria-label={`${isSectionExpanded ? "Collapse" : "Expand"} ${section.label}`}
                                          aria-expanded={isSectionExpanded}
                                          aria-controls={sectionChildrenId}
                                          onClick={() => toggleSection(item.id, section.id)}
                                        >
                                          <span className="sidebar-toggle__chevron" aria-hidden="true">
                                            ▸
                                          </span>
                                        </button>
                                      ) : null}
                                    </div>

                                    {sectionHasChildren && isSectionExpanded ? (
                                      <ul className="nav-subsublist" id={sectionChildrenId}>
                                        {section.children?.map((subsection) => {
                                          const isSubActive =
                                            activeSection === getHashId(subsection.href);
                                          const subClassName = [
                                            "sidebar-sublink",
                                            "is-subheading",
                                            isSubActive ? "is-active" : ""
                                          ]
                                            .filter(Boolean)
                                            .join(" ");

                                          return (
                                            <li key={subsection.id}>
                                              <a
                                                className={subClassName}
                                                href={subsection.href}
                                                onClick={closeNav}
                                              >
                                                {subsection.label}
                                              </a>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    ) : null}
                                  </li>
                                );
                              })}
                            </ul>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              ))}

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

          <aside className="right-toc" ref={tocContainerRef}>
            <nav aria-label="On this page">
              <h2>On This Page</h2>
              <ul className="section-nav">
                {tocItems.map((item) => {
                  const hashId = getHashId(item.href);
                  const isActive = activeSection === hashId;
                  const className = [
                    item.level === 3 ? "is-subheading" : "",
                    isActive ? "is-active" : ""
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <li key={item.href}>
                      <a
                        ref={(node) => {
                          if (!hashId) {
                            return;
                          }

                          if (node) {
                            tocLinkRefs.current.set(hashId, node);
                          } else {
                            tocLinkRefs.current.delete(hashId);
                          }
                        }}
                        className={className}
                        href={item.href}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>

        <GlossarySidePanel />

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
    </GlossaryPanelProvider>
  );
}
