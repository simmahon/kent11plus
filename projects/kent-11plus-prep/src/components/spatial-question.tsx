"use client";

import { useId } from "react";
import { NVRShape } from "@/components/nvr-shape";
import type { SpatialQuestion, PositionedShape } from "@/lib/spatial-generator";
import { OPTION_LABELS } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Positioned shape renderer (places an NVR shape at x,y in an SVG)   */
/* ------------------------------------------------------------------ */

function PositionedShapeSVG({
  shape,
  viewSize,
}: {
  shape: PositionedShape;
  viewSize: number;
}) {
  const shapeSize = viewSize * 0.28;
  // Map 0-100 coord to SVG pixel position
  const px = (shape.x / 100) * viewSize;
  const py = (shape.y / 100) * viewSize;

  return (
    <foreignObject
      x={px - shapeSize / 2}
      y={py - shapeSize / 2}
      width={shapeSize}
      height={shapeSize}
    >
      <NVRShape config={shape} size={shapeSize} />
    </foreignObject>
  );
}

/* ------------------------------------------------------------------ */
/*  Complex figure renderer (main figure area)                         */
/* ------------------------------------------------------------------ */

function ComplexFigure({
  shapes,
  size = 240,
  foldLine,
}: {
  shapes: PositionedShape[];
  size?: number;
  foldLine?: { x1: number; y1: number; x2: number; y2: number };
}) {
  const uid = useId().replace(/:/g, "_");

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label="Main figure"
      className="block"
    >
      {/* Background */}
      <rect
        x={0}
        y={0}
        width={size}
        height={size}
        fill="oklch(0.13 0.01 270)"
        rx={8}
      />

      {/* Fold line for reflection questions */}
      {foldLine && (
        <>
          <defs>
            <pattern
              id={`dash_${uid}`}
              width="12"
              height="1"
              patternUnits="userSpaceOnUse"
              patternTransform={`rotate(${
                foldLine.x1 === foldLine.x2 ? 90 : 0
              })`}
            >
              <line
                x1="0"
                y1="0.5"
                x2="7"
                y2="0.5"
                stroke="oklch(0.7 0.15 195)"
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <line
            x1={(foldLine.x1 / 100) * size}
            y1={(foldLine.y1 / 100) * size}
            x2={(foldLine.x2 / 100) * size}
            y2={(foldLine.y2 / 100) * size}
            stroke="oklch(0.7 0.15 195)"
            strokeWidth={2}
            strokeDasharray="8 5"
            opacity={0.8}
          />
        </>
      )}

      {/* Shapes */}
      {shapes.map((shape, i) => (
        <PositionedShapeSVG key={i} shape={shape} viewSize={size} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Option figure renderer (smaller, for answer buttons)               */
/* ------------------------------------------------------------------ */

function OptionFigure({
  shapes,
  size = 64,
}: {
  shapes: PositionedShape[];
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className="block"
    >
      <rect
        x={0}
        y={0}
        width={size}
        height={size}
        fill="oklch(0.13 0.01 270)"
        rx={4}
      />
      {shapes.map((shape, i) => (
        <PositionedShapeSVG key={i} shape={shape} viewSize={size} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Full question display                                              */
/* ------------------------------------------------------------------ */

interface Props {
  question: SpatialQuestion;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
}

export function SpatialQuestionDisplay({
  question,
  selectedAnswer,
  onSelectAnswer,
}: Props) {
  const hasAnswered = selectedAnswer !== null;

  return (
    <div className="flex flex-col gap-6">
      {/* Prompt */}
      <p className="text-center text-lg font-medium leading-relaxed sm:text-xl">
        {question.prompt}
      </p>

      {/* ---- Main figure ---- */}
      <div className="flex justify-center">
        <div className="rounded-xl border border-border/60 bg-muted/10 p-4">
          <ComplexFigure
            shapes={question.mainFigure}
            size={240}
            foldLine={question.foldLine}
          />
        </div>
      </div>

      {/* ---- Answer options ---- */}
      <div className="flex flex-wrap items-stretch justify-center gap-2 sm:gap-3">
        {question.options.map((optionShapes, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrectOption = idx === question.correctIndex;

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
                <OptionFigure shapes={optionShapes} size={64} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
