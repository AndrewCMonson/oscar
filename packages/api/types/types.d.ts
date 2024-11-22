import { Request, Response } from "express";
import { Prisma, User } from "@prisma/client";
import { z } from "zod";
import {
  createProjectParameters,
  createTaskParams,
  updateUserPreferenceParams,
} from "@api/src/services/OpenAI/";

type CreateProjectParameters = z.infer<typeof createProjectParameters>;
type UpdateUserPreferenceParams = z.infer<typeof updateUserPreferenceParams>;
type CreateTaskParams = z.infer<typeof createTaskParams>;

export interface MiddlewareContext {
  user: User;
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
  | UpdateUserPreferenceParams
  | CreateTaskParams;

export interface ChatGPTMessage {
  role: "user" | "function" | "assistant" | "system" | "tool";
  content: string;
  name: string;
}

export interface ChatRequest extends Request {
  body: {
    user: User;
    message: string;
  };
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

export interface OpenAIChatResponse {
  role: string;
  name: string;
  content: string;
  contextData: {
    action: string;
    actionName: string;
    metadata: {
      status: string;
      priority: string;
      startDate: string;
      endDate: string;
      tags: string[];
    };
  };
}
