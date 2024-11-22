import { prismadb } from "../config/db.js";
import { formatMessageForOpenAI } from "@api/src/services";

export const getContext = async (userId: string) => {
  const assistant = await prismadb.assistant.findFirst({
    where: {
      role: "assistant",
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
        },
      },
      preferences: true,
      notificationSettings: true,
    },
  });

  const combinedContext = {
    globalContext: assistant?.globalContext,
    userContext: userContext,
  };

  const formattedContext = formatMessageForOpenAI({
    role: "assistant",
    content: JSON.stringify(combinedContext),
    name: "assistant",
  });

  return formattedContext;
};
