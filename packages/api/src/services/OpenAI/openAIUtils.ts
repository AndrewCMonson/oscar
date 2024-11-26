import { openAIClient } from "@api/src/config/openai.js";
import {
  addMessageToConversation,
  handleToolCallFunction,
  openAITools,
} from "@api/src/services/index.js";
import {
  OpenAIStructuredOutput,
  ToolCallFunctionArgs,
  ToolCallFunctions,
} from "@api/types/types.js";
import { Conversation, User } from "@prisma/client";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.js";
import { ParsedChatCompletion } from "openai/resources/beta/chat/completions.js";
import { ChatCompletionMessageParam } from "openai/resources/index.js";
import { z } from "zod";

export const openAIStructuredOutput = z.object({
  role: z.string(),
  name: z.string(),
  content: z.string(),
});

export const openAIApiOptions = {
  model: "gpt-4o-mini",
  max_tokens: 1000,
  temperature: 0.5,
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

export const openAIRoleCheck = (
  role: string,
): "function" | "user" | "assistant" | "tool" | "system" => {
  if (
    role !== "function" &&
    role !== "user" &&
    role !== "assistant" &&
    role !== "tool" &&
    role !== "system"
  ) {
    throw new Error("Invalid role");
  }

  return role;
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
}): OpenAI.ChatCompletionMessageParam => {
  if (!role || !content || !name) {
    throw new Error("Please provide a role, content, and name for the message");
  }

  const formattedMessage = {
    role: openAIRoleCheck(role),
    content: content,
    name: name,
    tool_call_id: toolCallId,
  } as OpenAI.ChatCompletionMessageParam;

  return formattedMessage;
};

export const isValidToolName = (
  name: string,
): name is keyof ToolCallFunctions => {
  return [
    "createProject",
    "updateUserPreferences",
    "createTask",
    "getProjects",
    "updateProjectData",
  ].includes(name);
};

export const handleResponseToolCalls = async (
  openAIResponse: ParsedChatCompletion<OpenAIStructuredOutput>,
  conversationHistory: Conversation,
  user: User,
  context: ChatCompletionMessageParam,
  formattedMessages: ChatCompletionMessageParam[],
): Promise<OpenAIStructuredOutput> => {
  const toolCalls = openAIResponse.choices[0].message.tool_calls;

  // map over all of the tool calls, passing them to a function that handles them based on their name if their name is valid. If not, error is thrown.
  const toolCallResults = await Promise.all(
    toolCalls.map(async (toolCall) => {
      const { function: toolCallFunction, id: toolCallID } = toolCall;
      const { name: toolCallName } = toolCallFunction;
      if (isValidToolName(toolCallName)) {
        const handledFunction = await handleToolCallFunction(
          toolCallName,
          toolCall.function.parsed_arguments as ToolCallFunctionArgs,
        );

        return {
          handledFunction,
          id: toolCallID,
          name: toolCallName,
        };
      } else {
        throw new Error("Not a valid tool name");
      }
    }),
  );
  // we map over the newly handled tool calls to create formatted messages to send to the assistant for additional context. The api requires us to respond to tool calls with a message containing tool call ids. this is that response.
  const functionCallResultMessages = toolCallResults.map((functionhandled) => {
    return formatMessageForOpenAI({
      name: functionhandled?.name ?? "",
      role: "tool",
      content: JSON.stringify(functionhandled),
      toolCallId: functionhandled?.id,
    });
  });

  // call the api with the updated tool call information again. This will be the end of the loop and the final response by the assistant. Since tools were called it will be an update to the user on what actions were taken by the assistant.
  const functionResponse = await openAIClient.beta.chat.completions.parse({
    messages: [
      context,
      ...formattedMessages,
      openAIResponse.choices[0].message,
      ...functionCallResultMessages,
    ],
    ...openAIApiOptions,
  });

  if (functionResponse.choices[0].finish_reason === "tool_calls") {
    return handleResponseToolCalls(
      functionResponse,
      conversationHistory,
      user,
      context,
      formattedMessages,
    );
  }
  const assistantResponse =
    functionResponse?.choices[0].message.parsed ?? assistantFailureResponse;

  // update the conversation history with the assistant's response
  await addMessageToConversation(
    conversationHistory.id,
    user.id,
    assistantResponse?.role,
    assistantResponse.content,
    assistantResponse?.name,
  );

  return assistantResponse;
};
