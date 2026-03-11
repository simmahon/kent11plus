"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { PRACTICE_MODES } from "@/lib/modes";
import type { PracticeMode } from "@/lib/types";
import { useCountdown } from "@/hooks/use-countdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { generateNVRQuestions, type NVRQuestion } from "@/lib/nvr-generator";
import { NVRQuestionDisplay } from "@/components/nvr-question";
import { generateCubeNetQuestions, type CubeNetQuestion } from "@/lib/cube-net-generator";
import { CubeNetQuestionDisplay } from "@/components/cube-net-question";
import { saveSession } from "@/lib/supabase/sessions";
import { saveQuestionAnswers, type QuestionAnswerInsert, getSeenStems } from "@/lib/supabase/question-answers";
import { getModeSkillLevel, updateSkillLevel } from "@/lib/supabase/skill-levels";
import { calculateNextSkillLevel, skillToDifficulty } from "@/lib/adaptive";
import { useUser } from "@/contexts/user-context";
import { OPTION_LABELS } from "@/lib/constants";
import { getQuestionsFromBank, hasBankForTopic, bankedToAPIQuestion } from "@/lib/question-banks";

/* ------------------------------------------------------------------ */
/*  Mode → API mapping                                                 */
/* ------------------------------------------------------------------ */

const MODE_TO_API: Record<
  PracticeMode,
  { category: string; topic: string }[]
> = {
  "verbal-reasoning": [
    { category: "verbal_reasoning", topic: "synonyms and antonyms" },
    { category: "verbal_reasoning", topic: "odd one out" },
    { category: "verbal_reasoning", topic: "letter codes and cyphers" },
    { category: "verbal_reasoning", topic: "word relationships and analogies" },
    { category: "verbal_reasoning", topic: "hidden words" },
  ],
  "non-verbal-reasoning": [
    { category: "non_verbal_reasoning", topic: "shape sequences" },
    { category: "non_verbal_reasoning", topic: "pattern matching" },
    { category: "non_verbal_reasoning", topic: "spatial reasoning" },
  ],
  maths: [
    { category: "mathematics", topic: "fractions decimals and percentages" },
    { category: "mathematics", topic: "geometry and angles" },
    { category: "mathematics", topic: "word problems" },
    { category: "mathematics", topic: "number patterns and sequences" },
    { category: "mathematics", topic: "data interpretation" },
  ],
  english: [
    { category: "english", topic: "spelling and vocabulary" },
    { category: "english", topic: "grammar and punctuation" },
    { category: "english", topic: "sentence completion" },
  ],
  comprehension: [
    { category: "english", topic: "reading comprehension" },
    { category: "english", topic: "inference and deduction" },
  ],
  "cube-nets": [], // generated locally like NVR
  "random-mix": [], // handled specially below
};

/** Pick a random element from an array. */
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getApiParams(mode: PracticeMode) {
  if (mode === "random-mix") {
    // Exclude visual modes (need local renderers) and random-mix itself
    const allModes = Object.keys(MODE_TO_API).filter(
      (k) => k !== "random-mix" && k !== "non-verbal-reasoning" && k !== "cube-nets",
    ) as PracticeMode[];
    const randomMode = pickRandom(allModes);
    return pickRandom(MODE_TO_API[randomMode]);
  }
  return pickRandom(MODE_TO_API[mode]);
}

/* ------------------------------------------------------------------ */
/*  Types for API responses                                            */
/* ------------------------------------------------------------------ */

