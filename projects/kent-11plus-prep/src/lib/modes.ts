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
    timeLimitSeconds: 200, // ~40s per Q (real test: 30-37s per Q)
  },
  {
    id: "non-verbal-reasoning",
    label: "Non-Verbal Reasoning",
    description: "Shape sequences, spatial awareness and visual logic",
    icon: "\uD83D\uDD2E",
    glowClass: "glow-purple",
    colorClass: "text-neon-purple",
    questionCount: 5,
    timeLimitSeconds: 200, // ~40s per Q (real test: ~30s per Q)
  },
  {
    id: "maths",
    label: "Mathematics",
    description: "Arithmetic, fractions, algebra and problem solving",
    icon: "\uD83D\uDCCA",
    glowClass: "glow-green",
    colorClass: "text-neon-green",
    questionCount: 5,
    timeLimitSeconds: 300, // 60s per Q (real test: 60s per Q)
  },
  {
    id: "english",
    label: "English",
    description: "Spelling, grammar, vocabulary and comprehension",
    icon: "\uD83D\uDCDA",
    glowClass: "glow-amber",
    colorClass: "text-neon-amber",
    questionCount: 5,
    timeLimitSeconds: 300, // 60s per Q (real test: 60s per Q)
  },
  {
    id: "comprehension",
    label: "Comprehension",
    description: "Reading passages with inference and analysis questions",
    icon: "\uD83D\uDDD2\uFE0F",
    glowClass: "glow-pink",
    colorClass: "text-neon-pink",
    questionCount: 5,
    timeLimitSeconds: 450, // 90s per Q (extra time for reading passage)
  },
  {
    id: "cube-nets",
    label: "Cube Nets",
    description: "Fold flat nets into cubes and match the 3D view",
    icon: "\uD83E\uDDE9",
    glowClass: "glow-purple",
    colorClass: "text-neon-purple",
    questionCount: 5,
    timeLimitSeconds: 250, // 50s per Q (spatial reasoning needs time)
  },
  {
    id: "random-mix",
    label: "Random Mix",
    description: "A surprise blend of all question types to keep you sharp",
    icon: "\uD83C\uDFB2",
    glowClass: "glow-cyan",
    colorClass: "text-neon-cyan",
    questionCount: 5,
    timeLimitSeconds: 300, // 60s per Q average
  },
];
