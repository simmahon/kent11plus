import { supabase } from "./client";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Format a Date as YYYY-MM-DD in the user's local timezone (not UTC). */
function toLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SessionRecord {
  id: string;
  mode: string;
  score: number;
  total: number;
  time_taken_seconds: number | null;
  difficulty: number;
  completed_at: string;
  user_id: string | null;
  topic: string | null;
  is_baseline: boolean;
  is_mock_test: boolean;
}

export interface DashboardStats {
  totalSessions: number;
  totalQuestions: number;
  overallAccuracy: number;
  currentStreak: number;
}

export interface ModeStats {
  accuracy: number;
  completed: number;
  avgTimeSeconds: number;
}

export interface DailyActivity {
  day: string;
  questions: number;
}

export interface WeeklyAccuracy {
  week: string;
  accuracy: number;
}

/* ------------------------------------------------------------------ */
/*  Save a completed session                                           */
/* ------------------------------------------------------------------ */

export async function saveSession(session: {
  mode: string;
  score: number;
  total: number;
  timeTakenSeconds: number | null;
  difficulty: number;
  userId?: string | null;
  topic?: string | null;
  isBaseline?: boolean;
  isMockTest?: boolean;
}): Promise<SessionRecord | null> {
  const { data, error } = await supabase
    .from("practice_sessions")
    .insert({
      mode: session.mode,
      score: session.score,
      total: session.total,
      time_taken_seconds: session.timeTakenSeconds,
      difficulty: session.difficulty,
      user_id: session.userId ?? null,
      topic: session.topic ?? null,
      is_baseline: session.isBaseline ?? false,
      is_mock_test: session.isMockTest ?? false,
    })
    .select()
    .single();

  if (error) {
    console.error("[saveSession] Error:", error.message);
    return null;
  }
  return data;
}

/* ------------------------------------------------------------------ */
/*  Get current day-streak                                             */
/* ------------------------------------------------------------------ */

