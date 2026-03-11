/* ------------------------------------------------------------------ */
/*  Simple in-memory rate limiter for API routes                       */
/*  Uses a sliding window per IP address.                              */
/* ------------------------------------------------------------------ */

const hits = new Map<string, number[]>();

/**
 * Returns true if the request should be allowed, false if rate-limited.
 * @param key  Unique identifier (typically IP address)
 * @param limit  Max requests allowed in the window
 * @param windowMs  Time window in milliseconds
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const timestamps = hits.get(key) ?? [];

  // Remove expired entries
  const valid = timestamps.filter((t) => now - t < windowMs);

  if (valid.length >= limit) {
    hits.set(key, valid);
    return false;
  }

  valid.push(now);
  hits.set(key, valid);
  return true;
}
