/* ------------------------------------------------------------------ */
/*  Spatial Reasoning question generator                               */
/*  Generates hidden-shape and reflection questions for Kent 11+       */
/*  GL Assessment spatial reasoning sections.                          */
/* ------------------------------------------------------------------ */

import type { ShapeConfig, ShapeType, FillType, SizeType } from "./nvr-generator";
import { SHAPE_TYPES, FILL_TYPES } from "./nvr-generator";

/* -- Positioned shape for spatial layout ----------------------------- */

export interface PositionedShape extends ShapeConfig {
  x: number; // 0-100 coordinate
  y: number; // 0-100 coordinate
}

export interface SpatialQuestion {
  questionType: "hidden_shape" | "reflection";
  prompt: string;
  /** The main figure (composite for hidden_shape, single shape + fold line for reflection) */
  mainFigure: PositionedShape[];
  /** 5 answer options — each option is an array of shapes */
  options: PositionedShape[][];
  correctIndex: number;
  explanation: string;
  difficulty: number;
  patternType: string;
  /** For reflection questions: axis of reflection */
  foldLine?: { x1: number; y1: number; x2: number; y2: number };
}

/* -- Utilities ------------------------------------------------------- */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Shapes that look obviously different from each other for hidden-shape tasks. */
const DISTINCT_SHAPES: ShapeType[] = [
  "circle", "square", "triangle", "diamond", "pentagon", "hexagon", "star", "cross", "arrow",
];

/** Shapes suitable for reflection (visually asymmetric). */
const ASYMMETRIC_SHAPES: ShapeType[] = [
  "arrow", "triangle", "cross", "star", "pentagon",
];

/* ================================================================== */
/*  Hidden Shape generator                                             */
/* ================================================================== */

/**
 * Generates non-overlapping positions by dividing the canvas into a grid
 * and picking random cells. Positions are in 0-100 coordinate space.
 */
function generatePositions(count: number, margin: number = 15): { x: number; y: number }[] {
  const cols = 3;
  const rows = Math.ceil(count / cols);
  const cellW = (100 - margin * 2) / cols;
  const cellH = (100 - margin * 2) / rows;

  const cells: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({
        x: margin + c * cellW + cellW * (0.3 + Math.random() * 0.4),
        y: margin + r * cellH + cellH * (0.3 + Math.random() * 0.4),
      });
    }
  }
  return shuffle(cells).slice(0, count);
}

function makePositionedShape(
  type: ShapeType,
  fill: FillType,
  rotation: number,
  size: SizeType,
  x: number,
  y: number,
): PositionedShape {
  return { type, fill, rotation, size, x, y };
}

function generateHiddenShape(difficulty: number): SpatialQuestion {
  // Pick the target shape that will be hidden
  const targetType = pick(DISTINCT_SHAPES);
  const targetFill: FillType = pick(["filled", "empty", "grey"] as const);
  const targetRotation = pick([0, 45, 90, 135, 180, 225, 270, 315]);
  const targetSize: SizeType = pick(["small", "medium"] as const);

  // Build the complex figure: target shape + distractors
  const numDistractors = difficulty <= 2 ? 3 : difficulty <= 3 ? 4 : 5;
  const totalShapes = numDistractors + 1;
  const positions = generatePositions(totalShapes);

  // Place target in the complex figure
  const targetPos = positions[0];
  const figureShapes: PositionedShape[] = [
    makePositionedShape(targetType, targetFill, targetRotation, targetSize, targetPos.x, targetPos.y),
  ];

  // Generate distractor shapes for the complex figure (different from target)
  const otherTypes = DISTINCT_SHAPES.filter((s) => s !== targetType);
  for (let i = 1; i < totalShapes; i++) {
    const pos = positions[i];
    figureShapes.push(
      makePositionedShape(
        pick(otherTypes),
        pick(FILL_TYPES),
        pick([0, 45, 90, 180, 270]),
        pick(["small", "medium"] as const),
        pos.x,
        pos.y,
      ),
    );
  }

  // Build the correct answer option (the target shape, centered)
  const correctOption: PositionedShape[] = [
    makePositionedShape(targetType, targetFill, targetRotation, targetSize, 50, 50),
  ];

  // Build 4 wrong options — each differs in at least one key property
  const wrongOptions: PositionedShape[][] = [];

  // Wrong 1: different shape type
  wrongOptions.push([
    makePositionedShape(pick(otherTypes), targetFill, targetRotation, targetSize, 50, 50),
  ]);

  // Wrong 2: different rotation
  const wrongRotation = pick(
    [0, 45, 90, 135, 180, 225, 270, 315].filter((r) => r !== targetRotation),
  );
  wrongOptions.push([
    makePositionedShape(targetType, targetFill, wrongRotation, targetSize, 50, 50),
  ]);

  // Wrong 3: different fill
  const wrongFill = pick(
    (["filled", "empty", "grey", "hatched"] as const).filter((f) => f !== targetFill),
  );
  wrongOptions.push([
    makePositionedShape(targetType, wrongFill, targetRotation, targetSize, 50, 50),
  ]);

  // Wrong 4: different shape + different rotation
  wrongOptions.push([
    makePositionedShape(pick(otherTypes), targetFill, wrongRotation, targetSize, 50, 50),
  ]);

  // Assemble all 5 options and shuffle
  const allOptions = [correctOption, ...wrongOptions];
  const shuffled = shuffle(allOptions);
  const correctIndex = shuffled.indexOf(correctOption);

  return {
    questionType: "hidden_shape",
    prompt: "Which shape is hidden in the figure above?",
    mainFigure: figureShapes,
    options: shuffled,
    correctIndex,
    explanation: `The hidden shape is a ${targetFill} ${targetType} rotated ${targetRotation}°. Look for the matching shape, fill, and rotation within the complex figure.`,
    difficulty,
    patternType: "hidden_shape",
  };
}

