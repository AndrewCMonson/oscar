import { OpenAI } from "openai";

export interface FormattedMessage {
  role: "system" | "user" | "assistant" | "function" | string;
  content: string | OpenAI.ChatCompletionContentPart[];
  name: string;
}