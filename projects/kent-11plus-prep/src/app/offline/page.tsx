"use client";

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center gap-8 py-20 text-center">
      {/* Icon */}
      <div className="relative">
        <span className="text-6xl" role="img" aria-hidden="true">
          {"\uD83D\uDCE1"}
        </span>
        {/* Pulsing ring behind the icon */}
        <div className="absolute -inset-4 animate-ping rounded-full border border-neon-amber/20" />
      </div>

      {/* Heading */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-mono text-3xl font-bold tracking-widest text-neon-amber text-glow-amber sm:text-4xl">
          YOU&apos;RE OFFLINE
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          No internet connection detected. Some features need a network to work,
          but you can still practice offline-ready modes.
        </p>
      </div>

      {/* Offline-ready modes */}
      <div className="flex w-full max-w-sm flex-col gap-3">
        <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-neon-green text-glow-green">
          Available Offline
        </h2>

        <a
          href="/practice/non-verbal-reasoning"
          className="group flex items-center gap-3 rounded-xl border border-neon-green/20 bg-surface px-5 py-4 transition-all duration-300 hover:border-neon-green/40 hover:bg-surface-hover"
        >
          <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
            {"\uD83E\uDDE0"}
          </span>
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-mono text-sm font-bold text-neon-green">
              Non-Verbal Reasoning
            </span>
            <span className="text-xs text-muted-foreground">
              Pattern sequences generated client-side
            </span>
          </div>
        </a>

        <a
          href="/practice/cube-nets"
          className="group flex items-center gap-3 rounded-xl border border-neon-green/20 bg-surface px-5 py-4 transition-all duration-300 hover:border-neon-green/40 hover:bg-surface-hover"
        >
          <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
            {"\uD83D\uDCE6"}
          </span>
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-mono text-sm font-bold text-neon-green">
              Cube Nets
            </span>
            <span className="text-xs text-muted-foreground">
              3D folding puzzles generated client-side
            </span>
          </div>
        </a>
      </div>

      {/* Retry button */}
      <button
        onClick={() => window.location.reload()}
        className="rounded-lg bg-neon-cyan px-8 py-3 font-mono text-xs font-bold uppercase tracking-wider text-background transition-all duration-300 hover:bg-neon-cyan/90 hover:shadow-[0_0_20px_rgba(0,220,255,0.3)]"
      >
        Try Again
      </button>

      {/* Connection status hint */}
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
        This page will auto-retry when your connection is restored
      </p>
    </div>
  );
}