/* ================================================================== */
/*  Reflection generator                                               */
/* ================================================================== */

type ReflectionAxis = "vertical" | "horizontal";

/**
 * Reflects a positioned shape across an axis through the center (50,50).
 */
function reflectShape(shape: PositionedShape, axis: ReflectionAxis): PositionedShape {
  if (axis === "vertical") {
    // Reflect across vertical line x=50
    return {
      ...shape,
      x: 100 - shape.x,
      rotation: (360 - shape.rotation) % 360, // mirror rotation
    };
  }
  // Reflect across horizontal line y=50
  return {
    ...shape,
    y: 100 - shape.y,
    rotation: (180 - shape.rotation + 360) % 360, // mirror rotation
  };
}

/**
 * Rotates a shape's rotation by a given amount (doesn't move position).
 */
function rotateShapeAngle(shape: PositionedShape, angle: number): PositionedShape {
  return {
    ...shape,
    rotation: (shape.rotation + angle + 360) % 360,
  };
}

function generateReflection(difficulty: number): SpatialQuestion {
  const shapeType = pick(ASYMMETRIC_SHAPES);
  const fill: FillType = pick(["filled", "grey", "empty"] as const);
  const axis: ReflectionAxis = pick(["vertical", "horizontal"]);

  // Build a simple asymmetric figure: 1-2 shapes
  const numParts = difficulty <= 2 ? 1 : 2;
  const originalShapes: PositionedShape[] = [];

  if (numParts === 1) {
    // Single asymmetric shape, offset from center
    const offsetX = axis === "vertical" ? randInt(20, 40) : 50;
    const offsetY = axis === "horizontal" ? randInt(20, 40) : 50;
    originalShapes.push(
      makePositionedShape(
        shapeType,
        fill,
        pick([0, 30, 45, 60, 90]),
        "medium",
        offsetX,
        offsetY,
      ),
    );
  } else {
    // Two shapes for harder difficulty
    const secondType = pick(ASYMMETRIC_SHAPES.filter((s) => s !== shapeType));
    const secondFill = pick(FILL_TYPES);

    if (axis === "vertical") {
      originalShapes.push(
        makePositionedShape(shapeType, fill, pick([0, 45, 90]), "medium", 30, 35),
      );
      originalShapes.push(
        makePositionedShape(secondType, secondFill, pick([0, 45, 90]), "small", 35, 65),
      );
    } else {
      originalShapes.push(
        makePositionedShape(shapeType, fill, pick([0, 45, 90]), "medium", 35, 30),
      );
      originalShapes.push(
        makePositionedShape(secondType, secondFill, pick([0, 45, 90]), "small", 65, 35),
      );
    }
  }

  // Generate fold line
  const foldLine =
    axis === "vertical"
      ? { x1: 50, y1: 5, x2: 50, y2: 95 }
      : { x1: 5, y1: 50, x2: 95, y2: 50 };

  // Correct answer: proper reflection
  const correctShapes = originalShapes.map((s) => reflectShape(s, axis));
  const correctOption: PositionedShape[] = correctShapes.map((s) => ({
    ...s,
    // Re-center for option display
    x: s.x,
    y: s.y,
  }));

  // Wrong options
  const wrongOptions: PositionedShape[][] = [];

  // Wrong 1: rotated 180° instead of reflected
  wrongOptions.push(
    originalShapes.map((s) => rotateShapeAngle(s, 180)),
  );

  // Wrong 2: reflected on the WRONG axis
  const wrongAxis: ReflectionAxis = axis === "vertical" ? "horizontal" : "vertical";
  wrongOptions.push(
    originalShapes.map((s) => reflectShape(s, wrongAxis)),
  );

  // Wrong 3: reflected but with wrong rotation (extra 90°)
  wrongOptions.push(
    originalShapes.map((s) => rotateShapeAngle(reflectShape(s, axis), 90)),
  );

  // Wrong 4: original shape (no transformation)
  wrongOptions.push(
    originalShapes.map((s) => ({ ...s })),
  );

  const allOptions = [correctOption, ...wrongOptions];
  const shuffled = shuffle(allOptions);
  const correctIndex = shuffled.indexOf(correctOption);

  const axisLabel = axis === "vertical" ? "vertical (left-right)" : "horizontal (top-bottom)";

  return {
    questionType: "reflection",
    prompt: `Which option shows the figure reflected across the ${axis} line?`,
    mainFigure: originalShapes,
    options: shuffled,
    correctIndex,
    explanation: `The figure should be reflected across the ${axisLabel} axis. The correct answer mirrors each shape's position and orientation across the dotted line.`,
    difficulty,
    patternType: "reflection",
    foldLine,
  };
}

/* ================================================================== */
/*  Main export                                                        */
/* ================================================================== */

export function generateSpatialQuestions(
  count: number,
  difficulty: number,
): SpatialQuestion[] {
  const generators = [generateHiddenShape, generateReflection];

  return Array.from({ length: count }, () => pick(generators)(difficulty));
}
