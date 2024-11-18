import { ChatGPTRole } from "@prisma/client";
import { prismadb } from "../config/db.js";

export const getContext = async (userId: string, projectId: string) => {
  const globalContext = await prismadb.assistant.findFirst({
    where: {
      role: ChatGPTRole.ASSISTANT,
    },
  });

  const projectContext = await prismadb.projectContext.findFirst({
    where: {
      projectId: projectId,
    },
    include: {
      metadata: true,
      goals: true,
      preferences: true,
    }
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

  console.log("userContext", userContext);

  const combinedContext = `
    globalContext: ${JSON.stringify(globalContext)}, 
    userMemory: ${JSON.stringify(userContext)}, 
    projectContext: ${JSON.stringify(projectContext)}`
  

  return {
    role: ChatGPTRole.ASSISTANT,
    content: combinedContext,
    name: "assistant",
  };
};