export async function getCurrentStreak(userId?: string): Promise<number> {
  let query = supabase
    .from("practice_sessions")
    .select("completed_at")
    .order("completed_at", { ascending: false });

  if (userId) query = query.eq("user_id", userId);

  const { data, error } = await query;

  if (error || !data?.length) return 0;

  // Get unique dates (YYYY-MM-DD in local time) in descending order
  const uniqueDays = [
    ...new Set(
      data.map((s) => toLocalDateString(new Date(s.completed_at))),
    ),
  ].sort((a, b) => b.localeCompare(a));

  if (uniqueDays.length === 0) return 0;

  // Check if the most recent session is today or yesterday (local time)
  const today = toLocalDateString(new Date());
  const yesterday = toLocalDateString(new Date(Date.now() - 86400000));

  if (uniqueDays[0] !== today && uniqueDays[0] !== yesterday) return 0;

  // Count consecutive days backward
  let streak = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    const prev = new Date(uniqueDays[i - 1]);
    const curr = new Date(uniqueDays[i]);
    const diffMs = prev.getTime() - curr.getTime();
    if (diffMs <= 86400000 + 1000) {
      // Within ~1 day
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/* ------------------------------------------------------------------ */
/*  Dashboard overview stats                                           */
/* ------------------------------------------------------------------ */

export async function getDashboardStats(userId?: string): Promise<DashboardStats> {
  const [sessionsRes, streakVal] = await Promise.all([
    userId
      ? supabase.from("practice_sessions").select("score, total").eq("user_id", userId)
      : supabase.from("practice_sessions").select("score, total"),
    getCurrentStreak(userId),
  ]);

  const sessions = sessionsRes.data ?? [];
  const totalSessions = sessions.length;
  const totalQuestions = sessions.reduce((sum, s) => sum + s.total, 0);
  const totalCorrect = sessions.reduce((sum, s) => sum + s.score, 0);
  const overallAccuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return {
    totalSessions,
    totalQuestions,
    overallAccuracy,
    currentStreak: streakVal,
  };
}

/* ------------------------------------------------------------------ */
/*  Per-mode stats                                                     */
/* ------------------------------------------------------------------ */

export async function getModeStats(userId?: string): Promise<Record<string, ModeStats>> {
  let query = supabase
    .from("practice_sessions")
    .select("mode, score, total, time_taken_seconds");

  if (userId) query = query.eq("user_id", userId);

  const { data, error } = await query;

  if (error || !data?.length) return {};

  const grouped: Record<
    string,
    { scores: number; totals: number; times: number[]; count: number }
  > = {};

  for (const s of data) {
    if (!grouped[s.mode]) {
      grouped[s.mode] = { scores: 0, totals: 0, times: [], count: 0 };
    }
    grouped[s.mode].scores += s.score;
    grouped[s.mode].totals += s.total;
    grouped[s.mode].count++;
    if (s.time_taken_seconds != null) {
      grouped[s.mode].times.push(s.time_taken_seconds);
    }
  }

  const result: Record<string, ModeStats> = {};
  for (const [mode, g] of Object.entries(grouped)) {
    result[mode] = {
      accuracy: g.totals > 0 ? Math.round((g.scores / g.totals) * 100) : 0,
      completed: g.count,
      avgTimeSeconds:
        g.times.length > 0
          ? Math.round(g.times.reduce((a, b) => a + b, 0) / g.times.length)
          : 0,
    };
  }

  return result;
}

/* ------------------------------------------------------------------ */
/*  Weekly activity (questions per day, last 7 days)                   */
/* ------------------------------------------------------------------ */

export async function getWeeklyActivity(userId?: string): Promise<DailyActivity[]> {
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();

  let query = supabase
    .from("practice_sessions")
    .select("total, completed_at")
    .gte("completed_at", weekAgo)
    .order("completed_at", { ascending: true });

  if (userId) query = query.eq("user_id", userId);

  const { data, error } = await query;

  if (error || !data?.length) {
    // Return empty week
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day) => ({ day, questions: 0 }));
  }

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Use local date strings as keys to avoid timezone grouping issues
  const byDate: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    byDate[toLocalDateString(d)] = 0;
  }

  for (const s of data) {
    const key = toLocalDateString(new Date(s.completed_at));
    if (key in byDate) {
      byDate[key] += s.total;
    }
  }

  // Return in order (last 7 days)
  const result: DailyActivity[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const key = toLocalDateString(d);
    result.push({ day: dayNames[d.getDay()], questions: byDate[key] || 0 });
  }

  return result;
}

/* ------------------------------------------------------------------ */
/*  Accuracy trend (weekly averages, last 8 weeks)                     */
/* ------------------------------------------------------------------ */

export async function getAccuracyTrend(userId?: string): Promise<WeeklyAccuracy[]> {
  const eightWeeksAgo = new Date(
    Date.now() - 8 * 7 * 86400000,
  ).toISOString();

  let query = supabase
    .from("practice_sessions")
    .select("score, total, completed_at")
    .gte("completed_at", eightWeeksAgo)
    .order("completed_at", { ascending: true });

  if (userId) query = query.eq("user_id", userId);

  const { data, error } = await query;

  if (error || !data?.length) return [];

  // Group by ISO week
  const byWeek: Record<string, { scores: number; totals: number }> = {};
  for (const s of data) {
    const d = new Date(s.completed_at);
    const weekStart = new Date(d);
    weekStart.setDate(d.getDate() - d.getDay());
    const key = weekStart.toISOString().slice(0, 10);
    if (!byWeek[key]) byWeek[key] = { scores: 0, totals: 0 };
    byWeek[key].scores += s.score;
    byWeek[key].totals += s.total;
  }

  const weeks = Object.keys(byWeek).sort();
  return weeks.map((w, i) => ({
    week: `W${i + 1}`,
    accuracy:
      byWeek[w].totals > 0
        ? Math.round((byWeek[w].scores / byWeek[w].totals) * 100)
        : 0,
  }));
}

