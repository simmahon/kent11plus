"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseCountdownReturn {
  /** Seconds remaining. */
  secondsLeft: number;
  /** Whether the timer is currently ticking. */
  isRunning: boolean;
  /** Start or resume the countdown. */
  start: () => void;
  /** Pause the countdown without resetting. */
  pause: () => void;
  /** Reset back to `initialSeconds` and stop. */
  reset: () => void;
  /** Formatted string "M:SS". */
  display: string;
}

/**
 * A simple countdown timer hook.
 *
 * @param initialSeconds - total seconds the timer starts from.
 * @param onComplete     - optional callback fired when the timer hits 0.
 */
export function useCountdown(
  initialSeconds: number,
  onComplete?: () => void,
): UseCountdownReturn {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep callback ref fresh without re-triggering effect.
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Core tick effect.
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          onCompleteRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1_000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const display = `${minutes}:${secs.toString().padStart(2, "0")}`;

  return { secondsLeft, isRunning, start, pause, reset, display };
}
