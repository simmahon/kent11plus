/* ------------------------------------------------------------------ */
/*  Static question bank types                                         */
/*  Pre-verified questions served instead of live AI generation        */
/* ------------------------------------------------------------------ */

export interface BankedQuestion {
  /** The question text as it would appear on the exam paper */
  stem: string;
  /** Exactly 5 answer options */
  options: [string, string, string, string, string];
  /** 0-based index of the correct answer */
  correctIndex: number;
  /** Concise, friendly explanation of the method */
  explanation: string;
  /** Difficulty 1-5 */
  difficulty: number;
  /** The topic this question belongs to */
  topic: string;
}

/** Map of topic name → array of banked questions */
export type QuestionBank = Record<string, BankedQuestion[]>;