interface APIQuestion {
  content: {
    stem: string;
    options: string[];
    passage?: string | null;
  };
  correctAnswer: {
    index: number;
    value: string;
  };
  explanation: string;
  difficulty: number;
  questionType: string;
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */
export default function PracticePage() {
  const params = useParams<{ mode: string }>();
  const router = useRouter();
  const { currentUser } = useUser();

  const modeSlug = params.mode as PracticeMode;
  const modeConfig = PRACTICE_MODES.find((m) => m.id === modeSlug);

  const isNVRMode = modeSlug === "non-verbal-reasoning";
  const isCubeNetMode = modeSlug === "cube-nets";
  const isLocalMode = isNVRMode || isCubeNetMode;

  /* ---- loading / error state ---- */
  const [questions, setQuestions] = useState<APIQuestion[]>([]);
  const [nvrQuestions, setNvrQuestions] = useState<NVRQuestion[]>([]);
  const [cubeNetQuestions, setCubeNetQuestions] = useState<CubeNetQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  /* ---- session state ---- */
  const totalQuestions = questions.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionStartTime] = useState(() => Date.now());
  const savedRef = useRef(false);

  /* ---- adaptive difficulty state ---- */
  const [skillLevel, setSkillLevel] = useState<number>(3.0);
  const skillLevelRef = useRef(3.0);
  const sessionTopicRef = useRef<string | null>(null);

  /* ---- per-question timing ---- */
  const questionStartTimeRef = useRef<number>(Date.now());
  const questionTimingsRef = useRef<(number | null)[]>([]);

  /* ---- AI explanation state ---- */
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [strategyTip, setStrategyTip] = useState<string | null>(null);
  const [explainLoading, setExplainLoading] = useState(false);

  /* ---- comprehension passage metadata ---- */
  const [passageMeta, setPassageMeta] = useState<{
    title: string;
    genre: string;
    wordCount: number;
    source?: string;
  } | null>(null);
  const isComprehensionMode = modeSlug === "comprehension";

  /* ---- fetch skill level on mount ---- */
  useEffect(() => {
    if (!currentUser || isLocalMode) return;
    getModeSkillLevel(currentUser.id, modeSlug).then((level) => {
      setSkillLevel(level);
      skillLevelRef.current = level;
    });
  }, [currentUser, modeSlug, isLocalMode]);

  /* ---- shared fetch logic ---- */
  const doFetch = useCallback(async () => {
    if (!modeConfig) return;
    try {
      const questionCount = modeConfig.questionCount;
      const difficulty = skillToDifficulty(skillLevelRef.current);

      /* -- NVR: generate locally with visual patterns -- */
      if (isNVRMode) {
        const nvrQs = generateNVRQuestions(questionCount, difficulty);
        setNvrQuestions(nvrQs);
        setQuestions(
          nvrQs.map((nvr) => ({
            content: {
              stem: "Which shape comes next in the sequence?",
              options: ["A", "B", "C", "D", "E"],
            },
            correctAnswer: {
              index: nvr.correctIndex,
              value: String.fromCharCode(65 + nvr.correctIndex),
            },
            explanation: nvr.explanation,
            difficulty: nvr.difficulty,
            questionType: "nvr_pattern",
          })),
        );
        setAnswers(new Array(questionCount).fill(null));
        questionTimingsRef.current = new Array(questionCount).fill(null);
        questionStartTimeRef.current = Date.now();
        setLoading(false);
        return;
      }

      /* -- Cube Nets: generate locally -- */
      if (isCubeNetMode) {
        const cnQs = generateCubeNetQuestions(questionCount, difficulty);
        setCubeNetQuestions(cnQs);
        setQuestions(
          cnQs.map((cn) => ({
            content: {
              stem: "Which cube can be made from this net?",
              options: ["A", "B", "C", "D", "E"],
            },
            correctAnswer: {
              index: cn.correctIndex,
              value: String.fromCharCode(65 + cn.correctIndex),
            },
            explanation: cn.explanation,
            difficulty: cn.difficulty,
            questionType: "cube_net",
          })),
        );
        setAnswers(new Array(questionCount).fill(null));
        questionTimingsRef.current = new Array(questionCount).fill(null);
        questionStartTimeRef.current = Date.now();
        setLoading(false);
        return;
      }

      /* -- All other modes: try question bank first, fall back to AI -- */
      const apiParams = getApiParams(modeSlug);
      sessionTopicRef.current = apiParams.topic;

      // Try static question bank first (instant, no API call)
      if (hasBankForTopic(apiParams.topic)) {
        const seenStems = currentUser
          ? await getSeenStems(currentUser.id, apiParams.topic)
          : undefined;
        const banked = getQuestionsFromBank(apiParams.topic, difficulty, questionCount, seenStems);
        if (banked) {
          const converted = banked.map(bankedToAPIQuestion);
          setQuestions(converted);
          setAnswers(new Array(converted.length).fill(null));
          questionTimingsRef.current = new Array(converted.length).fill(null);
          questionStartTimeRef.current = Date.now();
          setLoading(false);
          return;
        }
      }

      // Fall back to AI generation
      const res = await fetch("/api/questions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: apiParams.category,
          topic: apiParams.topic,
          difficulty,
          count: questionCount,
          skillLevel: skillLevelRef.current,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `API error ${res.status}`);
      }

      const data = await res.json();
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(null));
      questionTimingsRef.current = new Array(data.questions.length).fill(null);
      questionStartTimeRef.current = Date.now();

      /* -- Store comprehension passage metadata if present -- */
      if (data.passage) {
        setPassageMeta(data.passage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load questions");
    } finally {
      setLoading(false);
    }
  }, [modeSlug, modeConfig, isNVRMode, isCubeNetMode]);

