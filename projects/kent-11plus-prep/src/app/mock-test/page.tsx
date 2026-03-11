"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useCountdown } from "@/hooks/use-countdown";
import { useUser } from "@/contexts/user-context";
import { saveSession } from "@/lib/supabase/sessions";
import {
  saveQuestionAnswers,
  type QuestionAnswerInsert,
  getSeenStems,
} from "@/lib/supabase/question-answers";
import { OPTION_LABELS } from "@/lib/constants";
import type { PracticeMode } from "@/lib/types";
import { getQuestionsFromBank, hasBankForTopic, bankedToAPIQuestion } from "@/lib/question-banks";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const MOCK_DURATION_SECONDS = 50 * 60; // 50 minutes
const KENT_MIN_SCORE = 230;
const KENT_MAX_SCORE = 423;
const KENT_PASS_MARK = 332;

interface SubjectConfig {
  mode: PracticeMode;
  label: string;
  colorClass: string;
  batches: { category: string; topic: string; count: number }[];
}

/**
 * Question distribution across 4 subjects totalling 50 questions.
 * Each subject has 2-3 API batches with different topics for variety.
 */
const MOCK_SUBJECTS: SubjectConfig[] = [
  {
    mode: "verbal-reasoning",
    label: "Verbal Reasoning",
    colorClass: "text-neon-cyan",
    batches: [
      { category: "verbal_reasoning", topic: "synonyms and antonyms", count: 5 },
      { category: "verbal_reasoning", topic: "letter codes and cyphers", count: 4 },
      { category: "verbal_reasoning", topic: "word relationships and analogies", count: 4 },
    ],
  },
  {
    mode: "maths",
    label: "Mathematics",
    colorClass: "text-neon-green",
    batches: [
      { category: "mathematics", topic: "fractions decimals and percentages", count: 5 },
      { category: "mathematics", topic: "word problems", count: 4 },
      { category: "mathematics", topic: "geometry and angles", count: 4 },
    ],
  },
  {
    mode: "english",
    label: "English",
    colorClass: "text-neon-amber",
    batches: [
      { category: "english", topic: "spelling and vocabulary", count: 4 },
      { category: "english", topic: "grammar and punctuation", count: 4 },
      { category: "english", topic: "sentence completion", count: 4 },
    ],
  },
  {
    mode: "comprehension",
    label: "Comprehension",
    colorClass: "text-neon-pink",
    batches: [
      { category: "english", topic: "reading comprehension", count: 6 },
      { category: "english", topic: "inference and deduction", count: 6 },
    ],
  },
];

const TOTAL_QUESTIONS = MOCK_SUBJECTS.reduce(
  (sum, s) => sum + s.batches.reduce((bs, b) => bs + b.count, 0),
  0,
);

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

