/* ------------------------------------------------------------------ */
/*  POST /api/questions/generate                                       */
/*  Uses Claude Haiku to generate Kent 11+ practice questions in      */
/*  GL Assessment format. Returns validated, structured JSON.          */
/* ------------------------------------------------------------------ */

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { GeneratedBatchSchema } from "@/lib/ai/question-schemas";
import { rateLimit } from "@/lib/rate-limit";
import { skillLevelContext } from "@/lib/adaptive";
import { getPassageForDifficulty, type Passage } from "@/lib/passages";

/* ------------------------------------------------------------------ */
/*  Request body schema                                                */
/* ------------------------------------------------------------------ */

const RequestSchema = z.object({
  category: z.enum([
    "verbal_reasoning",
    "non_verbal_reasoning",
    "mathematics",
    "english",
  ]),
  topic: z.string().min(1, "Topic is required"),
  difficulty: z.number().int().min(1).max(5),
  count: z.number().int().min(1).max(10),
  skillLevel: z.number().min(1).max(5).optional(),
});

/* ------------------------------------------------------------------ */
/*  Category-specific prompt instructions                              */
/* ------------------------------------------------------------------ */

const CATEGORY_INSTRUCTIONS: Record<string, string> = {
  verbal_reasoning: `
Generate KENT TEST verbal reasoning questions. Follow the examples EXACTLY for each question type.

IMPORTANT: Generate ONLY the question type specified in the topic. If the topic says "letter codes", generate ONLY letter code questions. If it says "hidden words", generate ONLY hidden word questions. Match the topic precisely.

=== SYNONYMS AND ANTONYMS ===
Give a word and ask the child to find the word closest in meaning (synonym) or most opposite in meaning (antonym).

GOOD stem (synonym): "Which word is closest in meaning to ABUNDANT?"
Options: Plentiful, Scarce, Empty, Tiny, Absent

GOOD stem (antonym): "Which word is most opposite in meaning to COURAGEOUS?"
Options: Cowardly, Brave, Strong, Foolish, Cautious

Use vocabulary appropriate for a bright Year 5/6 child -- words from quality children's literature.

=== LETTER CODES ===
Present a simple, consistent rule demonstrated by 1-2 examples, then ask the child to apply it.
Rules must be SIMPLE: shift each letter forward/backward by a fixed amount, reverse the word, swap pairs, etc.
WORK OUT THE ANSWER YOURSELF FIRST. Then verify it. The stem must NOT show any working.

GOOD example stem: "If COLD is coded as DPME and WARM is coded as XBSN, what is the code for FISH?"
(Rule: each letter +1. F→G, I→J, S→T, H→I = GJTI)

BAD stem (NEVER do this): "CHAT becomes TACJ (reversed to TAC, then T→U, A→B... wait, let me check...)"
-- Never include working, self-correction, or reasoning in the question text.

=== LETTER SERIES ===
Show a sequence of letter groups with a clear pattern. Ask for the next group.

GOOD example stem: "Find the next group in this series: AB, CD, EF, GH, ?"
GOOD example stem: "What comes next? AZ, BY, CX, DW, ?"

=== HIDDEN WORDS ===
A word is hidden SPANNING ACROSS two adjacent words in a sentence. The child must find it.

CONSTRUCTION METHOD (follow this exactly):
1. Pick a target word, e.g. "ARCH"
2. Split it at any point: "AR" + "CH"
3. Find a real word ending in "AR" → "sugar"
4. Find a real word starting with "CH" → "chocolate"
5. Build a natural sentence using these words next to each other
6. Sentence: "I like sugar chocolate ice cream." → ARCH spans "sugAR" + "CHocolate". VERIFIED!

GOOD stem: "Find a four-letter word hidden across two words in this sentence: 'I like sugar chocolate ice cream.'"
Options: ARCH, INCH, EACH, RICH, COLA

More examples of valid hidden words:
- "The **pla**te **ar**rived" → TEAR spans "plate" + "arrived" ← WRONG, that gives "TEAR" across "plaTe" + "ARrived"? No. Let me be precise.
Actually: "She was also proud" → SOAP spans "al-SO" + "AP-roud"? No.

Valid patterns:
- HEAT in "t**HE AT**tic": the + attic
- EMIT in "so**ME IT**ems": some + items
- OVEN in "tw**O VEN**tures": two + ventures
- LACE in "roya**L ACE**s": royal + aces

VERIFY by reading the consecutive letters across the word boundary. If the hidden word doesn't appear letter-by-letter, START OVER with a different word pair.

The stem should say: "Find a [N]-letter word hidden across two words in this sentence: '[sentence]'"
The 5 options should include the correct hidden word and 4 plausible but wrong words.

=== WORD ANALOGIES ===
"A is to B as C is to ?"

GOOD stem: "Hot is to cold as light is to ?"
Options: Dark, Dim, Shade, Night, Black

=== ODD ONE OUT ===
Five words where four share a specific connection. One does not.

GOOD stem: "Which word is the odd one out?"
Options: Oak, Elm, Birch, Rose, Ash
(Four are trees, Rose is a flower)

=== COMPOUND WORDS ===
Two groups of words. Find one word from each that combine to make a real word.

GOOD stem: "Find one word from each group that together make a new word. Group 1: (rain, sun, cloud) Group 2: (bow, set, fall)"
Options: rainbow, sunset, rainfall, sunbow, cloudset

=== NUMBER CODES ===
Letters are mapped to numbers using worked examples. The child decodes or encodes a word.

GOOD stem: "If CHAIR is coded as 3-8-1-9-18 (A=1, B=2, ... Z=26), what word is coded as 4-15-7?"
Options: DOG, DIG, FOG, COG, LOG

GOOD stem: "In a code, CAT = 24, DOG = 26. Each letter is worth its alphabet position (A=1, B=2, ...). What does FOX equal?"
Options: 45, 42, 48, 39, 51

Construction: Use A=1...Z=26 or simple consistent mappings. VERIFY arithmetic: add up letter values and confirm the total. The rule must be deducible from the examples given.

=== MOVE A LETTER ===
Move exactly one letter from one word to another to make two new real words. Both new words must be real English words.

GOOD stem: "Move one letter from WHEAT to PLAN to make two new words."
Options: "WHAT & PLANE", "HEAT & PLANE", "WHEA & PLANT", "WHET & PLAN", "WHAT & PLAN"

Construction: Pick two common words where removing a letter from one and inserting it into the other makes two new valid words. VERIFY both resulting words exist in standard dictionaries.

=== INSERT A LETTER ===
Add one letter somewhere in a given word to make a new word matching a definition clue.

GOOD stem: "Add one letter to PLAN to make a word meaning 'simple'."
Options: PLAIN, PLANE, PLANT, PLANK, PLAID

GOOD stem: "Insert one letter into HEAT to make a word meaning 'the centre of something'."
Options: HEART, WHEAT, CHEAT, HEATH, HEATS

Construction: The definition must clearly point to one answer. All distractors should be real words that could plausibly be formed by inserting a letter.

=== COMPLETE THE WORD ===
Fill in missing letters to make a word matching a definition clue. Show blanks as underscores.

GOOD stem: "Complete the word: B _ _ K (something you read)"
Options: BOOK, BEAK, BACK, BULK, BARK

GOOD stem: "Complete the word: _ O U N _ (a shape or a limit)"
Options: ROUND, BOUND, FOUND, MOUND, SOUND

Construction: The blanks and the definition together should lead to one clear answer. Include plausible distractors that also fit the letter pattern but NOT the definition.

=== WORD CONNECTIONS ===
Find a word that can follow the first given word AND precede the second given word to make two compound words or common phrases.

GOOD stem: "Find a word that can follow SUN and come before HOUSE."
Options: LIGHT, FIRE, FLOWER, SET, RISE

(sunLIGHT, LIGHThouse)

GOOD stem: "Find a word that can follow FOOT and come before GAME."
Options: BALL, NOTE, STEP, PRINT, WEAR

(footBALL, BALLgame)

Construction: Both compound words (or established two-word phrases) must be real. Verify that the connecting word genuinely works in BOTH positions. Distractors should form a valid compound with one of the two given words but not both.

=== ALPHABET POSITION ===
Questions about the position of letters in the alphabet, counting forwards or backwards.

GOOD stem: "Which letter is 5th from the end of the alphabet?"
Options: V, U, W, T, X

GOOD stem: "If the first half of the alphabet is A-M and the second is N-Z, which letter is 3rd in the second half?"
Options: P, O, Q, N, R

GOOD stem: "What letter is exactly midway between D and J in the alphabet?"
Options: G, F, H, E, I

Construction: Questions should require mental counting or simple arithmetic on letter positions. VERIFY your answer by counting carefully. Include near-miss distractors (adjacent letters).

=== NUMBER RELATIONSHIPS ===
Number patterns presented in a verbal context. The child must identify the rule and find the missing number.

GOOD stem: "If 3 → 9, 4 → 16, 5 → 25, what does 7 → ?"
Options: 49, 42, 36, 56, 64

GOOD stem: "In a number machine, 2 becomes 7, 3 becomes 10, 4 becomes 13. What does 6 become?"
Options: 19, 18, 21, 16, 20

Construction: The rule should be a single consistent operation (squaring, doubling and adding, multiplying and subtracting, etc.). VERIFY by applying the rule to all given pairs. Keep operations within the mental arithmetic range of a Year 5/6 child.

=== SHUFFLED SENTENCES ===
Words of a sentence are given in a scrambled order. The child must rearrange them into a correct sentence, then answer a question about it.

GOOD stem: "Rearrange these words to make a sentence: 'park the walked to dog the'. Who walked to the park?"
Options: the dog, the park, the cat, the man, the boy

GOOD stem: "Put these words in the right order: 'baked cake a Lucy chocolate'. What did Lucy bake?"
Options: a chocolate cake, a lemon cake, chocolate biscuits, a fruit cake, a birthday cake

Construction: The scrambled words must form exactly ONE grammatically correct sentence. The comprehension question must be clearly answerable from the unscrambled sentence. Distractors should be plausible but not supported by the sentence.

=== WORD MATRICES ===
A 2×2 or 3×3 grid of words where rows and/or columns follow consistent relationship rules (e.g. synonyms across rows, categories down columns). One cell is missing.

GOOD stem: "Look at this word grid. Find the missing word.\n  hot  | cold\n  big  |  ?  "
Options: small, large, huge, tiny, wide
(Rule: each row contains antonym pairs → hot/cold, big/small)

GOOD stem: "Find the missing word in this grid.\n  cat  | kitten\n  dog  | puppy\n  cow  |   ?   "
Options: calf, foal, lamb, piglet, chick
(Rule: column 1 = adult animal, column 2 = its young)

Construction: The relationship rule must be consistent and discoverable. Present the grid clearly using a simple text layout (pipe-separated columns, one row per line). VERIFY the missing word is the only one that maintains the pattern. Distractors should follow the general theme but break the specific rule.

=== SAME MEANING ===
Two sentences are given. The child must find one word from each sentence that means the same (are synonyms).

GOOD stem: "Find two words, one from each sentence, that mean the same.\nSentence 1: The quick fox jumped over the fence.\nSentence 2: The swift rabbit ran across the field."
Options: "quick & swift", "fox & rabbit", "jumped & ran", "fence & field", "over & across"

GOOD stem: "Find two words, one from each sentence, that have the same meaning.\nSentence 1: The ancient castle stood on the hilltop.\nSentence 2: The old church was built by the river."
Options: "ancient & old", "castle & church", "stood & built", "hilltop & river", "the & the"

Construction: The two synonym words must genuinely mean the same thing. The sentences should contain other words that might seem related but are not true synonyms. Distractors should pair words that are thematically linked but NOT synonyms.

=== CLOSEST MEANING IN CONTEXT ===
A sentence is given with one word underlined or highlighted. The child picks the word closest in meaning to that word AS USED in that specific context.

GOOD stem: "In the sentence 'The bright student answered every question correctly', which word is closest in meaning to 'bright'?"
Options: clever, shiny, colourful, happy, light

GOOD stem: "In the sentence 'She had to bear the heavy load up the mountain', which word is closest in meaning to 'bear'?"
Options: carry, animal, tolerate, hold, suffer

Construction: Choose a word that has multiple meanings so the context matters. The correct answer must match the CONTEXTUAL meaning. Distractors should include words that match OTHER meanings of the highlighted word or are loosely related. This differs from basic synonyms because context determines which meaning applies.

QUALITY RULES:
- The question stem must read like a professional exam paper -- clean, clear, no working shown
- Near-miss distractors that look plausible
- Solvable in 30-40 seconds by a prepared Year 5/6 child`,

  mathematics: `
Generate KENT TEST maths questions. KS2 Level 5+ standard.

CRITICAL: Work out the answer step by step BEFORE choosing the correct option. Double-check arithmetic. A wrong answer is worse than no question.

TOPICS (match what is requested):
- FRACTIONS: Mixed number operations, fraction of amounts, comparing fractions, word problems
- RATIOS: Sharing in ratios, ratio problems, simplifying
- ALGEBRA: Simple equations, substitution, finding unknowns
- AREA/PERIMETER: Compound shapes, missing dimensions
- WORD PROBLEMS: Multi-step, real-world contexts, no scaffolding
- TIME/SPEED/DISTANCE: Unit conversions, multi-step calculations
- DATA INTERPRETATION: Tables/charts with calculations

RULES:
- Every question at level 3+ needs 2-3 calculation steps minimum
- Embed in word problems (not bare calculations)
- Near-miss distractors based on common errors (wrong operation, forgetting to convert units, off-by-one)
- Solvable in 45-60 seconds by a prepared child
- Explanation: show concise step-by-step working (2-4 lines)
- VERIFY your arithmetic is correct. Recheck before outputting.`,

  english: `
Generate KENT TEST English questions.

Match the topic requested. Question types:

=== SPELLING ===
Present 5 spellings of a word -- only ONE is correct. Use commonly misspelled Year 5/6 words.
GOOD stem: "Which word is spelled correctly?"
Options: "accomodate", "accommodate", "acommodate", "acomodate", "accomidate"
IMPORTANT: Make sure exactly one option has the correct spelling. Verify letter by letter.

=== PUNCTUATION ===
Present 5 versions of a sentence with different punctuation. Only one is correct.
GOOD stem: "Which sentence is punctuated correctly?"
Test: apostrophes (possession vs contraction), commas in lists, embedded clauses, direct speech.

=== VOCABULARY / CLOZE ===
Sentence with a blank. All 5 options are grammatically valid but only one fits the precise meaning.
GOOD stem: "The old house had a ____ atmosphere that made visitors feel uneasy."
Options: sinister, sad, dark, cold, broken
(All could work but "sinister" is the most precise contextual fit)

=== COMPREHENSION ===
Provide a short passage (3-5 quality sentences) in the "passage" field.
Ask inference questions -- NOT fact retrieval. Test: author's purpose, character motivation, vocabulary in context, tone.

RULES:
- Clean, professional exam-style stems
- Solvable in 45-60 seconds
- Near-miss distractors that test real understanding`,

  non_verbal_reasoning: `
Generate non-verbal reasoning questions as text descriptions of visual patterns.
Note: These are fallback text descriptions -- the app has a dedicated visual NVR renderer.
Describe the visual pattern clearly in the question stem.
The 5 options should describe different possible next shapes/patterns.`,
};

