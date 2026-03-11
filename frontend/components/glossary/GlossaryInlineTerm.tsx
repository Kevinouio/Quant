"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import { resolveGlossaryTermId } from "../../lib/glossary";
import { useGlossaryPanel } from "./GlossaryPanelContext";

const unresolvedWarned = new Set<string>();

export function GlossaryInlineTerm({
  lookup,
  children
}: {
  lookup: string;
  children: ReactNode;
}) {
  const { openById } = useGlossaryPanel();
  const termId = resolveGlossaryTermId(lookup);

  useEffect(() => {
    if (termId || process.env.NODE_ENV === "production") {
      return;
    }

    if (unresolvedWarned.has(lookup)) {
      return;
    }

    unresolvedWarned.add(lookup);
    // eslint-disable-next-line no-console
    console.warn(`[Glossary] Unresolved term token: "${lookup}"`);
  }, [lookup, termId]);

  if (!termId) {
    return <>{children}</>;
  }

  return (
    <button
      type="button"
      className="glossary-term"
      onClick={() => openById(termId)}
      aria-label={`Open glossary entry for ${lookup}`}
    >
      {children}
    </button>
  );
}
