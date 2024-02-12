/*
  Warnings:

  - A unique constraint covering the columns `[movieId,subscriberId]` on the table `MovieSubscriber` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "MovieSubscriber_movieId_key";

-- DropIndex
DROP INDEX "MovieSubscriber_subscriberId_key";

-- CreateIndex
CREATE UNIQUE INDEX "MovieSubscriber_movieId_subscriberId_key" ON "MovieSubscriber"("movieId", "subscriberId");