/* ------------------------------------------------------------------ */
/*  System prompt                                                      */
/* ------------------------------------------------------------------ */

const SYSTEM_PROMPT = `You are an expert UK 11+ question writer for GL Assessment Kent Grammar School tests (25% pass rate, 332+/423 to pass).

ABSOLUTE RULES -- violating any of these is a critical error:
1. The question STEM must read like a published exam paper. NEVER include working-out, self-corrections, reasoning steps, hedging ("wait, let me check..."), or commentary in the stem. The stem is ONLY what the child reads.
2. GL format: exactly 5 options (A-E). All options must be plausible.
3. The explanation field is where you show method/working -- keep it 2-4 sentences, friendly, step-by-step.
4. VERIFY correctness: correctAnswer.value MUST exactly match options[correctAnswer.index]. The answer must genuinely be correct.
5. Return ONLY valid JSON. No markdown fences, no text before/after the JSON.
6. correctAnswer.index is 0-based (0=A, 1=B, 2=C, 3=D, 4=E).
7. questionType = "multiple_choice" for all questions.
8. Difficulty: 1-2 = KS2 standard, 3 = 11+ entry, 4 = Kent test standard, 5 = stretch.

JSON structure:
{
  "questions": [
    {
      "content": {
        "stem": "Clean question text as it would appear on the exam paper",
        "options": ["A", "B", "C", "D", "E"],
        "passage": null,
        "svgConfig": null
      },
      "correctAnswer": { "index": 0, "value": "A" },
      "explanation": "Concise step-by-step method",
      "difficulty": 4,
      "questionType": "multiple_choice"
    }
  ]
}`;

