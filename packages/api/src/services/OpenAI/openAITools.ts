import {
  ProjectType,
  ResponseStyle,
  TaskPriority,
  TaskStatus,
  Tone,
} from "@prisma/client";
import { zodFunction } from "openai/helpers/zod.js";
import { z } from "zod";

export const createProjectParameters = z.object({
  name: z.string().describe("The project's name"),
  description: z.string().describe("A brief description of the project"),
  type: z
    .enum([ProjectType.CLIENT, ProjectType.INTERNAL, ProjectType.PERSONAL])
    .describe("The type of project"),
  userId: z.string().describe("The user's id"),
});

export const updateUserPreferenceParams = z.object({
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
    parameters: updateUserPreferenceParams,
  }),
  zodFunction({ name: "createTask", parameters: createTaskParams }),
];
