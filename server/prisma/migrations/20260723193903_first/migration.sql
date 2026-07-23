-- CreateTable
CREATE TABLE "Cuber" (
    "id" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "pictureURL" TEXT,
    "publicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cuber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Puzzle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currMain" TEXT,
    "cuberId" TEXT NOT NULL,

    CONSTRAINT "Puzzle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PBest" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "scoreJson" TEXT NOT NULL,
    "setOn" TIMESTAMP(3),
    "setInComp" BOOLEAN NOT NULL DEFAULT false,
    "puzzleId" TEXT NOT NULL,

    CONSTRAINT "PBest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "targetPublicId" TEXT NOT NULL,
    "where" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cuber_googleId_key" ON "Cuber"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Cuber_email_key" ON "Cuber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cuber_publicId_key" ON "Cuber"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Puzzle_cuberId_name_key" ON "Puzzle"("cuberId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "PBest_puzzleId_category_key" ON "PBest"("puzzleId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "Report_id_key" ON "Report"("id");

-- AddForeignKey
ALTER TABLE "Puzzle" ADD CONSTRAINT "Puzzle_cuberId_fkey" FOREIGN KEY ("cuberId") REFERENCES "Cuber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PBest" ADD CONSTRAINT "PBest_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
