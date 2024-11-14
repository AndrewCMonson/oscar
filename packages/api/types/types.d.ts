import { Request, Response } from "express";
import { User } from "@prisma/client";

export interface MiddlewareContext {
  user?: User | null;
  req: Request;
  res: Response;
}

export interface FormattedMessage {
  role: "user" | "function" | "assistant" | "system";
  content: string;
  name: string;
}

export interface ChatRequest extends Request {
  body: {
    user: User;
    message: string;
  };
}
