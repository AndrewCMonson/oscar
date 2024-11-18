import { ChatGPTRole } from "@prisma/client"
import { prismadb } from "../config/db.js"

export const getContext = async (userId: string, projectId: string) => {

  const globalContext = await prismadb.assistant.findFirst({
    where: {
      role: ChatGPTRole.ASSISTANT
    }
  });

  const projectContext = await prismadb.project.findFirst({
    where: {
      id: projectId
    },
    select: {
      projectContext: true
    }
  });

  const userContext = await prismadb.user.findFirst({
    where: {
      id: userId
    },
    select: {
      userPreferences: true,
      userMemory: true,
    },
  });

  return {
    role: ChatGPTRole.ASSISTANT,
    content: `
    globalContext: ${JSON.stringify(globalContext?.globalContext)}, 
    userMemory: ${JSON.stringify(userContext?.userMemory)}, 
    userPreferences${JSON.stringify(userContext?.userPreferences)}, 
    projectContext: ${JSON.stringify(projectContext?.projectContext)}`,
    name: "assistant"
  }
  ;
}
