import {
  ProjectPriority,
  ProjectStatus,
  ResponseStyle,
  TaskPriority,
  TaskStatus,
  Tone
} from "@prisma/client";
import { zodFunction } from "openai/helpers/zod.js";
import { z } from "zod";

/* 
  This is the structured output that we are forcing the api to return on each call
  Currently, this is very similar to the stock response, but we want to control it.
*/
export const openAIStructuredOutput = z.object({
  role: z.string(),
  name: z.string(),
  content: z.string(),
  projectId: z.string().optional(),
});

/*
  Each of the below parameters objects follow OpenAI's suggested method for
  function calling with structured outputs found here: https://platform.openai.com/docs/guides/function-calling 

  It uses Zod: https://zod.dev/?id=introduction for schema declaration to ensure
  the correct parameters are returned by the api for function calling

  These parameters define the expected return params from the api when calling a function we define.
  Typically, they will match the needed parameters for a prisma ORM action (CRUD)
*/
export const getProjectsParameters = z.object({
  userId: z.string().describe("The user's id used to retrieve their projects"),
});

export const updateUserPreferenceParameters = z.object({
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

export const createTaskParameters = z.object({
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

export const updateProjectParameters = z.object({
  id: z.string().describe("The id of the project"),
  startDate: z.string().describe("The date the project starts"),
  endDate: z.string().describe("The date the project is due to end"),
  status: z
    .enum([
      ProjectStatus.ACTIVE,
      ProjectStatus.ARCHIVED,
      ProjectStatus.INACTIVE,
    ])
    .describe("The status of the project"),
  priority: z
    .enum([
      ProjectPriority.HIGH,
      ProjectPriority.LOW,
      ProjectPriority.MEDIUM,
      ProjectPriority.URGENT,
    ])
    .describe("The priority of the project"),
  tags: z
    .array(z.string())
    .describe("An array of tags that describe the project"),
});

/*
  The below array contains the tools that the OpenAI api is able to use.
  It is passed during the api call via the "tools" argument.
  * If a tool is not defined here, it cannot be called by the api.
*/
export const openAITools = [
  zodFunction({
    name: "updateUserPreferences",
    parameters: updateUserPreferenceParameters,
    description: "this function is used to update a user's preferences",
  }),
  zodFunction({
    name: "createTask",
    parameters: createTaskParameters,
    description: "Used to create a new task",
  }),
  zodFunction({
    name: "getProjects",
    parameters: getProjectsParameters,
    description: "used to get all projects of a user",
  }),
  zodFunction({
    name: "updateProjectData",
    parameters: updateProjectParameters,
    description: "used to update metadata of a project",
  }),
];
