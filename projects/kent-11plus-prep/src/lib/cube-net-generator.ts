/* ------------------------------------------------------------------ */
/*  Cube Net Question Generator                                        */
/*  Generates "which cube does this net make?" questions with          */
/*  programmatic SVG-ready data structures.                            */
/*  All 11 valid hexomino cube nets with computationally verified      */
/*  fold mappings.                                                     */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

/** Simple symbols drawn on each cube face. */
export type CubeSymbol =
  | "circle"
  | "triangle"
  | "star"
  | "cross"
  | "heart"
  | "diamond"
  | "dots"
  | "stripes";

const ALL_SYMBOLS: CubeSymbol[] = [
  "circle",
  "triangle",
  "star",
  "cross",
  "heart",
  "diamond",
  "dots",
  "stripes",
];

/** The 6 faces of the cube, keyed by spatial position. */
export interface CubeFaces {
  front: CubeSymbol;
  back: CubeSymbol;
  top: CubeSymbol;
  bottom: CubeSymbol;
  left: CubeSymbol;
  right: CubeSymbol;
}

type FaceKey = keyof CubeFaces;

/** A view of 3 visible faces in isometric projection. */
export interface CubeView {
  top: CubeSymbol;
  frontLeft: CubeSymbol;
  frontRight: CubeSymbol;
}

/** Grid position for each face in the flat net. */
export interface NetLayout {
  name: string;
  positions: Record<FaceKey, [number, number]>; // [row, col]
  gridRows: number;
  gridCols: number;
}

export interface CubeNetQuestion {
  faces: CubeFaces;
  layout: NetLayout;
  options: CubeView[];
  correctIndex: number;
  explanation: string;
  difficulty: number;
  patternType: "cube_net";
}

/* ------------------------------------------------------------------ */
/*  Internal net definitions with fold mappings                        */
/* ------------------------------------------------------------------ */

/**
 * Each net is defined by:
 *  - grid: [row, col] for each of the 6 cells (indexed 0-5)
 *  - foldMap: which cell index becomes which spatial face after folding
 *
 * Fold mappings were derived by computational BFS fold simulation:
 *  1. All 35 free hexominoes were enumerated
 *  2. For each, folding was simulated via 3D orientation tracking
 *  3. Exactly 11 fold into valid cubes (6 distinct face normals)
 *  4. Verified: no grid-adjacent cells map to opposite cube faces
 *
 * Fold convention: cell 0 = front (+Z normal), up = row-1 = -X, right = col+1 = +Y.
 * Normal → face mapping: +Z=front, -Z=back, -X=top, +X=bottom, +Y=right, -Y=left.
 */
interface InternalNet {
  name: string;
  grid: [number, number][]; // 6 cells, indexed 0-5
  gridRows: number;
  gridCols: number;
  foldMap: Record<FaceKey, number>; // faceKey → cell index
}

