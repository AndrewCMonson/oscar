import { ChatGPTRole, FormattedMessage } from "@api/types/types.js";
import { zodResponseFormat } from "openai/helpers/zod.js";
import { z } from "zod";
import { openAITools } from "@api/src/services/OpenAI";

export const openAIStructuredOutput = z.object({
  role: z.string(),
  name: z.string(),
  content: z.string(),
  contextData: z.object({
    action: z.string(),
    actionName: z.string(),
    description: z.string(),
    metadata: z.object({
      status: z.string(),
      priority: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      tags: z.array(z.string()),
    }),
  }),
});

export const openAIApiOptions = {
  model: "gpt-4o-mini",
  max_tokens: 300,
  temperature: 0.6,
  top_p: 0.95,
  presence_penalty: 0.3,
  frequency_penalty: 0.1,
  response_format: zodResponseFormat(openAIStructuredOutput, "assistant"),
  tools: openAITools,
};

export const assistantFailureResponse = {
  role: "assistant",
  name: "assistant",
  content: "An error occurred with the assistant",
  contextData: {
    action: "NONE",
    actionName: "none",
    description: "",
    metadata: {
      status: "",
      priority: "",
      startDate: "",
      endDate: "",
      tags: [],
    },
  },
};

export const openAIRoleCheck = (role: string): ChatGPTRole => {
  if (
    role !== "function" &&
    role !== "user" &&
    role !== "assistant" &&
    role !== "tool" &&
    role !== "system"
  ) {
    throw new Error("Invalid role");
  }

  return role as unknown as ChatGPTRole;
};

export const formatMessageForOpenAI = ({
  role,
  content,
  name,
  toolCallId,
}: {
  role: string;
  content: string;
  name: string;
  toolCallId?: string;
}): FormattedMessage => {
  if (!role || !content || !name) {
    throw new Error("Please provide a role, content, and name for the message");
  }

  const formattedMessage = {
    role: openAIRoleCheck(role),
    content: content,
    name: name,
    tool_call_id: toolCallId,
  };

  return formattedMessage;
};
