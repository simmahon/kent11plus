import type { Difficulty, SkillLevel } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Adaptive difficulty engine                                         */
/* ------------------------------------------------------------------ */
/*  Uses granular float-based skill levels (1.0 - 5.0).               */
/*  Each correct answer nudges skill up, wrong nudges down.            */
/*  Speed bonus rewards faster correct answers.                        */
/* ------------------------------------------------------------------ */

/** Base increment for a correct answer. */
const CORRECT_DELTA = 0.15;

/** Base decrement for a wrong answer. */
const WRONG_DELTA = -0.2;

/** Min/max bounds for skill level. */
const MIN_SKILL = 1.0;
const MAX_SKILL = 5.0;

/**
 * Calculate the updated skill level after answering a question.
 *
 * @param currentSkill - The student's current skill level (1.0 - 5.0)
 * @param isCorrect - Whether the answer was correct
 * @param timeTakenMs - Time taken to answer in milliseconds (optional, for speed bonus)
 * @returns The new skill level, clamped to [1.0, 5.0]
 */
export function calculateNextSkillLevel(
  currentSkill: SkillLevel,
  isCorrect: boolean,
  timeTakenMs?: number,
): SkillLevel {
  let delta: number;

  if (isCorrect) {
    // Speed bonus: faster answers get a bigger boost
    // <5s = 1.5x multiplier, >30s = 1.0x, linear between
    let speedMultiplier = 1.0;
    if (timeTakenMs != null) {
      const seconds = timeTakenMs / 1000;
      if (seconds < 5) {
        speedMultiplier = 1.5;
      } else if (seconds > 30) {
        speedMultiplier = 1.0;
      } else {
        speedMultiplier = 1.5 - (seconds - 5) * 0.02;
      }
    }
    delta = CORRECT_DELTA * speedMultiplier;
  } else {
    delta = WRONG_DELTA;
  }

  const newSkill = Math.max(MIN_SKILL, Math.min(MAX_SKILL, currentSkill + delta));
  return Math.round(newSkill * 100) / 100; // 2 decimal precision
}

/**
 * Convert a granular skill level to an integer Difficulty for the AI prompt.
 *
 * @param skillLevel - Granular skill level (1.0 - 5.0)
 * @returns Integer difficulty (1-5)
 */
export function skillToDifficulty(skillLevel: SkillLevel): Difficulty {
  return Math.max(1, Math.min(5, Math.round(skillLevel))) as Difficulty;
}

/**
 * Generate a skill-level context string for the AI prompt.
 * Gives the AI more nuance than just an integer difficulty.
 *
 * @param skillLevel - Granular skill level (1.0 - 5.0)
 * @returns A human-readable context string
 */
export function skillLevelContext(skillLevel: SkillLevel): string {
  const intLevel = skillToDifficulty(skillLevel);
  const decimal = skillLevel - Math.floor(skillLevel);

  if (decimal < 0.25) {
    return `The student is at difficulty level ${intLevel} (just entering this level).`;
  } else if (decimal < 0.75) {
    return `The student is solidly at difficulty level ${intLevel}.`;
  } else {
    const nextLevel = Math.min(5, intLevel + 1);
    return `The student is at difficulty level ${intLevel}, approaching level ${nextLevel}.`;
  }
}

/**
 * Legacy compatibility: calculate next difficulty from recent answers.
 * Kept for backwards compatibility but prefer calculateNextSkillLevel.
 */
export function calculateNextDifficulty(
  recentAnswers: Array<{ isCorrect: boolean }>,
  currentDifficulty: Difficulty,
): Difficulty {
  if (recentAnswers.length === 0) return currentDifficulty;

  let skill: SkillLevel = currentDifficulty;
  for (const answer of recentAnswers.slice(-20)) {
    skill = calculateNextSkillLevel(skill, answer.isCorrect);
  }

  return skillToDifficulty(skill);
}
