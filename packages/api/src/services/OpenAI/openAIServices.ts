import { openAIClient } from "@api/src/config";
import {
  addMessageToConversation,
  assistantFailureResponse,
  findConversation,
  formatMessageForOpenAI,
  getContext,
  handleToolCallFunction,
  openAIApiOptions,
} from "@api/src/services/";
import {
  ChatGPTMessage,
  OpenAIChatResponse,
  ToolCallFunctionArgs,
} from "@api/types/index.js";
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
    // check if the user has conversation history with the assistant. If they do, it adds the new message to the conversation. If they don't, it creates one and adds the message to the conversation.
    const conversationHistory = await findConversation(user.id);

    const updatedConversation = await addMessageToConversation(conversationHistory.id, user.id, message.role, message.content, message.name);
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
    console.log(formattedMessages)
    // send formatted messages and context to the API. This should return as an object that will be contain a JSON response for parsing.
    const openAIResponse = await openAIClient.beta.chat.completions.parse({
      messages: [context, ...formattedMessages],
      ...openAIApiOptions,
    });
    // determines if a tool was called and stores it in a variable
    const toolCalls = openAIResponse.choices[0].message.tool_calls;
    // if no tool was called, update the response variable, add the response to the DB and return it to the user
    if (toolCalls.length === 0) {
      console.log(" -------> NO TOOL CALL MADE <-------");
      const assistantResponse =
        openAIResponse.choices[0].message.parsed ?? assistantFailureResponse;

      await addMessageToConversation(
        conversationHistory.id,
        user.id,
        message.role,
        message.content,
        message.name,
      )

      await addMessageToConversation(
        conversationHistory.id,
        user.id,
        assistantResponse?.role,
        assistantResponse.content,
        assistantResponse?.name,
      );

      return assistantResponse;
    }
    // if tool was called, get the name and arguments of the tool called and pass them to utility function that completes the required action i.e.(creates a project or updates preferences)
    console.log("Tool calls", toolCalls)
    const functionsHandled = await Promise.all(toolCalls.map(async (toolCall) => {
      const handledFunction = await handleToolCallFunction(toolCall.function.name, toolCall.function.parsed_arguments as ToolCallFunctionArgs)

      return {
        handledFunction,
        id: toolCall.id,
        name: toolCall.function.name,
      }
    }));

    console.log(functionsHandled);

    const functionCallResultMessages = functionsHandled.map(functionhandled => {
      return formatMessageForOpenAI({
        name: functionhandled.name,
        role: "tool",
        content: JSON.stringify(functionhandled),
        toolCallId: functionhandled.id
      })
    })

    console.log("Function call result messages", functionCallResultMessages)

    // call the API with the context, previous messages, message that resulted in the tool call and the result of the tool call.
    const functionResponse = await openAIClient.beta.chat.completions.parse({
      messages: [
        context,
        ...formattedMessages,
        openAIResponse.choices[0].message,
        ...functionCallResultMessages
      ],
      ...openAIApiOptions,
    });
    // get final response, add it to the db and return it to the user.
    console.log("functionResponse", functionResponse.choices[0].message.parsed?.content)
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
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred chatting with the assistant");
  }
};