interface MockQuestion {
  subjectMode: string;
  subjectLabel: string;
  subjectColor: string;
  topic: string;
  question: APIQuestion;
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

function calculateKentScore(rawScore: number, total: number): number {
  const pct = rawScore / total;
  return Math.round(KENT_MIN_SCORE + pct * (KENT_MAX_SCORE - KENT_MIN_SCORE));
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MockTestPage() {
  const router = useRouter();
  const { currentUser } = useUser();

  /* ---- phase ---- */
  const [phase, setPhase] = useState<
    "intro" | "loading" | "testing" | "saving" | "results"
  >("intro");

  /* ---- loading state ---- */
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);

  /* ---- test state ---- */
  const [questions, setQuestions] = useState<MockQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const savedRef = useRef(false);

  /* ---- timing ---- */
  const sessionStartRef = useRef(0);
  const questionStartRef = useRef(0);
  const questionTimingsRef = useRef<(number | null)[]>([]);

  /* ---- computed ---- */
  const currentQuestion = questions[currentIdx];
  const hasAnswered = selectedAnswer !== null;

  const correctCount = useMemo(
    () =>
      answers.filter(
        (ans, idx) =>
          ans !== null &&
          questions[idx] &&
          ans === questions[idx].question.correctAnswer.index,
      ).length,
    [answers, questions],
  );

  /* ---- countdown timer ---- */
  const handleTimeUp = useCallback(() => {
    setPhase("saving");
  }, []);

  const { secondsLeft, start: startTimer, pause: pauseTimer, display } =
    useCountdown(MOCK_DURATION_SECONDS, handleTimeUp);

  const timerUrgent = secondsLeft < 300 && secondsLeft > 0; // last 5 min

  /* ------------------------------------------------------------ */
  /*  Load all questions                                           */
  /* ------------------------------------------------------------ */

  async function loadAllQuestions() {
    setPhase("loading");
    setLoadProgress(0);
    setLoadError(null);

    const allQuestions: MockQuestion[] = [];
    const fetchPromises: Promise<void>[] = [];

    // Fetch all stems this user has already seen (one query, all topics)
    const seenStems = currentUser
      ? await getSeenStems(currentUser.id)
      : undefined;

    for (const subject of MOCK_SUBJECTS) {
      for (const batch of subject.batches) {
        // Try static question bank first (instant, no API call)
        if (hasBankForTopic(batch.topic)) {
          const banked = getQuestionsFromBank(batch.topic, 4, batch.count, seenStems);
          if (banked) {
            for (const bq of banked) {
              allQuestions.push({
                subjectMode: subject.mode,
                subjectLabel: subject.label,
                subjectColor: subject.colorClass,
                topic: batch.topic,
                question: bankedToAPIQuestion(bq),
              });
            }
            setLoadProgress((prev) => prev + batch.count);
            continue;
          }
        }

        // Fall back to AI generation
        fetchPromises.push(
          fetch("/api/questions/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              category: batch.category,
              topic: batch.topic,
              difficulty: 4, // Kent test standard
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
                allQuestions.push({
                  subjectMode: subject.mode,
                  subjectLabel: subject.label,
                  subjectColor: subject.colorClass,
                  topic: batch.topic,
                  question: q,
                });
              }
              setLoadProgress((prev) => prev + batch.count);
            }),
        );
      }
    }

