/*
  Warnings:

  - You are about to drop the column `fullName` on the `Cinema` table. All the data in the column will be lost.
  - Added the required column `scrapeName` to the `Cinema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cinema" DROP COLUMN "fullName",
ADD COLUMN     "scrapeName" TEXT NOT NULL;
