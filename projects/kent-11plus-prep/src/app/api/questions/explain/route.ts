/* ------------------------------------------------------------------ */
/*  POST /api/questions/explain                                        */
/*  Generates a child-friendly explanation when a student gets a       */
/*  question wrong. Uses Claude Haiku for cost efficiency.             */
/* ------------------------------------------------------------------ */

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

/* ------------------------------------------------------------------ */
/*  Request body schema                                                */
/* ------------------------------------------------------------------ */

const RequestSchema = z.object({
  /** The full question object so the AI has complete context */
  question: z.object({
    content: z.object({
      stem: z.string(),
      options: z.array(z.string()).optional(),
      passage: z.string().optional(),
      svgConfig: z.record(z.string(), z.unknown()).optional(),
    }),
    correctAnswer: z.object({
      index: z.number().optional(),
      value: z.string(),
    }),
    explanation: z.string(),
    category: z.string().optional(),
    difficulty: z.number().optional(),
  }),
  /** The answer the child selected or typed */
  childAnswer: z.string().min(1, "Child answer is required"),
  /** The correct answer value */
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

/* ------------------------------------------------------------------ */
/*  Response schema for validation                                     */
/* ------------------------------------------------------------------ */

const ExplanationResponseSchema = z.object({
  explanation: z.string().min(1),
  strategyTip: z.string().min(1),
});

/* ------------------------------------------------------------------ */
/*  System prompt                                                      */
/* ------------------------------------------------------------------ */

const SYSTEM_PROMPT = `You are a warm, encouraging tutor helping a 9-10 year old child who is preparing for the Kent Grammar School 11+ test. A child has just answered a question incorrectly, and you need to help them understand why.

YOUR TONE:
- Be kind, supportive, and never make the child feel bad for getting it wrong
- Use simple, clear language appropriate for a Year 5 student
- Be encouraging -- mistakes are how we learn!
- Use phrases like "Great try!", "Nearly there!", "Let's work through this together"

YOUR TASK:
Return a JSON object with exactly two fields:
{
  "explanation": "A clear, step-by-step explanation of why the correct answer is right and where the child's thinking may have gone astray. Be specific to their wrong answer. Use short paragraphs or numbered steps.",
  "strategyTip": "A brief, memorable tip or strategy the child can use next time they see a similar question. Keep it to 1-2 sentences."
}

Return ONLY the JSON object. No markdown fences, no extra text.`;

/* ------------------------------------------------------------------ */
/*  Route handler                                                      */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  try {
    /* -- Rate limiting (20 requests per minute per IP) -------------- */
    const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
    if (!rateLimit(ip, 20, 60_000)) {
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

    const { question, childAnswer, correctAnswer } = parsed.data;

    /* -- Build user prompt ----------------------------------------- */
    const optionsText = question.content.options
      ? question.content.options
          .map((opt, i) => `  ${String.fromCharCode(65 + i)}) ${opt}`)
          .join("\n")
      : "";

    const passageText = question.content.passage
      ? `\nPassage:\n"${question.content.passage}"\n`
      : "";

    const userPrompt = `Here is the question the child attempted:
${passageText}
Question: ${question.content.stem}
${optionsText ? `\nOptions:\n${optionsText}` : ""}

The child answered: "${childAnswer}"
The correct answer is: "${correctAnswer}"

${question.explanation ? `Background explanation: ${question.explanation}` : ""}

Please help this child understand what went wrong and how to get it right next time. Remember to be warm and encouraging!`;

    /* -- Call Claude Haiku ----------------------------------------- */
    const anthropic = new Anthropic({
      ...(authToken ? { authToken, apiKey: null } : { apiKey }),
    });

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

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

    /* -- Validate against schema ----------------------------------- */
    const validated = ExplanationResponseSchema.safeParse(rawJson);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: "AI response did not match expected schema.",
          details: validated.error.flatten().fieldErrors,
        },
        { status: 502 }
      );
    }

    /* -- Return validated explanation ------------------------------ */
    return NextResponse.json(
      {
        explanation: validated.data.explanation,
        strategyTip: validated.data.strategyTip,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[/api/questions/explain] Unexpected error:", error);

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