    try {
      await Promise.all(fetchPromises);
      const shuffled = shuffle(allQuestions);
      setQuestions(shuffled);
      setAnswers(new Array(shuffled.length).fill(null));
      questionTimingsRef.current = new Array(shuffled.length).fill(null);
      setCurrentIdx(0);
      setSelectedAnswer(null);
      sessionStartRef.current = Date.now();
      questionStartRef.current = Date.now();
      setPhase("testing");
      startTimer();
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
    pauseTimer();

    const timeTaken = Math.round(
      (Date.now() - sessionStartRef.current) / 1000,
    );

    (async () => {
      try {
        if (currentUser) {
          const session = await saveSession({
            mode: "random-mix",
            score: correctCount,
            total: questions.length,
            timeTakenSeconds: timeTaken,
            difficulty: 4,
            userId: currentUser.id,
            topic: "mock-test",
            isMockTest: true,
          });

          if (session) {
            const qaInserts: QuestionAnswerInsert[] = questions.map(
              (mq, idx) => ({
                session_id: session.id,
                user_id: currentUser.id,
                mode: mq.subjectMode,
                topic: mq.topic,
                difficulty: mq.question.difficulty ?? 4,
                stem: mq.question.content.stem,
                options: mq.question.content.options,
                correct_index: mq.question.correctAnswer.index,
                selected_index: answers[idx],
                is_correct:
                  answers[idx] === mq.question.correctAnswer.index,
                explanation: mq.question.explanation,
                time_taken_ms: questionTimingsRef.current[idx],
              }),
            );

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
  }, [phase, correctCount, questions, answers, currentUser, pauseTimer]);

  /* ------------------------------------------------------------ */
  /*  Handlers                                                     */
  /* ------------------------------------------------------------ */

  function handleSelectAnswer(optionIndex: number) {
    // Allow changing selection before confirming
    setSelectedAnswer(optionIndex);
  }

  function handleConfirmAndNext() {
    if (selectedAnswer === null) return;

    // Lock in answer
    const timeTakenMs = Date.now() - questionStartRef.current;
    questionTimingsRef.current[currentIdx] = timeTakenMs;

    setAnswers((prev) => {
      const next = [...prev];
      next[currentIdx] = selectedAnswer;
      return next;
    });

    setSelectedAnswer(null);
    questionStartRef.current = Date.now();

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setPhase("saving");
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
            Simulate the real Kent Grammar School test. Questions are at Kent
            Test difficulty. The timer is strict.
          </p>
        </div>

        <Card className="w-full max-w-md border-border bg-surface">
          <CardContent className="flex flex-col gap-4 px-6 py-6">
            <div className="flex items-center gap-3">
              <span className="text-xl">{"\uD83D\uDCDD"}</span>
              <div>
                <p className="font-mono text-sm font-bold text-foreground">
                  {TOTAL_QUESTIONS} questions
                </p>
                <p className="text-xs text-muted-foreground">
                  Mixed across all 4 subjects
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pl-9">
              {MOCK_SUBJECTS.map((s) => {
                const count = s.batches.reduce((a, b) => a + b.count, 0);
                return (
                  <div
                    key={s.mode}
                    className="flex items-center justify-between"
                  >
                    <span
                      className={`font-mono text-xs font-bold ${s.colorClass}`}
                    >
                      {s.label}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {count} Qs
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 border-t border-border/40 pt-4">
              <span className="text-xl">{"\u23F1\uFE0F"}</span>
              <div>
                <p className="font-mono text-sm font-bold text-neon-amber">
                  50 minutes (strict)
                </p>
                <p className="text-xs text-muted-foreground">
                  Test ends when time runs out
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
                  Select your answer and move on
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
                  Results mapped to Kent Test standardised scores (pass: 332+)
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
    const pct = Math.round((loadProgress / TOTAL_QUESTIONS) * 100);

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
          Generating {TOTAL_QUESTIONS} questions...
        </p>
        <div className="w-full max-w-xs">
          <Progress value={pct} className="h-1.5" />
          <p className="mt-2 text-center font-mono text-xs text-muted-foreground">
            {loadProgress}/{TOTAL_QUESTIONS}
          </p>
        </div>
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
          Calculating your Kent score...
        </p>
      </div>
    );
  }

  /* ================================================================ */
  /*  Results                                                         */
  /* ================================================================ */
  if (phase === "results") {
    const totalAnswered = answers.filter((a) => a !== null).length;
    const rawPct = Math.round((correctCount / questions.length) * 100);
    const kentScore = calculateKentScore(correctCount, questions.length);
    const passed = kentScore >= KENT_PASS_MARK;
    const timeTaken = Math.round(
      (Date.now() - sessionStartRef.current) / 1000,
    );
    const mins = Math.floor(timeTaken / 60);
    const secs = timeTaken % 60;

    // Per-subject breakdown
    const subjectResults = MOCK_SUBJECTS.map((subject) => {
      const subjectQs = questions.filter(
        (q) => q.subjectMode === subject.mode,
      );
      const subjectCorrect = subjectQs.filter((q, _) => {
        const idx = questions.indexOf(q);
        return answers[idx] === q.question.correctAnswer.index;
      }).length;
      return {
        ...subject,
        total: subjectQs.length,
        correct: subjectCorrect,
        pct:
          subjectQs.length > 0
            ? Math.round((subjectCorrect / subjectQs.length) * 100)
            : 0,
      };
    });

    return (
      <div className="flex flex-col items-center gap-8 py-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-5xl">{"\uD83D\uDCCB"}</span>
          <h1 className="font-mono text-3xl font-bold tracking-widest text-neon-pink text-glow-pink">
            MOCK TEST COMPLETE
          </h1>
        </div>

        {/* Kent score card */}
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
              Estimated Kent Score
            </p>
            <span
              className={[
                "font-mono text-6xl font-bold tabular-nums",
                passed
                  ? "text-neon-green text-glow-green"
                  : "text-neon-amber text-glow-amber",
              ].join(" ")}
            >
              {kentScore}
            </span>
            <span className="font-mono text-sm text-muted-foreground">
              out of {KENT_MAX_SCORE} (pass mark: {KENT_PASS_MARK})
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

        {/* Raw score + time */}
        <div className="flex items-center gap-4">
          <Badge
            variant="outline"
            className="font-mono text-xs text-muted-foreground"
          >
            {correctCount}/{questions.length} correct ({rawPct}%)
          </Badge>
          <Badge
            variant="outline"
            className="font-mono text-xs text-muted-foreground"
          >
            {mins}m {secs.toString().padStart(2, "0")}s
          </Badge>
          {totalAnswered < questions.length && (
            <Badge
              variant="outline"
              className="font-mono text-xs text-neon-amber"
            >
              {questions.length - totalAnswered} unanswered
            </Badge>
          )}
        </div>

        {/* Per-subject breakdown */}
        <Card className="w-full max-w-md border-border bg-surface">
          <CardContent className="flex flex-col gap-4 px-6 py-6">
            <p className="text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Subject Breakdown
            </p>
            {subjectResults.map((s) => (
              <div key={s.mode} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold ${s.colorClass}`}
                  >
                    {s.label}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {s.correct}/{s.total} ({s.pct}%)
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/30">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${s.pct}%`,
                      background: s.colorClass.includes("cyan")
                        ? "oklch(0.78 0.18 195)"
                        : s.colorClass.includes("green")
                          ? "oklch(0.75 0.18 145)"
                          : s.colorClass.includes("amber")
                            ? "oklch(0.78 0.15 75)"
                            : "oklch(0.75 0.18 340)",
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Encouragement */}
        <Card className="w-full max-w-md border-neon-pink/20 bg-neon-pink/5">
          <CardContent className="px-6 py-4">
            <p className="font-mono text-sm text-foreground">
              {passed
                ? "Great result! You're on track to pass the Kent Test."
                : rawPct >= 50
                  ? "Getting closer! Focus on your weaker subjects and keep practising."
                  : "Keep going! Regular practice will build your score. Focus on one subject at a time."}
            </p>
          </CardContent>
        </Card>

        <div className="flex w-full max-w-md flex-col gap-3">
          <Button
            className="w-full bg-neon-pink font-mono text-sm font-bold uppercase tracking-wider text-background hover:bg-neon-pink/90"
            onClick={() => {
              savedRef.current = false;
              setPhase("intro");
              setQuestions([]);
              setAnswers([]);
              setCurrentIdx(0);
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
  /*  Testing phase                                                   */
  /* ================================================================ */

  if (!currentQuestion) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* ---- Top bar ---- */}
      <div className="flex items-center justify-between gap-3">
        <Badge
          variant="outline"
          className={`font-mono text-[10px] ${currentQuestion.subjectColor}`}
        >
          {currentQuestion.subjectLabel}
        </Badge>

        <Badge
          variant="outline"
          className="border-border/60 font-mono text-xs text-muted-foreground"
        >
          Q {currentIdx + 1}/{questions.length}
        </Badge>

        <span
          className={[
            "font-mono text-sm font-bold tabular-nums",
            timerUrgent
              ? "animate-pulse text-neon-amber text-glow-amber"
              : "text-muted-foreground",
          ].join(" ")}
        >
          {display}
        </span>
      </div>

      {/* ---- Progress ---- */}
      <Progress
        value={((currentIdx + 1) / questions.length) * 100}
        className="h-1"
      />

      {/* ---- Reading passage ---- */}
      {currentQuestion.question.content.passage && (
        <Card className="border-border/60 bg-muted/30">
          <CardContent className="px-6 py-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Read the passage:
            </p>
            <p className="text-sm italic leading-relaxed text-foreground/90">
              {currentQuestion.question.content.passage}
            </p>
          </CardContent>
        </Card>
      )}

      {/* ---- Question ---- */}
      <Card className="border-border bg-surface">
        <CardContent className="px-6 py-8">
          <p className="text-lg font-medium leading-relaxed sm:text-xl">
            {currentQuestion.question.content.stem}
          </p>
        </CardContent>
      </Card>

      {/* ---- Options ---- */}
      <div className="flex flex-col gap-3">
        {currentQuestion.question.content.options.map((option, idx) => {
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

      {/* ---- Confirm + Next ---- */}
      {selectedAnswer !== null && (
        <div className="flex justify-end">
          <Button
            onClick={handleConfirmAndNext}
            className="bg-neon-pink font-mono text-xs font-bold uppercase tracking-wider text-background hover:bg-neon-pink/90"
          >
            {currentIdx < questions.length - 1
              ? "Next Question"
              : "Finish Test"}
          </Button>
        </div>
      )}
    </div>
  );
}