  /* ---- fetch questions on mount + retry ---- */
  useEffect(() => {
    if (fetchedRef.current || !modeConfig) return;
    fetchedRef.current = true;
    doFetch();
  }, [modeConfig, doFetch]);

  /* ---- countdown timer ---- */
  const handleTimeUp = useCallback(() => {
    setSessionComplete(true);
  }, []);

  const { secondsLeft, start, pause, display } = useCountdown(
    modeConfig?.timeLimitSeconds ?? 600,
    handleTimeUp,
  );

  // Start timer once questions are loaded.
  useEffect(() => {
    if (!loading && questions.length > 0) {
      start();
    }
  }, [loading, questions.length, start]);

  /* ---- derived values ---- */
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect =
    selectedAnswer !== null &&
    currentQuestion &&
    selectedAnswer === currentQuestion.correctAnswer.index;
  const timerUrgent = secondsLeft < 60 && secondsLeft > 0;

  const correctCount = useMemo(
    () =>
      answers.filter(
        (ans, idx) =>
          ans !== null && questions[idx] && ans === questions[idx].correctAnswer.index,
      ).length,
    [answers, questions],
  );

  const elapsedRef = useRef(0);
  if (sessionComplete && elapsedRef.current === 0) {
    elapsedRef.current = Math.round((Date.now() - sessionStartTime) / 1000);
  }
  const elapsedSeconds = elapsedRef.current;

  /* ---- save completed session to Supabase ---- */
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    if (!sessionComplete || savedRef.current || totalQuestions === 0) return;
    savedRef.current = true;

    const timeTaken = Math.round((Date.now() - sessionStartTime) / 1000);
    const difficulty = skillToDifficulty(skillLevelRef.current);

