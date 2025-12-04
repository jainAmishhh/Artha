// login attempts limiter (Redis-ready, in-memory fallback)

import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;
let redis;
if (redisUrl) redis = new Redis(redisUrl);

const DEFAULT_MAX_ATTEMPTS = 5;
const LOCK_TIME_SECONDS = 15 * 60; // 15 minutes

export const recordLoginAttempt = async (identifier /* ip or userId or email */, success) => {
  try {
    const key = `login_attempts:${identifier}`;
    if (!redis) {
      // in-memory fallback (not persistent)
      global.__loginAttempts = global.__loginAttempts || {};
      if (success) delete global.__loginAttempts[key];
      else {
        const entry = global.__loginAttempts[key] || { count: 0, ts: Date.now() };
        entry.count += 1;
        global.__loginAttempts[key] = entry;
      }
      return global.__loginAttempts[key]?.count || 0;
    }

    if (success) {
      await redis.del(key);
      return 0;
    }

    const attempts = await redis.incr(key);
    if (attempts === 1) {
      await redis.expire(key, LOCK_TIME_SECONDS);
    }
    return attempts;
  } catch (err) {
    console.error("loginThrottle error", err);
    return 0;
  }
};

export const isLoginLocked = async (identifier) => {
  if (!redis) {
    const key = `login_attempts:${identifier}`;
    const entry = (global.__loginAttempts || {})[key];
    if (!entry) return false;
    return entry.count >= DEFAULT_MAX_ATTEMPTS;
  }
  const key = `login_attempts:${identifier}`;
  const attempts = (await redis.get(key)) || 0;
  return Number(attempts) >= DEFAULT_MAX_ATTEMPTS;
};
