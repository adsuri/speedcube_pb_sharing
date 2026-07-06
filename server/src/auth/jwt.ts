import jwt from "jsonwebtoken"

export interface JwtPayload {
  cuberId: string
}

export function signToken(payload: JwtPayload) {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET...");
  }

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): JwtPayload {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET...");
  }

  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}