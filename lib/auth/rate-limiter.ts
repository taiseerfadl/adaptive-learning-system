/**
 * Simple, efficient in-memory rate limiter with sliding window and cooldown support.
 * Used for authentication operations (login, registration, OTP generation/verification)
 * without requiring external infrastructure (like Redis).
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
  lastAttemptAt?: number;
}

const store = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 5 minutes to prevent memory accumulation
if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      if (now > record.resetAt) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);
  if (timer && typeof timer === "object" && "unref" in timer) {
    (timer as { unref: () => void }).unref();
  }
}

export interface RateLimitOptions {
  windowMs: number; // Time window in ms (e.g. 15 minutes = 15 * 60 * 1000)
  max: number; // Max requests allowed per window
  cooldownMs?: number; // Minimum cooldown between consecutive requests (e.g. 60 seconds)
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds?: number;
}

export function checkRateLimit(
  key: string,
  options: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  let record = store.get(key);

  if (!record || now > record.resetAt) {
    record = {
      count: 1,
      resetAt: now + options.windowMs,
      lastAttemptAt: now,
    };
    store.set(key, record);
    return {
      success: true,
      limit: options.max,
      remaining: options.max - 1,
      resetAt: record.resetAt,
    };
  }

  // Check cooldown between requests if specified
  if (options.cooldownMs && record.lastAttemptAt) {
    const timeSinceLast = now - record.lastAttemptAt;
    if (timeSinceLast < options.cooldownMs) {
      const waitSeconds = Math.ceil((options.cooldownMs - timeSinceLast) / 1000);
      return {
        success: false,
        limit: options.max,
        remaining: 0,
        resetAt: record.resetAt,
        retryAfterSeconds: waitSeconds,
      };
    }
  }

  if (record.count >= options.max) {
    const waitSeconds = Math.ceil((record.resetAt - now) / 1000);
    return {
      success: false,
      limit: options.max,
      remaining: 0,
      resetAt: record.resetAt,
      retryAfterSeconds: waitSeconds,
    };
  }

  record.count += 1;
  record.lastAttemptAt = now;

  return {
    success: true,
    limit: options.max,
    remaining: options.max - record.count,
    resetAt: record.resetAt,
  };
}

export function resetRateLimit(key: string): void {
  store.delete(key);
}

