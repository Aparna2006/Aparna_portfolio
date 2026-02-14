const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestStore = new Map();

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || req.socket.remoteAddress || "unknown";
}

function contactRateLimit(req, res, next) {
  const ip = getClientIp(req);
  const now = Date.now();
  const existing = requestStore.get(ip);

  if (!existing || now > existing.resetAt) {
    requestStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  if (existing.count >= MAX_REQUESTS) {
    const retryAfterSec = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    res.setHeader("Retry-After", retryAfterSec);
    return res.status(429).json({
      success: false,
      message: "Too many contact requests. Please try again later.",
      errors: [`Rate limit exceeded for ${ip}.`],
      requestId: req.requestId || null,
    });
  }

  existing.count += 1;
  requestStore.set(ip, existing);
  return next();
}

module.exports = contactRateLimit;
