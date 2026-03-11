"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { PRACTICE_MODES } from "@/lib/modes";
import type { PracticeMode } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user-context";
import { getCurrentStreak, getDashboardStats, getDailyProgress, hasCompletedBaseline, type DailyProgress } from "@/lib/supabase/sessions";

/** Static mapping so Tailwind can detect these classes at build time. */
const GLOW_HOVER_CLASS: Record<string, string> = {
  "glow-cyan": "group-hover:glow-cyan",
  "glow-purple": "group-hover:glow-purple",
  "glow-green": "group-hover:glow-green",
  "glow-amber": "group-hover:glow-amber",
  "glow-pink": "group-hover:glow-pink",
};

const TRICKY_TOPICS = [
  {
    label: "Spatial Reasoning",
    icon: "\uD83E\uDDE9",
    description: "Cube nets, hidden shapes, and reflections. One of the hardest sections on Paper 2.",
    href: "/practice/spatial-reasoning",
    tag: "Most kids struggle",
  },
  {
    label: "Fractions",
    icon: "\uD83E\uDD67",
    description: "Mixed numbers, fraction of amounts, and multi-step fraction word problems.",
    href: "/practice/maths",
    tag: "Biggest mark loser",
  },
  {
    label: "Letter Codes",
    icon: "\uD83D\uDD10",
    description: "Decode words using complex substitution cyphers and code patterns.",
    href: "/practice/verbal-reasoning",
    tag: "High difficulty",
  },
  {
    label: "Inference",
    icon: "\uD83D\uDD0D",
    description: "Read between the lines. The hardest comprehension questions require inference.",
    href: "/practice/english",
    tag: "Reading skill",
  },
  {
    label: "Ratios",
    icon: "\u2696\uFE0F",
    description: "Sharing in ratios, ratio change problems, and simplifying complex ratios.",
    href: "/practice/maths",
    tag: "Common in Kent Test",
  },
  {
    label: "Shape Sequences",
    icon: "\uD83D\uDD2E",
    description: "Multi-rule patterns where shape, fill, rotation, and size all change together.",
    href: "/practice/non-verbal-reasoning",
    tag: "Pattern spotting",
  },
];

/* ------------------------------------------------------------------ */
/*  Daily goal helpers                                                  */
/* ------------------------------------------------------------------ */

function getEncouragingText(questionsPct: number, minutesPct: number): string {
  const avg = (questionsPct + minutesPct) / 2;
  if (avg >= 100) return "Goal smashed! You're a star!";
  if (avg >= 75) return "Almost there! Keep going!";
  if (avg >= 50) return "Great momentum! Half way done!";
  if (avg >= 25) return "Good start! Keep it up!";
  return "Let's get started today!";
}

function getEncouragingColor(questionsPct: number, minutesPct: number): string {
  const avg = (questionsPct + minutesPct) / 2;
  if (avg >= 100) return "text-neon-green";
  if (avg >= 50) return "text-neon-cyan";
  return "text-neon-amber";
}

