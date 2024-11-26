import { openAIClient } from "@api/src/config";
import {
  addMessageToConversation,
  assistantFailureResponse,
  findConversation,
  formatMessageForOpenAI,
  getContext,
  handleResponseToolCalls,
  openAIApiOptions,
} from "@api/src/services/";
import { ChatGPTMessage, OpenAIStructuredOutput } from "@api/types/index.js";
import { User } from "@prisma/client";

export const chatWithAssistant = async (
  message: ChatGPTMessage,
  user: User,
): Promise<OpenAIStructuredOutput> => {
  if (!message || !user) {
    throw new Error("Invalid input");
  }

  try {
    // get context from the assistant and the user
    const context = await getContext(user.id);
    // check if the user has conversation history with the assistant. If they don't, it creates a conversation.
    const conversationHistory = await findConversation(user.id);
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
      // console.log(" -------> NO TOOL CALL MADE <-------");
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
