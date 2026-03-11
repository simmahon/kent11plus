"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-6 py-20 text-center">
      <span className="text-5xl" role="img" aria-hidden="true">
        {"\u26A0\uFE0F"}
      </span>
      <h2 className="font-mono text-xl font-bold tracking-widest text-neon-amber text-glow-amber">
        Something went wrong
      </h2>
      <p className="max-w-md text-sm text-muted-foreground">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-neon-cyan px-6 py-2 font-mono text-xs font-bold uppercase tracking-wider text-background hover:bg-neon-cyan/90"
      >
        Try Again
      </button>
    </div>
  );
}
