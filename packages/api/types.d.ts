import  OpenAI from "openai";
import { Request } from "express";
import { User, UserRole } from "@prisma/client";

export interface FormattedMessage {
  role: 'user' | 'function' | 'assistant' | 'system';
  content: string;
  name: string;
}

export interface ChatRequest extends Request {
  body: {
    user: User;
    message: string;
  };
}