/* ------------------------------------------------------------------ */
/*  Route handler                                                      */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  try {
    /* -- Rate limiting (10 requests per minute per IP) -------------- */
    const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
    if (!rateLimit(ip, 10, 60_000)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 },
      );
    }

    /* -- Validate auth credentials ---------------------------------- */
    const authToken = process.env.ANTHROPIC_AUTH_TOKEN;
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!authToken && !apiKey) {
      return NextResponse.json(
        { error: "Neither ANTHROPIC_AUTH_TOKEN nor ANTHROPIC_API_KEY is configured." },
        { status: 500 }
      );
    }

    /* -- Parse & validate request body ----------------------------- */
    const body = await request.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request body.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { category, topic, difficulty, count, skillLevel } = parsed.data;

    /* -- Detect comprehension mode and select curated passage ------ */
    const COMPREHENSION_TOPICS = ["reading comprehension", "inference and deduction"];
    const isComprehension =
      category === "english" && COMPREHENSION_TOPICS.includes(topic.toLowerCase());

    let selectedPassage: Passage | null = null;
    if (isComprehension) {
      selectedPassage = getPassageForDifficulty(difficulty);
    }

    /* -- Build user prompt ----------------------------------------- */
    const categoryInstructions =
      CATEGORY_INSTRUCTIONS[category] ?? "";

    const skillContext = skillLevel
      ? `\n${skillLevelContext(skillLevel)}\n`
      : "";

    /* -- Comprehension-specific prompt with curated passage -------- */
    let userPrompt: string;

    if (isComprehension && selectedPassage) {
      userPrompt = `Generate ${count} reading comprehension question(s) at difficulty level ${difficulty} (out of 5).
${skillContext}

Here is the reading passage that ALL questions must be about:

TITLE: "${selectedPassage.title}"
GENRE: ${selectedPassage.genre}

---
${selectedPassage.content}
---

IMPORTANT INSTRUCTIONS FOR COMPREHENSION QUESTIONS:
- Every question MUST be answerable from the passage above. Do NOT ask about information not in the passage.
- Set the "passage" field in each question's content to null -- the passage will be injected separately.
- Question types to include (mix these across the ${count} questions):
  * INFERENCE: What can you infer from the passage? What does the author imply?
  * VOCABULARY IN CONTEXT: What does the word "X" mean as used in this passage?
  * MAIN IDEA: What is the main theme or purpose of this passage?
  * CHARACTER/AUTHOR PURPOSE: Why does the author use a particular technique? What motivates a character?
  * FACTUAL RETRIEVAL WITH REASONING: Questions that require combining two pieces of information from the passage.
- Every comprehension question should require inference or deduction, not just locating information.
- Include near-miss distractors that are plausible but subtly wrong.
- Questions should be solvable in 45-60 seconds by a well-prepared Year 5/6 child.

Remember: return ONLY the JSON object with a "questions" array. No markdown, no extra text.`;
    } else {
      userPrompt = `Generate ${count} ${category.replace(/_/g, " ")} question(s) about "${topic}" at difficulty level ${difficulty} (out of 5).
${skillContext}
${categoryInstructions}

Remember: return ONLY the JSON object with a "questions" array. No markdown, no extra text.`;
    }

    /* -- Call Claude Haiku ----------------------------------------- */
    const anthropic = new Anthropic({
      ...(authToken ? { authToken, apiKey: null } : { apiKey }),
    });

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    /* -- Check for truncation -------------------------------------- */
    if (message.stop_reason === "max_tokens") {
      console.warn("[/api/questions/generate] Response truncated (max_tokens reached)");
      return NextResponse.json(
        { error: "AI response was truncated. Try requesting fewer questions." },
        { status: 502 },
      );
    }

    /* -- Extract text content from response ------------------------ */
    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "No text content in AI response." },
        { status: 502 }
      );
    }

    /* -- Parse JSON from the response ------------------------------ */
    let rawJson: unknown;
    try {
      let cleaned = textBlock.text.trim();
      // 1. Strip markdown fences
      const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i);
      if (fenceMatch) {
        cleaned = fenceMatch[1].trim();
      }
      // 2. Fallback: find the outermost { ... } if direct parse fails
      try {
        rawJson = JSON.parse(cleaned);
      } catch {
        const start = cleaned.indexOf("{");
        const end = cleaned.lastIndexOf("}");
        if (start !== -1 && end > start) {
          rawJson = JSON.parse(cleaned.slice(start, end + 1));
        } else {
          throw new Error("No JSON object found");
        }
      }
    } catch {
      return NextResponse.json(
        {
          error: "Failed to parse AI response as JSON.",
          raw: textBlock.text.slice(0, 500),
        },
        { status: 502 }
      );
    }

    /* -- Validate against Zod schema ------------------------------- */
    const validated = GeneratedBatchSchema.safeParse(rawJson);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: "AI response did not match expected schema.",
          details: validated.error.flatten().fieldErrors,
        },
        { status: 502 }
      );
    }

    /* -- Return validated questions -------------------------------- */
    /* For comprehension: inject the curated passage into every     */
    /* question and include passage metadata in the response.       */
    if (isComprehension && selectedPassage) {
      const questionsWithPassage = validated.data.questions.map((q) => ({
        ...q,
        content: {
          ...q.content,
          passage: selectedPassage!.content,
        },
      }));

      return NextResponse.json(
        {
          questions: questionsWithPassage,
          passage: {
            id: selectedPassage.id,
            title: selectedPassage.title,
            genre: selectedPassage.genre,
            wordCount: selectedPassage.wordCount,
            source: selectedPassage.source,
          },
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { questions: validated.data.questions },
      { status: 200 }
    );
  } catch (error) {
    console.error("[/api/questions/generate] Unexpected error:", error);

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
