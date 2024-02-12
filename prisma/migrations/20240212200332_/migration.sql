/*
  Warnings:

  - The primary key for the `MovieSubscriber` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MovieSubscriber` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "MovieSubscriber_movieId_subscriberId_key";

-- AlterTable
ALTER TABLE "MovieSubscriber" DROP CONSTRAINT "MovieSubscriber_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "MovieSubscriber_pkey" PRIMARY KEY ("movieId", "subscriberId");
