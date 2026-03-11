import { supabase } from "./client";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface QuestionAnswer {
  id: string;
  session_id: string | null;
  user_id: string | null;
  mode: string;
  topic: string | null;
  difficulty: number;
  stem: string;
  options: string[];
  correct_index: number;
  selected_index: number | null;
  is_correct: boolean;
  explanation: string | null;
  time_taken_ms: number | null;
  review_count: number;
  next_review_at: string | null;
  created_at: string;
}

export interface QuestionAnswerInsert {
  session_id?: string | null;
  user_id?: string | null;
  mode: string;
  topic?: string | null;
  difficulty: number;
  stem: string;
  options: string[];
  correct_index: number;
  selected_index: number | null;
  is_correct: boolean;
  explanation?: string | null;
  time_taken_ms?: number | null;
}

export interface TopicAccuracy {
  topic: string;
  mode: string;
  total: number;
  correct: number;
  accuracy: number;
}

/* ------------------------------------------------------------------ */
/*  Save question answers (bulk insert after session)                  */
/* ------------------------------------------------------------------ */

export async function saveQuestionAnswers(
  answers: QuestionAnswerInsert[],
): Promise<boolean> {
  if (answers.length === 0) return true;

  // Set next_review_at for wrong answers (1 day from now)
  const rows = answers.map((a) => ({
    ...a,
    next_review_at: a.is_correct
      ? null
      : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }));

  const { error } = await supabase.from("question_answers").insert(rows);

  if (error) {
    console.error("[saveQuestionAnswers] Error:", error.message);
    return false;
  }
  return true;
}

/* ------------------------------------------------------------------ */
/*  Get stems a user has already seen (for dedup)                      */
/* ------------------------------------------------------------------ */

export async function getSeenStems(
  userId: string,
  topic?: string,
): Promise<Set<string>> {
  let query = supabase
    .from("question_answers")
    .select("stem")
    .eq("user_id", userId);

  if (topic) query = query.eq("topic", topic);

  const { data, error } = await query;
  if (error || !data) return new Set();
  return new Set(data.map((row) => row.stem));
}

/* ------------------------------------------------------------------ */
/*  Get wrong answers for review                                       */
/* ------------------------------------------------------------------ */

export async function getWrongAnswers(
  userId: string,
  options?: { mode?: string; topic?: string; limit?: number },
): Promise<QuestionAnswer[]> {
  let query = supabase
    .from("question_answers")
    .select("*")
    .eq("user_id", userId)
    .eq("is_correct", false)
    .order("created_at", { ascending: false });

  if (options?.mode) query = query.eq("mode", options.mode);
  if (options?.topic) query = query.eq("topic", options.topic);
  if (options?.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error || !data) return [];
  return data;
}

/* ------------------------------------------------------------------ */
/*  Get due reviews (spaced repetition)                                */
/* ------------------------------------------------------------------ */

export async function getDueReviews(
  userId: string,
  limit = 10,
): Promise<QuestionAnswer[]> {
  const { data, error } = await supabase
    .from("question_answers")
    .select("*")
    .eq("user_id", userId)
    .eq("is_correct", false)
    .not("next_review_at", "is", null)
    .lte("next_review_at", new Date().toISOString())
    .order("next_review_at", { ascending: true })
    .limit(limit);

  if (error || !data) return [];
  return data;
}

/* ------------------------------------------------------------------ */
/*  Get review stats                                                   */
/* ------------------------------------------------------------------ */

export async function getReviewStats(
  userId: string,
): Promise<{ due: number; upcoming: number; mastered: number }> {
  const now = new Date().toISOString();

  const [dueRes, upcomingRes, masteredRes] = await Promise.all([
    supabase
      .from("question_answers")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_correct", false)
      .not("next_review_at", "is", null)
      .lte("next_review_at", now),
    supabase
      .from("question_answers")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_correct", false)
      .not("next_review_at", "is", null)
      .gt("next_review_at", now),
    supabase
      .from("question_answers")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_correct", false)
      .is("next_review_at", null)
      .gt("review_count", 0),
  ]);

  return {
    due: dueRes.count ?? 0,
    upcoming: upcomingRes.count ?? 0,
    mastered: masteredRes.count ?? 0,
  };
}

/* ------------------------------------------------------------------ */
/*  Update review schedule after re-attempt                            */
/* ------------------------------------------------------------------ */

// Leitner intervals in milliseconds: 1d, 3d, 7d, 14d
const REVIEW_INTERVALS_MS = [
  1 * 24 * 60 * 60 * 1000,
  3 * 24 * 60 * 60 * 1000,
  7 * 24 * 60 * 60 * 1000,
  14 * 24 * 60 * 60 * 1000,
];

export async function updateReviewSchedule(
  answerId: string,
  wasCorrect: boolean,
): Promise<void> {
  // Get current review_count
  const { data } = await supabase
    .from("question_answers")
    .select("review_count")
    .eq("id", answerId)
    .single();

  if (!data) return;

  const newCount = data.review_count + 1;

  let nextReview: string | null;
  if (wasCorrect) {
    // If correct and reviewed enough times, mark as mastered
    if (newCount >= REVIEW_INTERVALS_MS.length) {
      nextReview = null; // mastered
    } else {
      nextReview = new Date(
        Date.now() + REVIEW_INTERVALS_MS[newCount],
      ).toISOString();
    }
  } else {
    // Wrong again: reset to 1 day
    nextReview = new Date(Date.now() + REVIEW_INTERVALS_MS[0]).toISOString();
  }

  await supabase
    .from("question_answers")
    .update({ review_count: newCount, next_review_at: nextReview })
    .eq("id", answerId);
}

/* ------------------------------------------------------------------ */
/*  Get accuracy by topic                                              */
/* ------------------------------------------------------------------ */

export async function getAccuracyByTopic(
  userId: string,
  mode?: string,
): Promise<TopicAccuracy[]> {
  let query = supabase
    .from("question_answers")
    .select("mode, topic, is_correct")
    .eq("user_id", userId)
    .not("topic", "is", null);

  if (mode) query = query.eq("mode", mode);

  const { data, error } = await query;
  if (error || !data) return [];

  // Group by mode+topic
  const grouped: Record<string, { mode: string; topic: string; total: number; correct: number }> = {};
  for (const row of data) {
    const key = `${row.mode}::${row.topic}`;
    if (!grouped[key]) {
      grouped[key] = { mode: row.mode, topic: row.topic ?? "", total: 0, correct: 0 };
    }
    grouped[key].total++;
    if (row.is_correct) grouped[key].correct++;
  }

  return Object.values(grouped).map((g) => ({
    ...g,
    accuracy: g.total > 0 ? Math.round((g.correct / g.total) * 100) : 0,
  }));
}
