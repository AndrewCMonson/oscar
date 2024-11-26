import {
  createProject,
  createTask,
  getProjects,
  updateProject,
  updateUserPreferences,
} from "@api/src/services/index.js";
import { ToolCallFunctionReturn, ToolCallFunctions } from "@api/types/types.js";

export const handleToolCallFunction = async <T extends keyof ToolCallFunctions>(
  toolCallFunctionName: T,
  toolCallFunctionArgs: ToolCallFunctions[T],
): Promise<ToolCallFunctionReturn> => {
  switch (toolCallFunctionName) {
    case "createProject": {
      if (!("name" in toolCallFunctionArgs)) {
        throw new Error("Invalid arguments for createProject");
      }
      const createdProject = await createProject(toolCallFunctionArgs);

      return createdProject;
    }
    case "updateUserPreferences": {
      if (!("tone" in toolCallFunctionArgs)) {
        throw new Error("Invalid arguments for updateUserPreferences");
      }

      const updatedUserPreferences =
        await updateUserPreferences(toolCallFunctionArgs);

      return updatedUserPreferences;
    }
    case "createTask": {
      if (!("title" in toolCallFunctionArgs)) {
        throw new Error("Invalid arguments for createTask");
      }

      const createdTask = await createTask(toolCallFunctionArgs);

      return createdTask;
    }
    case "getProjects": {
      if (!("userId" in toolCallFunctionArgs)) {
        throw new Error("Invalid arguments for getProjects");
      }

      const projects = await getProjects(toolCallFunctionArgs);

      return projects;
    }
    case "updateProjectData": {
      if (
        !("priority" in toolCallFunctionArgs) ||
        !("id" in toolCallFunctionArgs) ||
        !("startDate" in toolCallFunctionArgs) ||
        !("endDate" in toolCallFunctionArgs) ||
        !("tags" in toolCallFunctionArgs)
      ) {
        throw new Error("Invalid arguments for updateProjectData");
      }

      const updatedProject = await updateProject(toolCallFunctionArgs);

      return updatedProject;
    }
    default:
      return;
  }
};
