import {
  Prisma,
  Project,
  ProjectMetadata,
  Task,
  User,
  UserPreferences,
} from "@api/node_modules/.prisma/client";
import {
  createTaskParameters,
  getProjectsParameters,
  openAIStructuredOutput,
  updateProjectParameters,
  updateUserPreferenceParameters,
} from "@api/src/services/OpenAI/index.js";
import { Endpoints } from "@octokit/types";
import { User as Auth0User } from "auth0";
import { Request, Response } from "express";
import { z } from "zod";

export type UpdateUserPreferenceParameters = z.infer<
  typeof updateUserPreferenceParameters
>;
export type CreateTaskParameters = z.infer<typeof createTaskParameters>;
export type GetProjectsParameters = z.infer<typeof getProjectsParameters>;
export type UpdateProjectDataParameters = z.infer<
  typeof updateProjectParameters
>;
export type OpenAIStructuredOutput = z.infer<typeof openAIStructuredOutput>;

export type ToolCallFunctions = {
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

export interface IncomingUser extends Auth0User {
  sub: string;
}

export interface AWSSecrets {
  username: string;
  password: string;
}

export interface Auth0APIUserWithAccessToken extends Auth0User {
  githubAccessToken: string;
}

// Github API types
export type CreateNewRepositoryResponse =
  Endpoints["POST /user/repos"]["response"];
export type CreateNewRepositoryData =
  Endpoints["POST /user/repos"]["response"]["data"];
export type CreateNewIssueResponse =
  Endpoints["POST /repos/{owner}/{repo}/issues"]["response"];
export type CreateNewIssueData =
  Endpoints["POST /repos/{owner}/{repo}/issues"]["response"]["data"];
export type GetRepositoriesResponse = Endpoints["GET /user/repos"]["response"];
export type GetRepositoriesData =
  Endpoints["GET /user/repos"]["response"]["data"];
export type GetRepositoryResponse =
  Endpoints["GET /repos/{owner}/{repo}"]["response"];
export type GetRepositoryData =
  Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
