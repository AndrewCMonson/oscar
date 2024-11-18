/*
  Warnings:

  - You are about to drop the column `userMemory` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userPreferences` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[preferencesId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memoryId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `UserMemory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `UserMemory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "userMemory",
DROP COLUMN "userPreferences";

-- AlterTable
ALTER TABLE "UserMemory" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_preferencesId_key" ON "User"("preferencesId");

-- CreateIndex
CREATE UNIQUE INDEX "User_memoryId_key" ON "User"("memoryId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMemory_userId_key" ON "UserMemory"("userId");
