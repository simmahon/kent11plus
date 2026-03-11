import { supabase } from "./client";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface AppUser {
  id: string;
  name: string;
  avatar_emoji: string;
  is_test: boolean;
  daily_goal_questions: number;
  daily_goal_minutes: number;
}

/* ------------------------------------------------------------------ */
/*  Fetch all users                                                    */
/* ------------------------------------------------------------------ */

export async function getUsers(): Promise<AppUser[]> {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, avatar_emoji, is_test, daily_goal_questions, daily_goal_minutes")
    .order("is_test", { ascending: false }) // TEST first
    .order("name", { ascending: true });

  if (error) {
    console.error("[getUsers] Error:", error.message);
    return [];
  }
  return data ?? [];
}
