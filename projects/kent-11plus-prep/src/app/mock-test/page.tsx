"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/contexts/user-context";
import { saveSession } from "@/lib/supabase/sessions";
import {
  saveQuestionAnswers,
  type QuestionAnswerInsert,
  getSeenStems,
} from "@/lib/supabase/question-answers";
import { OPTION_LABELS } from "@/lib/constants";
import type { PracticeMode } from "@/lib/types";
import {
  getQuestionsFromBank,
  hasBankForTopic,
  bankedToAPIQuestion,
} from "@/lib/question-banks";
import { generateNVRQuestions, type NVRQuestion } from "@/lib/nvr-generator";
import { NVRQuestionDisplay } from "@/components/nvr-question";
import {
  generateSpatialQuestions,
  type SpatialQuestion,
} from "@/lib/spatial-generator";
import { SpatialQuestionDisplay } from "@/components/spatial-question";
import {
  generateCubeNetQuestions,
  type CubeNetQuestion,
} from "@/lib/cube-net-generator";
import { CubeNetQuestionDisplay } from "@/components/cube-net-question";

/* ------------------------------------------------------------------ */
/*  Kent 11+ GL Assessment structure                                   */
/*  Paper 1: English (12 Qs, 25 min) + Maths (12 Qs, 25 min)         */
/*  Paper 2: Verbal Reasoning (10 Qs, 20 min)                         */
/*           + NVR/Spatial (8 Qs, 15 min)                              */
/*  3 standardised scores (69-141 each), total pass ≥ 332             */
/*  No single score < 106 to pass                                     */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Phase machine                                                      */
/* ------------------------------------------------------------------ */

type Phase =
  | "intro"
  | "loading"
  | "paper1-english"
  | "paper1-break"
  | "paper1-maths"
  | "paper-break"
  | "paper2-vr"
  | "paper2-break"
  | "paper2-nvr"
  | "saving"
  | "results";

const SECTION_PHASES: Phase[] = [
  "paper1-english",
  "paper1-maths",
  "paper2-vr",
  "paper2-nvr",
];

/* ------------------------------------------------------------------ */
/*  Section definitions                                                */
/* ------------------------------------------------------------------ */

interface SectionConfig {
  phase: Phase;
  label: string;
  paper: 1 | 2;
  /** Scoring bucket: English+Maths=1, VR=2, NVR/Spatial=3 */
  scoreBucket: 1 | 2 | 3;
  scoreBucketLabel: string;
  colorClass: string;
  timeLimitSeconds: number;
  questionCount: number;
  mode: PracticeMode;
  /** API batches for text-based questions */
  batches: { category: string; topic: string; count: number }[];
  /** Client-side visual question type */
  visualType?: "nvr" | "spatial" | "cube-net";
  visualCount?: number;
}

const SECTIONS: SectionConfig[] = [
  {
    phase: "paper1-english",
    label: "English",
    paper: 1,
    scoreBucket: 1,
    scoreBucketLabel: "English & Maths",
    colorClass: "text-neon-amber",
    timeLimitSeconds: 25 * 60,
    questionCount: 12,
    mode: "english",
    batches: [
      { category: "english", topic: "spelling and vocabulary", count: 3 },
      { category: "english", topic: "grammar and punctuation", count: 3 },
      { category: "english", topic: "sentence completion", count: 3 },
      { category: "english", topic: "reading comprehension", count: 3 },
    ],
  },
  {
    phase: "paper1-maths",
    label: "Mathematics",
    paper: 1,
    scoreBucket: 1,
    scoreBucketLabel: "English & Maths",
    colorClass: "text-neon-green",
    timeLimitSeconds: 25 * 60,
    questionCount: 12,
    mode: "maths",
    batches: [
      {
        category: "mathematics",
        topic: "fractions decimals and percentages",
        count: 4,
      },
      { category: "mathematics", topic: "word problems", count: 4 },
      { category: "mathematics", topic: "geometry and angles", count: 4 },
    ],
  },
  {
    phase: "paper2-vr",
    label: "Verbal Reasoning",
    paper: 2,
    scoreBucket: 2,
    scoreBucketLabel: "Verbal Reasoning",
    colorClass: "text-neon-cyan",
    timeLimitSeconds: 20 * 60,
    questionCount: 10,
    mode: "verbal-reasoning",
    batches: [
      {
        category: "verbal_reasoning",
        topic: "synonyms and antonyms",
        count: 4,
      },
      {
        category: "verbal_reasoning",
        topic: "letter codes and cyphers",
        count: 3,
      },
      {
        category: "verbal_reasoning",
        topic: "word relationships and analogies",
        count: 3,
      },
    ],
  },
  {
    phase: "paper2-nvr",
    label: "Non-Verbal Reasoning",
    paper: 2,
    scoreBucket: 3,
    scoreBucketLabel: "Non-Verbal Reasoning",
    colorClass: "text-neon-purple",
    timeLimitSeconds: 15 * 60,
    questionCount: 8,
    mode: "non-verbal-reasoning",
    batches: [],
    visualType: "nvr",
    visualCount: 4,
  },
];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface APIQuestion {
  content: {
    stem: string;
    options: string[];
    passage?: string | null;
  };
  correctAnswer: { index: number; value: string };
  explanation: string;
  difficulty: number;
  questionType: string;
}

