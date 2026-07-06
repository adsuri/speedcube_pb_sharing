/*
  Warnings:

  - A unique constraint covering the columns `[puzzleId,category]` on the table `PBest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PBest_puzzleId_category_key" ON "PBest"("puzzleId", "category");
