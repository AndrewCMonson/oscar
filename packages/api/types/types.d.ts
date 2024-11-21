import { Request, Response } from "express";
import { User } from "@prisma/client";

export interface MiddlewareContext {
  user: User;
  req: Request;
  res: Response;
}

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
