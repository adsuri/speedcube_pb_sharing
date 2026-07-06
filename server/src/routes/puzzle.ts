import express from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthRequest } from "../middleware/requireAuth.js";
import { PUZZLES, CATEGORIES } from "../CONSTANTS.js";

export type SavePBestRequest = {
  score: number | [[number, number], number];
  setOn?: string | Date;
  setInComp?: boolean
}

export type SavePuzzleRequest = {
  name: string;
  currMain?: string | null;
  records?: Record<string, SavePBestRequest | null>;
};

const router = express.Router();

router.post("/", requireAuth, async (req: AuthRequest, res) => {
  try {
    const cuberId = req.user!.cuberId;
    const puzzle = req.body as SavePuzzleRequest;

    if (!puzzle?.name) {
      return res.status(400).json({ error: "Missing puzzle name..." });
    }

    if (!PUZZLES.includes(puzzle.name)) {
      return res.status(400).json({ error: "Invalid puzzle name..." });
    }

    const records = puzzle.records ?? {};

    // record validation
    for (const [category, record] of Object.entries(records) as [string, SavePBestRequest | null][]) {
      if (!CATEGORIES.includes(category)) {
        return res.status(400).json({ error: `Invalid category: ${category}...` });
      }
      if (!record) continue;

      const score = record.score;

      if (puzzle.name == "mbld") {
        const validScore = Array.isArray(score) &&
                           score.length == 2 &&
                           Array.isArray(score[0]) &&
                           score[0].length == 2 &&
                           typeof score[0][0] == "number" &&
                           typeof score[0][1] == "number" &&
                           typeof score[1] == "number";

        if (!validScore) {
          return res.status(400).json({
            error: "Invalid MBLD score format..."
          });
        }
      } else {
        if (typeof score != "number") {
          return res.status(400).json({
            error: `Puzzle ${puzzle.name} requires numeric scores...`,
          });
        }
      }
    }

    const result = await prisma.$transaction(async (tx) => {
      // upsert
      const dbPuzzle = await tx.puzzle.upsert({
        where: {
          cuberId_name: {
            cuberId,
            name: puzzle.name,
          }
        },
        create: {
          cuberId: cuberId,
          name: puzzle.name,
          currMain: puzzle.currMain ?? null
        },
        update: {
          currMain: puzzle.currMain ?? null
        }
      });

      // remove records
      await tx.pBest.deleteMany({
        where: {
          puzzleId: dbPuzzle.id,
        }
      });

      // insert records
      for (const [category, record] of Object.entries(records) as [string, SavePBestRequest | null][]) {
        if (!record) continue;

        await tx.pBest.create({
          data: {
            puzzleId: dbPuzzle.id,
            category: category,
            scoreJson: JSON.stringify(record.score),
            setOn: record.setOn ? new Date(record.setOn) : null,
            setInComp: record.setInComp ?? false
          },
        });
      }

      return dbPuzzle;
    });

    return res.json({
      success: true,
      puzzle: result
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to save puzzle",
    });
  }
});

export default router;