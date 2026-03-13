"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import {
  fetchChapter6ReconstructionRuns,
  fetchChapter6ReconstructionView,
  runChapter6Reconstruction,
  type Chapter6ReconstructionRunInfo,
  type Chapter6ReconstructionViewResponse
} from "../../../lib/chapter6Reconstruction";
import { isChapter6ReconstructionWidgetId } from "../../../lib/chapter6ReconstructionWidgets";

type Chapter6ReconstructionContextValue = {
  runs: Chapter6ReconstructionRunInfo[];
  selectedRunKey: string | null;
  viewData: Chapter6ReconstructionViewResponse | null;
  loadingRuns: boolean;
  loadingView: boolean;
  running: boolean;
  error: string | null;
  hasLoaded: boolean;
  loadRuns: () => Promise<void>;
  loadView: (runKey?: string) => Promise<void>;
  selectRun: (runKey: string) => Promise<void>;
  runReconstruction: (force?: boolean) => Promise<void>;
};

const Chapter6ReconstructionContext = createContext<Chapter6ReconstructionContextValue | null>(null);

export { isChapter6ReconstructionWidgetId };

export function Chapter6ReconstructionProvider({ children }: { children: ReactNode }) {
  const [runs, setRuns] = useState<Chapter6ReconstructionRunInfo[]>([]);
  const [selectedRunKey, setSelectedRunKey] = useState<string | null>(null);
  const [viewData, setViewData] = useState<Chapter6ReconstructionViewResponse | null>(null);
  const [loadingRuns, setLoadingRuns] = useState(false);
  const [loadingView, setLoadingView] = useState(false);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const hasInitializedRef = useRef(false);

  const loadRuns = useCallback(async () => {
    setLoadingRuns(true);
    try {
      const response = await fetchChapter6ReconstructionRuns();
      setRuns(response.runs);
      if (response.runs.length === 0) {
        setSelectedRunKey(null);
      }
    } finally {
      setLoadingRuns(false);
    }
  }, []);

  const loadView = useCallback(async (runKey?: string) => {
    setLoadingView(true);
    setError(null);
    try {
      const response = await fetchChapter6ReconstructionView(runKey);
      setViewData(response);
      setSelectedRunKey(response.runKey);
      setHasLoaded(true);
    } catch (requestError: unknown) {
      setViewData(null);
      setHasLoaded(true);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to load chapter 6 reconstruction run."
      );
    } finally {
      setLoadingView(false);
    }
  }, []);

  const selectRun = useCallback(
    async (runKey: string) => {
      setSelectedRunKey(runKey);
      await loadView(runKey);
    },
    [loadView]
  );

  const runAndRefresh = useCallback(
    async (force = false) => {
      setRunning(true);
      setError(null);
      try {
        const response = await runChapter6Reconstruction({ force });
        await loadRuns();
        await loadView(response.runKey);
      } catch (requestError: unknown) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Failed to run chapter 6 reconstruction."
        );
      } finally {
        setRunning(false);
      }
    },
    [loadRuns, loadView]
  );

  useEffect(() => {
    if (hasInitializedRef.current) {
      return;
    }
    hasInitializedRef.current = true;

    void (async () => {
      setError(null);
      setLoadingRuns(true);
      try {
        const response = await fetchChapter6ReconstructionRuns();
        setRuns(response.runs);
        if (response.runs.length > 0) {
          await loadView(response.runs[0].runKey);
        } else {
          setHasLoaded(true);
        }
      } catch (requestError: unknown) {
        setHasLoaded(true);
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Failed to load chapter 6 reconstruction runs."
        );
      } finally {
        setLoadingRuns(false);
      }
    })();
  }, [loadView]);

  const contextValue = useMemo<Chapter6ReconstructionContextValue>(
    () => ({
      runs,
      selectedRunKey,
      viewData,
      loadingRuns,
      loadingView,
      running,
      error,
      hasLoaded,
      loadRuns,
      loadView,
      selectRun,
      runReconstruction: runAndRefresh
    }),
    [
      error,
      hasLoaded,
      loadRuns,
      loadView,
      loadingRuns,
      loadingView,
      runAndRefresh,
      running,
      runs,
      selectRun,
      selectedRunKey,
      viewData
    ]
  );

  return (
    <Chapter6ReconstructionContext.Provider value={contextValue}>
      {children}
    </Chapter6ReconstructionContext.Provider>
  );
}

export function useChapter6Reconstruction(): Chapter6ReconstructionContextValue {
  const context = useContext(Chapter6ReconstructionContext);
  if (!context) {
    throw new Error("Chapter 6 reconstruction widgets must be rendered inside Chapter6ReconstructionProvider.");
  }
  return context;
}
