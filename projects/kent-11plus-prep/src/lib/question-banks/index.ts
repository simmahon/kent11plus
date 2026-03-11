/* ------------------------------------------------------------------ */
/*  Question bank index — serves pre-verified questions                */
/*  Falls back to null if no questions available at the requested      */
/*  difficulty, letting the caller fall back to AI generation.         */
/* ------------------------------------------------------------------ */

import type { BankedQuestion } from "./types";

/* -- Lazy imports to keep bundle splitting effective ----------------- */
import { BANK as vrSynonyms } from "./vr-synonyms";
import { BANK as vrOddOneOut } from "./vr-odd-one-out";
import { BANK as vrLetterCodes } from "./vr-letter-codes";
import { BANK as vrAnalogies } from "./vr-analogies";
import { BANK as vrHiddenWords } from "./vr-hidden-words";
import { BANK as mathsFractions } from "./maths-fractions";
import { BANK as mathsGeometry } from "./maths-geometry";
import { BANK as mathsWordProblems } from "./maths-word-problems";
import { BANK as mathsPatterns } from "./maths-patterns";
import { BANK as mathsData } from "./maths-data";
import { BANK as englishSpelling } from "./english-spelling";
import { BANK as englishGrammar } from "./english-grammar";
import { BANK as englishCloze } from "./english-cloze";

/* ------------------------------------------------------------------ */
/*  Topic → bank mapping                                               */
/*  Keys must match the topic strings sent from MODE_TO_API in the    */
/*  practice page.                                                     */
/* ------------------------------------------------------------------ */

const TOPIC_BANKS: Record<string, BankedQuestion[]> = {
  "synonyms and antonyms": vrSynonyms,
  "odd one out": vrOddOneOut,
  "letter codes and cyphers": vrLetterCodes,
  "word relationships and analogies": vrAnalogies,
  "hidden words": vrHiddenWords,
  "fractions decimals and percentages": mathsFractions,
  "geometry and angles": mathsGeometry,
  "word problems": mathsWordProblems,
  "number patterns and sequences": mathsPatterns,
  "data interpretation": mathsData,
  "spelling and vocabulary": englishSpelling,
  "grammar and punctuation": englishGrammar,
  "sentence completion": englishCloze,
};

/* ------------------------------------------------------------------ */
/*  Selection                                                          */
/* ------------------------------------------------------------------ */

/**
 * Pick `count` random questions from the bank for a given topic,
 * matching the requested difficulty (±1 level tolerance).
 *
 * Pass `seenStems` to exclude questions the user has already answered.
 * Returns null if the bank doesn't have enough unseen questions.
 */
export function getQuestionsFromBank(
  topic: string,
  difficulty: number,
  count: number,
  seenStems?: Set<string>,
): BankedQuestion[] | null {
  const bank = TOPIC_BANKS[topic.toLowerCase()];
  if (!bank || bank.length === 0) return null;

  // Exclude questions this user has already seen
  const unseen = seenStems
    ? bank.filter((q) => !seenStems.has(q.stem))
    : bank;

  // Filter to questions within ±1 difficulty
  const eligible = unseen.filter(
    (q) => Math.abs(q.difficulty - difficulty) <= 1,
  );

  if (eligible.length >= count) {
    return shuffleAndPick(eligible, count);
  }

  // Not enough at target difficulty — try any difficulty from unseen
  if (unseen.length >= count) {
    return shuffleAndPick(unseen, count);
  }

  // Bank exhausted for this user — return null to fall back to AI
  return null;
}

/** Fisher-Yates shuffle, pick first `n` */
function shuffleAndPick<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/** Check if a bank exists for a topic */
export function hasBankForTopic(topic: string): boolean {
  const bank = TOPIC_BANKS[topic.toLowerCase()];
  return !!bank && bank.length > 0;
}

/** Convert a BankedQuestion to the APIQuestion shape used by practice/mock pages */
export function bankedToAPIQuestion(bq: BankedQuestion) {
  return {
    content: {
      stem: bq.stem,
      options: [...bq.options] as string[],
    },
    correctAnswer: {
      index: bq.correctIndex,
      value: bq.options[bq.correctIndex],
    },
    explanation: bq.explanation,
    difficulty: bq.difficulty,
    questionType: "multiple_choice" as const,
  };
}
