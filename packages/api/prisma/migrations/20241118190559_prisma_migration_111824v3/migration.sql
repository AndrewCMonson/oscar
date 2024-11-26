/*
  Warnings:

  - You are about to drop the column `projectContext` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `memoryData` on the `UserMemory` table. All the data in the column will be lost.
  - You are about to drop the column `preferencesData` on the `UserPreferences` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ProjectPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "Tone" AS ENUM ('FRIENDLY', 'CONCISE', 'PROFESSIONAL');

-- CreateEnum
CREATE TYPE "ResponseStyle" AS ENUM ('CONVERSATIONAL', 'DIRECT');

-- CreateEnum
CREATE TYPE "IntegrationType" AS ENUM ('JIRA', 'MOTION', 'NOTION');

-- CreateEnum
CREATE TYPE "ReportingFrequency" AS ENUM ('DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "projectContext";

-- AlterTable
ALTER TABLE "UserMemory" DROP COLUMN "memoryData";

-- AlterTable
ALTER TABLE "UserPreferences" DROP COLUMN "preferencesData",
ADD COLUMN     "preferredLanguage" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "responseStyle" "ResponseStyle" NOT NULL DEFAULT 'CONVERSATIONAL',
ADD COLUMN     "timeZone" TEXT NOT NULL DEFAULT 'America/New_York',
ADD COLUMN     "tone" "Tone" NOT NULL DEFAULT 'FRIENDLY';

-- CreateTable
CREATE TABLE "UserIntegration" (
    "id" TEXT NOT NULL,
    "type" "IntegrationType" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "apiToken" TEXT,
    "baseUrl" TEXT,
    "workspace" TEXT,
    "userPreferencesId" TEXT,

    CONSTRAINT "UserIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationSettings" (
    "id" TEXT NOT NULL,
    "email" BOOLEAN NOT NULL DEFAULT true,
    "sms" BOOLEAN NOT NULL DEFAULT false,
    "inApp" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "NotificationSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Memory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "userMemoryId" TEXT NOT NULL,

    CONSTRAINT "Memory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectContext" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectContext_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectMetadata" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "tags" TEXT[],
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" "ProjectStatus" NOT NULL DEFAULT 'ACTIVE',
    "priority" "ProjectPriority" NOT NULL DEFAULT 'MEDIUM',
    "projectContextId" TEXT,

    CONSTRAINT "ProjectMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectGoal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "goal" TEXT NOT NULL,
    "projectContextId" TEXT,

    CONSTRAINT "ProjectGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectUpdate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "projectContextId" TEXT,

    CONSTRAINT "ProjectUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectPreferences" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tone" "Tone" NOT NULL DEFAULT 'FRIENDLY',
    "responseStyle" "ResponseStyle" NOT NULL DEFAULT 'CONVERSATIONAL',
    "reportingFrequency" "ReportingFrequency" NOT NULL DEFAULT 'MONTHLY',
    "projectContextId" TEXT,

    CONSTRAINT "ProjectPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationSettings_userId_key" ON "NotificationSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectContext_projectId_key" ON "ProjectContext"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMetadata_projectContextId_key" ON "ProjectMetadata"("projectContextId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectPreferences_projectContextId_key" ON "ProjectPreferences"("projectContextId");

-- AddForeignKey
ALTER TABLE "UserIntegration" ADD CONSTRAINT "UserIntegration_userPreferencesId_fkey" FOREIGN KEY ("userPreferencesId") REFERENCES "UserPreferences"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationSettings" ADD CONSTRAINT "NotificationSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_userMemoryId_fkey" FOREIGN KEY ("userMemoryId") REFERENCES "UserMemory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectContext" ADD CONSTRAINT "ProjectContext_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMetadata" ADD CONSTRAINT "ProjectMetadata_projectContextId_fkey" FOREIGN KEY ("projectContextId") REFERENCES "ProjectContext"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectGoal" ADD CONSTRAINT "ProjectGoal_projectContextId_fkey" FOREIGN KEY ("projectContextId") REFERENCES "ProjectContext"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectUpdate" ADD CONSTRAINT "ProjectUpdate_projectContextId_fkey" FOREIGN KEY ("projectContextId") REFERENCES "ProjectContext"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPreferences" ADD CONSTRAINT "ProjectPreferences_projectContextId_fkey" FOREIGN KEY ("projectContextId") REFERENCES "ProjectContext"("id") ON DELETE SET NULL ON UPDATE CASCADE;
