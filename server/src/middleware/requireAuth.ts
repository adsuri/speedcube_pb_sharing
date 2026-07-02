import { type Request, type Response, type NextFunction } from "express";
import { verifyToken } from "../auth/jwt.js";

export interface AuthRequest extends Request {
  user?: {
    cuberId: string;
  };
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  try {
    const payload = verifyToken(token);

    req.user = {
      cuberId: payload.cuberId,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}