export interface RateLimitOptions {
  windowMs: number;
  max: number;
}

// In-memory store for rate limiting
// Key: IP Address -> Value: { count: number, resetTime: number }
const store = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(ip: string, options: RateLimitOptions) {
  const now = Date.now();
  const windowEnd = now + options.windowMs;

  const record = store.get(ip);

  // If record doesn't exist or is expired, create a new one
  if (!record || record.resetTime < now) {
    store.set(ip, {
      count: 1,
      resetTime: windowEnd,
    });
    return { success: true, remaining: options.max - 1 };
  }

  // If over the limit, reject
  if (record.count >= options.max) {
    return { success: false, remaining: 0 };
  }

  // Otherwise increment count
  record.count += 1;
  store.set(ip, record);

  return { success: true, remaining: options.max - record.count };
}

// Cleanup interval to prevent memory leaks in the Map
// Runs every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of store.entries()) {
    if (value.resetTime < now) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);
