import {
  ProjectType,
  ResponseStyle,
  TaskPriority,
  TaskStatus,
  Tone,
} from "@prisma/client";
import { zodFunction } from "openai/helpers/zod.js";
import { z } from "zod";
import { prismadb } from "../config/db.js";

export const openAIStructuredOutput = z.object({
  role: z.string(),
  name: z.string(),
  content: z.string(),
  contextData: z.object({
    action: z.string(),
    actionName: z.string(),
    description: z.string(),
    metadata: z.object({
      status: z.string(),
      priority: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      tags: z.array(z.string()),
    }),
  }),
});

type CreateProjectParameters = z.infer<typeof createProjectParameters>;
type UserPreferenceParams = z.infer<typeof userPreferenceParams>;
type CreateTaskParams = z.infer<typeof createTaskParams>;

export type ToolCallFunctionArgs =
  | CreateProjectParameters
  | UserPreferenceParams
  | CreateTaskParams;

export const createProjectParameters = z.object({
  name: z.string().describe("The project's name"),
  description: z.string().describe("A brief description of the project"),
  type: z
    .enum([ProjectType.CLIENT, ProjectType.INTERNAL, ProjectType.PERSONAL])
    .describe("The type of project"),
  userId: z.string().describe("The user's id"),
});

export const userPreferenceParams = z.object({
  id: z.string().describe("The id of the user preferences model"),
  tone: z
    .enum([Tone.CONCISE, Tone.FRIENDLY, Tone.PROFESSIONAL])
    .describe("The user's preferred response tone"),
  responseStyle: z
    .enum([ResponseStyle.CONVERSATIONAL, ResponseStyle.DIRECT])
    .describe("The user's preferred response style"),
  preferredLanguage: z
    .string()
    .describe("The user's preferred default language"),
  timeZone: z.string().describe("The user's preferred timezone"),
  userId: z.string().describe("The user's id"),
});

export const createTaskParams = z.object({
  title: z.string().describe("The name of the project"),
  status: z
    .enum([
      TaskStatus.BLOCKED,
      TaskStatus.COMPLETED,
      TaskStatus.IN_PROGRESS,
      TaskStatus.TODO,
    ])
    .describe("The current status of the task"),
  priority: z
    .enum([
      TaskPriority.HIGH,
      TaskPriority.LOW,
      TaskPriority.MEDIUM,
      TaskPriority.URGENT,
    ])
    .describe("The priority of the task"),
  dueDate: z.string().describe("The date the project is due"),
  projectId: z.string().describe("The project the task is assigned to"),
  userId: z.string().describe("The userId of the project owner"),
});

export const openAITools = [
  zodFunction({ name: "createProject", parameters: createProjectParameters }),
  zodFunction({
    name: "updateUserPreferences",
    parameters: userPreferenceParams,
  }),
  zodFunction({ name: "createTask", parameters: createTaskParams }),
];

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

export const assistantFailureResponse = {
  role: "assistant",
    name: "assistant",
      content: "An error occurred with the assistant",
        contextData: {
    action: "NONE",
      actionName: "none",
        description: "",
          metadata: {
      status: "",
        priority: "",
          startDate: "",
            endDate: "",
              tags: [],
          },
  },
};
