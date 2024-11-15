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
  data?: {
    action: string;
    data: unknown; // this will change once we have a better understanding of the data structure needed by api calls
  };
}

export interface ChatRequest extends Request {
  body: {
    user: User;
    message: string;
  };
}
