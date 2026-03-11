"use client";

import { createContext, type ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";

import { glossaryEntryById, resolveGlossaryTermId, type GlossaryEntry } from "../../lib/glossary";

export const GLOSSARY_DRAWER_ANIMATION_MS = 220;

type GlossaryPanelContextValue = {
  isOpen: boolean;
  isClosing: boolean;
  activeTermId: string | null;
  activeEntry: GlossaryEntry | null;
  openById: (termId: string) => void;
  openByLookup: (lookup: string) => void;
  close: (onAfterClose?: () => void) => void;
};

const GlossaryPanelContext = createContext<GlossaryPanelContextValue | null>(null);

function closeDurationMs(): number {
  if (typeof window === "undefined") {
    return GLOSSARY_DRAWER_ANIMATION_MS;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 0
    : GLOSSARY_DRAWER_ANIMATION_MS;
}

export function GlossaryPanelProvider({ children }: { children: ReactNode }) {
  const [activeTermId, setActiveTermId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const afterCloseCallbacksRef = useRef<Array<() => void>>([]);

  const activeEntry = useMemo(
    () => (activeTermId ? glossaryEntryById(activeTermId) ?? null : null),
    [activeTermId]
  );

  const isOpen = Boolean(activeEntry);

  const clearCloseTimer = () => {
    if (!closeTimerRef.current) {
      return;
    }

    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const runAfterCloseCallbacks = () => {
    if (afterCloseCallbacksRef.current.length === 0) {
      return;
    }

    const callbacks = [...afterCloseCallbacksRef.current];
    afterCloseCallbacksRef.current = [];
    callbacks.forEach((callback) => callback());
  };

  const resetClosingState = () => {
    clearCloseTimer();
    afterCloseCallbacksRef.current = [];
    setIsClosing(false);
  };

  const openById = (termId: string) => {
    const resolved = glossaryEntryById(termId);
    if (!resolved) {
      return;
    }
    resetClosingState();
    setActiveTermId(resolved.id);
  };

  const openByLookup = (lookup: string) => {
    const resolvedId = resolveGlossaryTermId(lookup);
    if (!resolvedId) {
      return;
    }
    openById(resolvedId);
  };

  const close = (onAfterClose?: () => void) => {
    if (onAfterClose) {
      afterCloseCallbacksRef.current.push(onAfterClose);
    }

    if (!activeEntry) {
      runAfterCloseCallbacks();
      return;
    }

    if (isClosing) {
      return;
    }

    const durationMs = closeDurationMs();
    if (durationMs <= 0) {
      setIsClosing(false);
      setActiveTermId(null);
      runAfterCloseCallbacks();
      return;
    }

    setIsClosing(true);
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setIsClosing(false);
      setActiveTermId(null);
      runAfterCloseCallbacks();
    }, durationMs);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isClosing, activeEntry]);

  useEffect(() => {
    document.body.classList.toggle("glossary-open", isOpen);
    return () => document.body.classList.remove("glossary-open");
  }, [isOpen]);

  useEffect(() => {
    return () => {
      clearCloseTimer();
      afterCloseCallbacksRef.current = [];
    };
  }, []);

  const value = useMemo<GlossaryPanelContextValue>(
    () => ({
      isOpen,
      isClosing,
      activeTermId,
      activeEntry,
      openById,
      openByLookup,
      close
    }),
    [isOpen, isClosing, activeTermId, activeEntry]
  );

  return <GlossaryPanelContext.Provider value={value}>{children}</GlossaryPanelContext.Provider>;
}

export function useGlossaryPanel(): GlossaryPanelContextValue {
  const context = useContext(GlossaryPanelContext);
  if (!context) {
    throw new Error("useGlossaryPanel must be used inside GlossaryPanelProvider.");
  }

  return context;
}
