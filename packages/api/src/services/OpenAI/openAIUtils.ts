import { openAIClient } from "@api/src/config/index.js";
import {
  addMessageToConversation,
  handleToolCallFunction,
  openAIStructuredOutput,
  openAITools,
  openAIStructuredOutputProjectCreation,
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

// Current default settings for the openAI api call
// TODO: incorporate this into the db so multiple assistants can be used based on user preferences i.e. more creativity, different model, etc...
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

export const openAIApiOptionsProjectCreation = {
  model: "gpt-4o-mini",
  max_tokens: 1000,
  temperature: 0.5,
  top_p: 0.95,
  presence_penalty: 0.3,
  frequency_penalty: 0.1,
  response_format: zodResponseFormat(
    openAIStructuredOutputProjectCreation,
    "assistant",
  ),
  tools: openAITools,
};

// used when an AI response results in an undefined
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

/**
 * Checks if the provided role is one of the allowed roles: "function", "user", "assistant", "tool", or "system".
 * If the role is not one of these, an error is thrown.
 *
 * @param role - The role to check.
 * @returns The validated role if it is one of the allowed roles.
 * @throws {Error} If the role is not one of the allowed roles.
 */
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

/**
 * Formats a message for OpenAI's ChatCompletion API.
 *
 * @param {Object} params - The parameters for the message.
 * @param {string} params.role - The role of the message sender.
 * @param {string} params.content - The content of the message.
 * @param {string} params.name - The name of the message sender.
 * @param {string} [params.toolCallId] - Optional tool call ID associated with the message.
 * @returns {OpenAI.ChatCompletionMessageParam} The formatted message object.
 * @throws {Error} If role, content, or name is not provided.
 */
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
  console.log("role: ", role);
  console.log("content: ", content);
  console.log("name: ", name);
  console.log("toolCallId: ", toolCallId);

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

/**
 * Checks if the provided name is a valid tool name.
 *
 * This function verifies if the given `name` is one of the predefined tool names
 * in the `ToolCallFunctions` interface. The valid tool names are:
 * - "createProject"
 * - "updateUserPreferences"
 * - "createTask"
 * - "getProjects"
 * - "updateProjectData"
 *
 * @param name - The name to check.
 * @returns A boolean indicating whether the name is a valid tool name.
 */
export const isValidToolName = (
  name: string,
): name is keyof ToolCallFunctions => {
  return [
    "updateUserPreferences",
    "createTask",
    "getProjects",
    "updateProjectData",
  ].includes(name);
};

/**
 * Handles the response tool calls from OpenAI and processes them accordingly.
 *
 * @param openAIResponse - The parsed response from OpenAI containing structured output.
 * @param conversationHistory - The conversation history object.
 * @param user - The user object.
 * @param context - The context message parameter for the chat completion.
 * @param formattedMessages - The array of formatted message parameters.
 *
 * @returns A promise that resolves to the structured output from OpenAI.
 *
 * @throws Will throw an error if the tool name is not valid.
 */
export const handleResponseToolCalls = async (
  openAIResponse: ParsedChatCompletion<OpenAIStructuredOutput>,
  conversationHistory: Conversation,
  user: User,
  context: ChatCompletionMessageParam,
  formattedMessages: ChatCompletionMessageParam[],
): Promise<OpenAIStructuredOutput> => {
  const toolCalls = openAIResponse.choices[0].message.tool_calls;

  // map over all of the tool calls, passing them to a function that handles them based on their name if their name is valid. If not, error is thrown.
  // we format each toolcall result and store each of them in an array that will be sent back to the assistant
  const toolCallResults = await Promise.all(
    toolCalls.map(async (toolCall) => {
      const { function: toolCallFunction, id: toolCallID } = toolCall;
      const { name: toolCallName } = toolCallFunction;
      if (isValidToolName(toolCallName)) {
        const handledFunction = await handleToolCallFunction(
          toolCallName,
          toolCall.function.parsed_arguments as ToolCallFunctionArgs,
        );

        return formatMessageForOpenAI({
          content: JSON.stringify(handledFunction),
          role: "tool",
          toolCallId: toolCallID,
          name: toolCallName,
        });
      } else {
        throw new Error("Not a valid tool name");
      }
    }),
  );
  // we call the api again, with the updated toolcall results. The api will respond with a finish reason
  const functionResponse = await openAIClient.beta.chat.completions.parse({
    messages: [
      context,
      ...formattedMessages,
      openAIResponse.choices[0].message,
      ...toolCallResults,
    ],
    ...openAIApiOptions,
  });
  // if the finish reason is "tool_calls", the api has determined it needs to call additional functions
  // so we recursively call handleResponseToolCalls on this result until there are no more tool calls
  if (functionResponse.choices[0].finish_reason === "tool_calls") {
    return handleResponseToolCalls(
      functionResponse,
      conversationHistory,
      user,
      context,
      formattedMessages,
    );
  }
  // once there are no more tool calls, we parse the response message
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
  // return the response to the user
  return assistantResponse;
};
