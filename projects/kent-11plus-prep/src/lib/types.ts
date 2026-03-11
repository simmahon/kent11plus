/* ------------------------------------------------------------------ */
/*  Kent 11+ Trainer - Core domain types                              */
/* ------------------------------------------------------------------ */

/** Identifiers for every practice mode the app supports. */
export type PracticeMode =
  | "verbal-reasoning"
  | "non-verbal-reasoning"
  | "maths"
  | "english"
  | "spatial-reasoning"
  | "random-mix";

/** Metadata that drives the mode-selection cards on the landing page. */
export interface PracticeModeConfig {
  id: PracticeMode;
  label: string;
  description: string;
  icon: string;
  /** Tailwind glow class name applied on hover, e.g. "glow-cyan" */
  glowClass: string;
  /** Neon text color class, e.g. "text-neon-cyan" */
  colorClass: string;
  /** How many questions per session (default batch). */
  questionCount: number;
  /** Time limit in seconds for the full session. */
  timeLimitSeconds: number;
}

/** Difficulty level from 1 (easiest) to 5 (hardest) for API prompts. */
export type Difficulty = 1 | 2 | 3 | 4 | 5;

/** Granular skill level (1.0 - 5.0) for adaptive difficulty tracking. */
export type SkillLevel = number;

/** Discriminated union of question formats. */
export type QuestionType = "multiple_choice" | "fill_blank" | "true_false";

/** A single question served during a practice session. */
export interface Question {
  id: string;
  type: QuestionType;
  /** The question text shown to the learner. */
  stem: string;
  /** Ordered list of answer options (A-E for multiple choice). */
  options: string[];
  /** Zero-based index into `options` for the correct answer. */
  correctIndex: number;
  /** Brief explanation shown after the learner answers. */
  explanation: string;
  /** Which practice mode this question belongs to. */
  mode: PracticeMode;
}
