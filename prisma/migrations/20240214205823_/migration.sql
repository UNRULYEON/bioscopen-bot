/*
  Warnings:

  - Added the required column `emoji` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cinema" DROP CONSTRAINT "Cinema_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Cinema" DROP CONSTRAINT "Cinema_companyId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "emoji" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Cinema" ADD CONSTRAINT "Cinema_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cinema" ADD CONSTRAINT "Cinema_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