function DailyGoalRing({
  current,
  goal,
  label,
  unit,
  strokeColor,
  glowClass,
}: {
  current: number;
  goal: number;
  label: string;
  unit: string;
  strokeColor: string;
  glowClass: string;
}) {
  const pct = goal > 0 ? Math.min(current / goal, 1) : 0;
  const circumference = 2 * Math.PI * 42;
  const filled = pct * circumference;
  const isComplete = current >= goal;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex size-28 items-center justify-center sm:size-32">
        <svg className="size-full -rotate-90" viewBox="0 0 100 100">
          {/* Background track */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="oklch(0.18 0.015 270)"
            strokeWidth="6"
          />
          {/* Progress arc */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${circumference}`}
            className="transition-all duration-700 ease-out"
            style={{
              filter: isComplete ? `drop-shadow(0 0 6px ${strokeColor})` : undefined,
            }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`font-mono text-xl font-bold tabular-nums ${glowClass}`}>
            {current}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            / {goal}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
          {label}
        </span>
        <span className="text-[10px] text-muted-foreground/60">
          {unit}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const router = useRouter();
  const { currentUser } = useUser();
  const [streak, setStreak] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [baselineDone, setBaselineDone] = useState<boolean | null>(null);
  const [dailyProgress, setDailyProgress] = useState<DailyProgress | null>(null);

  const goalQuestions = currentUser?.daily_goal_questions ?? 20;
  const goalMinutes = currentUser?.daily_goal_minutes ?? 15;

  useEffect(() => {
    const uid = currentUser?.id;
    getCurrentStreak(uid).then(setStreak);
    getDashboardStats(uid).then((s) => setTotalAnswered(s.totalQuestions));
    if (uid) {
      hasCompletedBaseline(uid).then(setBaselineDone);
      getDailyProgress(uid).then(setDailyProgress);
    } else {
      setBaselineDone(null);
      setDailyProgress(null);
    }
  }, [currentUser]);

  function handleSelect(mode: PracticeMode) {
    router.push(`/practice/${mode}`);
  }

  return (
    <div className="flex flex-col items-center gap-10 py-4">
      {/* ---- Header ---- */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-mono text-4xl font-bold tracking-widest text-neon-cyan text-glow-cyan sm:text-5xl">
          SELECT MODE
        </h1>
        <p className="text-sm text-muted-foreground">
          Choose your training program
        </p>
      </div>

      {/* ---- Daily Goal Progress ---- */}
      {currentUser && dailyProgress && (
        <Card className="w-full border-border/50 bg-gradient-to-br from-neon-cyan/[0.03] via-transparent to-neon-green/[0.03]">
          <CardContent className="flex flex-col items-center gap-4 px-4 py-5 sm:px-6">
            {/* Section heading */}
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Today&apos;s Goals
            </h2>

            {/* Ring indicators + streak */}
            <div className="flex items-center gap-6 sm:gap-10">
              <DailyGoalRing
                current={dailyProgress.questionsToday}
                goal={goalQuestions}
                label="Questions"
                unit="completed"
                strokeColor="oklch(0.78 0.18 195)"
                glowClass="text-neon-cyan text-glow-cyan"
              />

              {/* Streak in the center */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-3xl" role="img" aria-label="fire">
                  &#x1F525;
                </span>
                <span className="font-mono text-2xl font-bold tabular-nums text-neon-amber text-glow-amber">
                  {streak}
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Day Streak
                </span>
              </div>

              <DailyGoalRing
                current={dailyProgress.minutesToday}
                goal={goalMinutes}
                label="Minutes"
                unit="practised"
                strokeColor="oklch(0.8 0.2 145)"
                glowClass="text-neon-green text-glow-green"
              />
            </div>

            {/* Encouraging text */}
            <p
              className={`font-mono text-sm font-bold ${getEncouragingColor(
                goalQuestions > 0 ? (dailyProgress.questionsToday / goalQuestions) * 100 : 0,
                goalMinutes > 0 ? (dailyProgress.minutesToday / goalMinutes) * 100 : 0,
              )}`}
            >
              {getEncouragingText(
                goalQuestions > 0 ? (dailyProgress.questionsToday / goalQuestions) * 100 : 0,
                goalMinutes > 0 ? (dailyProgress.minutesToday / goalMinutes) * 100 : 0,
              )}
            </p>
          </CardContent>
        </Card>
      )}

      {/* ---- Baseline CTA ---- */}
      {baselineDone === false && (
        <Card className="w-full border-neon-cyan/30 bg-gradient-to-r from-neon-cyan/5 via-neon-purple/5 to-neon-pink/5">
          <CardContent className="flex flex-col items-center gap-3 px-6 py-5 sm:flex-row sm:justify-between">
            <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
              <span className="font-mono text-sm font-bold text-neon-cyan text-glow-cyan">
                {"\uD83C\uDFAF"} Take your Baseline Test
              </span>
              <span className="text-xs text-muted-foreground">
                Find your starting level across all subjects so we can adapt
                questions to you.
              </span>
            </div>
            <Button
              className="shrink-0 bg-neon-cyan font-mono text-xs font-bold uppercase tracking-wider text-background hover:bg-neon-cyan/90"
              onClick={() => router.push("/baseline")}
            >
              Start Baseline
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ---- Mode grid ---- */}
      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
        {PRACTICE_MODES.map((mode) => {
          const isRandom = mode.id === "random-mix";

          return (
            <button
              key={mode.id}
              onClick={() => handleSelect(mode.id)}
              className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
            >
              <Card
                className={[
                  "relative h-full cursor-pointer border-border bg-surface transition-all duration-300",
                  "hover:bg-surface-hover hover:border-border/80",
                  GLOW_HOVER_CLASS[mode.glowClass] ?? "",
                  isRandom
                    ? "border-2 border-transparent bg-gradient-to-br from-neon-cyan/10 via-neon-purple/10 to-neon-pink/10 ring-1 ring-neon-purple/30"
                    : "",
                ].join(" ")}
                style={
                  isRandom
                    ? {
                        backgroundClip: "padding-box",
                      }
                    : undefined
                }
              >
                {/* Gradient border overlay for Random Mix */}
                {isRandom && (
                  <div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.78 0.18 195), oklch(0.72 0.2 300), oklch(0.75 0.2 340))",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      padding: "1.5px",
                      borderRadius: "inherit",
                    }}
                  />
                )}

                <CardContent className="flex flex-col items-center gap-3 px-4 pb-4 pt-5 sm:items-start sm:px-5">
                  {/* Icon */}
                  <span
                    className="text-5xl leading-none transition-transform duration-300 group-hover:scale-110"
                    role="img"
                    aria-hidden="true"
                  >
                    {mode.icon}
                  </span>

                  {/* Label */}
                  <span
                    className={[
                      "font-mono text-sm font-bold tracking-wide",
                      mode.colorClass,
                    ].join(" ")}
                  >
                    {mode.label}
                  </span>

                  {/* Description */}
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    {mode.description}
                  </span>

                  {/* Badges */}
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                    <Badge
                      variant="outline"
                      className="border-border/60 font-mono text-[10px] text-muted-foreground"
                    >
                      {mode.questionCount} Qs
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-border/60 font-mono text-[10px] text-muted-foreground"
                    >
                      {Math.floor(mode.timeLimitSeconds / 60)} min
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>

      {/* ---- Tricky Topics section ---- */}
      <div className="flex w-full flex-col gap-4 border-t border-border/40 pt-8">
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-neon-amber text-glow-amber">
            Tricky Topics
          </h2>
          <p className="text-xs text-muted-foreground">
            The areas where most kids lose marks. Focus here for the biggest gains.
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
          {TRICKY_TOPICS.map((topic) => (
            <button
              key={topic.label}
              onClick={() => router.push(topic.href)}
              className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
            >
              <Card className="h-full cursor-pointer border-neon-amber/20 bg-surface transition-all duration-300 hover:bg-surface-hover hover:border-neon-amber/40">
                <CardContent className="flex flex-col gap-2 px-3 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" role="img" aria-hidden="true">
                      {topic.icon}
                    </span>
                    <span className="font-mono text-xs font-bold text-neon-amber">
                      {topic.label}
                    </span>
                  </div>
                  <span className="text-[11px] leading-relaxed text-muted-foreground">
                    {topic.description}
                  </span>
                  <Badge
                    variant="outline"
                    className="w-fit border-neon-amber/30 font-mono text-[9px] text-neon-amber/80"
                  >
                    {topic.tag}
                  </Badge>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      </div>

      {/* ---- Stats section ---- */}
      <div className="flex w-full flex-col items-center gap-3 border-t border-border/40 pt-8">
        <h2 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
          Stats
        </h2>

        <div className="flex items-center gap-6">
          {/* Streak */}
          <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-surface px-4 py-2">
            <span className="text-lg" role="img" aria-label="fire">
              &#x1F525;
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-lg font-bold tabular-nums text-neon-amber text-glow-amber">
                {streak}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                day streak
              </span>
            </div>
          </div>

          {/* Total questions */}
          <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-surface px-4 py-2">
            <span className="text-lg" role="img" aria-label="check mark">
              &#x2705;
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-lg font-bold tabular-nums text-neon-green text-glow-green">
                {totalAnswered}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                answered
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
