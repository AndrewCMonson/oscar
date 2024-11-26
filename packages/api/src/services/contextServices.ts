import { prismadb } from "@api/src/config/index.js";
import { formatMessageForOpenAI } from "@api/src/services/index.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export const getContext = async (userId: string) => {
  try {
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
  } catch (e) {
    if(e instanceof PrismaClientKnownRequestError){
      throw new Error("Error getting context with Prisma")
    } else {
      throw new Error("Error getting context")
    }
  }
};
