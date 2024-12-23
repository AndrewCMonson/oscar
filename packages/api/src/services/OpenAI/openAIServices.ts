import { User } from "@prisma/client";
import {
  ChatGPTMessage,
  OpenAIStructuredOutput,
} from "../../../types/index.js";
import { openAIClient } from "../../config/index.js";
import {
  addMessageToConversation,
  assistantFailureResponse,
  findConversation,
  formatMessageForOpenAI,
  getContext,
  handleResponseToolCalls,
  openAIApiOptions,
} from "../../services/index.js";

/**
 * Communicates with the assistant using the provided message and user information.
 *
 * @param {ChatGPTMessage} message - The message to be sent to the assistant.
 * @param {User} user - The user sending the message.
 * @param {string} projectId - The project ID for the conversation.
 * @returns {Promise<OpenAIStructuredOutput>} - The structured output from the OpenAI API.
 * @throws {Error} - Throws an error if the input is invalid or if an error occurs during the process.
 *
 * The function performs the following steps:
 * 1. Validates the input message and user.
 * 2. Retrieves the context for the user.
 * 3. Checks for existing conversation history or creates a new conversation.
 * 4. Adds the new message to the conversation.
 * 5. Formats the conversation messages for the OpenAI API.
 * 6. Sends the formatted messages and context to the OpenAI API.
 * 7. Handles the response based on the finish reason:
 *    - If the finish reason is "tool_calls", it processes tool calls.
 *    - If the finish reason is "stop", it adds the assistant's response to the conversation history and returns it.
 *    - Otherwise, it returns a failure response.
 */
export const chatWithAssistant = async (
  message: ChatGPTMessage,
  user: User,
  projectId?: string,
): Promise<OpenAIStructuredOutput> => {
  if (!message || !user) {
    throw new Error("Invalid input");
  }

  try {
    // get context from the assistant and the user

    const context = projectId
      ? await getContext(user.id, projectId)
      : await getContext(user.id);
    // check if the user has conversation history with the assistant for this project. If they don't, it creates a conversation based on the current project and the user.
    const conversationHistory = await findConversation(user.id, projectId);

    // The new message is added to the conversation
    const updatedConversation = await addMessageToConversation(
      conversationHistory.id,
      user.id,
      message.role,
      message.content,
      message.name,
    );
    // get the messages from the conversation to add to assistant API call
    const { messages: conversationMessages } = updatedConversation;
    // format the messages to be sent to the OpenAI API
    const formattedMessages = await Promise.all(
      conversationMessages.map((message) => {
        return formatMessageForOpenAI({
          role: message.role,
          content: message.content,
          name: message.name,
        });
      }),
    );
    // send formatted messages and context to the API. This should return as an object that will be contain a JSON response for parsing.
    const openAIResponse = await openAIClient.beta.chat.completions.parse({
      messages: [context, ...formattedMessages],
      ...openAIApiOptions,
    });
    // finish reason will be one of the following: "length" | "stop" | "tool_calls" | "content_filter" | "function_call"
    const finishReason = openAIResponse.choices[0].finish_reason;
    // if the API finished it's call due to needing to call a tool (function), we pass the response to "handleResonseToolCalls" for the tool calls to be resolved.
    if (finishReason === "tool_calls") {
      const handledToolCallsResponse = handleResponseToolCalls(
        openAIResponse,
        conversationHistory,
        user,
        context,
        formattedMessages,
      );
      return handledToolCallsResponse;
    }
    // if the finish reason is "stop", we add the response to the conversation history and return it to the user.
    if (finishReason === "stop") {
      const assistantResponse =
        openAIResponse.choices[0].message.parsed ?? assistantFailureResponse;

      await addMessageToConversation(
        conversationHistory.id,
        user.id,
        assistantResponse?.role,
        assistantResponse.content,
        assistantResponse?.name,
      );

      return assistantResponse;
    }
    return assistantFailureResponse;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred chatting with the assistant");
  }
};
