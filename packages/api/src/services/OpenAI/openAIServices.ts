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
import { ChatGPTMessage, OpenAIChatResponse } from "@api/types/index.js";
import { User } from "@prisma/client";

export const chatWithAssistant = async (
  message: ChatGPTMessage,
  user: User,
): Promise<OpenAIChatResponse> => {
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
    console.log(formattedMessages);
    // send formatted messages and context to the API. This should return as an object that will be contain a JSON response for parsing.
    const openAIResponse = await openAIClient.beta.chat.completions.parse({
      messages: [context, ...formattedMessages],
      ...openAIApiOptions,
    });

    console.log("FIRST AI RESPONSE", openAIResponse);
    const finishReason = openAIResponse.choices[0].finish_reason;

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

    // // gets any tool calls that were made and stores in array
    // const toolCalls = openAIResponse.choices[0].message.tool_calls;
    // // if no tool was called, update the response variable, add the response to the DB and return it to the user
    if (finishReason === "stop") {
      console.log(" -------> NO TOOL CALL MADE <-------");
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
    // // if tools were called, we map over the tools that were called, checking if they were valid tool calls. if they are, we pass them to a helper function that handles them on a case by case basis. The results of the tool calls are stored in an array for use later as context to the chatbot again.
    // console.log("Tool calls", toolCalls);
    // const functionsHandled = await Promise.all(
    //   toolCalls.map(async (toolCall) => {
    //     const { function: toolCallFunction, id: toolCallID } = toolCall;
    //     const { name: toolCallName } = toolCallFunction;
    //     if (isValidToolName(toolCallName)) {
    //       const handledFunction = await handleToolCallFunction(
    //         toolCallName,
    //         toolCall.function.parsed_arguments as ToolCallFunctionArgs,
    //       );

    //       return {
    //         handledFunction,
    //         id: toolCallID,
    //         name: toolCallName,
    //       };
    //     }
    //   }),
    // );
    // console.log("FunctionsHandled", functionsHandled);
    // // we map over the newly handled tool calls to create formatted messages to send to the assistant for additional context. The api requires us to respond to tool calls with a message containing tool call ids. this is that response.
    // const functionCallResultMessages = functionsHandled.map(
    //   (functionhandled) => {
    //     return formatMessageForOpenAI({
    //       name: functionhandled?.name ?? "",
    //       role: "tool",
    //       content: JSON.stringify(functionhandled),
    //       toolCallId: functionhandled?.id,
    //     });
    //   },
    // );

    // console.log("Function call result messages", functionCallResultMessages);

    // // call the api with the updated tool call information again. This will be the end of the loop and the final response by the assistant. Since tools were called it will be an update to the user on what actions were taken by the assistant.
    // const functionResponse = await openAIClient.beta.chat.completions.parse({
    //   messages: [
    //     context,
    //     ...formattedMessages,
    //     openAIResponse.choices[0].message,
    //     ...functionCallResultMessages,
    //   ],
    //   ...openAIApiOptions,
    // });
    // // get final response, add it to the db and return it to the user.
    // console.log(
    //   "RESPONSE AFTER FUNCTION RESOLUTION",
    //   functionResponse,
    // );
    // const assistantResponse =
    //   functionResponse?.choices[0].message.parsed ?? assistantFailureResponse;
    // // update the conversation history with the assistant's response
    // await addMessageToConversation(
    //   conversationHistory.id,
    //   user.id,
    //   assistantResponse?.role,
    //   assistantResponse.content,
    //   assistantResponse?.name,
    // );

    return assistantFailureResponse;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred chatting with the assistant");
  }
};
