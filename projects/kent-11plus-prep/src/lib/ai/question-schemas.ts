/* ------------------------------------------------------------------ */
/*  Zod schemas for AI-generated question validation                   */
/*  Used by the /api/questions/generate endpoint to validate the      */
/*  structured JSON that Claude returns.                              */
/* ------------------------------------------------------------------ */

import { z } from "zod";

/* ------------------------------------------------------------------ */
/*  Sub-schemas                                                        */
/* ------------------------------------------------------------------ */

/**
 * The question content as presented to the student.
 * Multiple-choice questions always carry exactly 5 options to match
 * the GL Assessment format used by Kent Grammar School tests.
 */
export const QuestionContentSchema = z.object({
  /** The question text / prompt */
  stem: z.string().min(1, "Question stem is required"),
  /** Exactly 5 answer options for multiple-choice questions */
  options: z
    .array(z.string().min(1))
    .length(5, "GL Assessment format requires exactly 5 options"),
  /** Optional reading passage for English comprehension questions */
  passage: z.string().nullish(),
  /** Optional SVG configuration for non-verbal reasoning pattern questions */
  svgConfig: z.record(z.string(), z.unknown()).nullish(),
});

/**
 * The correct answer with both an index (0-4 for multiple-choice)
 * and the string value for universal comparison.
 */
export const CorrectAnswerSchema = z.object({
  /** 0-based index into the options array */
  index: z.number().int().min(0).max(4),
  /** The correct answer value as a string */
  value: z.string().min(1, "Correct answer value is required"),
});

/* ------------------------------------------------------------------ */
/*  Top-level question schema                                          */
/* ------------------------------------------------------------------ */

/**
 * A single question returned by the AI generation endpoint.
 * Mirrors the `Question` interface in @/lib/types but without the
 * `id` and `topicId` fields which are assigned server-side.
 */
export const GeneratedQuestionSchema = z
  .object({
    content: QuestionContentSchema,
    correctAnswer: CorrectAnswerSchema,
    /** Child-friendly explanation of the correct answer */
    explanation: z.string().min(1, "Explanation is required"),
    /** Difficulty level 1 (easiest) to 5 (hardest) */
    difficulty: z.number().int().min(1).max(5),
    /** The format of the question */
    questionType: z.enum([
      "multiple_choice",
      "number_input",
      "text_input",
      "svg_pattern",
    ]),
  })
  .refine(
    (q) => q.content.options[q.correctAnswer.index] === q.correctAnswer.value,
    {
      message:
        "correctAnswer.value must match the option at correctAnswer.index",
      path: ["correctAnswer"],
    },
  );

/**
 * The batch wrapper that the AI returns -- an array of generated
 * questions inside a `questions` key.
 */
export const GeneratedBatchSchema = z.object({
  questions: z
    .array(GeneratedQuestionSchema)
    .min(1, "At least one question is required"),
});

/* ------------------------------------------------------------------ */
/*  Inferred TypeScript types                                          */
/* ------------------------------------------------------------------ */

export type QuestionContent = z.infer<typeof QuestionContentSchema>;
export type CorrectAnswer = z.infer<typeof CorrectAnswerSchema>;
export type GeneratedQuestion = z.infer<typeof GeneratedQuestionSchema>;
export type GeneratedBatch = z.infer<typeof GeneratedBatchSchema>;
