-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "where" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_id_key" ON "Report"("id");
