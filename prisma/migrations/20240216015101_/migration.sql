/*
  Warnings:

  - Added the required column `wantsToBeNotified` to the `Subscriber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "wantsToBeNotified" BOOLEAN NOT NULL;
