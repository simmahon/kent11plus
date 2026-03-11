"use client";

import { NVRShape } from "@/components/nvr-shape";
import type { NVRQuestion } from "@/lib/nvr-generator";
import { OPTION_LABELS } from "@/lib/constants";

interface Props {
  question: NVRQuestion;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
}

/* -- Option button (shared across all layouts) ------------------- */

function OptionButton({
  shape,
  idx,
  selectedAnswer,
  correctIndex,
  onSelect,
}: {
  shape: NVRQuestion["options"][number];
  idx: number;
  selectedAnswer: number | null;
  correctIndex: number;
  onSelect: (i: number) => void;
}) {
  const hasAnswered = selectedAnswer !== null;
  const isSelected = selectedAnswer === idx;
  const isCorrectOption = idx === correctIndex;

  let ring =
    "border-border/60 bg-surface hover:bg-surface-hover hover:border-border/80";
  if (hasAnswered) {
    if (isSelected && isCorrectOption) {
      ring = "border-neon-green/60 bg-neon-green/10 glow-green";
    } else if (isSelected && !isCorrectOption) {
      ring = "border-neon-amber/60 bg-neon-amber/10 glow-amber";
    } else if (isCorrectOption) {
      ring = "border-neon-green/40 bg-neon-green/5";
    } else {
      ring = "border-border/40 bg-surface opacity-50";
    }
  }

  return (
    <button
      disabled={hasAnswered}
      onClick={() => onSelect(idx)}
      className={[
        "flex flex-col items-center gap-1 rounded-lg border p-2 transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:cursor-default",
        ring,
      ].join(" ")}
    >
      <span
        className={[
          "font-mono text-xs font-bold",
          hasAnswered && isSelected && isCorrectOption
            ? "text-neon-green"
            : hasAnswered && isSelected && !isCorrectOption
              ? "text-neon-amber"
              : "text-muted-foreground",
        ].join(" ")}
      >
        {OPTION_LABELS[idx]}
      </span>
      <div className="flex h-16 w-16 items-center justify-center sm:h-[72px] sm:w-[72px]">
        <NVRShape config={shape} size={56} />
      </div>
    </button>
  );
}

/* -- Sequence layout: default "what comes next" ------------------ */

function SequenceLayout({ question }: { question: NVRQuestion }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {question.sequence.map((shape, i) => (
        <div
          key={i}
          className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border border-border/60 bg-muted/20 sm:h-20 sm:w-20"
        >
          <NVRShape config={shape} size={56} />
        </div>
      ))}

      {/* Question-mark placeholder */}
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border-2 border-dashed border-neon-cyan/50 bg-neon-cyan/5 sm:h-20 sm:w-20">
        <span className="text-2xl font-bold text-neon-cyan">?</span>
      </div>
    </div>
  );
}

/* -- Odd-one-out layout: 5 shapes, no placeholder ---------------- */

