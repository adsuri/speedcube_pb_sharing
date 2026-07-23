import express from "express";

import { prisma } from "../lib/prisma.js"

export type ReportRequest = {
  targetPublicId: string;
  where: string;
}

const router = express.Router();

router.post("/", async (req, res) => {
  const data: ReportRequest = req.body as ReportRequest;

  const report = await prisma.report.create({
    data: {
      targetPublicId: data.targetPublicId,
      where: data.where
    }
  });
});

export default router;