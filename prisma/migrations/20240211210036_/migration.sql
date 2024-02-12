/*
  Warnings:

  - A unique constraint covering the columns `[letterboxdId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movie_letterboxdId_key" ON "Movie"("letterboxdId");
