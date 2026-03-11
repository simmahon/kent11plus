"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PRACTICE_MODES } from "@/lib/modes";
import { useUser } from "@/contexts/user-context";
import type { AppUser } from "@/lib/supabase/users";
import {
  getDashboardStats,
  getModeStats,
  getBaselineAccuracy,
  getMockTestSessions,
  type DashboardStats,
  type ModeStats,
  type SessionRecord,
} from "@/lib/supabase/sessions";
import {
  getAllSkillLevels,
  type SkillLevelRecord,
} from "@/lib/supabase/skill-levels";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

/** Subjects shown in comparisons (excludes cube-nets, random-mix). */
const COMPARE_MODES = PRACTICE_MODES.filter(
  (m) => !["cube-nets", "random-mix"].includes(m.id),
);

/** oklch colours for chart bars, keyed by mode. */
const MODE_BAR_COLORS: Record<string, string> = {
  "verbal-reasoning": "oklch(0.78 0.18 195)",
  maths: "oklch(0.75 0.18 145)",
  english: "oklch(0.78 0.15 75)",
  comprehension: "oklch(0.75 0.18 340)",
  "non-verbal-reasoning": "oklch(0.72 0.2 300)",
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface KidData {
  user: AppUser;
  stats: DashboardStats;
  modeStats: Record<string, ModeStats>;
  skillLevels: SkillLevelRecord[];
  baselineAccuracy: Record<string, number>;
  mockTests: SessionRecord[];
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getModeColor(mode: string): string {
  return (
    PRACTICE_MODES.find((m) => m.id === mode)?.colorClass ??
    "text-muted-foreground"
  );
}

function skillColor(level: number): string {
  if (level >= 4.0) return "text-neon-green";
  if (level >= 3.0) return "text-neon-amber";
  return "text-neon-pink";
}

function skillBg(level: number): string {
  if (level >= 4.0) return "bg-neon-green/15";
  if (level >= 3.0) return "bg-neon-amber/15";
  return "bg-neon-pink/15";
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Group skill-level records by mode. */
function groupByMode(
  records: SkillLevelRecord[],
): Record<string, SkillLevelRecord[]> {
  const grouped: Record<string, SkillLevelRecord[]> = {};
  for (const r of records) {
    (grouped[r.mode] ??= []).push(r);
  }
  return grouped;
}

/** Average skill level for a mode from skill records. */
function modeAvgSkill(records: SkillLevelRecord[], mode: string): number {
  const modeRecords = records.filter((r) => r.mode === mode);
  if (modeRecords.length === 0) return 3.0;
  return (
    Math.round(
      (modeRecords.reduce((s, r) => s + r.skill_level, 0) /
        modeRecords.length) *
        10,
    ) / 10
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ParentDashboard() {
  const router = useRouter();
  const { users, loading: usersLoading } = useUser();
  const [kidsData, setKidsData] = useState<KidData[]>([]);
  const [loading, setLoading] = useState(true);

  const kids = users.filter((u) => !u.is_test);

  /* ---- Load data for all kids ---- */
  useEffect(() => {
    if (usersLoading || kids.length === 0) return;
    setLoading(true);

    Promise.all(
      kids.map(async (user) => {
        const [stats, modeStats, skillLevels, baselineAccuracy, mockTests] =
          await Promise.all([
            getDashboardStats(user.id),
            getModeStats(user.id),
            getAllSkillLevels(user.id),
            getBaselineAccuracy(user.id),
            getMockTestSessions(user.id),
          ]);
        return { user, stats, modeStats, skillLevels, baselineAccuracy, mockTests };
      }),
    ).then((data) => {
      setKidsData(data);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersLoading, users]);

  /* ---- Loading ---- */
  if (usersLoading || loading) {
    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <div className="relative size-16">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-neon-cyan" />
        </div>
        <p className="animate-pulse font-mono text-sm text-muted-foreground">
          Loading parent dashboard...
        </p>
      </div>
    );
  }

  if (kids.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <span className="text-5xl">{"\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC66"}</span>
        <p className="font-mono text-lg text-neon-amber text-glow-amber">
          No children found
        </p>
        <p className="text-sm text-muted-foreground">
          Add users in Supabase to see them here.
        </p>
        <Button variant="outline" onClick={() => router.push("/")}>
          Back to Home
        </Button>
      </div>
    );
  }

  /* ---- Collect all unique topics across all kids for heatmap ---- */
  const allTopicsByMode: Record<string, string[]> = {};
  for (const kd of kidsData) {
    const grouped = groupByMode(kd.skillLevels);
    for (const [mode, records] of Object.entries(grouped)) {
      if (!allTopicsByMode[mode]) allTopicsByMode[mode] = [];
      for (const r of records) {
        if (!allTopicsByMode[mode].includes(r.topic)) {
          allTopicsByMode[mode].push(r.topic);
        }
      }
    }
  }

  return (
    <div className="flex flex-col gap-8 py-4">
      {/* ---- Header ---- */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-2xl font-bold tracking-widest text-neon-cyan text-glow-cyan sm:text-3xl">
            PARENT DASHBOARD
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Compare progress and identify focus areas
          </p>
        </div>
        <Button
          variant="outline"
          className="font-mono text-xs"
          onClick={() => router.push("/dashboard")}
        >
          Kid Dashboard
        </Button>
      </div>

      {/* ---- Kid avatars ---- */}
      <div className="flex items-center gap-4">
        {kidsData.map((kd) => (
          <div
            key={kd.user.id}
            className="flex items-center gap-2 rounded-lg border border-border/50 bg-surface px-4 py-2"
          >
            <span className="text-2xl">{kd.user.avatar_emoji}</span>
            <span className="font-mono text-sm font-bold text-foreground">
              {kd.user.name}
            </span>
          </div>
        ))}
      </div>

      {/* ================================================================ */}
      {/*  Overview comparison                                             */}
      {/* ================================================================ */}
      <Card className="border-border bg-surface">
        <CardContent className="pt-6">
          <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Overview
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="pb-2 font-mono text-xs text-muted-foreground" />
                  {kidsData.map((kd) => (
                    <th
                      key={kd.user.id}
                      className="pb-2 text-center font-mono text-xs font-bold text-foreground"
                    >
                      {kd.user.avatar_emoji} {kd.user.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                <OverviewRow label="Sessions" kidsData={kidsData} getValue={(kd) => kd.stats.totalSessions} />
                <OverviewRow label="Questions" kidsData={kidsData} getValue={(kd) => kd.stats.totalQuestions} />
                <OverviewRow
                  label="Accuracy"
                  kidsData={kidsData}
                  getValue={(kd) => `${kd.stats.overallAccuracy}%`}
                  getColor={(kd) =>
                    kd.stats.overallAccuracy >= 80
                      ? "text-neon-green"
                      : kd.stats.overallAccuracy >= 60
                        ? "text-neon-amber"
                        : "text-neon-pink"
                  }
                />
                <OverviewRow label="Streak" kidsData={kidsData} getValue={(kd) => `${kd.stats.currentStreak}d`} />
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================ */}
      {/*  Subject skill levels (baseline vs current)                      */}
      {/* ================================================================ */}
      <Card className="border-border bg-surface">
        <CardContent className="pt-6">
          <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Subject Levels (Baseline {"\u2192"} Current)
          </h3>
          <div className="flex flex-col gap-6">
            {COMPARE_MODES.map((mode) => (
              <div key={mode.id} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{mode.icon}</span>
                  <span
                    className={`font-mono text-sm font-bold ${mode.colorClass}`}
                  >
                    {mode.label}
                  </span>
                </div>

                {kidsData.map((kd) => {
                  const currentAccuracy =
                    kd.modeStats[mode.id]?.accuracy ?? null;
                  const baselineAccuracy =
                    kd.baselineAccuracy[mode.id] ?? null;
                  const currentSkill = modeAvgSkill(
                    kd.skillLevels,
                    mode.id,
                  );
                  const hasData =
                    currentAccuracy !== null || baselineAccuracy !== null;

                  return (
                    <div
                      key={kd.user.id}
                      className="flex items-center gap-3 pl-8"
                    >
                      <span className="w-16 shrink-0 font-mono text-xs text-muted-foreground">
                        {kd.user.name}
                      </span>

                      {!hasData ? (
                        <span className="text-xs text-muted-foreground/50">
                          No data yet
                        </span>
                      ) : (
                        <>
                          {/* Baseline badge */}
                          {baselineAccuracy !== null && (
                            <Badge
                              variant="outline"
                              className="border-border/60 font-mono text-[10px] text-muted-foreground"
                            >
                              Baseline {baselineAccuracy}%
                            </Badge>
                          )}

                          {/* Arrow */}
                          {baselineAccuracy !== null &&
                            currentAccuracy !== null && (
                              <span className="text-xs text-muted-foreground">
                                {"\u2192"}
                              </span>
                            )}

                          {/* Current accuracy */}
                          {currentAccuracy !== null && (
                            <Badge
                              variant="outline"
                              className={`font-mono text-[10px] ${
                                currentAccuracy >= 80
                                  ? "border-neon-green/40 text-neon-green"
                                  : currentAccuracy >= 60
                                    ? "border-neon-amber/40 text-neon-amber"
                                    : "border-neon-pink/40 text-neon-pink"
                              }`}
                            >
                              Now {currentAccuracy}%
                            </Badge>
                          )}

                          {/* Growth indicator */}
                          {baselineAccuracy !== null &&
                            currentAccuracy !== null && (
                              <span
                                className={`font-mono text-[10px] font-bold ${
                                  currentAccuracy > baselineAccuracy
                                    ? "text-neon-green"
                                    : currentAccuracy < baselineAccuracy
                                      ? "text-neon-pink"
                                      : "text-muted-foreground"
                                }`}
                              >
                                {currentAccuracy > baselineAccuracy
                                  ? `+${currentAccuracy - baselineAccuracy}%`
                                  : currentAccuracy < baselineAccuracy
                                    ? `${currentAccuracy - baselineAccuracy}%`
                                    : "="}
                              </span>
                            )}

                          {/* Skill level */}
                          <span
                            className={`ml-auto font-mono text-xs font-bold ${skillColor(currentSkill)}`}
                          >
                            Lvl {currentSkill.toFixed(1)}
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ================================================================ */}
      {/*  Topic heatmap                                                   */}
      {/* ================================================================ */}
      {Object.keys(allTopicsByMode).length > 0 && (
        <Card className="border-border bg-surface">
          <CardContent className="pt-6">
            <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Topic Heatmap
            </h3>
            <div className="flex flex-col gap-6">
              {COMPARE_MODES.map((mode) => {
                const topics = allTopicsByMode[mode.id];
                if (!topics || topics.length === 0) return null;

                return (
                  <div key={mode.id} className="flex flex-col gap-2">
                    <span
                      className={`font-mono text-xs font-bold ${mode.colorClass}`}
                    >
                      {mode.icon} {mode.label}
                    </span>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-border/30">
                            <th className="pb-1.5 pr-4 font-mono text-[10px] text-muted-foreground">
                              Topic
                            </th>
                            {kidsData.map((kd) => (
                              <th
                                key={kd.user.id}
                                className="pb-1.5 text-center font-mono text-[10px] text-muted-foreground"
                              >
                                {kd.user.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {topics.map((topic) => (
                            <tr
                              key={topic}
                              className="border-b border-border/10"
                            >
                              <td className="py-1.5 pr-4 text-xs text-muted-foreground">
                                {capitalize(topic)}
                              </td>
                              {kidsData.map((kd) => {
                                const record = kd.skillLevels.find(
                                  (r) =>
                                    r.mode === mode.id &&
                                    r.topic === topic,
                                );
                                const level = record?.skill_level ?? null;
                                return (
                                  <td
                                    key={kd.user.id}
                                    className="py-1.5 text-center"
                                  >
                                    {level !== null ? (
                                      <span
                                        className={`inline-block rounded px-2 py-0.5 font-mono text-[10px] font-bold ${skillColor(level)} ${skillBg(level)}`}
                                      >
                                        {level.toFixed(1)}
                                      </span>
                                    ) : (
                                      <span className="text-[10px] text-muted-foreground/30">
                                        {"\u2014"}
                                      </span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center gap-4 border-t border-border/30 pt-3">
              <span className="text-[10px] text-muted-foreground">
                Key:
              </span>
              <span className="rounded bg-neon-green/15 px-2 py-0.5 font-mono text-[10px] font-bold text-neon-green">
                4.0+ Strong
              </span>
              <span className="rounded bg-neon-amber/15 px-2 py-0.5 font-mono text-[10px] font-bold text-neon-amber">
                3.0-3.9 Building
              </span>
              <span className="rounded bg-neon-pink/15 px-2 py-0.5 font-mono text-[10px] font-bold text-neon-pink">
                &lt;3.0 Focus
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ================================================================ */}
      {/*  Mock test history                                               */}
      {/* ================================================================ */}
      {kidsData.some((kd) => kd.mockTests.length > 0) && (
        <Card className="border-border bg-surface">
          <CardContent className="pt-6">
            <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Mock Test History
            </h3>
            <div className="flex flex-col gap-4">
              {kidsData.map((kd) => {
                if (kd.mockTests.length === 0) return null;
                return (
                  <div key={kd.user.id} className="flex flex-col gap-2">
                    <span className="font-mono text-xs font-bold text-foreground">
                      {kd.user.avatar_emoji} {kd.user.name}
                    </span>
                    <div className="flex flex-col gap-1.5 pl-6">
                      {kd.mockTests.slice(0, 5).map((mt) => {
                        const pct = Math.round(
                          (mt.score / mt.total) * 100,
                        );
                        const kentScore = Math.round(
                          230 + (mt.score / mt.total) * 193,
                        );
                        const passed = kentScore >= 332;
                        const date = new Date(
                          mt.completed_at,
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        });

                        return (
                          <div
                            key={mt.id}
                            className="flex items-center justify-between"
                          >
                            <span className="text-xs text-muted-foreground">
                              {date}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-muted-foreground">
                                {mt.score}/{mt.total} ({pct}%)
                              </span>
                              <Badge
                                variant="outline"
                                className={`font-mono text-[10px] ${
                                  passed
                                    ? "border-neon-green/40 text-neon-green"
                                    : "border-neon-amber/40 text-neon-amber"
                                }`}
                              >
                                {kentScore}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ================================================================ */}
      {/*  Recommendations                                                */}
      {/* ================================================================ */}
      <Card className="border-neon-cyan/20 bg-neon-cyan/5">
        <CardContent className="pt-6">
          <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Focus Recommendations
          </h3>
          <div className="flex flex-col gap-3">
            {kidsData.map((kd) => {
              // Find weakest subject
              let weakestMode = "";
              let weakestSkill = 5.0;
              for (const mode of COMPARE_MODES) {
                const avg = modeAvgSkill(kd.skillLevels, mode.id);
                if (avg < weakestSkill && kd.modeStats[mode.id]) {
                  weakestSkill = avg;
                  weakestMode = mode.id;
                }
              }

              const weakLabel =
                PRACTICE_MODES.find((m) => m.id === weakestMode)?.label ??
                "all subjects";
              const hasData = Object.keys(kd.modeStats).length > 0;

              return (
                <div key={kd.user.id} className="flex items-start gap-2">
                  <span className="text-lg">{kd.user.avatar_emoji}</span>
                  <div>
                    <span className="font-mono text-sm font-bold text-foreground">
                      {kd.user.name}:
                    </span>{" "}
                    {hasData ? (
                      <span className="text-sm text-muted-foreground">
                        Focus on{" "}
                        <span
                          className={`font-bold ${getModeColor(weakestMode)}`}
                        >
                          {weakLabel}
                        </span>{" "}
                        (Lvl {weakestSkill.toFixed(1)}).{" "}
                        {kd.stats.currentStreak === 0
                          ? "Encourage daily practice to build a streak!"
                          : `${kd.stats.currentStreak}-day streak going!`}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No practice data yet. Start with the{" "}
                        <span className="font-bold text-neon-cyan">
                          Baseline Test
                        </span>
                        .
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function OverviewRow({
  label,
  kidsData,
  getValue,
  getColor,
}: {
  label: string;
  kidsData: KidData[];
  getValue: (kd: KidData) => string | number;
  getColor?: (kd: KidData) => string;
}) {
  return (
    <tr>
      <td className="py-2 font-mono text-xs text-muted-foreground">
        {label}
      </td>
      {kidsData.map((kd) => (
        <td
          key={kd.user.id}
          className={`py-2 text-center font-mono text-sm font-bold ${
            getColor ? getColor(kd) : "text-foreground"
          }`}
        >
          {getValue(kd)}
        </td>
      ))}
    </tr>
  );
}
