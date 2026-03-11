import { supabase } from "./client";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SkillLevelRecord {
  id: string;
  user_id: string;
  mode: string;
  topic: string;
  skill_level: number;
  total_attempts: number;
  correct_attempts: number;
  updated_at: string;
}

/* ------------------------------------------------------------------ */
/*  Get skill level for a specific mode + topic                        */
/* ------------------------------------------------------------------ */

export async function getSkillLevel(
  userId: string,
  mode: string,
  topic: string,
): Promise<number> {
  const { data, error } = await supabase
    .from("user_skill_levels")
    .select("skill_level")
    .eq("user_id", userId)
    .eq("mode", mode)
    .eq("topic", topic)
    .single();

  if (error || !data) return 3.0; // default starting level
  return data.skill_level;
}

/* ------------------------------------------------------------------ */
/*  Get average skill level for a mode (across all topics)             */
/* ------------------------------------------------------------------ */

export async function getModeSkillLevel(
  userId: string,
  mode: string,
): Promise<number> {
  const { data, error } = await supabase
    .from("user_skill_levels")
    .select("skill_level")
    .eq("user_id", userId)
    .eq("mode", mode);

  if (error || !data || data.length === 0) return 3.0;

  const avg = data.reduce((sum, r) => sum + r.skill_level, 0) / data.length;
  return Math.round(avg * 10) / 10; // 1 decimal place
}

/* ------------------------------------------------------------------ */
/*  Get all skill levels for a user                                    */
/* ------------------------------------------------------------------ */

export async function getAllSkillLevels(
  userId: string,
): Promise<SkillLevelRecord[]> {
  const { data, error } = await supabase
    .from("user_skill_levels")
    .select("*")
    .eq("user_id", userId)
    .order("mode")
    .order("topic");

  if (error || !data) return [];
  return data;
}

/* ------------------------------------------------------------------ */
/*  Update skill level after answering a question                      */
/* ------------------------------------------------------------------ */

export async function updateSkillLevel(
  userId: string,
  mode: string,
  topic: string,
  isCorrect: boolean,
  timeTakenMs?: number,
): Promise<number> {
  // Fetch current record (or create default)
  const { data: existing } = await supabase
    .from("user_skill_levels")
    .select("*")
    .eq("user_id", userId)
    .eq("mode", mode)
    .eq("topic", topic)
    .single();

  const currentLevel = existing?.skill_level ?? 3.0;
  const totalAttempts = (existing?.total_attempts ?? 0) + 1;
  const correctAttempts = (existing?.correct_attempts ?? 0) + (isCorrect ? 1 : 0);

  // Calculate new skill level using adaptive algorithm
  let delta: number;
  if (isCorrect) {
    // Speed bonus: faster answers get a bigger boost (max 1.5x at <5s, min 1.0x at >30s)
    let speedMultiplier = 1.0;
    if (timeTakenMs != null) {
      const seconds = timeTakenMs / 1000;
      speedMultiplier = seconds < 5 ? 1.5 : seconds > 30 ? 1.0 : 1.5 - (seconds - 5) * 0.02;
    }
    delta = 0.15 * speedMultiplier;
  } else {
    delta = -0.2;
  }

  const newLevel = Math.max(1.0, Math.min(5.0, currentLevel + delta));
  const rounded = Math.round(newLevel * 100) / 100; // 2 decimal precision

  if (existing) {
    await supabase
      .from("user_skill_levels")
      .update({
        skill_level: rounded,
        total_attempts: totalAttempts,
        correct_attempts: correctAttempts,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);
  } else {
    await supabase.from("user_skill_levels").insert({
      user_id: userId,
      mode,
      topic,
      skill_level: rounded,
      total_attempts: totalAttempts,
      correct_attempts: correctAttempts,
    });
  }

  return rounded;
}

/* ------------------------------------------------------------------ */
/*  Bulk set skill levels (used by baseline test)                      */
/* ------------------------------------------------------------------ */

export async function setSkillLevels(
  userId: string,
  levels: Array<{ mode: string; topic: string; skillLevel: number }>,
): Promise<void> {
  for (const { mode, topic, skillLevel } of levels) {
    const { data: existing } = await supabase
      .from("user_skill_levels")
      .select("id")
      .eq("user_id", userId)
      .eq("mode", mode)
      .eq("topic", topic)
      .single();

    const rounded = Math.round(skillLevel * 100) / 100;

    if (existing) {
      await supabase
        .from("user_skill_levels")
        .update({
          skill_level: rounded,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
    } else {
      await supabase.from("user_skill_levels").insert({
        user_id: userId,
        mode,
        topic,
        skill_level: rounded,
        total_attempts: 0,
        correct_attempts: 0,
      });
    }
  }
}
