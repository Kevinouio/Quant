"use client";

import type { MouseEvent } from "react";

import { glossaryEntryHref, resolveGlossaryTermId } from "../../lib/glossary";
import { useGlossaryPanel } from "./GlossaryPanelContext";

export function GlossarySidePanel() {
  const { isOpen, isClosing, activeEntry, openById, close } = useGlossaryPanel();

  if (!isOpen || !activeEntry) {
    return null;
  }

  const overlayClassName = `glossary-overlay${isClosing ? " is-closing" : ""}`;
  const drawerClassName = `glossary-drawer${isClosing ? " is-closing" : ""}`;

  const handleFullGlossaryClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.href;
    const modifiedClick =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

    if (modifiedClick) {
      close();
      return;
    }

    event.preventDefault();
    close(() => {
      window.location.assign(href);
    });
  };

  return (
    <>
      <div
        className={overlayClassName}
        role="button"
        tabIndex={0}
        aria-label="Close glossary panel"
        onClick={() => close()}
        onKeyDown={(event) => {
          if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            close();
          }
        }}
      />

      <aside className={drawerClassName} role="dialog" aria-modal="true" aria-labelledby="glossary-drawer-title">
        <div className="glossary-drawer__header">
          <h2 id="glossary-drawer-title">{activeEntry.term}</h2>
          <button
            type="button"
            className="glossary-drawer__close"
            onClick={() => close()}
            aria-label="Close glossary panel"
          >
            Close
          </button>
        </div>

        <div className="glossary-drawer__content">
          <section>
            <h3>Definition</h3>
            <p>{activeEntry.definition}</p>
          </section>

          {activeEntry.intuition ? (
            <section>
              <h3>Intuition</h3>
              <p>{activeEntry.intuition}</p>
            </section>
          ) : null}

          {activeEntry.whyItMatters ? (
            <section>
              <h3>Why It Matters</h3>
              <p>{activeEntry.whyItMatters}</p>
            </section>
          ) : null}

          {activeEntry.relatedTerms.length > 0 ? (
            <section>
              <h3>Related Terms</h3>
              <ul className="glossary-related-list">
                {activeEntry.relatedTerms.map((related) => {
                  const relatedId = resolveGlossaryTermId(related);
                  if (!relatedId) {
                    return <li key={`related-${related}`}>{related}</li>;
                  }

                  return (
                    <li key={`related-${related}`}>
                      <button type="button" onClick={() => openById(relatedId)}>
                        {related}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          {activeEntry.chapterReferences.length > 0 ? (
            <section>
              <h3>Chapter References</h3>
              <ul className="glossary-reference-list">
                {activeEntry.chapterReferences.map((reference) => (
                  <li key={`reference-${reference}`}>{reference}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <div className="glossary-drawer__footer">
          <a href={glossaryEntryHref(activeEntry.id)} onClick={handleFullGlossaryClick}>
            View full glossary entry
          </a>
        </div>
      </aside>
    </>
  );
}
