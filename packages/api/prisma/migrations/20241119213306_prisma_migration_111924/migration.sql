/*
  Warnings:

  - The values [USER,SYSTEM,ASSISTANT,FUNCTION] on the enum `ChatGPTRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `chatId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ProjectMetadata` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `role` on the `Assistant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `conversationId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `Message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AssistantAction" AS ENUM ('CREATE_PROJECT', 'CREATE_TASK', 'CREATE_DOCUMENTATION', 'CREATE_CALENDAR_EVENT', 'NONE');

-- AlterEnum
BEGIN;
CREATE TYPE "ChatGPTRole_new" AS ENUM ('user', 'system', 'assistant', 'function');
ALTER TABLE "Assistant" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TYPE "ChatGPTRole" RENAME TO "ChatGPTRole_old";
ALTER TYPE "ChatGPTRole_new" RENAME TO "ChatGPTRole";
DROP TYPE "ChatGPTRole_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_memoryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_preferencesId_fkey";

-- AlterTable
ALTER TABLE "Assistant" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "chatId",
ADD COLUMN     "conversationId" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "conversationId" TEXT;

-- AlterTable
ALTER TABLE "ProjectMetadata" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE "Chat";

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "assistantId" TEXT NOT NULL,
    "projectId" TEXT,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssistantResponse" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'assistant',
    "content" TEXT NOT NULL,
    "contextDataId" TEXT NOT NULL,

    CONSTRAINT "AssistantResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssistantResponseContextData" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "action" "AssistantAction" NOT NULL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "assistantResponseId" TEXT NOT NULL,

    CONSTRAINT "AssistantResponseContextData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_projectId_key" ON "Conversation"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "AssistantResponse_contextDataId_key" ON "AssistantResponse"("contextDataId");

-- CreateIndex
CREATE UNIQUE INDEX "AssistantResponseContextData_assistantResponseId_key" ON "AssistantResponseContextData"("assistantResponseId");

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMemory" ADD CONSTRAINT "UserMemory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "Assistant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistantResponseContextData" ADD CONSTRAINT "AssistantResponseContextData_assistantResponseId_fkey" FOREIGN KEY ("assistantResponseId") REFERENCES "AssistantResponse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
