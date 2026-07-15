-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PBest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "scoreJson" TEXT NOT NULL,
    "setOn" DATETIME,
    "setInComp" BOOLEAN NOT NULL DEFAULT false,
    "puzzleId" TEXT NOT NULL,
    CONSTRAINT "PBest_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PBest" ("category", "id", "puzzleId", "scoreJson", "setInComp", "setOn") SELECT "category", "id", "puzzleId", "scoreJson", "setInComp", "setOn" FROM "PBest";
DROP TABLE "PBest";
ALTER TABLE "new_PBest" RENAME TO "PBest";
CREATE UNIQUE INDEX "PBest_puzzleId_category_key" ON "PBest"("puzzleId", "category");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
