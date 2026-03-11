import type { PracticeModeConfig } from "@/lib/types";

/**
 * Central config for every practice mode.
 * Drives the landing-page grid and session setup.
 */
export const PRACTICE_MODES: PracticeModeConfig[] = [
  {
    id: "verbal-reasoning",
    label: "Verbal Reasoning",
    description: "Word patterns, codes, logic and language puzzles",
    icon: "\uD83E\uDDE0",
    glowClass: "glow-cyan",
    colorClass: "text-neon-cyan",
    questionCount: 5,
    timeLimitSeconds: 200,
  },
  {
    id: "non-verbal-reasoning",
    label: "Non-Verbal Reasoning",
    description: "Shape sequences, matrices, odd-one-out and visual logic",
    icon: "\uD83D\uDD2E",
    glowClass: "glow-purple",
    colorClass: "text-neon-purple",
    questionCount: 5,
    timeLimitSeconds: 200,
  },
  {
    id: "maths",
    label: "Mathematics",
    description: "Arithmetic, fractions, algebra and problem solving",
    icon: "\uD83D\uDCCA",
    glowClass: "glow-green",
    colorClass: "text-neon-green",
    questionCount: 5,
    timeLimitSeconds: 300,
  },
  {
    id: "english",
    label: "English",
    description: "Spelling, grammar, vocabulary and reading comprehension",
    icon: "\uD83D\uDCDA",
    glowClass: "glow-amber",
    colorClass: "text-neon-amber",
    questionCount: 5,
    timeLimitSeconds: 300,
  },
  {
    id: "spatial-reasoning",
    label: "Spatial Reasoning",
    description: "Cube nets, hidden shapes, reflections and 3D thinking",
    icon: "\uD83E\uDDE9",
    glowClass: "glow-purple",
    colorClass: "text-neon-purple",
    questionCount: 5,
    timeLimitSeconds: 250,
  },
  {
    id: "random-mix",
    label: "Random Mix",
    description: "A surprise blend of all question types to keep you sharp",
    icon: "\uD83C\uDFB2",
    glowClass: "glow-cyan",
    colorClass: "text-neon-cyan",
    questionCount: 5,
    timeLimitSeconds: 300,
  },
];
