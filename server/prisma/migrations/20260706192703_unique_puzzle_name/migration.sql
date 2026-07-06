/*
  Warnings:

  - A unique constraint covering the columns `[cuberId,name]` on the table `Puzzle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Puzzle_cuberId_name_key" ON "Puzzle"("cuberId", "name");
