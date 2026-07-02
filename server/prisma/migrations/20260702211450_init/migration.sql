-- CreateTable
CREATE TABLE "Cuber" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "googleId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "pictureURL" TEXT,
    "publicId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Puzzle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "currMain" TEXT,
    "cuberId" TEXT NOT NULL,
    CONSTRAINT "Puzzle_cuberId_fkey" FOREIGN KEY ("cuberId") REFERENCES "Cuber" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PBest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "scoreJson" TEXT NOT NULL,
    "setOn" DATETIME,
    "setInComp" BOOLEAN NOT NULL DEFAULT false,
    "puzzleId" TEXT NOT NULL,
    CONSTRAINT "PBest_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cuber_googleId_key" ON "Cuber"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Cuber_email_key" ON "Cuber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cuber_publicId_key" ON "Cuber"("publicId");
