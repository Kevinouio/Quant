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
  buildDefaultDateRange,
  fetchPassiveIndexInteractive,
  normalizeTickers,
  PASSIVE_INDEX_DEFAULT_TICKERS,
  type PassiveIndexInteractiveResponse,
  validatePassiveIndexInputs
} from "../../../lib/passiveIndexingInteractive";
import { isPassiveIndexWidgetId } from "../../../lib/passiveIndexWidgets";

type PassiveIndexingDemoContextValue = {
  tickers: string[];
  startDate: string;
  endDate: string;
  data: PassiveIndexInteractiveResponse | null;
  loading: boolean;
  validationError: string | null;
  error: string | null;
  hasLoaded: boolean;
  setTicker: (index: number, value: string) => void;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  run: () => Promise<void>;
  reset: () => Promise<void>;
};

const PassiveIndexingDemoContext = createContext<PassiveIndexingDemoContextValue | null>(null);

export { isPassiveIndexWidgetId };

export function PassiveIndexingDemoProvider({ children }: { children: ReactNode }) {
  const defaultRange = useMemo(() => buildDefaultDateRange(), []);
  const [tickers, setTickers] = useState<string[]>([...PASSIVE_INDEX_DEFAULT_TICKERS]);
  const [startDate, setStartDate] = useState(defaultRange.startDate);
  const [endDate, setEndDate] = useState(defaultRange.endDate);
  const [data, setData] = useState<PassiveIndexInteractiveResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const hasInitializedRef = useRef(false);

  const runQuery = useCallback(async (candidateTickers: string[], candidateStart: string, candidateEnd: string) => {
    setValidationError(null);
    setError(null);
    setLoading(true);

    try {
      const result = await fetchPassiveIndexInteractive({
        tickers: candidateTickers,
        startDate: candidateStart,
        endDate: candidateEnd
      });
      setData(result);
      setHasLoaded(true);
    } catch (requestError: unknown) {
      setData(null);
      setHasLoaded(true);
      setError(requestError instanceof Error ? requestError.message : "Failed to run interactive demo.");
    } finally {
      setLoading(false);
    }
  }, []);

  const run = useCallback(async () => {
    const normalized = normalizeTickers(tickers);
    const validationMessage = validatePassiveIndexInputs(normalized, startDate, endDate);

    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    await runQuery(normalized, startDate, endDate);
  }, [endDate, startDate, tickers, runQuery]);

  const reset = useCallback(async () => {
    const defaults = [...PASSIVE_INDEX_DEFAULT_TICKERS];
    setTickers(defaults);
    setStartDate(defaultRange.startDate);
    setEndDate(defaultRange.endDate);
    await runQuery(defaults, defaultRange.startDate, defaultRange.endDate);
  }, [defaultRange.endDate, defaultRange.startDate, runQuery]);

  const setTicker = useCallback((index: number, value: string) => {
    setTickers((current) => {
      if (index < 0 || index >= current.length) {
        return current;
      }
      const next = [...current];
      next[index] = value.toUpperCase();
      return next;
    });
  }, []);

  useEffect(() => {
    if (hasInitializedRef.current) {
      return;
    }

    hasInitializedRef.current = true;
    void runQuery([...PASSIVE_INDEX_DEFAULT_TICKERS], defaultRange.startDate, defaultRange.endDate);
  }, [defaultRange.endDate, defaultRange.startDate, runQuery]);

  const contextValue = useMemo<PassiveIndexingDemoContextValue>(
    () => ({
      tickers,
      startDate,
      endDate,
      data,
      loading,
      validationError,
      error,
      hasLoaded,
      setTicker,
      setStartDate,
      setEndDate,
      run,
      reset
    }),
    [
      data,
      endDate,
      error,
      hasLoaded,
      loading,
      reset,
      run,
      setTicker,
      startDate,
      tickers,
      validationError
    ]
  );

  return <PassiveIndexingDemoContext.Provider value={contextValue}>{children}</PassiveIndexingDemoContext.Provider>;
}

export function usePassiveIndexingDemo(): PassiveIndexingDemoContextValue {
  const context = useContext(PassiveIndexingDemoContext);
  if (!context) {
    throw new Error("Passive index widgets must be rendered inside PassiveIndexingDemoProvider.");
  }
  return context;
}
