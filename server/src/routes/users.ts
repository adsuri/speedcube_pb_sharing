import express from "express";

import { ADMINS } from "../CONSTANTS.js";

import { prisma } from "../lib/prisma.js";
import { optionalAuth, type OptionalAuthRequest } from "../middleware/optionalAuth.js";

const router = express.Router();

router.get("/:publicId", optionalAuth, async (req: OptionalAuthRequest, res) => {
  try {
    const publicId = req.params.publicId;

    if (typeof publicId !== "string") {
      return res.status(400).json({ error: "Invalid publicId..." });
    }

    const cuber = await prisma.cuber.findUnique({
      where: {
        publicId: publicId
      },
      select: {
        id: true,
        publicId: true,
        name: true,
        pictureURL: true,
        email: true,

        puzzles: {
          select: {
            id: true,
            name: true,
            currMain: true,
            records: {
              select: {
                id: true,
                category: true,
                scoreJson: true,
                setOn: true,
                setInComp: true
              }
            }
          }
        }
      }
    });

    if (!cuber) {
      return res.status(404).json({
        error: "User not found...",
      });
    }

    const isOwner =
      req.user?.cuberId === cuber.id
      || cuber.email in ADMINS;

    return res.json({
      publicId: cuber.publicId,
      name: cuber.name,
      pictureURL: cuber.pictureURL,
      puzzles: cuber.puzzles,
      isOwner: isOwner
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to fetch user...",
    });
  }
});

export default router;