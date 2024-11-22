import { prismadb } from "@api/src/config/db.js";
import { ToolCallFunctionArgs } from "@api/types/types.js";

export const handleToolCallFunction = async (
  toolCallFunctionName: string,
  toolCallFunctionArgs: ToolCallFunctionArgs,
) => {
  switch (toolCallFunctionName) {
    case "createProject": {
      if (!("name" in toolCallFunctionArgs)) {
        throw new Error("Invalid arguments for createProject");
      }
      const createdProject = await prismadb.project.create({
        data: {
          name: toolCallFunctionArgs.name,
          userId: toolCallFunctionArgs.userId,
        },
      });
      return createdProject;
    }
    case "updateUserPreferences": {
      if (!("tone" in toolCallFunctionArgs)) {
        throw new Error("Invalid arguments for updateUserPreferences");
      }
      const updatedPreferences = prismadb.userPreferences.update({
        where: {
          userId: toolCallFunctionArgs.userId,
        },
        data: {
          tone: toolCallFunctionArgs.tone,
          responseStyle: toolCallFunctionArgs.responseStyle,
          preferredLanguage: toolCallFunctionArgs.preferredLanguage,
          timeZone: toolCallFunctionArgs.timeZone,
        },
      });
      return updatedPreferences;
    }
    case "createTask": {
      if (!("title" in toolCallFunctionArgs)) {
        throw new Error("Invalid arguments for createTask");
      }
      const createdTask = prismadb.task.create({
        data: {
          title: toolCallFunctionArgs.title,
          status: toolCallFunctionArgs.status,
          priority: toolCallFunctionArgs.priority,
          dueDate: toolCallFunctionArgs.dueDate,
          userId: toolCallFunctionArgs.userId,
        },
      });

      return createdTask;
    }
    default:
      return;
  }
};
