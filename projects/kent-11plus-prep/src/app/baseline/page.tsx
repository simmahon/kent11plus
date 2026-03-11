"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
} from "@/lib/supabase/question-answers";
import { setSkillLevels } from "@/lib/supabase/skill-levels";
import { OPTION_LABELS } from "@/lib/constants";
import type { PracticeMode } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const QUESTIONS_PER_SUBJECT = 6;
const BATCH_SIZE = 3;

/** Baseline uses bigger steps (±0.5) for faster level convergence. */
const BASELINE_CORRECT_DELTA = 0.5;
const BASELINE_WRONG_DELTA = -0.5;

interface SubjectConfig {
  mode: PracticeMode;
  label: string;
  icon: string;
  colorClass: string;
  glowClass: string;
  /** oklch color for the results bar */
  barColor: string;
  topics: { category: string; topic: string }[];
}

const BASELINE_SUBJECTS: SubjectConfig[] = [
  {
    mode: "verbal-reasoning",
    label: "Verbal Reasoning",
    icon: "\uD83E\uDDE0",
    colorClass: "text-neon-cyan",
    glowClass: "text-glow-cyan",
    barColor: "oklch(0.78 0.18 195)",
    topics: [
      { category: "verbal_reasoning", topic: "synonyms and antonyms" },
      { category: "verbal_reasoning", topic: "odd one out" },
      { category: "verbal_reasoning", topic: "letter codes and cyphers" },
      {
        category: "verbal_reasoning",
        topic: "word relationships and analogies",
      },
      { category: "verbal_reasoning", topic: "hidden words" },
    ],
  },
  {
    mode: "maths",
    label: "Mathematics",
    icon: "\uD83D\uDCCA",
    colorClass: "text-neon-green",
    glowClass: "text-glow-green",
    barColor: "oklch(0.75 0.18 145)",
    topics: [
      {
        category: "mathematics",
        topic: "fractions decimals and percentages",
      },
      { category: "mathematics", topic: "geometry and angles" },
      { category: "mathematics", topic: "word problems" },
      { category: "mathematics", topic: "number patterns and sequences" },
      { category: "mathematics", topic: "data interpretation" },
    ],
  },
  {
    mode: "english",
    label: "English",
    icon: "\uD83D\uDCDA",
    colorClass: "text-neon-amber",
    glowClass: "text-glow-amber",
    barColor: "oklch(0.78 0.15 75)",
    topics: [
      { category: "english", topic: "spelling and vocabulary" },
      { category: "english", topic: "grammar and punctuation" },
      { category: "english", topic: "sentence completion" },
      { category: "english", topic: "reading comprehension" },
      { category: "english", topic: "inference and deduction" },
    ],
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

interface BaselineAnswerRecord {
  subjectIdx: number;
  question: APIQuestion;
  selectedIndex: number;
  isCorrect: boolean;
  timeTakenMs: number;
  topic: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BaselinePage() {
  const router = useRouter();
  const { currentUser } = useUser();

  /* ---- phase ---- */
  const [phase, setPhase] = useState<
    "intro" | "testing" | "saving" | "results"
  >("intro");

  /* ---- testing state ---- */
  const [subjectIdx, setSubjectIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [subjectQuestions, setSubjectQuestions] = useState<APIQuestion[]>([]);
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchError, setBatchError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showSubjectTransition, setShowSubjectTransition] = useState(false);

  /* ---- skill + score tracking ---- */
  const subjectSkillsRef = useRef([3.0, 3.0, 3.0, 3.0]);
  const [subjectSkills, setSubjectSkills] = useState([3.0, 3.0, 3.0, 3.0]);
  const [subjectScores, setSubjectScores] = useState([0, 0, 0, 0]);

  /* ---- answer accumulator ---- */
  const allAnswersRef = useRef<BaselineAnswerRecord[]>([]);

  /* ---- timing ---- */
  const questionStartTimeRef = useRef(Date.now());
  const subjectStartTimeRef = useRef(Date.now());
  const subjectTimesRef = useRef<number[]>([]);

  /* ---- topic for current batch ---- */
  const batchTopicRef = useRef("");

  /* ---- computed ---- */
  const currentSubject = BASELINE_SUBJECTS[subjectIdx];
  const globalQuestionIndex =
    subjectIdx * QUESTIONS_PER_SUBJECT + questionIdx;
  const totalQuestions = BASELINE_SUBJECTS.length * QUESTIONS_PER_SUBJECT;
  const currentQuestion = subjectQuestions[questionIdx];
  const hasAnswered = selectedAnswer !== null;
  const isCorrect =
    hasAnswered &&
    currentQuestion != null &&
    selectedAnswer === currentQuestion.correctAnswer.index;

  /* ------------------------------------------------------------ */
  /*  Fetch a batch of 3 questions from the API                    */
  /* ------------------------------------------------------------ */

  const fetchBatch = useCallback(async () => {
    setBatchLoading(true);
    setBatchError(null);
    try {
      const subject = BASELINE_SUBJECTS[subjectIdx];
      const topicPick = pickRandom(subject.topics);
      batchTopicRef.current = topicPick.topic;

      const skill = subjectSkillsRef.current[subjectIdx];
      const difficulty = Math.max(1, Math.min(5, Math.round(skill)));

      const res = await fetch("/api/questions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: topicPick.category,
          topic: topicPick.topic,
          difficulty,
          count: BATCH_SIZE,
          skillLevel: skill,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `API error ${res.status}`);
      }

      const data = await res.json();
      setSubjectQuestions((prev) => [...prev, ...data.questions]);
    } catch (err) {
      setBatchError(
        err instanceof Error ? err.message : "Failed to load questions",
      );
    } finally {
      setBatchLoading(false);
    }
  }, [subjectIdx]);

  /* ------------------------------------------------------------ */
  /*  Auto-fetch batches when needed                               */
  /* ------------------------------------------------------------ */

  useEffect(() => {
    if (phase !== "testing" || showSubjectTransition) return;

    const needsLoad =
      (questionIdx === 0 && subjectQuestions.length === 0) ||
      (questionIdx === 3 && subjectQuestions.length === 3);

    if (needsLoad && !batchLoading && !batchError) {
      fetchBatch();
    }
  }, [
    phase,
    questionIdx,
    subjectQuestions.length,
    batchLoading,
    batchError,
    showSubjectTransition,
    fetchBatch,
  ]);

  /* ------------------------------------------------------------ */
  /*  Handlers                                                     */
  /* ------------------------------------------------------------ */

  function handleStart() {
    if (!currentUser) return;
    setPhase("testing");
    subjectStartTimeRef.current = Date.now();
    questionStartTimeRef.current = Date.now();
  }

  function handleSelectAnswer(optionIndex: number) {
    if (hasAnswered || !currentQuestion) return;

    const timeTakenMs = Date.now() - questionStartTimeRef.current;
    const wasCorrect = optionIndex === currentQuestion.correctAnswer.index;

    setSelectedAnswer(optionIndex);

    // Adjust skill level (bigger steps for baseline)
    const currentSkill = subjectSkillsRef.current[subjectIdx];
    const delta = wasCorrect ? BASELINE_CORRECT_DELTA : BASELINE_WRONG_DELTA;
    const newSkill = Math.max(1.0, Math.min(5.0, currentSkill + delta));
    const rounded = Math.round(newSkill * 100) / 100;

    subjectSkillsRef.current[subjectIdx] = rounded;
    setSubjectSkills([...subjectSkillsRef.current]);

    if (wasCorrect) {
      setSubjectScores((prev) => {
        const next = [...prev];
        next[subjectIdx]++;
        return next;
      });
    }

    allAnswersRef.current.push({
      subjectIdx,
      question: currentQuestion,
      selectedIndex: optionIndex,
      isCorrect: wasCorrect,
      timeTakenMs,
      topic: batchTopicRef.current,
    });
  }

  function handleNext() {
    setSelectedAnswer(null);
    questionStartTimeRef.current = Date.now();

    if (questionIdx < QUESTIONS_PER_SUBJECT - 1) {
      setQuestionIdx(questionIdx + 1);
    } else {
      // Subject complete
      const subjectTime = Math.round(
        (Date.now() - subjectStartTimeRef.current) / 1000,
      );
      subjectTimesRef.current[subjectIdx] = subjectTime;

      if (subjectIdx < BASELINE_SUBJECTS.length - 1) {
        setShowSubjectTransition(true);
      } else {
        setPhase("saving");
        saveResults();
      }
    }
  }

  function handleContinueToNextSubject() {
    setSubjectIdx(subjectIdx + 1);
    setQuestionIdx(0);
    setSubjectQuestions([]);
    setShowSubjectTransition(false);
    subjectStartTimeRef.current = Date.now();
    questionStartTimeRef.current = Date.now();
  }

  function handleRetryBatch() {
    setBatchError(null);
    fetchBatch();
  }

  /* ------------------------------------------------------------ */
  /*  Save baseline results to Supabase                            */
  /* ------------------------------------------------------------ */

  async function saveResults() {
    if (!currentUser) {
      setPhase("results");
      return;
    }

    try {
      for (let i = 0; i < BASELINE_SUBJECTS.length; i++) {
        const subject = BASELINE_SUBJECTS[i];
        const subjectAnswers = allAnswersRef.current.filter(
          (a) => a.subjectIdx === i,
        );
        const correct = subjectAnswers.filter((a) => a.isCorrect).length;
        const timeSecs = subjectTimesRef.current[i] ?? 0;
        const skill = subjectSkillsRef.current[i];

        const session = await saveSession({
          mode: subject.mode,
          score: correct,
          total: QUESTIONS_PER_SUBJECT,
          timeTakenSeconds: timeSecs,
          difficulty: Math.round(skill),
          userId: currentUser.id,
          topic: "baseline",
          isBaseline: true,
        });

        if (session) {
          const qaInserts: QuestionAnswerInsert[] = subjectAnswers.map(
            (a) => ({
              session_id: session.id,
              user_id: currentUser.id,
              mode: subject.mode,
              topic: a.topic,
              difficulty: a.question.difficulty ?? Math.round(skill),
              stem: a.question.content.stem,
              options: a.question.content.options,
              correct_index: a.question.correctAnswer.index,
              selected_index: a.selectedIndex,
              is_correct: a.isCorrect,
              explanation: a.question.explanation,
              time_taken_ms: a.timeTakenMs,
            }),
          );

          await saveQuestionAnswers(qaInserts).catch(() => {
            console.warn(
              `[Baseline] Failed to save Q+A for ${subject.mode}`,
            );
          });
        }
      }

      // Set initial skill levels for every topic in every tested mode
      const entries: Array<{
        mode: string;
        topic: string;
        skillLevel: number;
      }> = [];
      for (let i = 0; i < BASELINE_SUBJECTS.length; i++) {
        const subject = BASELINE_SUBJECTS[i];
        const skill = subjectSkillsRef.current[i];
        for (const t of subject.topics) {
          entries.push({ mode: subject.mode, topic: t.topic, skillLevel: skill });
        }
      }

      await setSkillLevels(currentUser.id, entries);
    } catch (err) {
      console.error("[Baseline] Error saving results:", err);
    } finally {
      setPhase("results");
    }
  }

  /* ================================================================ */
  /*  Render                                                          */
  /* ================================================================ */

  /* ---- No user selected ---- */
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <p className="font-mono text-lg text-neon-amber text-glow-amber">
          Select a user first
        </p>
        <p className="text-sm text-muted-foreground">
          Use the picker in the top bar to choose who is taking the test.
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
          <span className="text-5xl">{"\uD83C\uDFAF"}</span>
          <h1 className="font-mono text-3xl font-bold tracking-widest text-neon-cyan text-glow-cyan sm:text-4xl">
            BASELINE TEST
          </h1>
          <p className="max-w-md text-sm text-muted-foreground">
            This adaptive test finds your starting level across all 4 Kent
            Test subjects. Questions get harder or easier based on your
            answers.
          </p>
        </div>

        <Card className="w-full max-w-md border-border bg-surface">
          <CardContent className="flex flex-col gap-4 px-6 py-6">
            <div className="flex items-center gap-3">
              <span className="text-xl">{"\uD83D\uDCDD"}</span>
              <div>
                <p className="font-mono text-sm font-bold text-foreground">
                  24 questions
                </p>
                <p className="text-xs text-muted-foreground">
                  6 per subject
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pl-9">
              {BASELINE_SUBJECTS.map((s) => (
                <div key={s.mode} className="flex items-center gap-2">
                  <span className="text-base">{s.icon}</span>
                  <span
                    className={`font-mono text-xs font-bold ${s.colorClass}`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 border-t border-border/40 pt-4">
              <span className="text-xl">{"\u23F1\uFE0F"}</span>
              <div>
                <p className="font-mono text-sm font-bold text-foreground">
                  No time pressure
                </p>
                <p className="text-xs text-muted-foreground">
                  Take your time on each question
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">{"\uD83C\uDFAF"}</span>
              <div>
                <p className="font-mono text-sm font-bold text-foreground">
                  Adaptive difficulty
                </p>
                <p className="text-xs text-muted-foreground">
                  Questions adjust to find your level
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex w-full max-w-md flex-col gap-3">
          <Button
            className="w-full bg-neon-cyan font-mono text-sm font-bold uppercase tracking-wider text-background hover:bg-neon-cyan/90"
            onClick={handleStart}
          >
            Start Baseline Test
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
  /*  Saving                                                          */
  /* ================================================================ */
  if (phase === "saving") {
    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <div className="relative size-16">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-neon-cyan" />
          <div
            className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-neon-purple"
            style={{
              animationDirection: "reverse",
              animationDuration: "0.8s",
            }}
          />
        </div>
        <p className="animate-pulse font-mono text-sm text-muted-foreground">
          Saving your results...
        </p>
      </div>
    );
  }

  /* ================================================================ */
  /*  Results                                                         */
  /* ================================================================ */
  if (phase === "results") {
    const totalCorrect = subjectScores.reduce((a, b) => a + b, 0);
    const totalPct = Math.round((totalCorrect / totalQuestions) * 100);

    const avgSkill =
      subjectSkillsRef.current.reduce((a, b) => a + b, 0) / 4;

    let message: string;
    if (avgSkill >= 4.0) {
      message = "Strong starting point! You're well prepared.";
    } else if (avgSkill >= 3.0) {
      message = "Solid foundation! Regular practice will build from here.";
    } else {
      message =
        "Great baseline! Focus on weaker areas for the biggest gains.";
    }

    const weakestIdx = subjectSkillsRef.current.indexOf(
      Math.min(...subjectSkillsRef.current),
    );
    const weakest = BASELINE_SUBJECTS[weakestIdx];

    return (
      <div className="flex flex-col items-center gap-8 py-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-5xl">{"\uD83C\uDFAF"}</span>
          <h1 className="font-mono text-3xl font-bold tracking-widest text-neon-cyan text-glow-cyan">
            BASELINE COMPLETE
          </h1>
          <p className="text-sm text-muted-foreground">
            {totalCorrect}/{totalQuestions} correct ({totalPct}%)
          </p>
        </div>

        <Card className="w-full max-w-md border-border bg-surface">
          <CardContent className="flex flex-col gap-5 px-6 py-6">
            <p className="text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Your Starting Levels
            </p>

            {BASELINE_SUBJECTS.map((subject, i) => {
              const skill = subjectSkillsRef.current[i];
              const score = subjectScores[i];
              const pct = (skill / 5.0) * 100;

              return (
                <div key={subject.mode} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{subject.icon}</span>
                      <span
                        className={`font-mono text-xs font-bold ${subject.colorClass}`}
                      >
                        {subject.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        {score}/{QUESTIONS_PER_SUBJECT}
                      </span>
                      <Badge
                        variant="outline"
                        className={`font-mono text-[10px] ${subject.colorClass}`}
                      >
                        {skill.toFixed(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted/30">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: subject.barColor,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="w-full max-w-md border-neon-cyan/20 bg-neon-cyan/5">
          <CardContent className="flex flex-col gap-2 px-6 py-4">
            <p className="font-mono text-sm text-foreground">{message}</p>
            <p className="text-xs text-muted-foreground">
              Focus area:{" "}
              <span className={`font-bold ${weakest.colorClass}`}>
                {weakest.label}
              </span>{" "}
              ({subjectSkillsRef.current[weakestIdx].toFixed(1)})
            </p>
          </CardContent>
        </Card>

        <div className="flex w-full max-w-md flex-col gap-3">
          <Button
            className="w-full bg-neon-cyan font-mono text-sm font-bold uppercase tracking-wider text-background hover:bg-neon-cyan/90"
            onClick={() => router.push("/")}
          >
            Start Practising
          </Button>
          <Button
            variant="outline"
            className="w-full font-mono text-xs uppercase tracking-wider"
            onClick={() => router.push("/dashboard")}
          >
            View Dashboard
          </Button>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Testing phase                                                   */
  /* ================================================================ */

  /* ---- Subject transition screen ---- */
  if (showSubjectTransition) {
    const completedSubject = BASELINE_SUBJECTS[subjectIdx];
    const nextSubject = BASELINE_SUBJECTS[subjectIdx + 1];
    const score = subjectScores[subjectIdx];
    const skill = subjectSkillsRef.current[subjectIdx];

    return (
      <div className="flex flex-col items-center gap-8 py-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-4xl">{completedSubject.icon}</span>
          <h2
            className={`font-mono text-xl font-bold tracking-wider ${completedSubject.colorClass} ${completedSubject.glowClass}`}
          >
            {completedSubject.label} Complete
          </h2>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="font-mono text-xs text-muted-foreground"
            >
              {score}/{QUESTIONS_PER_SUBJECT} correct
            </Badge>
            <Badge
              variant="outline"
              className={`font-mono text-xs ${completedSubject.colorClass}`}
            >
              Level {skill.toFixed(1)}
            </Badge>
          </div>
        </div>

        <Progress
          value={((subjectIdx + 1) / BASELINE_SUBJECTS.length) * 100}
          className="h-1.5 w-full max-w-md"
        />

        <Card className="w-full max-w-sm border-border bg-surface">
          <CardContent className="flex flex-col items-center gap-3 px-6 py-6">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Next up
            </p>
            <span className="text-4xl">{nextSubject.icon}</span>
            <span
              className={`font-mono text-lg font-bold tracking-wide ${nextSubject.colorClass} ${nextSubject.glowClass}`}
            >
              {nextSubject.label}
            </span>
            <p className="text-xs text-muted-foreground">
              {QUESTIONS_PER_SUBJECT} questions
            </p>
          </CardContent>
        </Card>

        <Button
          className="w-full max-w-sm bg-neon-cyan font-mono text-sm font-bold uppercase tracking-wider text-background hover:bg-neon-cyan/90"
          onClick={handleContinueToNextSubject}
        >
          Continue
        </Button>
      </div>
    );
  }

  /* ---- Loading / waiting for questions ---- */
  if (batchLoading || (!currentQuestion && !batchError)) {
    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <div className="relative size-16">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-neon-cyan" />
          <div
            className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-neon-purple"
            style={{
              animationDirection: "reverse",
              animationDuration: "0.8s",
            }}
          />
        </div>
        <p className="animate-pulse font-mono text-sm text-muted-foreground">
          Loading {currentSubject.label} questions...
        </p>
      </div>
    );
  }

  /* ---- Batch load error ---- */
  if (batchError) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <p className="font-mono text-lg text-neon-amber text-glow-amber">
          Something went wrong
        </p>
        <p className="text-sm text-muted-foreground">{batchError}</p>
        <Button
          className="bg-neon-cyan font-mono text-xs font-bold uppercase tracking-wider text-background hover:bg-neon-cyan/90"
          onClick={handleRetryBatch}
        >
          Try Again
        </Button>
      </div>
    );
  }

  /* ---- Guard: should never reach here without a question ---- */
  if (!currentQuestion) return null;

  /* ================================================================ */
  /*  Active question UI                                              */
  /* ================================================================ */
  return (
    <div className="flex flex-col gap-6">
      {/* ---- Top bar ---- */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-hidden="true">
            {currentSubject.icon}
          </span>
          <span
            className={`font-mono text-sm font-bold tracking-wide ${currentSubject.colorClass}`}
          >
            {currentSubject.label}
          </span>
        </div>

        <Badge
          variant="outline"
          className="border-border/60 font-mono text-xs text-muted-foreground"
        >
          {currentSubject.icon} {questionIdx + 1}/{QUESTIONS_PER_SUBJECT}
        </Badge>

        <Badge
          variant="outline"
          className="border-border/60 font-mono text-xs text-muted-foreground"
        >
          Overall {globalQuestionIndex + 1}/{totalQuestions}
        </Badge>
      </div>

      {/* ---- Overall progress ---- */}
      <Progress
        value={
          ((globalQuestionIndex + (hasAnswered ? 1 : 0)) / totalQuestions) *
          100
        }
        className="h-1"
      />

      {/* ---- Reading passage ---- */}
      {currentQuestion.content.passage && (
        <Card className="border-border/60 bg-muted/30">
          <CardContent className="px-6 py-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Read the passage:
            </p>
            <p className="text-sm italic leading-relaxed text-foreground/90">
              {currentQuestion.content.passage}
            </p>
          </CardContent>
        </Card>
      )}

      {/* ---- Question card ---- */}
      <Card className="border-border bg-surface">
        <CardContent className="px-6 py-8">
          <p className="text-lg font-medium leading-relaxed sm:text-xl">
            {currentQuestion.content.stem}
          </p>
        </CardContent>
      </Card>

      {/* ---- Answer options ---- */}
      <div className="flex flex-col gap-3">
        {currentQuestion.content.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrectOption =
            idx === currentQuestion.correctAnswer.index;

          let optionStyles =
            "border-border bg-surface hover:bg-surface-hover hover:border-border/80";
          if (hasAnswered) {
            if (isSelected && isCorrectOption) {
              optionStyles =
                "border-neon-green/60 bg-neon-green/10 glow-green";
            } else if (isSelected && !isCorrectOption) {
              optionStyles =
                "border-neon-amber/60 bg-neon-amber/10 glow-amber";
            } else if (isCorrectOption) {
              optionStyles = "border-neon-green/40 bg-neon-green/5";
            } else {
              optionStyles = "border-border/40 bg-surface opacity-50";
            }
          }

          return (
            <button
              key={idx}
              disabled={hasAnswered}
              onClick={() => handleSelectAnswer(idx)}
              className={[
                "group flex w-full items-center gap-4 rounded-lg border px-4 py-3 text-left transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:cursor-default",
                optionStyles,
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-bold",
                  hasAnswered && isSelected && isCorrectOption
                    ? "border-neon-green/60 text-neon-green"
                    : hasAnswered && isSelected && !isCorrectOption
                      ? "border-neon-amber/60 text-neon-amber"
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

      {/* ---- Minimal feedback + Next ---- */}
      {hasAnswered && (
        <Card
          className={[
            "border",
            isCorrect
              ? "border-neon-green/40 bg-neon-green/5"
              : "border-neon-amber/40 bg-neon-amber/5",
          ].join(" ")}
        >
          <CardContent className="flex items-center justify-between px-6 py-4">
            <span
              className={[
                "font-mono text-sm font-bold uppercase tracking-wider",
                isCorrect
                  ? "text-neon-green text-glow-green"
                  : "text-neon-amber text-glow-amber",
              ].join(" ")}
            >
              {isCorrect
                ? "Correct!"
                : `Answer: ${OPTION_LABELS[currentQuestion.correctAnswer.index]}. ${currentQuestion.correctAnswer.value}`}
            </span>
            <Button
              onClick={handleNext}
              className="bg-neon-cyan font-mono text-xs font-bold uppercase tracking-wider text-background hover:bg-neon-cyan/90"
            >
              Next
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
