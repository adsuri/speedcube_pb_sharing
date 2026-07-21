import { type Request, type Response, type NextFunction } from "express";

import { verifyToken } from "../auth/jwt.js";

export interface OptionalAuthRequest extends Request {
  user?: {
    cuberId: string;
    email: string;
  } | null;
}

export function optionalAuth(
  req: OptionalAuthRequest,
  _res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header) {
    req.user = null;
    return next();
  }

  const token = header.split(" ")[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const payload = verifyToken(token);

    req.user = {
      cuberId: payload.cuberId,
      email: payload.email
    };
  } catch {
    req.user = null;
  }

  next();
}