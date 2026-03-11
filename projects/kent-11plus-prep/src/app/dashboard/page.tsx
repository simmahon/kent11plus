"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { PRACTICE_MODES } from "@/lib/modes";
import { useUser } from "@/contexts/user-context";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getDashboardStats,
  getModeStats,
  getWeeklyActivity,
  getAccuracyTrend,
  getRecentSessions,
  getLast30DaysActivity,
  type DashboardStats,
  type ModeStats,
  type DailyActivity,
  type WeeklyAccuracy,
  type SessionRecord,
  type DayActivity,
} from "@/lib/supabase/sessions";

const NEON_CYAN = "oklch(0.78 0.18 195)";
const NEON_GREEN = "oklch(0.8 0.2 145)";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getModeConfig(modeId: string) {
  return PRACTICE_MODES.find((m) => m.id === modeId);
}

function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 80) return "text-neon-green";
  if (accuracy >= 60) return "text-neon-amber";
  return "text-neon-pink";
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function relativeDate(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

/* ------------------------------------------------------------------ */
/*  Custom tooltip for Recharts                                        */
/* ------------------------------------------------------------------ */

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2 font-mono text-xs shadow-lg">
      <p className="text-muted-foreground">{label}</p>
      <p className="font-bold text-neon-cyan">{payload[0].value}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const { currentUser } = useUser();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [modeStats, setModeStats] = useState<Record<string, ModeStats>>({});
  const [weeklyActivity, setWeeklyActivity] = useState<DailyActivity[]>([]);
  const [accuracyTrend, setAccuracyTrend] = useState<WeeklyAccuracy[]>([]);
  const [recentSessions, setRecentSessions] = useState<SessionRecord[]>([]);
  const [calendarData, setCalendarData] = useState<DayActivity[]>([]);
  const [loaded, setLoaded] = useState(false);

  const goalQuestions = currentUser?.daily_goal_questions ?? 20;

  useEffect(() => {
    const uid = currentUser?.id;
    setLoaded(false);
    Promise.all([
      getDashboardStats(uid),
      getModeStats(uid),
      getWeeklyActivity(uid),
      getAccuracyTrend(uid),
      getRecentSessions(5, uid),
      uid ? getLast30DaysActivity(uid) : Promise.resolve([]),
    ]).then(([s, ms, wa, at, rs, cal]) => {
      setStats(s);
      setModeStats(ms);
      setWeeklyActivity(wa);
      setAccuracyTrend(at);
      setRecentSessions(rs);
      setCalendarData(cal);
      setLoaded(true);
    });
  }, [currentUser]);

  const totalQuestions = stats?.totalQuestions ?? 0;
  const totalSessions = stats?.totalSessions ?? 0;
  const overallAccuracy = stats?.overallAccuracy ?? 0;
  const currentStreak = stats?.currentStreak ?? 0;

  if (!loaded) {
    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <div className="relative size-16">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-neon-cyan" />
        </div>
        <p className="font-mono text-sm text-muted-foreground animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 py-4">
      {/* ---- Header ---- */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-2xl font-bold tracking-widest text-neon-cyan text-glow-cyan sm:text-3xl">
            {currentUser ? `${currentUser.name.toUpperCase()}'S DASHBOARD` : "DASHBOARD"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track progress and identify areas for improvement
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/parent"
            className="rounded-lg border border-neon-green/30 bg-surface px-4 py-2 font-mono text-xs text-neon-green/80 transition-colors hover:bg-surface-hover hover:text-neon-green"
          >
            Parent View
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-border/50 bg-surface px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            Practice
          </Link>
        </div>
      </div>

      {/* ---- Overview stat cards ---- */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Sessions"
          value={totalSessions}
          icon={"\uD83C\uDFAE"}
          colorClass="text-neon-cyan"
        />
        <StatCard
          label="Questions"
          value={totalQuestions}
          icon={"\u2705"}
          colorClass="text-neon-green"
        />
        <StatCard
          label="Accuracy"
          value={`${overallAccuracy}%`}
          icon={"\uD83C\uDFAF"}
          colorClass="text-neon-amber"
        />
        <StatCard
          label="Streak"
          value={`${currentStreak}d`}
          icon={"\uD83D\uDD25"}
          colorClass="text-neon-pink"
        />
      </div>

      {/* ---- Streak Calendar (last 30 days) ---- */}
      {currentUser && calendarData.length > 0 && (
        <StreakCalendar data={calendarData} goalQuestions={goalQuestions} streak={currentStreak} />
      )}

      {/* ---- Charts ---- */}
      {(weeklyActivity.some((d) => d.questions > 0) ||
        accuracyTrend.length > 0) && (
        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="mb-4 bg-surface">
            <TabsTrigger
              value="activity"
              className="font-mono text-xs data-[state=active]:text-neon-cyan"
            >
              Activity
            </TabsTrigger>
            <TabsTrigger
              value="accuracy"
              className="font-mono text-xs data-[state=active]:text-neon-cyan"
            >
              Accuracy Trend
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activity">
            <Card className="border-border bg-surface">
              <CardContent className="pt-6">
                <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Questions This Week
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyActivity}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="oklch(0.25 0.03 280 / 0.4)"
                      />
                      <XAxis
                        dataKey="day"
                        tick={{ fill: "oklch(0.6 0.02 270)", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "oklch(0.6 0.02 270)", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar
                        dataKey="questions"
                        fill={NEON_CYAN}
                        radius={[4, 4, 0, 0]}
                        maxBarSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accuracy">
            <Card className="border-border bg-surface">
              <CardContent className="pt-6">
                <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Accuracy Over Time
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={accuracyTrend}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="oklch(0.25 0.03 280 / 0.4)"
                      />
                      <XAxis
                        dataKey="week"
                        tick={{ fill: "oklch(0.6 0.02 270)", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[40, 100]}
                        tick={{ fill: "oklch(0.6 0.02 270)", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<ChartTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        stroke={NEON_GREEN}
                        strokeWidth={2}
                        dot={{ fill: NEON_GREEN, r: 4 }}
                        activeDot={{ r: 6, fill: NEON_GREEN }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* ---- Per-mode breakdown ---- */}
      {Object.keys(modeStats).length > 0 && (
        <Card className="border-border bg-surface">
          <CardContent className="pt-6">
            <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Performance by Mode
            </h3>
            <div className="flex flex-col gap-4">
              {PRACTICE_MODES.filter((m) => m.id !== "random-mix").map(
                (mode) => {
                  const ms = modeStats[mode.id];
                  if (!ms) return null;

                  return (
                    <div key={mode.id} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{mode.icon}</span>
                          <span
                            className={`font-mono text-sm font-bold ${mode.colorClass}`}
                          >
                            {mode.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-muted-foreground">
                            {ms.completed} sessions
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            avg {formatTime(ms.avgTimeSeconds)}
                          </span>
                          <span
                            className={`font-mono text-sm font-bold ${getAccuracyColor(ms.accuracy)}`}
                          >
                            {ms.accuracy}%
                          </span>
                        </div>
                      </div>
                      <Progress value={ms.accuracy} className="h-2 bg-muted" />
                    </div>
                  );
                },
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ---- Recent sessions ---- */}
      {recentSessions.length > 0 && (
        <Card className="border-border bg-surface">
          <CardContent className="pt-6">
            <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Recent Sessions
            </h3>
            <div className="flex flex-col divide-y divide-border/40">
              {recentSessions.map((session) => {
                const modeConfig = getModeConfig(session.mode);
                const pct = Math.round(
                  (session.score / session.total) * 100,
                );

                return (
                  <div
                    key={session.id}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{modeConfig?.icon}</span>
                      <div className="flex flex-col">
                        <span
                          className={`font-mono text-sm font-bold ${modeConfig?.colorClass}`}
                        >
                          {modeConfig?.label ?? session.mode}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {relativeDate(session.completed_at)}
                          {session.time_taken_seconds != null &&
                            ` \u00b7 ${formatTime(session.time_taken_seconds)}`}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-lg font-bold ${getAccuracyColor(pct)}`}
                      >
                        {session.score}/{session.total}
                      </span>
                      <Badge
                        variant="outline"
                        className={`border-border/60 font-mono text-[10px] ${getAccuracyColor(pct)}`}
                      >
                        {pct}%
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ---- Empty state ---- */}
      {totalSessions === 0 && (
        <Card className="border-border bg-surface">
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <span className="text-4xl">&#x1F680;</span>
            <p className="font-mono text-sm text-muted-foreground text-center">
              No sessions yet! Complete a practice session to see your stats
              here.
            </p>
            <Link
              href="/"
              className="rounded-lg bg-neon-cyan px-6 py-2 font-mono text-xs font-bold uppercase tracking-wider text-background hover:bg-neon-cyan/90"
            >
              Start Practising
            </Link>
          </CardContent>
        </Card>
      )}

      {/* ---- Kent Test readiness indicator ---- */}
      {totalSessions > 0 && (
        <Card className="border-border bg-surface">
          <CardContent className="pt-6">
            <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Test Readiness
            </h3>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="relative flex size-32 items-center justify-center">
                <svg className="size-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="oklch(0.18 0.015 270)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke={NEON_CYAN}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(overallAccuracy / 100) * 327} 327`}
                  />
                </svg>
                <span className="absolute font-mono text-2xl font-bold text-neon-cyan text-glow-cyan">
                  {overallAccuracy}%
                </span>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Kent pass threshold is ~78%. Keep practising to build confidence
                across all areas.
              </p>
              <div className="flex gap-3 font-mono text-xs">
                <span className="text-neon-green">80%+ Confident</span>
                <span className="text-neon-amber">60-79% Building</span>
                <span className="text-neon-pink">&lt;60% Focus area</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getActivityLevel(
  questions: number,
  goal: number,
): "none" | "low" | "medium" | "goal" {
  if (questions === 0) return "none";
  if (questions >= goal) return "goal";
  if (questions >= goal * 0.5) return "medium";
  return "low";
}

const ACTIVITY_STYLES: Record<string, string> = {
  none: "bg-muted/30 border-transparent",
  low: "bg-neon-amber/20 border-neon-amber/30",
  medium: "bg-neon-amber/40 border-neon-amber/50",
  goal: "bg-neon-green/40 border-neon-green/50",
};

const ACTIVITY_GLOW: Record<string, string> = {
  none: "",
  low: "",
  medium: "",
  goal: "shadow-[0_0_6px_oklch(0.8_0.2_145_/_0.3)]",
};

function StreakCalendar({
  data,
  goalQuestions,
  streak,
}: {
  data: DayActivity[];
  goalQuestions: number;
  streak: number;
}) {
  // Build a grid: we need to pad the start so the first day lands on the correct
  // weekday column. JS Date.getDay() returns 0=Sun. We want Mon=0 ... Sun=6.
  const firstDate = new Date(data[0].date + "T12:00:00");
  const jsDay = firstDate.getDay();          // 0=Sun
  const mondayIdx = jsDay === 0 ? 6 : jsDay - 1; // convert to Mon=0

  // Count goal-met days
  const goalMetDays = data.filter((d) => d.questions >= goalQuestions).length;

  // Pad front with nulls for alignment, then the actual day cells
  const cells: (DayActivity | null)[] = [
    ...Array.from({ length: mondayIdx }, () => null),
    ...data,
  ];

  return (
    <Card className="border-border bg-surface">
      <CardContent className="pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            30-Day Streak Calendar
          </h3>
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="inline-block size-2.5 rounded-sm bg-neon-green/40 border border-neon-green/50" />
              Goal met
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block size-2.5 rounded-sm bg-neon-amber/40 border border-neon-amber/50" />
              Some
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block size-2.5 rounded-sm bg-muted/30" />
              None
            </span>
          </div>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 gap-1.5 mb-1.5">
          {DAY_LABELS.map((d) => (
            <div
              key={d}
              className="text-center font-mono text-[9px] text-muted-foreground/60"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((cell, i) => {
            if (!cell) {
              return <div key={`empty-${i}`} className="aspect-square" />;
            }
            const level = getActivityLevel(cell.questions, goalQuestions);
            const dayNum = new Date(cell.date + "T12:00:00").getDate();
            const isToday =
              cell.date ===
              new Date().toISOString().slice(0, 10);

            return (
              <div
                key={cell.date}
                className={[
                  "relative flex aspect-square items-center justify-center rounded-md border transition-all duration-200",
                  ACTIVITY_STYLES[level],
                  ACTIVITY_GLOW[level],
                  isToday ? "ring-1 ring-neon-cyan/60" : "",
                ].join(" ")}
                title={`${cell.date}: ${cell.questions}Q, ${cell.minutes}min`}
              >
                <span
                  className={[
                    "font-mono text-[10px] tabular-nums",
                    level === "goal"
                      ? "font-bold text-neon-green"
                      : level !== "none"
                        ? "text-neon-amber/80"
                        : "text-muted-foreground/40",
                  ].join(" ")}
                >
                  {dayNum}
                </span>
              </div>
            );
          })}
        </div>

        {/* Summary row */}
        <div className="mt-4 flex items-center justify-center gap-4 border-t border-border/30 pt-3">
          <div className="flex items-center gap-1.5">
            <span className="text-sm" role="img" aria-label="fire">&#x1F525;</span>
            <span className="font-mono text-xs text-muted-foreground">
              <span className="font-bold text-neon-amber">{streak}</span> day streak
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm" role="img" aria-label="check">&#x2705;</span>
            <span className="font-mono text-xs text-muted-foreground">
              <span className="font-bold text-neon-green">{goalMetDays}</span>/30 goals met
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({
  label,
  value,
  icon,
  colorClass,
}: {
  label: string;
  value: string | number;
  icon: string;
  colorClass: string;
}) {
  return (
    <Card className="border-border bg-surface">
      <CardContent className="flex flex-col items-center gap-1 px-3 py-4">
        <span className="text-2xl" role="img" aria-hidden="true">
          {icon}
        </span>
        <span className={`font-mono text-2xl font-bold ${colorClass}`}>
          {value}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </CardContent>
    </Card>
  );
}
