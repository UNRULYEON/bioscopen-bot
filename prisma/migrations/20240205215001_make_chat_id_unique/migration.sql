/*
  Warnings:

  - A unique constraint covering the columns `[chatId]` on the table `Subscriber` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_chatId_key" ON "Subscriber"("chatId");
