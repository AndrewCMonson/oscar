import { Request, Response } from "express";
import { User } from "@prisma/client";

export interface MiddlewareContext {
  user: User;
  req: Request;
  res: Response;
}

export interface FormattedMessage {
  role: "user" | "function" | "assistant" | "system";
  content: string;
  name: string;
  contextData?: {
    action: string;
    name: string;
    data: unknown; // this will change once we have a better understanding of the data structure needed by api calls
  };
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
