import express from "express";
import { verifyGoogleToken } from "../auth/google.js";
import { prisma } from "../lib/prisma.js";

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
          publicId: crypto.randomUUID()
        }
      });
    }
    
    return res.json(cuber);

  } catch (err) {
    return res.status(401).json({ error: "Invalid Google token" });
  }
});

export default router;