const INTERNAL_NETS: InternalNet[] = [
  {
    // Net 1: Cross (symmetric plus)
    //    [0]
    // [1][2][3][4]
    //    [5]
    name: "cross",
    grid: [
      [0, 1], // 0
      [1, 0], // 1
      [1, 1], // 2
      [1, 2], // 3
      [1, 3], // 4
      [2, 1], // 5
    ],
    gridRows: 3,
    gridCols: 4,
    foldMap: { front: 0, top: 2, left: 3, right: 1, back: 5, bottom: 4 },
  },
  {
    // Net 2: Offset cross (cap one right of centre)
    //       [0]
    // [1][2][3][4]
    //    [5]
    name: "offset-cross",
    grid: [
      [0, 2], // 0
      [1, 0], // 1
      [1, 1], // 2
      [1, 2], // 3
      [1, 3], // 4
      [2, 1], // 5
    ],
    gridRows: 3,
    gridCols: 4,
    foldMap: { front: 0, top: 3, left: 4, right: 2, bottom: 1, back: 5 },
  },
  {
    // Net 3: L-cap (cap at far left of strip)
    // [0]
    // [1][2][3][4]
    //    [5]
    name: "l-cap",
    grid: [
      [0, 0], // 0
      [1, 0], // 1
      [1, 1], // 2
      [1, 2], // 3
      [1, 3], // 4
      [2, 1], // 5
    ],
    gridRows: 3,
    gridCols: 4,
    foldMap: { front: 0, top: 1, left: 2, bottom: 3, back: 5, right: 4 },
  },
  {
    // Net 4: R-cap (cap at far right of strip)
    //          [0]
    // [1][2][3][4]
    //    [5]
    name: "r-cap",
    grid: [
      [0, 3], // 0
      [1, 0], // 1
      [1, 1], // 2
      [1, 2], // 3
      [1, 3], // 4
      [2, 1], // 5
    ],
    gridRows: 3,
    gridCols: 4,
    foldMap: { front: 0, top: 4, right: 3, bottom: 2, left: 1, back: 5 },
  },
  {
    // Net 5: T-shape
    //       [0]
    // [1][2][3]
    //    [4]
    //    [5]
    name: "t-shape",
    grid: [
      [0, 2], // 0
      [1, 0], // 1
      [1, 1], // 2
      [1, 2], // 3
      [2, 1], // 4
      [3, 1], // 5
    ],
    gridRows: 4,
    gridCols: 3,
    foldMap: { front: 0, top: 3, right: 2, bottom: 1, back: 4, left: 5 },
  },
  {
    // Net 6: Z-wing
    //       [0][1]
    // [2][3][4]
    //    [5]
    name: "z-wing",
    grid: [
      [0, 2], // 0
      [0, 3], // 1
      [1, 0], // 2
      [1, 1], // 3
      [1, 2], // 4
      [2, 1], // 5
    ],
    gridRows: 3,
    gridCols: 4,
    foldMap: { front: 0, left: 1, top: 4, right: 3, bottom: 2, back: 5 },
  },
  {
    // Net 7: T-tall
    // [0][1][2]
    //    [3]
    //    [4]
    //    [5]
    name: "t-tall",
    grid: [
      [0, 0], // 0
      [0, 1], // 1
      [0, 2], // 2
      [1, 1], // 3
      [2, 1], // 4
      [3, 1], // 5
    ],
    gridRows: 4,
    gridCols: 3,
    foldMap: { front: 0, left: 1, back: 2, top: 3, right: 4, bottom: 5 },
  },
  {
    // Net 8: Z-shape (caps on opposite corners)
    //          [0]
    // [1][2][3][4]
    // [5]
    name: "z-shape",
    grid: [
      [0, 3], // 0
      [1, 0], // 1
      [1, 1], // 2
      [1, 2], // 3
      [1, 3], // 4
      [2, 0], // 5
    ],
    gridRows: 3,
    gridCols: 4,
    foldMap: { front: 0, top: 4, right: 3, bottom: 2, left: 1, back: 5 },
  },
  {
    // Net 9: S-shape (staircase)
    // [0]
    // [1][2][3]
    //       [4][5]
    name: "s-shape",
    grid: [
      [0, 0], // 0
      [1, 0], // 1
      [1, 1], // 2
      [1, 2], // 3
      [2, 2], // 4
      [2, 3], // 5
    ],
    gridRows: 3,
    gridCols: 4,
    foldMap: { front: 0, top: 1, left: 2, bottom: 3, back: 4, right: 5 },
  },
  {
    // Net 10: Band (wide L)
    // [0][1][2]
    //       [3][4][5]
    name: "band",
    grid: [
      [0, 0], // 0
      [0, 1], // 1
      [0, 2], // 2
      [1, 2], // 3
      [1, 3], // 4
      [1, 4], // 5
    ],
    gridRows: 2,
    gridCols: 5,
    foldMap: { front: 0, left: 1, back: 2, top: 3, right: 4, bottom: 5 },
  },
  {
    // Net 11: Zigzag (2-2-2 staircase)
    //       [0][1]
    //    [2][3]
    // [4][5]
    name: "zigzag",
    grid: [
      [0, 2], // 0
      [0, 3], // 1
      [1, 1], // 2
      [1, 2], // 3
      [2, 0], // 4
      [2, 1], // 5
    ],
    gridRows: 3,
    gridCols: 4,
    foldMap: { front: 0, left: 1, top: 3, right: 2, back: 5, bottom: 4 },
  },
];

