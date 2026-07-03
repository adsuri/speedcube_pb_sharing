import express from "express";
import { verifyGoogleToken } from "../auth/google.js";
import { prisma } from "../lib/prisma.js";
import { signToken } from "../auth/jwt.js";
import { requireAuth, type AuthRequest } from "../middleware/requireAuth.js";
import { nanoid } from "nanoid";

const router = express.Router();

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Missing token" });
    }

    const googleUser = await verifyGoogleToken(token);

    let cuber = await prisma.cuber.findUnique({
      where: {
        googleId: googleUser.googleId,
      }
    });

    if (!cuber) {
      cuber = await prisma.cuber.create({
        data: {
          googleId: googleUser.googleId,
          email: googleUser.email,
          name: googleUser.name,
          pictureURL: googleUser.picture,
          publicId: nanoid(10)
        }
      });
    }

    const jwtToken = signToken({
      cuberId: cuber.id,
    });
    
    return res.json({
      cuber,
      token: jwtToken
    });

  } catch (err) {
    return res.status(401).json({ error: "Invalid Google token" });
  }
});

router.get("/me", requireAuth, async (req: AuthRequest, res) => {
  try {
    const cuberId = req.user!.cuberId;

    const cuber = await prisma.cuber.findUnique({
      where: { id: cuberId },
      include: {
        puzzles: {
          include: {
            records: true,
          },
        },
      },
    });

    if (!cuber) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      publicId: cuber.publicId,
      name: cuber.name,
      pictureURL: cuber.pictureURL,
      puzzles: cuber.puzzles
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;