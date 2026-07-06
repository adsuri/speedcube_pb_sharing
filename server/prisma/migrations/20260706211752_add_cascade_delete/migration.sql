-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Puzzle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "currMain" TEXT,
    "cuberId" TEXT NOT NULL,
    CONSTRAINT "Puzzle_cuberId_fkey" FOREIGN KEY ("cuberId") REFERENCES "Cuber" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Puzzle" ("cuberId", "currMain", "id", "name") SELECT "cuberId", "currMain", "id", "name" FROM "Puzzle";
DROP TABLE "Puzzle";
ALTER TABLE "new_Puzzle" RENAME TO "Puzzle";
CREATE UNIQUE INDEX "Puzzle_cuberId_name_key" ON "Puzzle"("cuberId", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