/* ------------------------------------------------------------------ */
/*  Recent sessions                                                    */
/* ------------------------------------------------------------------ */

export async function getRecentSessions(
  limit = 5,
  userId?: string,
): Promise<SessionRecord[]> {
  let query = supabase
    .from("practice_sessions")
    .select("*")
    .order("completed_at", { ascending: false })
    .limit(limit);

  if (userId) query = query.eq("user_id", userId);

  const { data, error } = await query;

  if (error || !data) return [];
  return data;
}

/* ------------------------------------------------------------------ */
/*  Check if user has completed baseline test                          */
/* ------------------------------------------------------------------ */

export async function hasCompletedBaseline(userId: string): Promise<boolean> {
  const { count, error } = await supabase
    .from("practice_sessions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_baseline", true);

  if (error) return false;
  return (count ?? 0) > 0;
}

/* ------------------------------------------------------------------ */
/*  Get mock test sessions                                             */
/* ------------------------------------------------------------------ */

export async function getMockTestSessions(
  userId: string,
): Promise<SessionRecord[]> {
  const { data, error } = await supabase
    .from("practice_sessions")
    .select("*")
    .eq("user_id", userId)
    .eq("is_mock_test", true)
    .order("completed_at", { ascending: false });

  if (error || !data) return [];
  return data;
}

/* ------------------------------------------------------------------ */
/*  Daily progress (for daily goals)                                   */
/* ------------------------------------------------------------------ */

export interface DailyProgress {
  questionsToday: number;
  minutesToday: number;
}

export async function getDailyProgress(userId: string): Promise<DailyProgress> {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("practice_sessions")
    .select("total, time_taken_seconds")
    .eq("user_id", userId)
    .gte("completed_at", todayStart.toISOString());

  if (error || !data) return { questionsToday: 0, minutesToday: 0 };

  const questionsToday = data.reduce((sum, s) => sum + s.total, 0);
  const secondsToday = data.reduce(
    (sum, s) => sum + (s.time_taken_seconds ?? 0),
    0,
  );

  return {
    questionsToday,
    minutesToday: Math.round(secondsToday / 60),
  };
}

/* ------------------------------------------------------------------ */
/*  Last 30 days activity (for streak calendar)                        */
/* ------------------------------------------------------------------ */

export interface DayActivity {
  date: string;           // YYYY-MM-DD
  questions: number;
  minutes: number;
}

export async function getLast30DaysActivity(
  userId: string,
): Promise<DayActivity[]> {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("practice_sessions")
    .select("total, time_taken_seconds, completed_at")
    .eq("user_id", userId)
    .gte("completed_at", thirtyDaysAgo.toISOString())
    .order("completed_at", { ascending: true });

  // Build a map for every day in the 30-day window
  const byDate: Record<string, { questions: number; minutes: number }> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    byDate[toLocalDateString(d)] = { questions: 0, minutes: 0 };
  }

  if (!error && data) {
    for (const s of data) {
      const key = toLocalDateString(new Date(s.completed_at));
      if (key in byDate) {
        byDate[key].questions += s.total;
        byDate[key].minutes += Math.round((s.time_taken_seconds ?? 0) / 60);
      }
    }
  }

  // Convert to sorted array
  return Object.entries(byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, val]) => ({ date, ...val }));
}

/* ------------------------------------------------------------------ */
/*  Baseline accuracy per mode (for parent dashboard growth tracking)  */
/* ------------------------------------------------------------------ */

export async function getBaselineAccuracy(
  userId: string,
): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from("practice_sessions")
    .select("mode, score, total")
    .eq("user_id", userId)
    .eq("is_baseline", true);

  if (error || !data) return {};

  const result: Record<string, number> = {};
  for (const s of data) {
    if (s.total > 0) {
      result[s.mode] = Math.round((s.score / s.total) * 100);
    }
  }
  return result;
}
