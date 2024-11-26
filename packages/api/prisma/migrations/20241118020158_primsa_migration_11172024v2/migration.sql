/*
  Warnings:

  - You are about to drop the column `name` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `assistantId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `jiraIntegration` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `motionIntegration` on the `User` table. All the data in the column will be lost.
  - Added the required column `globalContext` to the `Assistant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Assistant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userMemory` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPreferences` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_assistantId_fkey";

-- AlterTable
ALTER TABLE "Assistant" DROP COLUMN "name",
ADD COLUMN     "globalContext" JSONB NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "assistantId",
ADD COLUMN     "isGlobalContext" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "projectContext" JSONB;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "jiraIntegration",
DROP COLUMN "motionIntegration",
ADD COLUMN     "memoryId" TEXT,
ADD COLUMN     "preferencesId" TEXT,
ADD COLUMN     "userMemory" JSONB NOT NULL,
ADD COLUMN     "userPreferences" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "preferencesData" JSONB NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMemory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memoryData" JSONB NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "lastSummary" TIMESTAMP(3),

    CONSTRAINT "UserMemory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_preferencesId_fkey" FOREIGN KEY ("preferencesId") REFERENCES "UserPreferences"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_memoryId_fkey" FOREIGN KEY ("memoryId") REFERENCES "UserMemory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
