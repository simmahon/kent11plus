import { useCallback, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Question preloading hook                                           */
/* ------------------------------------------------------------------ */
/*  Fetches the next batch of questions in the background while the    */
/*  user answers the current batch. Eliminates loading screen on       */
/*  "Try Again".                                                       */
/* ------------------------------------------------------------------ */

interface PreloadConfig {
  /** Function that returns a promise resolving to the next batch of questions. */
  fetchFn: () => Promise<unknown[]>;
  /** Question index at which to trigger prefetch (default: 3 of 5). */
  triggerAtIndex?: number;
}

interface PreloadState<T> {
  /** Pre-fetched questions ready to serve instantly. */
  prefetched: T[] | null;
  /** Whether a prefetch is currently in progress. */
  isPrefetching: boolean;
  /** Consume the prefetched questions (returns them and clears the cache). */
  consumePrefetched: () => T[] | null;
  /** Notify the hook that the user reached a question index. */
  onQuestionReached: (index: number) => void;
  /** Manually trigger a prefetch. */
  triggerPrefetch: () => void;
}

export function usePreloadQuestions<T = unknown>(
  config: PreloadConfig,
): PreloadState<T> {
  const [prefetched, setPrefetched] = useState<T[] | null>(null);
  const [isPrefetching, setIsPrefetching] = useState(false);
  const hasPrefetched = useRef(false);
  const triggerIndex = config.triggerAtIndex ?? 3;

  const triggerPrefetch = useCallback(() => {
    if (hasPrefetched.current || isPrefetching) return;
    hasPrefetched.current = true;
    setIsPrefetching(true);

    config
      .fetchFn()
      .then((questions) => {
        setPrefetched(questions as T[]);
      })
      .catch(() => {
        // Silently fail - user will just see loading screen on retry
        hasPrefetched.current = false;
      })
      .finally(() => {
        setIsPrefetching(false);
      });
  }, [config, isPrefetching]);

  const onQuestionReached = useCallback(
    (index: number) => {
      if (index >= triggerIndex && !hasPrefetched.current) {
        triggerPrefetch();
      }
    },
    [triggerIndex, triggerPrefetch],
  );

  const consumePrefetched = useCallback(() => {
    const data = prefetched;
    setPrefetched(null);
    hasPrefetched.current = false;
    return data;
  }, [prefetched]);

  return {
    prefetched,
    isPrefetching,
    consumePrefetched,
    onQuestionReached,
    triggerPrefetch,
  };
}