interface SectionQuestion {
  sectionIdx: number;
  question: APIQuestion;
  /** For NVR visual questions — index into nvrQuestions array */
  nvrIdx?: number;
  /** For spatial visual questions — index into spatialQuestions array */
  spatialIdx?: number;
  /** For cube-net visual questions — index into cubeNetQuestions array */
  cubeNetIdx?: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Maps a raw percentage score (0-1) to a Kent standardised score (69-141).
 * Uses a simplified bell-curve approximation:
 *   - 50% raw → ~100 standardised (mean)
 *   - Each 10% maps to ~10 standardised points
 *   - Clamped to [69, 141]
 */
function rawToStandardised(rawCorrect: number, total: number): number {
  if (total === 0) return 69;
  const pct = rawCorrect / total;
  // Linear mapping: 0% → 69, 50% → 105, 100% → 141
  const score = 69 + pct * (141 - 69);
  return Math.round(Math.max(69, Math.min(141, score)));
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MockTestPage() {
  const router = useRouter();
  const { currentUser } = useUser();

  /* ---- phase ---- */
  const [phase, setPhase] = useState<Phase>("intro");

  /* ---- loading state ---- */
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);

  /* ---- question data per section ---- */
  const [sectionQuestions, setSectionQuestions] = useState<SectionQuestion[][]>(
    [],
  );
  const [nvrQuestions, setNvrQuestions] = useState<NVRQuestion[]>([]);
  const [spatialQuestions, setSpatialQuestions] = useState<SpatialQuestion[]>(
    [],
  );
  const [cubeNetQuestions, setCubeNetQuestions] = useState<CubeNetQuestion[]>(
    [],
  );

  /* ---- current section / question state ---- */
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  /** answers: Map<"sectionIdx-qIdx", selectedOptionIndex> */
  const [answers, setAnswers] = useState<Map<string, number>>(new Map());
  const savedRef = useRef(false);

  /* ---- timing ---- */
  const [sectionSecondsLeft, setSectionSecondsLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sessionStartRef = useRef(0);

  /* ---- break countdown ---- */
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(10);
  const breakTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ---- computed ---- */
  const currentSection = SECTIONS[currentSectionIdx];
  const currentSectionQs = sectionQuestions[currentSectionIdx] ?? [];
  const currentQ = currentSectionQs[currentQIdx];
  const totalQuestions = SECTIONS.reduce((s, c) => s + c.questionCount, 0);

  const globalQIdx = useMemo(() => {
    let idx = 0;
    for (let i = 0; i < currentSectionIdx; i++) {
      idx += (sectionQuestions[i] ?? []).length;
    }
    return idx + currentQIdx;
  }, [currentSectionIdx, currentQIdx, sectionQuestions]);

  const timerUrgent = sectionSecondsLeft < 120 && sectionSecondsLeft > 0;

  /* ---- cleanup timers on unmount ---- */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (breakTimerRef.current) clearInterval(breakTimerRef.current);
    };
  }, []);

  /* ------------------------------------------------------------ */
  /*  Section timer management                                     */
  /* ------------------------------------------------------------ */

  const startSectionTimer = useCallback((seconds: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSectionSecondsLeft(seconds);
    timerRef.current = setInterval(() => {
      setSectionSecondsLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const stopSectionTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /* Handle timer reaching zero — advance to next break/section */
  useEffect(() => {
    if (sectionSecondsLeft !== 0) return;
    if (!SECTION_PHASES.includes(phase)) return;

    stopSectionTimer();
    advanceFromSection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionSecondsLeft]);

  /* ------------------------------------------------------------ */
  /*  Break timer management                                       */
  /* ------------------------------------------------------------ */

  const startBreakTimer = useCallback(
    (nextPhase: Phase) => {
      if (breakTimerRef.current) clearInterval(breakTimerRef.current);
      setBreakSecondsLeft(10);
      breakTimerRef.current = setInterval(() => {
        setBreakSecondsLeft((prev) => {
          if (prev <= 1) {
            if (breakTimerRef.current) clearInterval(breakTimerRef.current);
            breakTimerRef.current = null;
            startSection(nextPhase);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function startSection(p: Phase) {
    if (breakTimerRef.current) {
      clearInterval(breakTimerRef.current);
      breakTimerRef.current = null;
    }
    const idx = SECTIONS.findIndex((s) => s.phase === p);
    if (idx < 0) return;
    setCurrentSectionIdx(idx);
    setCurrentQIdx(0);
    setSelectedAnswer(null);
    setPhase(p);
    startSectionTimer(SECTIONS[idx].timeLimitSeconds);
  }

  function advanceFromSection() {
    const currentPhaseIdx = SECTION_PHASES.indexOf(phase as Phase);
    if (currentPhaseIdx < 0) return;

    if (currentPhaseIdx === SECTION_PHASES.length - 1) {
      // Last section — go to saving
      setPhase("saving");
      return;
    }

    // Determine break phase
    const breakPhases: Phase[] = [
      "paper1-break",
      "paper-break",
      "paper2-break",
    ];
    const breakPhase = breakPhases[currentPhaseIdx];
    const nextSectionPhase = SECTION_PHASES[currentPhaseIdx + 1];

    if (breakPhase) {
      setPhase(breakPhase);
      startBreakTimer(nextSectionPhase);
    } else {
      startSection(nextSectionPhase);
    }
  }

  /* ------------------------------------------------------------ */
  /*  Load all questions                                           */
  /* ------------------------------------------------------------ */

  async function loadAllQuestions() {
    setPhase("loading");
    setLoadProgress(0);
    setLoadError(null);

    const totalToLoad = SECTIONS.reduce((s, c) => s + c.questionCount, 0);

    // Fetch seen stems for dedup
    const seenStems = currentUser
      ? await getSeenStems(currentUser.id)
      : undefined;

    const allSectionQs: SectionQuestion[][] = [];
    let nvrQs: NVRQuestion[] = [];
    let spatialQs: SpatialQuestion[] = [];
    let cubeNetQs: CubeNetQuestion[] = [];

    try {
      for (let sIdx = 0; sIdx < SECTIONS.length; sIdx++) {
        const section = SECTIONS[sIdx];
        const sectionQs: SectionQuestion[] = [];

        // Generate visual questions client-side
        if (section.visualType === "nvr") {
          const nvrCount = section.visualCount ?? 4;
          const spatialCount = Math.max(
            0,
            section.questionCount - nvrCount - 2,
          ); // 2 cube nets
          const cubeCount = section.questionCount - nvrCount - spatialCount;

          const newNvr = generateNVRQuestions(nvrCount, 4);
          const newSpatial = generateSpatialQuestions(spatialCount, 4);
          const newCubeNet = generateCubeNetQuestions(cubeCount, 4);

          const nvrStartIdx = nvrQs.length;
          const spatialStartIdx = spatialQs.length;
          const cubeNetStartIdx = cubeNetQs.length;

          nvrQs = [...nvrQs, ...newNvr];
          spatialQs = [...spatialQs, ...newSpatial];
          cubeNetQs = [...cubeNetQs, ...newCubeNet];

          // Create placeholder APIQuestion entries for NVR questions
          for (let i = 0; i < nvrCount; i++) {
            const nq = newNvr[i];
            sectionQs.push({
              sectionIdx: sIdx,
              nvrIdx: nvrStartIdx + i,
              question: {
                content: {
                  stem: nq.prompt ?? "Which shape comes next?",
                  options: nq.options.map((_, j) => OPTION_LABELS[j]),
                },
                correctAnswer: {
                  index: nq.correctIndex,
                  value: OPTION_LABELS[nq.correctIndex],
                },
                explanation: nq.explanation,
                difficulty: nq.difficulty,
                questionType: "nvr",
              },
            });
          }

          // Spatial questions
          for (let i = 0; i < spatialCount; i++) {
            const sq = newSpatial[i];
            sectionQs.push({
              sectionIdx: sIdx,
              spatialIdx: spatialStartIdx + i,
              question: {
                content: {
                  stem: sq.prompt,
                  options: sq.options.map((_, j) => OPTION_LABELS[j]),
                },
                correctAnswer: {
                  index: sq.correctIndex,
                  value: OPTION_LABELS[sq.correctIndex],
                },
                explanation: sq.explanation,
                difficulty: sq.difficulty,
                questionType: "spatial",
              },
            });
          }

          // Cube net questions
          for (let i = 0; i < cubeCount; i++) {
            const cq = newCubeNet[i];
            sectionQs.push({
              sectionIdx: sIdx,
              cubeNetIdx: cubeNetStartIdx + i,
              question: {
                content: {
                  stem: "Which cube can be made from this net?",
                  options: cq.options.map((_, j) => OPTION_LABELS[j]),
                },
                correctAnswer: {
                  index: cq.correctIndex,
                  value: OPTION_LABELS[cq.correctIndex],
                },
                explanation: cq.explanation,
                difficulty: cq.difficulty,
                questionType: "cube_net",
              },
            });
          }

          setLoadProgress((prev) => prev + section.questionCount);
        } else {
          // Text-based questions from banks / API
          const fetchPromises: Promise<void>[] = [];

          for (const batch of section.batches) {
            if (hasBankForTopic(batch.topic)) {
              const banked = getQuestionsFromBank(
                batch.topic,
                4,
                batch.count,
                seenStems,
              );
              if (banked) {
                for (const bq of banked) {
                  sectionQs.push({
                    sectionIdx: sIdx,
                    question: bankedToAPIQuestion(bq),
                  });
                }
                setLoadProgress((prev) => prev + batch.count);
                continue;
              }
            }

            fetchPromises.push(
              fetch("/api/questions/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  category: batch.category,
                  topic: batch.topic,
                  difficulty: 4,
                  count: batch.count,
                  skillLevel: 4.0,
                }),
              })
                .then((res) => {
                  if (!res.ok) throw new Error(`API error ${res.status}`);
                  return res.json();
                })
                .then((data) => {
                  for (const q of data.questions ?? []) {
                    sectionQs.push({ sectionIdx: sIdx, question: q });
                  }
                  setLoadProgress((prev) => prev + batch.count);
                }),
            );
          }

          await Promise.all(fetchPromises);
        }

        // Shuffle within section
        allSectionQs.push(shuffle(sectionQs));
      }

      setSectionQuestions(allSectionQs);
      setNvrQuestions(nvrQs);
      setSpatialQuestions(spatialQs);
      setCubeNetQuestions(cubeNetQs);
      setAnswers(new Map());
      setCurrentSectionIdx(0);
      setCurrentQIdx(0);
      setSelectedAnswer(null);
      sessionStartRef.current = Date.now();

      // Start first section
      setPhase("paper1-english");
      startSectionTimer(SECTIONS[0].timeLimitSeconds);
    } catch (err) {
      setLoadError(
        err instanceof Error ? err.message : "Failed to load questions",
      );
      setPhase("intro");
    }
  }

  /* ------------------------------------------------------------ */
  /*  Save results                                                 */
  /* ------------------------------------------------------------ */

  useEffect(() => {
    if (phase !== "saving" || savedRef.current) return;
    savedRef.current = true;
    stopSectionTimer();

    const timeTaken = Math.round(
      (Date.now() - sessionStartRef.current) / 1000,
    );

    // Compute scores
    let totalCorrect = 0;
    let totalQs = 0;
    for (let sIdx = 0; sIdx < sectionQuestions.length; sIdx++) {
      const qs = sectionQuestions[sIdx];
      for (let qIdx = 0; qIdx < qs.length; qIdx++) {
        totalQs++;
        const key = `${sIdx}-${qIdx}`;
        const ans = answers.get(key);
        if (ans !== undefined && ans === qs[qIdx].question.correctAnswer.index) {
          totalCorrect++;
        }
      }
    }

    (async () => {
      try {
        if (currentUser) {
          const session = await saveSession({
            mode: "random-mix",
            score: totalCorrect,
            total: totalQs,
            timeTakenSeconds: timeTaken,
            difficulty: 4,
            userId: currentUser.id,
            topic: "mock-test",
            isMockTest: true,
          });

          if (session) {
            const qaInserts: QuestionAnswerInsert[] = [];
            for (let sIdx = 0; sIdx < sectionQuestions.length; sIdx++) {
              const section = SECTIONS[sIdx];
              const qs = sectionQuestions[sIdx];
              for (let qIdx = 0; qIdx < qs.length; qIdx++) {
                const sq = qs[qIdx];
                const key = `${sIdx}-${qIdx}`;
                const selectedIdx = answers.get(key) ?? null;
                qaInserts.push({
                  session_id: session.id,
                  user_id: currentUser.id,
                  mode: section.mode,
                  topic: sq.question.questionType ?? section.label.toLowerCase(),
                  difficulty: sq.question.difficulty ?? 4,
                  stem: sq.question.content.stem,
                  options: sq.question.content.options,
                  correct_index: sq.question.correctAnswer.index,
                  selected_index: selectedIdx,
                  is_correct:
                    selectedIdx === sq.question.correctAnswer.index,
                  explanation: sq.question.explanation,
                  time_taken_ms: null,
                });
              }
            }

            await saveQuestionAnswers(qaInserts).catch(() => {
              console.warn("[MockTest] Failed to save Q+A records");
            });
          }
        }
      } catch (err) {
        console.error("[MockTest] Error saving:", err);
      } finally {
        setPhase("results");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  /* ------------------------------------------------------------ */
  /*  Handlers                                                     */
  /* ------------------------------------------------------------ */

  function handleSelectAnswer(optionIndex: number) {
    setSelectedAnswer(optionIndex);
  }

  function handleConfirmAndNext() {
    if (selectedAnswer === null) return;

    // Lock in answer
    const key = `${currentSectionIdx}-${currentQIdx}`;
    setAnswers((prev) => {
      const next = new Map(prev);
      next.set(key, selectedAnswer);
      return next;
    });

    setSelectedAnswer(null);

    if (currentQIdx < currentSectionQs.length - 1) {
      setCurrentQIdx((prev) => prev + 1);
    } else {
      // Section complete
      stopSectionTimer();
      advanceFromSection();
    }
  }

  /* ================================================================ */
  /*  Render                                                          */
  /* ================================================================ */

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <p className="font-mono text-lg text-neon-amber text-glow-amber">
          Select a user first
        </p>
        <Button variant="outline" onClick={() => router.push("/")}>
          Back to Home
        </Button>
      </div>
    );
  }

  /* ================================================================ */
  /*  Intro                                                           */
  /* ================================================================ */
  if (phase === "intro") {
    return (
      <div className="flex flex-col items-center gap-8 py-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-5xl">{"\uD83D\uDCCB"}</span>
          <h1 className="font-mono text-3xl font-bold tracking-widest text-neon-pink text-glow-pink sm:text-4xl">
            MOCK TEST
          </h1>
          <p className="max-w-md text-sm text-muted-foreground">
            Simulate the real Kent Grammar School 11+ GL Assessment. Two papers,
            four timed sections, Kent standardised scoring.
          </p>
        </div>

        <Card className="w-full max-w-md border-border bg-surface">
          <CardContent className="flex flex-col gap-4 px-6 py-6">
            {/* Paper 1 */}
            <div className="flex flex-col gap-2">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Paper 1
              </p>
              <div className="flex items-center justify-between pl-2">
                <span className="font-mono text-xs font-bold text-neon-amber">
                  English
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  12 Qs &middot; 25 min
                </span>
              </div>
              <div className="flex items-center justify-between pl-2">
                <span className="font-mono text-xs font-bold text-neon-green">
                  Mathematics
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  12 Qs &middot; 25 min
                </span>
              </div>
            </div>

            <div className="border-t border-border/40" />

            {/* Paper 2 */}
            <div className="flex flex-col gap-2">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Paper 2
              </p>
              <div className="flex items-center justify-between pl-2">
                <span className="font-mono text-xs font-bold text-neon-cyan">
                  Verbal Reasoning
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  10 Qs &middot; 20 min
                </span>
              </div>
              <div className="flex items-center justify-between pl-2">
                <span className="font-mono text-xs font-bold text-neon-purple">
                  Non-Verbal / Spatial
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  8 Qs &middot; 15 min
                </span>
              </div>
            </div>

            <div className="border-t border-border/40" />

            <div className="flex items-center gap-3">
              <span className="text-xl">{"\u23F1\uFE0F"}</span>
              <div>
                <p className="font-mono text-sm font-bold text-neon-amber">
                  {totalQuestions} questions &middot; ~85 minutes
                </p>
                <p className="text-xs text-muted-foreground">
                  Each section has its own strict timer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">{"\uD83D\uDEAB"}</span>
              <div>
                <p className="font-mono text-sm font-bold text-foreground">
                  No going back
                </p>
                <p className="text-xs text-muted-foreground">
                  Select your answer and move on. Short breaks between sections.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">{"\uD83D\uDCCA"}</span>
              <div>
                <p className="font-mono text-sm font-bold text-foreground">
                  Kent scoring
                </p>
                <p className="text-xs text-muted-foreground">
                  3 standardised scores (69-141 each). Pass: total {"\u2265"}{" "}
                  332, no score below 106.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {loadError && (
          <p className="text-sm text-neon-amber">{loadError}</p>
        )}

        <div className="flex w-full max-w-md flex-col gap-3">
          <Button
            className="w-full bg-neon-pink font-mono text-sm font-bold uppercase tracking-wider text-background hover:bg-neon-pink/90"
            onClick={loadAllQuestions}
          >
            Begin Mock Test
          </Button>
          <Button
            variant="outline"
            className="w-full font-mono text-xs uppercase tracking-wider"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Loading                                                         */
  /* ================================================================ */
  if (phase === "loading") {
    const pct = Math.round((loadProgress / totalQuestions) * 100);

    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <div className="relative size-16">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-neon-pink" />
          <div
            className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-neon-cyan"
            style={{
              animationDirection: "reverse",
              animationDuration: "0.8s",
            }}
          />
        </div>
        <p className="animate-pulse font-mono text-sm text-muted-foreground">
          Generating {totalQuestions} questions...
        </p>
        <div className="w-full max-w-xs">
          <Progress value={pct} className="h-1.5" />
          <p className="mt-2 text-center font-mono text-xs text-muted-foreground">
            {loadProgress}/{totalQuestions}
          </p>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Break screens                                                   */
  /* ================================================================ */
  if (
    phase === "paper1-break" ||
    phase === "paper-break" ||
    phase === "paper2-break"
  ) {
    const breakConfig: Record<
      string,
      { title: string; next: string; nextPhase: Phase }
    > = {
      "paper1-break": {
        title: "Short break",
        next: "Mathematics",
        nextPhase: "paper1-maths",
      },
      "paper-break": {
        title: "Paper 1 Complete!",
        next: "Paper 2: Verbal Reasoning",
        nextPhase: "paper2-vr",
      },
      "paper2-break": {
        title: "Short break",
        next: "Non-Verbal Reasoning",
        nextPhase: "paper2-nvr",
      },
    };

    const bc = breakConfig[phase];

    return (
      <div className="flex flex-col items-center gap-8 py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-5xl">
            {phase === "paper-break" ? "\u2705" : "\u2615"}
          </span>
          <h2 className="font-mono text-2xl font-bold tracking-widest text-neon-cyan text-glow-cyan">
            {bc.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            Next up: <strong>{bc.next}</strong>
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-4xl font-bold tabular-nums text-neon-pink text-glow-pink">
            {breakSecondsLeft}
          </span>
          <p className="text-xs text-muted-foreground">
            Auto-advancing in {breakSecondsLeft}s
          </p>
        </div>

        <Button
          className="bg-neon-pink font-mono text-sm font-bold uppercase tracking-wider text-background hover:bg-neon-pink/90"
          onClick={() => startSection(bc.nextPhase)}
        >
          Start Now
        </Button>
      </div>
    );
  }

  /* ================================================================ */
  /*  Saving                                                          */
  /* ================================================================ */
  if (phase === "saving") {
    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <div className="relative size-16">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-neon-pink" />
          <div
            className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-neon-cyan"
            style={{
              animationDirection: "reverse",
              animationDuration: "0.8s",
            }}
          />
        </div>
        <p className="animate-pulse font-mono text-sm text-muted-foreground">
          Calculating your Kent scores...
        </p>
      </div>
    );
  }

  /* ================================================================ */
  /*  Results                                                         */
  /* ================================================================ */
  if (phase === "results") {
    // Calculate per-bucket scores
    const buckets: Record<number, { correct: number; total: number }> = {
      1: { correct: 0, total: 0 },
      2: { correct: 0, total: 0 },
      3: { correct: 0, total: 0 },
    };

    for (let sIdx = 0; sIdx < sectionQuestions.length; sIdx++) {
      const section = SECTIONS[sIdx];
      const qs = sectionQuestions[sIdx];
      for (let qIdx = 0; qIdx < qs.length; qIdx++) {
        const bucket = buckets[section.scoreBucket];
        bucket.total++;
        const key = `${sIdx}-${qIdx}`;
        const ans = answers.get(key);
        if (
          ans !== undefined &&
          ans === qs[qIdx].question.correctAnswer.index
        ) {
          bucket.correct++;
        }
      }
    }

    const score1 = rawToStandardised(buckets[1].correct, buckets[1].total);
    const score2 = rawToStandardised(buckets[2].correct, buckets[2].total);
    const score3 = rawToStandardised(buckets[3].correct, buckets[3].total);
    const totalScore = score1 + score2 + score3;
    const minScore = Math.min(score1, score2, score3);
    const passed = totalScore >= 332 && minScore >= 106;

    const totalCorrect = buckets[1].correct + buckets[2].correct + buckets[3].correct;
    const totalQs = buckets[1].total + buckets[2].total + buckets[3].total;
    const rawPct = totalQs > 0 ? Math.round((totalCorrect / totalQs) * 100) : 0;

    const timeTaken = Math.round(
      (Date.now() - sessionStartRef.current) / 1000,
    );
    const mins = Math.floor(timeTaken / 60);
    const secs = timeTaken % 60;

    const scoreRows = [
      {
        label: "English & Maths",
        score: score1,
        correct: buckets[1].correct,
        total: buckets[1].total,
        colorClass: "text-neon-amber",
      },
      {
        label: "Verbal Reasoning",
        score: score2,
        correct: buckets[2].correct,
        total: buckets[2].total,
        colorClass: "text-neon-cyan",
      },
      {
        label: "Non-Verbal Reasoning",
        score: score3,
        correct: buckets[3].correct,
        total: buckets[3].total,
        colorClass: "text-neon-purple",
      },
    ];

    return (
      <div className="flex flex-col items-center gap-8 py-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-5xl">{"\uD83D\uDCCB"}</span>
          <h1 className="font-mono text-3xl font-bold tracking-widest text-neon-pink text-glow-pink">
            MOCK TEST COMPLETE
          </h1>
        </div>

        {/* Total score card */}
        <Card
          className={[
            "w-full max-w-md border-2",
            passed
              ? "border-neon-green/40 bg-neon-green/5"
              : "border-neon-amber/40 bg-neon-amber/5",
          ].join(" ")}
        >
          <CardContent className="flex flex-col items-center gap-4 px-6 py-6">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Kent Total Score
            </p>
            <span
              className={[
                "font-mono text-6xl font-bold tabular-nums",
                passed
                  ? "text-neon-green text-glow-green"
                  : "text-neon-amber text-glow-amber",
              ].join(" ")}
            >
              {totalScore}
            </span>
            <span className="font-mono text-sm text-muted-foreground">
              out of 423 (pass: {"\u2265"} 332, no score below 106)
            </span>
            <Badge
              variant="outline"
              className={[
                "px-4 py-1 font-mono text-sm font-bold",
                passed
                  ? "border-neon-green/60 text-neon-green"
                  : "border-neon-amber/60 text-neon-amber",
              ].join(" ")}
            >
              {passed ? "PASS ESTIMATE" : "BELOW PASS MARK"}
            </Badge>
          </CardContent>
        </Card>

        {/* 3 component scores */}
        <Card className="w-full max-w-md border-border bg-surface">
          <CardContent className="flex flex-col gap-4 px-6 py-6">
            <p className="text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Component Scores
            </p>
            {scoreRows.map((row) => (
              <div key={row.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold ${row.colorClass}`}
                  >
                    {row.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {row.correct}/{row.total} raw
                    </span>
                    <Badge
                      variant="outline"
                      className={[
                        "font-mono text-xs font-bold",
                        row.score >= 106
                          ? "border-neon-green/40 text-neon-green"
                          : "border-neon-amber/40 text-neon-amber",
                      ].join(" ")}
                    >
                      {row.score}
                    </Badge>
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/30">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${((row.score - 69) / (141 - 69)) * 100}%`,
                      background: row.colorClass.includes("cyan")
                        ? "oklch(0.78 0.18 195)"
                        : row.colorClass.includes("green")
                          ? "oklch(0.75 0.18 145)"
                          : row.colorClass.includes("amber")
                            ? "oklch(0.78 0.15 75)"
                            : "oklch(0.75 0.18 310)",
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Raw score + time */}
        <div className="flex items-center gap-4">
          <Badge
            variant="outline"
            className="font-mono text-xs text-muted-foreground"
          >
            {totalCorrect}/{totalQs} correct ({rawPct}%)
          </Badge>
          <Badge
            variant="outline"
            className="font-mono text-xs text-muted-foreground"
          >
            {mins}m {secs.toString().padStart(2, "0")}s
          </Badge>
        </div>

        {/* Encouragement */}
        <Card className="w-full max-w-md border-neon-pink/20 bg-neon-pink/5">
          <CardContent className="px-6 py-4">
            <p className="font-mono text-sm text-foreground">
              {passed
                ? "Great result! You're on track to pass the Kent Test."
                : totalScore >= 300
                  ? "Getting closer! Focus on your weaker areas and keep practising."
                  : "Keep going! Regular practice will build your score. Focus on one subject at a time."}
            </p>
            {!passed && minScore < 106 && (
              <p className="mt-2 font-mono text-xs text-neon-amber">
                Note: Even if your total reaches 332, each component score must
                be at least 106 to pass.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex w-full max-w-md flex-col gap-3">
          <Button
            className="w-full bg-neon-pink font-mono text-sm font-bold uppercase tracking-wider text-background hover:bg-neon-pink/90"
            onClick={() => {
              savedRef.current = false;
              setPhase("intro");
              setSectionQuestions([]);
              setNvrQuestions([]);
              setSpatialQuestions([]);
              setCubeNetQuestions([]);
              setAnswers(new Map());
              setCurrentSectionIdx(0);
              setCurrentQIdx(0);
              setSelectedAnswer(null);
              setLoadProgress(0);
            }}
          >
            Take Another Mock
          </Button>
          <Button
            variant="outline"
            className="w-full font-mono text-xs uppercase tracking-wider"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Testing phase (active section)                                  */
  /* ================================================================ */

  if (!currentQ) return null;

  const isVisualNVR = currentQ.nvrIdx !== undefined;
  const isVisualSpatial = currentQ.spatialIdx !== undefined;
  const isVisualCubeNet = currentQ.cubeNetIdx !== undefined;
  const isVisual = isVisualNVR || isVisualSpatial || isVisualCubeNet;

  return (
    <div className="flex flex-col gap-6">
      {/* ---- Top bar ---- */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-border/60 font-mono text-[10px] text-muted-foreground"
          >
            Paper {currentSection.paper}
          </Badge>
          <Badge
            variant="outline"
            className={`font-mono text-[10px] ${currentSection.colorClass}`}
          >
            {currentSection.label}
          </Badge>
        </div>

        <Badge
          variant="outline"
          className="border-border/60 font-mono text-xs text-muted-foreground"
        >
          Q {currentQIdx + 1}/{currentSectionQs.length}
        </Badge>

        <span
          className={[
            "font-mono text-sm font-bold tabular-nums",
            timerUrgent
              ? "animate-pulse text-neon-amber text-glow-amber"
              : "text-muted-foreground",
          ].join(" ")}
        >
          {formatTime(sectionSecondsLeft)}
        </span>
      </div>

      {/* ---- Progress (section-level) ---- */}
      <Progress
        value={((currentQIdx + 1) / currentSectionQs.length) * 100}
        className="h-1"
      />

      {/* ---- Visual question display ---- */}
      {isVisualNVR && nvrQuestions[currentQ.nvrIdx!] && (
        <NVRQuestionDisplay
          question={nvrQuestions[currentQ.nvrIdx!]}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
        />
      )}

      {isVisualSpatial && spatialQuestions[currentQ.spatialIdx!] && (
        <SpatialQuestionDisplay
          question={spatialQuestions[currentQ.spatialIdx!]}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
        />
      )}

      {isVisualCubeNet && cubeNetQuestions[currentQ.cubeNetIdx!] && (
        <CubeNetQuestionDisplay
          question={cubeNetQuestions[currentQ.cubeNetIdx!]}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
        />
      )}

      {/* ---- Text-based question display ---- */}
      {!isVisual && (
        <>
          {/* Reading passage */}
          {currentQ.question.content.passage && (
            <Card className="border-border/60 bg-muted/30">
              <CardContent className="px-6 py-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Read the passage:
                </p>
                <p className="text-sm italic leading-relaxed text-foreground/90">
                  {currentQ.question.content.passage}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Question stem */}
          <Card className="border-border bg-surface">
            <CardContent className="px-6 py-8">
              <p className="text-lg font-medium leading-relaxed sm:text-xl">
                {currentQ.question.content.stem}
              </p>
            </CardContent>
          </Card>

          {/* Text options */}
          <div className="flex flex-col gap-3">
            {currentQ.question.content.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className={[
                    "group flex w-full items-center gap-4 rounded-lg border px-4 py-3 text-left transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isSelected
                      ? "border-neon-pink/60 bg-neon-pink/10"
                      : "border-border bg-surface hover:bg-surface-hover hover:border-border/80",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-bold",
                      isSelected
                        ? "border-neon-pink/60 text-neon-pink"
                        : "border-border/60 text-muted-foreground group-hover:text-foreground",
                    ].join(" ")}
                  >
                    {OPTION_LABELS[idx]}
                  </span>
                  <span className="text-sm">{option}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* ---- Confirm + Next ---- */}
      {selectedAnswer !== null && (
        <div className="flex justify-end">
          <Button
            onClick={handleConfirmAndNext}
            className="bg-neon-pink font-mono text-xs font-bold uppercase tracking-wider text-background hover:bg-neon-pink/90"
          >
            {currentQIdx < currentSectionQs.length - 1
              ? "Next Question"
              : currentSectionIdx < SECTIONS.length - 1
                ? "Finish Section"
                : "Finish Test"}
          </Button>
        </div>
      )}
    </div>
  );
}
