/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `role` on the `Message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ChatGPTRole" AS ENUM ('USER', 'SYSTEM', 'ASSISTANT', 'FUNCTION');

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "role",
ADD COLUMN     "role" "ChatGPTRole" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "ChatGPTRole" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "MessageRole";

-- DropEnum
DROP TYPE "UserRole";
