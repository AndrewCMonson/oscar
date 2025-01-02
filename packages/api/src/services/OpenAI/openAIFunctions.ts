import {
  createTask,
  getProjects,
  updateProject,
  updateUserPreferences,
} from "@api/src/services/index.js";
import { ToolCallFunctionReturn, ToolCallFunctions } from "@api/types/types.js";

/**
 * Handles the execution of various tool call functions based on the provided function name and arguments.
 *
 * @template T - The type of the tool call function name, which must be a key of `ToolCallFunctions`.
 * @param {T} toolCallFunctionName - The name of the tool call function to execute.
 * @param {ToolCallFunctions[T]} toolCallFunctionArgs - The arguments to pass to the tool call function.
 * @returns {Promise<ToolCallFunctionReturn>} - A promise that resolves to the result of the tool call function.
 * @throws {Error} - Throws an error if the provided arguments are invalid for the specified tool call function.
 *
 * @example
 * ```typescript
 * const result = await handleToolCallFunction("createProject", { name: "New Project" });
 * ```
 */
export const handleToolCallFunction = async <T extends keyof ToolCallFunctions>(
  toolCallFunctionName: T,
  toolCallFunctionArgs: ToolCallFunctions[T],
): Promise<ToolCallFunctionReturn> => {
  switch (toolCallFunctionName) {
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
