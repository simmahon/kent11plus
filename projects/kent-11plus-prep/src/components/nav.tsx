"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getCurrentStreak } from "@/lib/supabase/sessions";
import { useUser } from "@/contexts/user-context";

export function Nav() {
  const { users, currentUser, setCurrentUser, loading: usersLoading } = useUser();
  const [streak, setStreak] = useState<number>(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Fetch streak for current user
  useEffect(() => {
    if (!currentUser) return;
    getCurrentStreak(currentUser.id).then(setStreak);
  }, [currentUser]);

  // Re-check streak on page visibility (debounced: at most once per 60s)
  const lastFetchRef = useRef(0);
  useEffect(() => {
    function handleVisibility() {
      if (
        document.visibilityState === "visible" &&
        currentUser &&
        Date.now() - lastFetchRef.current > 60_000
      ) {
        lastFetchRef.current = Date.now();
        getCurrentStreak(currentUser.id).then(setStreak);
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [currentUser]);

  // Close picker when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    }
    if (pickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [pickerOpen]);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border/50 bg-background/80 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link
        href="/"
        className="font-mono text-lg font-bold tracking-widest text-neon-cyan text-glow-cyan transition-opacity hover:opacity-80"
      >
        11+ TRAINER
      </Link>

      <div className="flex items-center gap-3">
        {/* User picker */}
        {!usersLoading && currentUser && (
          <div className="relative" ref={pickerRef}>
            <button
              onClick={() => setPickerOpen((prev) => !prev)}
              className="flex items-center gap-1.5 rounded-md border border-border/50 bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              <span className="text-base leading-none">{currentUser.avatar_emoji}</span>
              <span className="font-bold">{currentUser.name}</span>
              <span className="ml-0.5 text-[10px] opacity-60">
                {pickerOpen ? "\u25B2" : "\u25BC"}
              </span>
            </button>

            {pickerOpen && (
              <div className="absolute right-0 top-full mt-1 z-50 min-w-[140px] rounded-lg border border-border/60 bg-surface shadow-lg">
                {users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      setCurrentUser(user);
                      setPickerOpen(false);
                    }}
                    className={[
                      "flex w-full items-center gap-2 px-3 py-2 font-mono text-xs transition-colors",
                      "hover:bg-surface-hover",
                      user.id === currentUser.id
                        ? "text-neon-cyan font-bold"
                        : "text-muted-foreground",
                    ].join(" ")}
                  >
                    <span className="text-base leading-none">{user.avatar_emoji}</span>
                    <span>{user.name}</span>
                    {user.id === currentUser.id && (
                      <span className="ml-auto text-neon-cyan">&#x2713;</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <Link
          href="/baseline"
          className="rounded-md border border-neon-cyan/30 bg-surface px-3 py-1.5 font-mono text-xs text-neon-cyan/80 transition-colors hover:bg-surface-hover hover:text-neon-cyan"
        >
          Baseline
        </Link>
        <Link
          href="/review"
          className="rounded-md border border-neon-purple/30 bg-surface px-3 py-1.5 font-mono text-xs text-neon-purple/80 transition-colors hover:bg-surface-hover hover:text-neon-purple"
        >
          Review
        </Link>
        <Link
          href="/mock-test"
          className="rounded-md border border-neon-pink/30 bg-surface px-3 py-1.5 font-mono text-xs text-neon-pink/80 transition-colors hover:bg-surface-hover hover:text-neon-pink"
        >
          Mock Test
        </Link>
        <Link
          href="/dashboard"
          className="rounded-md border border-border/50 bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="/parent"
          className="hidden rounded-md border border-neon-green/30 bg-surface px-3 py-1.5 font-mono text-xs text-neon-green/80 transition-colors hover:bg-surface-hover hover:text-neon-green sm:block"
        >
          Parent
        </Link>
        <div className="flex items-center gap-1.5 rounded-md border border-border/50 bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground">
          <span className="text-neon-amber text-glow-amber">&#x1F525;</span>
          <span className="tabular-nums">{streak}</span>
          <span className="hidden sm:inline">streak</span>
        </div>
      </div>
    </nav>
  );
}
