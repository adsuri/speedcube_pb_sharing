import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    error: "Too many requests. Please try again later..."
  }
});

export const googleLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    error: "Too many login attempts. Please try again later..."
  }
});

export const puzzleWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    error: "Too many puzzle updates. Please try again later..."
  }
});

export const reportLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    error: "Too many reports. Please try again later..."
  }
});