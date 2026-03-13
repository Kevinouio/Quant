"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { GlossaryPanelProvider } from "../glossary/GlossaryPanelContext";
import { GlossarySidePanel } from "../glossary/GlossarySidePanel";
import { useTheme } from "../theme/ThemeContext";

type SidebarSubsectionItem = {
  id: string;
  href: string;
  label: string;
  active?: boolean;
};

type SidebarSectionItem = {
  id: string;
  href: string;
  label: string;
  active?: boolean;
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

type ChapterContextItem = {
  id: string;
  href: string;
  label: string;
  active?: boolean;
};

type TocSubsectionItem = {
  href: string;
  label: string;
  hashId: string;
};

type GroupedTocItem =
  | {
      kind: "standalone";
      href: string;
      label: string;
      hashId: string | null;
      level: number;
    }
  | {
      kind: "section";
      href: string;
      label: string;
      hashId: string;
      children: TocSubsectionItem[];
    };

type DocsShellProps = {
  children: ReactNode;
  sidebarHomeLink?: SidebarHomeLink;
  sidebarGroups: SidebarGroup[];
  tocItems: TocItem[];
  chapterContextItems?: ChapterContextItem[];
  rightPanelTitle?: string;
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
  chapterContextItems,
  rightPanelTitle,
  topbarBrandHref,
  topbarBrandLabel,
  searchPlaceholder = "Search chapters (coming soon)",
  navNote
}: DocsShellProps) {
  const { theme, toggleTheme } = useTheme();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(null);
  const [expandedSectionByChapter, setExpandedSectionByChapter] = useState<Record<string, string | null>>({});
  const [expandedTocSectionId, setExpandedTocSectionId] = useState<string | null>(null);
  const tocContainerRef = useRef<HTMLElement | null>(null);
  const tocLinkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const hasChapterContext = Boolean(chapterContextItems && chapterContextItems.length > 0);
  const inSectionTocItems = useMemo(
    () => (hasChapterContext ? tocItems.filter((item) => (item.level ?? 1) >= 2) : tocItems),
    [hasChapterContext, tocItems]
  );
  const sectionIds = useMemo(
    () => inSectionTocItems.map((item) => getHashId(item.href)).filter(Boolean) as string[],
    [inSectionTocItems]
  );
  const groupedTocItems = useMemo(() => {
    const grouped: GroupedTocItem[] = [];
    let currentSection: Extract<GroupedTocItem, { kind: "section" }> | null = null;

    for (const item of inSectionTocItems) {
      const hashId = getHashId(item.href);
      const level = item.level ?? 1;
      if (level === 2 && hashId) {
        const sectionGroup: Extract<GroupedTocItem, { kind: "section" }> = {
          kind: "section",
          href: item.href,
          label: item.label,
          hashId,
          children: []
        };
        grouped.push(sectionGroup);
        currentSection = sectionGroup;
        continue;
      }

      if (level === 3 && currentSection && hashId) {
        currentSection.children.push({
          href: item.href,
          label: item.label,
          hashId
        });
        continue;
      }

      grouped.push({
        kind: "standalone",
        href: item.href,
        label: item.label,
        hashId,
        level
      });
      currentSection = null;
    }

    return grouped;
  }, [inSectionTocItems]);
  const sectionParentBySubsection = useMemo(() => {
    const parentByChild = new Map<string, string>();

    for (const item of groupedTocItems) {
      if (item.kind !== "section") {
        continue;
      }

      for (const child of item.children) {
        parentByChild.set(child.hashId, item.hashId);
      }
    }

    return parentByChild;
  }, [groupedTocItems]);
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

    const getTopbarHeight = () => {
      const topbar = document.querySelector(".topbar") as HTMLElement | null;
      return topbar?.offsetHeight ?? 60;
    };

    const computeActiveSection = () => {
      const topbarHeight = getTopbarHeight();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const visibleHeight = Math.max(viewportHeight - topbarHeight, 1);
      const readingCenter = topbarHeight + visibleHeight / 2;
      let candidateId = sections[0].id;
      let minDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const distance = Math.abs(section.getBoundingClientRect().top - readingCenter);
        if (distance < minDistance) {
          minDistance = distance;
          candidateId = section.id;
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
  }, [activeSection, expandedTocSectionId, groupedTocItems]);

  useEffect(() => {
    if (!activeSection) {
      return;
    }

    const parentSectionId = sectionParentBySubsection.get(activeSection);
    if (!parentSectionId) {
      return;
    }

    setExpandedTocSectionId((current) => (current === parentSectionId ? current : parentSectionId));
  }, [activeSection, sectionParentBySubsection]);

  useEffect(() => {
    if (!expandedTocSectionId) {
      return;
    }

    const hasExpandedSection = groupedTocItems.some(
      (item) => item.kind === "section" && item.hashId === expandedTocSectionId
    );
    if (!hasExpandedSection) {
      setExpandedTocSectionId(null);
    }
  }, [expandedTocSectionId, groupedTocItems]);

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

  const toggleTocSection = (sectionId: string) => {
    setExpandedTocSectionId((current) => (current === sectionId ? null : sectionId));
  };

  const inSectionNavItems = groupedTocItems.map((item) => {
    if (item.kind === "standalone") {
      const isActive = item.hashId ? activeSection === item.hashId : false;
      const className = [item.level === 3 ? "is-subheading" : "", isActive ? "is-active" : ""]
        .filter(Boolean)
        .join(" ");

      return (
        <li key={item.href}>
          <a
            ref={(node) => {
              if (!item.hashId) {
                return;
              }

              if (node) {
                tocLinkRefs.current.set(item.hashId, node);
              } else {
                tocLinkRefs.current.delete(item.hashId);
              }
            }}
            className={className}
            href={item.href}
          >
            {item.label}
          </a>
        </li>
      );
    }

    const isSectionActive = activeSection === item.hashId;
    const isSectionExpanded = expandedTocSectionId === item.hashId;
    const hasSubsections = item.children.length > 0;
    const submenuId = `right-toc-${toDomId(item.hashId)}-subsections`;
    const sectionClassName = isSectionActive ? "is-active" : "";

    return (
      <li className="section-nav__group" key={item.href}>
        <div className="section-nav__row">
          <a
            ref={(node) => {
              if (node) {
                tocLinkRefs.current.set(item.hashId, node);
              } else {
                tocLinkRefs.current.delete(item.hashId);
              }
            }}
            className={sectionClassName}
            href={item.href}
          >
            {item.label}
          </a>
          {hasSubsections ? (
            <button
              type="button"
              className="toc-toggle"
              aria-label={`${isSectionExpanded ? "Collapse" : "Expand"} ${item.label}`}
              aria-expanded={isSectionExpanded}
              aria-controls={submenuId}
              onClick={() => toggleTocSection(item.hashId)}
            >
              <span className="toc-toggle__chevron" aria-hidden="true">
                {">"}
              </span>
            </button>
          ) : null}
        </div>

        {hasSubsections && isSectionExpanded ? (
          <ul className="section-nav__sublist" id={submenuId}>
            {item.children.map((subsection) => {
              const isSubsectionActive = activeSection === subsection.hashId;
              const subsectionClassName = ["is-subheading", isSubsectionActive ? "is-active" : ""]
                .filter(Boolean)
                .join(" ");

              return (
                <li key={subsection.href}>
                  <a
                    ref={(node) => {
                      if (node) {
                        tocLinkRefs.current.set(subsection.hashId, node);
                      } else {
                        tocLinkRefs.current.delete(subsection.hashId);
                      }
                    }}
                    className={subsectionClassName}
                    href={subsection.href}
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
  });

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
                                  {">"}
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
                                    (subsection) =>
                                      subsection.active || activeSection === getHashId(subsection.href)
                                  ) ?? false;
                                const isSectionActive =
                                  Boolean(section.active) ||
                                  (sectionHash ? sectionHash === activeSection : false) ||
                                  hasActiveSubsection;
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
                                            {">"}
                                          </span>
                                        </button>
                                      ) : null}
                                    </div>

                                    {sectionHasChildren && isSectionExpanded ? (
                                      <ul className="nav-subsublist" id={sectionChildrenId}>
                                        {section.children?.map((subsection) => {
                                          const isSubActive =
                                            Boolean(subsection.active) ||
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
              <div className="topbar__right">
                <form className="search-stub" role="search" aria-label="Search chapters">
                  <input type="search" placeholder={searchPlaceholder} disabled />
                </form>
                <button
                  type="button"
                  className="theme-toggle"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  aria-pressed={theme === "dark"}
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </button>
              </div>
            </header>

            <main className="page-content" id="main-content">
              {children}
            </main>
          </div>

          <aside className="right-toc" ref={tocContainerRef}>
            <nav aria-label={rightPanelTitle ?? "On this page"}>
              <h2>{rightPanelTitle ?? "On This Page"}</h2>

              {hasChapterContext ? (
                <>
                  <section className="right-toc__group">
                    <h3 className="right-toc__group-title">In this section</h3>
                    <ul className="section-nav">{inSectionNavItems}</ul>
                  </section>

                  <section className="right-toc__group">
                    <h3 className="right-toc__group-title">Sections in this chapter</h3>
                    <ul className="section-nav section-nav--chapter">
                      {chapterContextItems?.map((sectionLink) => (
                        <li key={sectionLink.id}>
                          <a
                            className={sectionLink.active ? "is-active" : ""}
                            href={sectionLink.href}
                          >
                            {sectionLink.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                </>
              ) : (
                <ul className="section-nav">{inSectionNavItems}</ul>
              )}
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

