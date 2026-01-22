# LLM Brand Tracker

## What This Is

A tool that monitors how your products appear in LLM responses when users ask recommendation questions. It queries ChatGPT, Claude, Perplexity, and Gemini with product-related questions, detects brand mentions, tracks ranking position, and visualizes trends over time. Multiple teams can access results via web dashboard with export capabilities.

## Core Value

Know where your products rank when LLMs recommend products in your category — and track whether that position is improving or declining.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Query multiple LLMs (ChatGPT, Claude, Perplexity, Gemini) with product-related questions
- [ ] Detect when tracked products/brands are mentioned in responses
- [ ] Track position/ranking when product appears in recommendation lists
- [ ] Store full LLM responses for review
- [ ] Support user-written seed queries
- [ ] Generate query variations from seed queries using AI
- [ ] Run queries on schedule (configurable frequency)
- [ ] Run queries on-demand
- [ ] Track trends over time (position changes week-over-week)
- [ ] Web dashboard for exploring results
- [ ] Export data (CSV/PDF) for sharing
- [ ] Multi-team access with organized permissions
- [ ] Manage 10 hero products across 9 brands

### Out of Scope

- Sentiment analysis of how products are described — v1 focuses on position/ranking only
- Competitor deep-dive analysis — tracking competitors mentioned alongside is deferred
- Mobile app — web-first
- Real-time alerting — scheduled checks are sufficient for v1

## Context

**Business context:**
- 9 brands with ~100 total products, 10 hero products are the focus
- Currently no visibility into LLM recommendations without manual searching
- Multiple teams manage different brands/products

**Domain context:**
- LLM responses vary — same question can yield different answers
- Position in recommendation lists matters (first mentioned vs buried)
- Perplexity cites sources, others may not
- API access required for each LLM provider

## Constraints

- **LLM APIs**: Must use official APIs (OpenAI, Anthropic, Google, Perplexity) — API keys and costs involved
- **Rate limits**: LLM APIs have rate limits; scheduling must respect these
- **Response variability**: LLM outputs aren't deterministic; same query may yield different results

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Focus on 10 hero products initially | 100 products × multiple queries × 4 LLMs = expensive; hero products provide focused value | — Pending |
| Track position ranking, not sentiment | Position is objective and actionable; sentiment adds complexity | — Pending |
| Web dashboard + exports (not just reports) | Teams need to explore data, not just receive reports | — Pending |

---
*Last updated: 2025-01-22 after initialization*
