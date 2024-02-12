/*
  Warnings:

  - The primary key for the `CinemaSubscriber` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CinemaSubscriber` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `CinemaSubscriber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CinemaSubscriber" DROP CONSTRAINT "CinemaSubscriber_pkey",
DROP COLUMN "id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "CinemaSubscriber_pkey" PRIMARY KEY ("cinemaId", "subscriberId");
