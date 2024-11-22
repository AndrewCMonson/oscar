import { ToolCallFunctionArgs } from "@api/types/types.js";
import { createProject, getProjects } from "../projectServices.js";
import { createTask } from "../taskServices.js";
import { updateUserPreferences } from "../userServices.js";

export const handleToolCallFunction = async (
  toolCallFunctionName: string,
  toolCallFunctionArgs: ToolCallFunctionArgs,
) => {
  switch (toolCallFunctionName) {
    case "createProject": {
      if (!("name" in toolCallFunctionArgs)) {
        throw new Error("Invalid arguments for createProject");
      }
      const createdProject = await createProject(toolCallFunctionArgs);

      return createdProject
    }
    case "updateUserPreferences": {
      if (!("tone" in toolCallFunctionArgs)) {
        throw new Error("Invalid arguments for updateUserPreferences");
      }

      const updatedUserPreferences = await updateUserPreferences(toolCallFunctionArgs);

      return updatedUserPreferences
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
    default:
      return;
  }
};