    // Save session record
    saveSession({
      mode: modeSlug,
      score: correctCount,
      total: totalQuestions,
      timeTakenSeconds: timeTaken,
      difficulty,
      userId: currentUser?.id ?? null,
      topic: sessionTopicRef.current,
    }).then((result) => {
      if (!result) {
        setSaveError(true);
        return;
      }

      // Save individual question answers
      const qaInserts: QuestionAnswerInsert[] = questions.map((q, idx) => ({
        session_id: result.id,
        user_id: currentUser?.id ?? null,
        mode: modeSlug,
        topic: sessionTopicRef.current,
        difficulty: q.difficulty ?? difficulty,
        stem: q.content.stem,
        options: q.content.options,
        correct_index: q.correctAnswer.index,
        selected_index: answers[idx],
        is_correct: answers[idx] === q.correctAnswer.index,
        explanation: q.explanation,
        time_taken_ms: questionTimingsRef.current[idx],
      }));

      saveQuestionAnswers(qaInserts).catch(() => {
        // Non-critical: session was saved, individual Q+A is bonus
        console.warn("[PracticePage] Failed to save individual question answers");
      });
    });
  }, [sessionComplete, modeSlug, correctCount, totalQuestions, sessionStartTime, currentUser, questions, answers]);

  /* ---- fetch AI explanation on wrong answer ---- */
  async function fetchExplanation(question: APIQuestion, childAnswerIndex: number) {
    setExplainLoading(true);
    try {
      const res = await fetch("/api/questions/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: {
            content: question.content,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
          },
          childAnswer: question.content.options[childAnswerIndex],
          correctAnswer: question.correctAnswer.value,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiExplanation(data.explanation);
        setStrategyTip(data.strategyTip);
      }
    } catch {
      // Silently fall back to the built-in explanation
    } finally {
      setExplainLoading(false);
    }
  }

  /* ---- handlers ---- */
  function handleSelectAnswer(optionIndex: number) {
    if (selectedAnswer !== null || !currentQuestion) return;

    // Record per-question timing
    const timeTakenMs = Date.now() - questionStartTimeRef.current;
    questionTimingsRef.current[currentQuestionIndex] = timeTakenMs;

    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQuestionIndex] = optionIndex;
      return next;
    });

    // Update skill level adaptively
    const wasCorrect = optionIndex === currentQuestion.correctAnswer.index;
    const newSkill = calculateNextSkillLevel(skillLevelRef.current, wasCorrect, timeTakenMs);
    skillLevelRef.current = newSkill;
    setSkillLevel(newSkill);

    // Persist skill level update to Supabase (fire and forget)
    if (currentUser && sessionTopicRef.current) {
      updateSkillLevel(
        currentUser.id,
        modeSlug,
        sessionTopicRef.current,
        wasCorrect,
        timeTakenMs,
      ).catch(() => {
        // Non-critical
      });
    }

    // If wrong, fetch AI explanation (skip for local modes which use built-in explanations)
    if (!wasCorrect && !isLocalMode) {
      fetchExplanation(currentQuestion, optionIndex);
    }
  }

  function handleNext() {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setAiExplanation(null);
      setStrategyTip(null);
      // Reset per-question timer
      questionStartTimeRef.current = Date.now();
    } else {
      setSessionComplete(true);
      pause();
    }
  }

  function handlePauseToggle() {
    if (isPaused) {
      start();
      setIsPaused(false);
    } else {
      pause();
      setIsPaused(true);
    }
  }

  function handleRetry() {
    fetchedRef.current = false;
    savedRef.current = false;
    elapsedRef.current = 0;
    setQuestions([]);
    setNvrQuestions([]);
    setCubeNetQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setSessionComplete(false);
    setAiExplanation(null);
    setStrategyTip(null);
    setPassageMeta(null);
    setLoading(true);
    setError(null);
    questionTimingsRef.current = [];
  }

  // Refetch on retry (when handleRetry resets fetchedRef and sets loading)
  useEffect(() => {
    if (loading && !fetchedRef.current && modeConfig) {
      fetchedRef.current = true;
      doFetch();
    }
  }, [loading, modeConfig, doFetch]);

  /* ---- guard: invalid mode ---- */
  if (!modeConfig) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <p className="font-mono text-lg text-neon-amber text-glow-amber">
          Mode not found
        </p>
        <Button variant="outline" onClick={() => router.push("/")}>
          Back to mode selection
        </Button>
      </div>
    );
  }

  /* ---- Loading state ---- */
  if (loading) {
    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <div className="relative size-16">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-neon-cyan" />
          <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-neon-purple" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
        </div>
        <p className="font-mono text-sm text-muted-foreground animate-pulse">
          Generating {modeConfig.label} questions...
        </p>
      </div>
    );
  }

  /* ---- Error state ---- */
  if (error) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <p className="font-mono text-lg text-neon-amber text-glow-amber">
          Something went wrong
        </p>
        <p className="text-sm text-muted-foreground">{error}</p>
        <div className="flex gap-3">
          <Button
            className="bg-neon-cyan font-mono text-xs font-bold uppercase tracking-wider text-background hover:bg-neon-cyan/90"
            onClick={handleRetry}
          >
            Try Again
          </Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Modes
          </Button>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Session complete - results screen                               */
  /* ================================================================ */
  if (sessionComplete) {
    const pct = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;

    let encouragement: string;
    if (pct === 100) {
      encouragement = "Flawless. You are ready.";
    } else if (pct >= 80) {
      encouragement = "Excellent work! Almost perfect.";
    } else if (pct >= 60) {
      encouragement = "Good effort! Keep practising to improve.";
    } else {
      encouragement = "Nice try! Review the topics and try again.";
    }

    return (
      <div className="flex flex-col items-center gap-8 py-8">
        <h2 className="font-mono text-3xl font-bold tracking-widest text-neon-cyan text-glow-cyan">
          SESSION COMPLETE
        </h2>

        <Card className="w-full max-w-md border-border bg-surface">
          <CardContent className="flex flex-col items-center gap-6 px-6 py-8">
            <div className="flex flex-col items-center gap-1">
              <span className="font-mono text-6xl font-bold tabular-nums text-neon-green text-glow-green">
                {correctCount}/{totalQuestions}
              </span>
              <span className="text-sm text-muted-foreground">
                {pct}% correct
              </span>
            </div>

            <Progress value={pct} className="h-2 w-full" />

            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="border-border/60 font-mono text-xs text-muted-foreground"
              >
                {mins}m {secs.toString().padStart(2, "0")}s
              </Badge>
              <Badge
                variant="outline"
                className="border-neon-cyan/40 font-mono text-xs text-neon-cyan"
              >
                Level {skillLevel.toFixed(1)}
              </Badge>
            </div>

            <p className="text-center font-mono text-sm text-neon-amber text-glow-amber">
              {encouragement}
            </p>

            {saveError && (
              <p className="text-center text-xs text-neon-pink">
                Could not save session. Your score was not recorded.
              </p>
            )}

            <div className="flex w-full flex-col gap-3 pt-2">
              <Button
                className="w-full bg-neon-cyan font-mono text-sm font-bold uppercase tracking-wider text-background hover:bg-neon-cyan/90"
                onClick={handleRetry}
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                className="w-full font-mono text-xs uppercase tracking-wider"
                onClick={() => router.push("/")}
              >
                Back to Modes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ---- guard: no current question ---- */
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
            {modeConfig.icon}
          </span>
          <span
            className={`font-mono text-sm font-bold tracking-wide ${modeConfig.colorClass}`}
          >
            {modeConfig.label}
          </span>
          <Badge
            variant="outline"
            className="border-neon-cyan/30 font-mono text-[10px] text-neon-cyan"
          >
            Lvl {skillLevel.toFixed(1)}
          </Badge>
        </div>

        <Badge
          variant="outline"
          className="border-border/60 font-mono text-xs text-muted-foreground"
        >
          Q {currentQuestionIndex + 1}/{totalQuestions}
        </Badge>

        <div className="flex items-center gap-2">
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

          <Button
            variant="ghost"
            size="sm"
            onClick={handlePauseToggle}
            aria-label={isPaused ? "Resume timer" : "Pause timer"}
            className="size-8 p-0 text-muted-foreground hover:text-foreground"
          >
            {isPaused ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
              >
                <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
              >
                <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z" />
              </svg>
            )}
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      <Progress
        value={((currentQuestionIndex + 1) / totalQuestions) * 100}
        className="h-1"
      />

      {/* ---- NVR / Cube Net visual questions OR text-based questions ---- */}
      {isNVRMode && nvrQuestions[currentQuestionIndex] ? (
        <NVRQuestionDisplay
          question={nvrQuestions[currentQuestionIndex]}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
        />
      ) : isCubeNetMode && cubeNetQuestions[currentQuestionIndex] ? (
        <CubeNetQuestionDisplay
          question={cubeNetQuestions[currentQuestionIndex]}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
        />
      ) : (
        <>
          {/* ---- Reading passage (if present) ---- */}
          {currentQuestion.content.passage && (
            <Card className="border-neon-cyan/20 bg-surface relative overflow-hidden">
              {/* Subtle glow accent along the top edge */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
              <CardContent className="px-6 py-6">
                {/* Passage header with title and genre */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" role="img" aria-hidden="true">
                      {passageMeta?.genre === "poetry"
                        ? "\u270D\uFE0F"
                        : passageMeta?.genre === "scientific"
                          ? "\u{1F52C}"
                          : passageMeta?.genre === "historical"
                            ? "\u{1F3DB}\uFE0F"
                            : passageMeta?.genre === "non-fiction"
                              ? "\u{1F4D6}"
                              : "\u{1F4DA}"}
                    </span>
                    <div>
                      <h3 className="font-mono text-sm font-bold tracking-wide text-neon-cyan">
                        {passageMeta?.title ?? "Reading Passage"}
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Read carefully, then answer the question below
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {passageMeta?.genre && (
                      <Badge
                        variant="outline"
                        className="border-neon-purple/30 font-mono text-[10px] capitalize text-neon-purple"
                      >
                        {passageMeta.genre}
                      </Badge>
                    )}
                  </div>
                </div>
                {/* Passage body */}
                <div className="rounded-lg border border-border/30 bg-muted/20 px-5 py-4">
                  <p className="text-sm leading-[1.85] text-foreground/90 whitespace-pre-line">
                    {currentQuestion.content.passage}
                  </p>
                </div>
                {/* Source attribution */}
                {passageMeta?.source && (
                  <p className="mt-3 text-right font-mono text-[10px] text-muted-foreground/60 italic">
                    Source: {passageMeta.source}
                  </p>
                )}
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
              const isCorrectOption = idx === currentQuestion.correctAnswer.index;
              const hasAnswered = selectedAnswer !== null;

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
                  optionStyles =
                    "border-border/40 bg-surface opacity-50";
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
        </>
      )}

      {/* ---- Explanation panel ---- */}
      {showExplanation && (
        <Card
          className={[
            "border",
            isCorrect
              ? "border-neon-green/40 bg-neon-green/5"
              : "border-neon-amber/40 bg-neon-amber/5",
          ].join(" ")}
        >
          <CardContent className="flex flex-col gap-3 px-6 py-5">
            <span
              className={[
                "font-mono text-sm font-bold uppercase tracking-wider",
                isCorrect
                  ? "text-neon-green text-glow-green"
                  : "text-neon-amber text-glow-amber",
              ].join(" ")}
            >
              {isCorrect ? "Correct!" : "Not quite!"}
            </span>

            {isCorrect ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Well done! You got it right.
              </p>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                The answer was:{" "}
                <span className="font-medium text-neon-green">
                  {OPTION_LABELS[currentQuestion.correctAnswer.index]}.{" "}
                  {currentQuestion.content.options[currentQuestion.correctAnswer.index]}
                </span>
              </p>
            )}

            {/* AI explanation for wrong answers */}
            {!isCorrect && explainLoading && (
              <p className="text-sm text-muted-foreground animate-pulse">
                Thinking of the best way to explain this...
              </p>
            )}

            {!isCorrect && aiExplanation ? (
              <div className="flex flex-col gap-2">
                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {aiExplanation}
                </p>
                {strategyTip && (
                  <div className="mt-1 rounded-md border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-2">
                    <p className="font-mono text-xs font-bold text-neon-cyan mb-1">
                      Strategy Tip
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {strategyTip}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              !isCorrect &&
              !explainLoading && (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {currentQuestion.explanation}
                </p>
              )
            )}

            {/* Correct answer explanation */}
            {isCorrect && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {currentQuestion.explanation}
              </p>
            )}

            <div className="flex justify-end pt-2">
              <Button
                onClick={handleNext}
                className="bg-neon-cyan font-mono text-xs font-bold uppercase tracking-wider text-background hover:bg-neon-cyan/90"
              >
                {currentQuestionIndex < totalQuestions - 1
                  ? "Next Question"
                  : "View Results"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
