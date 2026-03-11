"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/contexts/user-context";
import {
  getWrongAnswers,
  getDueReviews,
  getReviewStats,
  updateReviewSchedule,
  type QuestionAnswer,
} from "@/lib/supabase/question-answers";
import { OPTION_LABELS } from "@/lib/constants";
import { PRACTICE_MODES } from "@/lib/modes";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getModeLabel(mode: string): string {
  return PRACTICE_MODES.find((m) => m.id === mode)?.label ?? mode;
}

function getModeColor(mode: string): string {
  return (
    PRACTICE_MODES.find((m) => m.id === mode)?.colorClass ??
    "text-muted-foreground"
  );
}

function timeAgo(dateStr: string): string {
  const ms = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  return `${days}d ago`;
}

function reviewStatus(qa: QuestionAnswer): {
  label: string;
  className: string;
} {
  if (qa.review_count > 0 && !qa.next_review_at) {
    return {
      label: "Mastered",
      className: "border-neon-green/40 text-neon-green",
    };
  }
  if (!qa.next_review_at) {
    return {
      label: "Not scheduled",
      className: "border-border/60 text-muted-foreground",
    };
  }
  const ms = new Date(qa.next_review_at).getTime() - Date.now();
  if (ms <= 0) {
    return {
      label: "Due now",
      className: "border-neon-amber/40 text-neon-amber",
    };
  }
  const days = Math.ceil(ms / (24 * 60 * 60 * 1000));
  return {
    label: days === 1 ? "Due tomorrow" : `Due in ${days}d`,
    className: "border-border/60 text-muted-foreground",
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ReviewPage() {
  const router = useRouter();
  const { currentUser } = useUser();

  /* ---- view state ---- */
  const [view, setView] = useState<
    "browse" | "session" | "session-complete"
  >("browse");

  /* ---- browse state ---- */
  const [wrongAnswers, setWrongAnswers] = useState<QuestionAnswer[]>([]);
  const [stats, setStats] = useState({ due: 0, upcoming: 0, mastered: 0 });
  const [modeFilter, setModeFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---- session state ---- */
  const [dueQuestions, setDueQuestions] = useState<QuestionAnswer[]>([]);
  const [sessionIdx, setSessionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionLoading, setSessionLoading] = useState(false);

  /* ---- load data ---- */
  const loadData = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    const [answers, reviewStats] = await Promise.all([
      getWrongAnswers(currentUser.id, { limit: 50 }),
      getReviewStats(currentUser.id),
    ]);
    setWrongAnswers(answers);
    setStats(reviewStats);
    setLoading(false);
  }, [currentUser]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  /* ---- handlers ---- */

  async function handleStartSession() {
    if (!currentUser) return;
    setSessionLoading(true);
    const due = await getDueReviews(currentUser.id, 10);
    setDueQuestions(due);
    setSessionIdx(0);
    setSelectedAnswer(null);
    setSessionCorrect(0);
    setSessionLoading(false);
    if (due.length > 0) {
      setView("session");
    }
  }

  function handleSessionAnswer(optionIndex: number) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);

    const question = dueQuestions[sessionIdx];
    const wasCorrect = optionIndex === question.correct_index;

    if (wasCorrect) setSessionCorrect((prev) => prev + 1);

    // Fire-and-forget: update the spaced repetition schedule
    updateReviewSchedule(question.id, wasCorrect);
  }

  function handleSessionNext() {
    setSelectedAnswer(null);
    if (sessionIdx < dueQuestions.length - 1) {
      setSessionIdx((prev) => prev + 1);
    } else {
      setView("session-complete");
    }
  }

  function handleBackToBrowse() {
    setView("browse");
    loadData();
  }

  /* ---- computed ---- */
  const availableModes = [...new Set(wrongAnswers.map((a) => a.mode))];
  const filteredAnswers = modeFilter
    ? wrongAnswers.filter((a) => a.mode === modeFilter)
    : wrongAnswers;

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
  /*  Review session                                                  */
  /* ================================================================ */
  if (view === "session" && dueQuestions.length > 0) {
    const question = dueQuestions[sessionIdx];
    const hasAnswered = selectedAnswer !== null;
    const isCorrect = hasAnswered && selectedAnswer === question.correct_index;
    const options: string[] = question.options ?? [];

    return (
      <div className="flex flex-col gap-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold tracking-wider text-neon-purple text-glow-purple">
              REVIEW SESSION
            </span>
          </div>
          <Badge
            variant="outline"
            className="border-border/60 font-mono text-xs text-muted-foreground"
          >
            {sessionIdx + 1}/{dueQuestions.length}
          </Badge>
        </div>

        <Progress
          value={
            ((sessionIdx + (hasAnswered ? 1 : 0)) / dueQuestions.length) *
            100
          }
          className="h-1"
        />

        {/* Topic badge */}
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className={`font-mono text-[10px] ${getModeColor(question.mode)}`}
          >
            {getModeLabel(question.mode)}
          </Badge>
          {question.topic && (
            <Badge
              variant="outline"
              className="border-border/60 font-mono text-[10px] text-muted-foreground"
            >
              {question.topic}
            </Badge>
          )}
        </div>

        {/* Question */}
        <Card className="border-border bg-surface">
          <CardContent className="px-6 py-8">
            <p className="text-lg font-medium leading-relaxed sm:text-xl">
              {question.stem}
            </p>
          </CardContent>
        </Card>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrectOption = idx === question.correct_index;

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
                onClick={() => handleSessionAnswer(idx)}
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

        {/* Feedback */}
        {hasAnswered && (
          <Card
            className={[
              "border",
              isCorrect
                ? "border-neon-green/40 bg-neon-green/5"
                : "border-neon-amber/40 bg-neon-amber/5",
            ].join(" ")}
          >
            <CardContent className="flex flex-col gap-3 px-6 py-4">
              <div className="flex items-center justify-between">
                <span
                  className={[
                    "font-mono text-sm font-bold uppercase tracking-wider",
                    isCorrect
                      ? "text-neon-green text-glow-green"
                      : "text-neon-amber text-glow-amber",
                  ].join(" ")}
                >
                  {isCorrect
                    ? "Correct! Great recall."
                    : `Answer: ${OPTION_LABELS[question.correct_index]}. ${options[question.correct_index]}`}
                </span>
                <Button
                  onClick={handleSessionNext}
                  className="bg-neon-cyan font-mono text-xs font-bold uppercase tracking-wider text-background hover:bg-neon-cyan/90"
                >
                  Next
                </Button>
              </div>
              {question.explanation && (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {question.explanation}
                </p>
              )}
              {isCorrect && (
                <p className="text-xs text-neon-green/70">
                  Review interval extended. Keep it up!
                </p>
              )}
              {!isCorrect && (
                <p className="text-xs text-neon-amber/70">
                  Review reset to 1 day. You&apos;ll see this again soon.
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  /* ================================================================ */
  /*  Session complete                                                */
  /* ================================================================ */
  if (view === "session-complete") {
    const total = dueQuestions.length;
    const pct = total > 0 ? Math.round((sessionCorrect / total) * 100) : 0;

    return (
      <div className="flex flex-col items-center gap-8 py-8">
        <h2 className="font-mono text-3xl font-bold tracking-widest text-neon-purple text-glow-purple">
          REVIEW COMPLETE
        </h2>

        <Card className="w-full max-w-md border-border bg-surface">
          <CardContent className="flex flex-col items-center gap-6 px-6 py-8">
            <span className="font-mono text-6xl font-bold tabular-nums text-neon-green text-glow-green">
              {sessionCorrect}/{total}
            </span>
            <span className="text-sm text-muted-foreground">
              {pct}% recalled correctly
            </span>
            <Progress value={pct} className="h-2 w-full" />

            <p className="text-center font-mono text-sm text-neon-amber text-glow-amber">
              {pct === 100
                ? "Perfect recall! Those are locked in."
                : pct >= 70
                  ? "Strong review! The tricky ones will come back soon."
                  : "Keep at it! Spaced repetition works best with regular review."}
            </p>

            <div className="flex w-full flex-col gap-3 pt-2">
              <Button
                className="w-full bg-neon-cyan font-mono text-sm font-bold uppercase tracking-wider text-background hover:bg-neon-cyan/90"
                onClick={handleBackToBrowse}
              >
                Back to Review
              </Button>
              <Button
                variant="outline"
                className="w-full font-mono text-xs uppercase tracking-wider"
                onClick={() => router.push("/")}
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ================================================================ */
  /*  Browse view (default)                                           */
  /* ================================================================ */

  if (loading) {
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
          Loading review data...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 py-4">
      {/* ---- Header ---- */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-mono text-3xl font-bold tracking-widest text-neon-purple text-glow-purple sm:text-4xl">
          REVIEW
        </h1>
        <p className="text-sm text-muted-foreground">
          Learn from your mistakes with spaced repetition
        </p>
      </div>

      {/* ---- Stats cards ---- */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-neon-amber/20 bg-surface">
          <CardContent className="flex flex-col items-center gap-1 px-3 py-3">
            <span className="font-mono text-2xl font-bold tabular-nums text-neon-amber text-glow-amber">
              {stats.due}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Due now
            </span>
          </CardContent>
        </Card>
        <Card className="border-border bg-surface">
          <CardContent className="flex flex-col items-center gap-1 px-3 py-3">
            <span className="font-mono text-2xl font-bold tabular-nums text-muted-foreground">
              {stats.upcoming}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Upcoming
            </span>
          </CardContent>
        </Card>
        <Card className="border-neon-green/20 bg-surface">
          <CardContent className="flex flex-col items-center gap-1 px-3 py-3">
            <span className="font-mono text-2xl font-bold tabular-nums text-neon-green text-glow-green">
              {stats.mastered}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Mastered
            </span>
          </CardContent>
        </Card>
      </div>

      {/* ---- Start review session ---- */}
      {stats.due > 0 && (
        <Button
          className="w-full bg-neon-purple font-mono text-sm font-bold uppercase tracking-wider text-background hover:bg-neon-purple/90"
          onClick={handleStartSession}
          disabled={sessionLoading}
        >
          {sessionLoading
            ? "Loading..."
            : `Start Review Session (${stats.due} due)`}
        </Button>
      )}

      {/* ---- Empty state ---- */}
      {wrongAnswers.length === 0 && (
        <Card className="border-border bg-surface">
          <CardContent className="flex flex-col items-center gap-3 px-6 py-8 text-center">
            <span className="text-4xl">{"\u2705"}</span>
            <p className="font-mono text-sm text-muted-foreground">
              No wrong answers yet! Start practising to build your review
              list.
            </p>
            <Button
              variant="outline"
              className="font-mono text-xs uppercase tracking-wider"
              onClick={() => router.push("/")}
            >
              Go Practise
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ---- Mode filter ---- */}
      {wrongAnswers.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Filter:
            </span>
            <button
              onClick={() => setModeFilter(null)}
              className={[
                "rounded-md border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors",
                modeFilter === null
                  ? "border-neon-purple/60 bg-neon-purple/10 text-neon-purple"
                  : "border-border/50 text-muted-foreground hover:border-border",
              ].join(" ")}
            >
              All ({wrongAnswers.length})
            </button>
            {availableModes.map((mode) => {
              const count = wrongAnswers.filter(
                (a) => a.mode === mode,
              ).length;
              return (
                <button
                  key={mode}
                  onClick={() =>
                    setModeFilter(modeFilter === mode ? null : mode)
                  }
                  className={[
                    "rounded-md border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors",
                    modeFilter === mode
                      ? `border-current/30 bg-current/5 ${getModeColor(mode)}`
                      : "border-border/50 text-muted-foreground hover:border-border",
                  ].join(" ")}
                >
                  {getModeLabel(mode)} ({count})
                </button>
              );
            })}
          </div>

          {/* ---- Wrong answer cards ---- */}
          <div className="flex flex-col gap-3">
            {filteredAnswers.map((qa) => {
              const status = reviewStatus(qa);
              const options: string[] = qa.options ?? [];

              return (
                <Card
                  key={qa.id}
                  className="border-border/60 bg-surface"
                >
                  <CardContent className="flex flex-col gap-2.5 px-4 py-3">
                    {/* Top row: mode + topic + time */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        <Badge
                          variant="outline"
                          className={`font-mono text-[9px] ${getModeColor(qa.mode)}`}
                        >
                          {getModeLabel(qa.mode)}
                        </Badge>
                        {qa.topic && (
                          <Badge
                            variant="outline"
                            className="border-border/60 font-mono text-[9px] text-muted-foreground"
                          >
                            {qa.topic}
                          </Badge>
                        )}
                      </div>
                      <span className="shrink-0 text-[10px] text-muted-foreground">
                        {timeAgo(qa.created_at)}
                      </span>
                    </div>

                    {/* Question stem */}
                    <p className="text-sm leading-relaxed">
                      {qa.stem.length > 120
                        ? qa.stem.slice(0, 120) + "..."
                        : qa.stem}
                    </p>

                    {/* Answer comparison */}
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-neon-amber">
                          {"\u2717"}
                        </span>
                        <span className="text-muted-foreground">
                          You chose:{" "}
                          {qa.selected_index != null
                            ? `${OPTION_LABELS[qa.selected_index]}. ${options[qa.selected_index] ?? "?"}`
                            : "Unanswered"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-neon-green">
                          {"\u2713"}
                        </span>
                        <span className="text-muted-foreground">
                          Correct:{" "}
                          <span className="font-medium text-neon-green">
                            {OPTION_LABELS[qa.correct_index]}.{" "}
                            {options[qa.correct_index] ?? "?"}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Review status */}
                    <div className="flex items-center justify-between pt-0.5">
                      <Badge
                        variant="outline"
                        className={`font-mono text-[9px] ${status.className}`}
                      >
                        {status.label}
                      </Badge>
                      {qa.review_count > 0 && (
                        <span className="text-[10px] text-muted-foreground">
                          Reviewed {qa.review_count}x
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