/* ------------------------------------------------------------------ */
/*  Derive NetLayout from internal definitions                         */
/* ------------------------------------------------------------------ */

const FACE_KEYS: FaceKey[] = [
  "front",
  "back",
  "top",
  "bottom",
  "left",
  "right",
];

const OPPOSITE_MAP: Record<FaceKey, FaceKey> = {
  front: "back",
  back: "front",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

/** Convert an InternalNet to the exported NetLayout format. */
function toNetLayout(net: InternalNet): NetLayout {
  const positions = {} as Record<FaceKey, [number, number]>;
  for (const fk of FACE_KEYS) {
    const cellIdx = net.foldMap[fk];
    positions[fk] = net.grid[cellIdx];
  }
  return {
    name: net.name,
    positions,
    gridRows: net.gridRows,
    gridCols: net.gridCols,
  };
}

const NET_LAYOUTS: NetLayout[] = INTERNAL_NETS.map(toNetLayout);

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick N unique symbols from the pool. */
function pickUniqueSymbols(n: number): CubeSymbol[] {
  return shuffle([...ALL_SYMBOLS]).slice(0, n);
}

/* ------------------------------------------------------------------ */
/*  Viewing angles                                                     */
/* ------------------------------------------------------------------ */

/**
 * Each viewing angle defines which 3 faces are visible in isometric.
 * Order: [top, frontLeft, frontRight].
 *
 * The 4 "from above" isometric views show the top face plus two of
 * {front, back, left, right}. Adjacent side faces are visible
 * together; opposite side faces never are.
 */
type ViewAngle = [FaceKey, FaceKey, FaceKey];

const VIEW_ANGLES: ViewAngle[] = [
  ["top", "front", "right"],
  ["top", "left", "front"],
  ["top", "back", "left"],
  ["top", "right", "back"],
];

function getCorrectView(faces: CubeFaces, angle: ViewAngle): CubeView {
  return {
    top: faces[angle[0]],
    frontLeft: faces[angle[1]],
    frontRight: faces[angle[2]],
  };
}

/* ------------------------------------------------------------------ */
/*  Wrong answer generators                                            */
/* ------------------------------------------------------------------ */

function viewsEqual(a: CubeView, b: CubeView): boolean {
  return (
    a.top === b.top &&
    a.frontLeft === b.frontLeft &&
    a.frontRight === b.frontRight
  );
}

/**
 * Generate a plausible wrong cube view.
 *
 * Strategy 0: Replace one face with its opposite (shows impossible pair)
 * Strategy 1: Swap left/right faces
 * Strategy 2: Replace one face with a hidden non-opposite face
 * Strategy 3: Rotate the 3 visible faces cyclically
 * Strategy 4: Show a correct view from a different angle
 * Strategy 5: Replace two faces with their opposites
 */
function generateWrongView(
  faces: CubeFaces,
  angle: ViewAngle,
  strategy: number,
): CubeView {
  const correct = getCorrectView(faces, angle);

  switch (strategy) {
    case 0: {
      const slot = pick([0, 1, 2] as const);
      const faceKey = angle[slot];
      const oppositeKey = OPPOSITE_MAP[faceKey];
      const view = { ...correct };
      if (slot === 0) view.top = faces[oppositeKey];
      else if (slot === 1) view.frontLeft = faces[oppositeKey];
      else view.frontRight = faces[oppositeKey];
      return view;
    }
    case 1: {
      return {
        top: correct.top,
        frontLeft: correct.frontRight,
        frontRight: correct.frontLeft,
      };
    }
    case 2: {
      const visibleSet = new Set<FaceKey>(angle);
      const oppositeOfVisible = new Set(
        angle.map((a) => OPPOSITE_MAP[a]),
      );
      const hiddenNonOpposite = FACE_KEYS.filter(
        (k) => !visibleSet.has(k) && !oppositeOfVisible.has(k),
      );
      if (hiddenNonOpposite.length === 0) {
        return generateWrongView(faces, angle, 0);
      }
      const replacement = faces[pick(hiddenNonOpposite)];
      const slot = pick([0, 1, 2] as const);
      const view = { ...correct };
      if (slot === 0) view.top = replacement;
      else if (slot === 1) view.frontLeft = replacement;
      else view.frontRight = replacement;
      return view;
    }
    case 3: {
      return {
        top: correct.frontRight,
        frontLeft: correct.top,
        frontRight: correct.frontLeft,
      };
    }
    case 4: {
      const otherAngles = VIEW_ANGLES.filter((a) => a !== angle);
      const otherAngle = pick(otherAngles);
      return getCorrectView(faces, otherAngle);
    }
    default: {
      return {
        top: faces[OPPOSITE_MAP[angle[0]]],
        frontLeft: correct.frontLeft,
        frontRight: faces[OPPOSITE_MAP[angle[2]]],
      };
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Question generator                                                 */
/* ------------------------------------------------------------------ */

function generateCubeNetQuestion(difficulty: number): CubeNetQuestion {
  const symbols = pickUniqueSymbols(6);
  const faces: CubeFaces = {
    front: symbols[0],
    back: symbols[1],
    top: symbols[2],
    bottom: symbols[3],
    left: symbols[4],
    right: symbols[5],
  };

  // Pick net layout based on difficulty
  let layoutPool: NetLayout[];
  if (difficulty <= 2) {
    layoutPool = NET_LAYOUTS.slice(0, 3);
  } else if (difficulty <= 3) {
    layoutPool = NET_LAYOUTS.slice(0, 6);
  } else {
    layoutPool = NET_LAYOUTS;
  }
  const layout = pick(layoutPool);

  const angle = pick(VIEW_ANGLES);
  const correctView = getCorrectView(faces, angle);

  // Generate 4 unique wrong answers using diverse strategies
  const wrongs: CubeView[] = [];
  const strategies = shuffle([0, 1, 2, 3, 4, 5]);
  for (const strategy of strategies) {
    if (wrongs.length >= 4) break;
    const wrong = generateWrongView(faces, angle, strategy);
    if (
      !viewsEqual(wrong, correctView) &&
      !wrongs.some((w) => viewsEqual(w, wrong))
    ) {
      wrongs.push(wrong);
    }
  }

  // Fill remaining if needed (rare edge case)
  while (wrongs.length < 4) {
    const syms = pickUniqueSymbols(3);
    const filler: CubeView = {
      top: syms[0],
      frontLeft: syms[1],
      frontRight: syms[2],
    };
    if (
      !viewsEqual(filler, correctView) &&
      !wrongs.some((w) => viewsEqual(w, filler))
    ) {
      wrongs.push(filler);
    }
  }

  // Shuffle correct answer into options (5 total: 1 correct + 4 wrong)
  const allOptions = [...wrongs.slice(0, 4), correctView];
  const shuffled = shuffle(allOptions);
  const correctIndex = shuffled.findIndex((v) => viewsEqual(v, correctView));

  const [topFace, leftFace, rightFace] = angle;
  const explanation =
    `When you fold this ${layout.name} net, the ${faces[topFace]} symbol ends up on top, ` +
    `the ${faces[leftFace]} symbol faces the front-left, and the ${faces[rightFace]} ` +
    `symbol faces the front-right. ` +
    `The ${faces[OPPOSITE_MAP[topFace]]} (opposite of top), ` +
    `${faces[OPPOSITE_MAP[leftFace]]} (opposite of front-left), and ` +
    `${faces[OPPOSITE_MAP[rightFace]]} (opposite of front-right) are hidden.`;

  return {
    faces,
    layout,
    options: shuffled,
    correctIndex,
    explanation,
    difficulty,
    patternType: "cube_net",
  };
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export function generateCubeNetQuestions(
  count: number,
  difficulty: number,
): CubeNetQuestion[] {
  return Array.from({ length: count }, () =>
    generateCubeNetQuestion(difficulty),
  );
}
