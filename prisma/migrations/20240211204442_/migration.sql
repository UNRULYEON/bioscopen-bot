/*
  Warnings:

  - A unique constraint covering the columns `[movieId]` on the table `MovieSubscriber` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subscriberId]` on the table `MovieSubscriber` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MovieSubscriber_movieId_key" ON "MovieSubscriber"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "MovieSubscriber_subscriberId_key" ON "MovieSubscriber"("subscriberId");
