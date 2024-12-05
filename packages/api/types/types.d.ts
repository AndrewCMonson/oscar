import {
  createProjectParameters,
  createTaskParameters,
  getProjectsParameters,
  openAIStructuredOutput,
  updateProjectParameters,
  updateUserPreferenceParameters,
} from "@api/src/services/OpenAI/";
import {
  Prisma,
  Project,
  ProjectMetadata,
  Task,
  User,
  UserPreferences,
} from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

declare module "express" {
  export interface Request {
    headers: Request["headers"] & {
      authorizeduser?: string | undefined;
    };
  }
}

type CreateProjectParameters = z.infer<typeof createProjectParameters>;
type UpdateUserPreferenceParameters = z.infer<
  typeof updateUserPreferenceParameters
>;
type CreateTaskParameters = z.infer<typeof createTaskParameters>;
type GetProjectsParameters = z.infer<typeof getProjectsParameters>;
type UpdateProjectDataParameters = z.infer<typeof updateProjectParameters>;
type OpenAIStructuredOutput = z.infer<typeof openAIStructuredOutput>;

export type ToolCallFunctions = {
  createProject: CreateProjectParameters;
  updateUserPreferences: UpdateUserPreferenceParameters;
  createTask: CreateTaskParameters;
  getProjects: GetProjectsParameters;
  updateProjectData: UpdateProjectDataParameters;
};

export type ToolCallFunctionReturn =
  | Project
  | UserPreferences
  | Task
  | Project[]
  | ProjectMetadata
  | undefined;

export interface MiddlewareContext {
  user?: User;
  req: Request;
  res: Response;
}

export type ConversationWithMessages = Prisma.ConversationGetPayload<{
  include: {
    messages: true;
  };
}>;

export interface ChatGPTRole {
  role: "function" | "user" | "assistant" | "system" | "tool";
}

export interface FormattedMessage {
  role: ChatGPTRole;
  content: string;
  name: string;
  tool_call_id: string | undefined;
}

export type ToolCallFunctionArgs =
  | CreateProjectParameters
  | UpdateUserPreferenceParameters
  | CreateTaskParameters
  | GetProjectsParameters
  | UpdateProjectDataParameters;

export interface ChatGPTMessage {
  role: "user" | "function" | "assistant" | "system" | "tool";
  content: string;
  name: string;
}

export interface UserPreferencesData {
  tone: string;
  responseStyle: string;
  integrations: {
    jira: {
      enabled: boolean;
      apiKey: string;
      baseUrl: string;
    };
    github: {
      enabled: boolean;
      apiKey: string;
      baseUrl: string;
    };
    motion: {
      enabled: boolean;
      apiKey: string;
      baseUrl: string;
    };
  };
}

export interface UserMemoryData {
  longTermMemory: {
    personalDetails: {
      name: string;
      favoriteTopics: string[];
    };
    memories: {
      date: string;
      note: string;
    }[];
  };
  notifications: boolean;
  timeZone: string;
  language: string;
}