function OddOneOutLayout({
  question,
  selectedAnswer,
  onSelectAnswer,
}: Props) {
  const hasAnswered = selectedAnswer !== null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {question.sequence.map((shape, idx) => {
        const isSelected = selectedAnswer === idx;
        const isCorrectOption = idx === question.correctIndex;

        let ring =
          "border-border/60 bg-muted/20 hover:bg-surface-hover hover:border-border/80 cursor-pointer";
        if (hasAnswered) {
          if (isSelected && isCorrectOption) {
            ring = "border-neon-green/60 bg-neon-green/10 glow-green";
          } else if (isSelected && !isCorrectOption) {
            ring = "border-neon-amber/60 bg-neon-amber/10 glow-amber";
          } else if (isCorrectOption) {
            ring = "border-neon-green/40 bg-neon-green/5";
          } else {
            ring = "border-border/40 bg-muted/20 opacity-50";
          }
        }

        return (
          <button
            key={idx}
            disabled={hasAnswered}
            onClick={() => onSelectAnswer(idx)}
            className={[
              "flex flex-col items-center gap-1 rounded-lg border p-2 transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:cursor-default",
              ring,
            ].join(" ")}
          >
            <span
              className={[
                "font-mono text-xs font-bold",
                hasAnswered && isSelected && isCorrectOption
                  ? "text-neon-green"
                  : hasAnswered && isSelected && !isCorrectOption
                    ? "text-neon-amber"
                    : "text-muted-foreground",
              ].join(" ")}
            >
              {OPTION_LABELS[idx]}
            </span>
            <div className="flex h-16 w-16 items-center justify-center sm:h-[72px] sm:w-[72px]">
              <NVRShape config={shape} size={56} />
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* -- Analogy layout: A → B  then  C → ? ------------------------- */

function AnalogyLayout({ question }: { question: NVRQuestion }) {
  const [a, b, c] = question.sequence;
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {/* A */}
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border border-border/60 bg-muted/20 sm:h-20 sm:w-20">
        <NVRShape config={a} size={56} />
      </div>
      <span className="text-xl font-bold text-muted-foreground">→</span>
      {/* B */}
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border border-border/60 bg-muted/20 sm:h-20 sm:w-20">
        <NVRShape config={b} size={56} />
      </div>

      {/* Separator */}
      <span className="mx-2 text-xl font-bold text-muted-foreground">::</span>

      {/* C */}
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border border-border/60 bg-muted/20 sm:h-20 sm:w-20">
        <NVRShape config={c} size={56} />
      </div>
      <span className="text-xl font-bold text-muted-foreground">→</span>
      {/* ? */}
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border-2 border-dashed border-neon-cyan/50 bg-neon-cyan/5 sm:h-20 sm:w-20">
        <span className="text-2xl font-bold text-neon-cyan">?</span>
      </div>
    </div>
  );
}

/* -- Matrix layout: 3×3 grid with bottom-right missing ----------- */

function MatrixLayout({ question }: { question: NVRQuestion }) {
  // sequence has 8 shapes (positions 0-7), position 8 is missing
  return (
    <div className="inline-grid grid-cols-3 gap-2 sm:gap-3">
      {question.sequence.map((shape, i) => (
        <div
          key={i}
          className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border border-border/60 bg-muted/20 sm:h-20 sm:w-20"
        >
          <NVRShape config={shape} size={56} />
        </div>
      ))}
      {/* Missing cell */}
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border-2 border-dashed border-neon-cyan/50 bg-neon-cyan/5 sm:h-20 sm:w-20">
        <span className="text-2xl font-bold text-neon-cyan">?</span>
      </div>
    </div>
  );
}

/* -- Main component ----------------------------------------------- */

export function NVRQuestionDisplay({
  question,
  selectedAnswer,
  onSelectAnswer,
}: Props) {
  const promptText =
    question.prompt ?? "Which shape comes next in the sequence?";
  const isOddOneOut = question.patternType === "odd_one_out";

  return (
    <div className="flex flex-col gap-6">
      {/* Prompt */}
      <p className="text-center text-lg font-medium leading-relaxed sm:text-xl">
        {promptText}
      </p>

      {/* ---- Layout varies by pattern type ---- */}
      {isOddOneOut ? (
        <OddOneOutLayout
          question={question}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
        />
      ) : (
        <>
          {/* Sequence / grid display */}
          <div className="flex justify-center">
            {question.patternType === "analogy" ? (
              <AnalogyLayout question={question} />
            ) : question.patternType === "matrix" ? (
              <MatrixLayout question={question} />
            ) : (
              <SequenceLayout question={question} />
            )}
          </div>

          {/* ---- Answer options ---- */}
          <div className="flex flex-wrap items-stretch justify-center gap-2 sm:gap-3">
            {question.options.map((shape, idx) => (
              <OptionButton
                key={idx}
                shape={shape}
                idx={idx}
                selectedAnswer={selectedAnswer}
                correctIndex={question.correctIndex}
                onSelect={onSelectAnswer}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
