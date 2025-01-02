import { prismadb } from "@api/src/config/index.js";
import { formatMessageForOpenAI } from "@api/src/services/index.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { ChatCompletionMessageParam } from "openai/resources/index.js";

/** function used to get global context from the assistant and user context from the user to pass to the api call */
export const getContext = async (
  userId: string,
  projectId?: string,
): Promise<ChatCompletionMessageParam> => {
  if (!userId) {
    throw new Error("User id needed to get context");
  }

  try {
    const assistant = await prismadb.assistant.findFirst({
      where: {
        role: "assistant",
      },
      include: {
        globalContext: {
          include: {
            contextData: true,
          },
        },
      },
    });

    const assistantContext = assistant?.globalContext?.contextData;

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

    const projectContext = projectId
      ? await prismadb.project.findFirst({
          where: {
            id: projectId,
          },
          include: {
            conversation: {
              include: {
                messages: true,
              },
            },
          },
        })
      : null;

    const combinedContext = projectContext
      ? {
          globalContext: assistantContext,
          userContext: userContext,
          projectContext: projectContext,
        }
      : {
          globalContext: assistantContext,
          userContext: userContext,
        };

    return formatMessageForOpenAI({
      role: "assistant",
      content: JSON.stringify(combinedContext),
      name: "assistant",
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      throw new Error("Error getting context with Prisma");
    } else {
      throw new Error("Error getting context");
    }
  }
};
