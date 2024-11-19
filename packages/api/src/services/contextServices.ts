import { ChatGPTRole } from "@prisma/client";
import { prismadb } from "../config/db.js";
import { formatMessageForOpenAI } from "./messageServices.js";

export const getContext = async (userId: string) => {
  const assistant = await prismadb.assistant.findFirst({
    where: {
      role: ChatGPTRole.ASSISTANT,
    },
  });


  const userContext = await prismadb.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      memory: {
        include: {
          memories: true,
          }
        },
      preferences: true,
      notificationSettings: true,
      }
  });

  const conversationHistory = await prismadb.conversation.findMany({
    where: {
      userId: userId,
      assistantId: assistant?.id,
    },
    select: {
      messages: true,
    }
  });

  const combinedContext = {
    globalContext: assistant?.globalContext,
    userContext: userContext,
    conversationHistory: conversationHistory,
  };

  const formattedContext = formatMessageForOpenAI({
    role: ChatGPTRole.ASSISTANT,
    content: JSON.stringify(combinedContext),
    name: "assistant",
  })

  return formattedContext;
};
