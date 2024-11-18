-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "assistantId" TEXT;

-- CreateTable
CREATE TABLE "Assistant" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "role" "ChatGPTRole" NOT NULL DEFAULT 'ASSISTANT',

    CONSTRAINT "Assistant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "Assistant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
