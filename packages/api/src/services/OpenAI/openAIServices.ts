import {
  ChatGPTMessage,
  OpenAIChatResponse,
  ToolCallFunctionArgs,
} from "@api/types/index.js";
import { User } from "@prisma/client";
import { zodResponseFormat } from "openai/helpers/zod.js";
import { openAIClient } from "@api/src/config";
import {
  getContext,
  assistantFailureResponse,
  formatMessageForOpenAI,
  handleToolCallFunction,
  openAIStructuredOutput,
  openAITools,
  openAIApiOptions,
  addMessageToConversation,
  findConversation,
} from "@api/src/services/";

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
    const conversationHistory = await findConversation(user.id, message);
    // get the messages from the conversation to add to assistant API call
    const { messages: conversationMessages } = conversationHistory;
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
    // determines if a tool was called and stores it in a variable
    const toolCall = openAIResponse.choices[0].message.tool_calls[0];
    // if no tool was called, update the response variable, add the response to the DB and return it to the user
    if (!toolCall) {
      console.log("NO TOOL CALL MADE");
      const assistantResponse =
        openAIResponse.choices[0].message.parsed ?? assistantFailureResponse;

      await addMessageToConversation(
        conversationHistory.id,
        user.id,
        assistantResponse?.role,
        assistantResponse?.name,
        assistantResponse.content,
      );

      return assistantResponse;
    }
    // if tool was called, get the name and arguments of the tool called and pass them to utility function that completes the required action i.e.(creates a project or updates preferences)
    const toolCallFunctionName = toolCall.function.name;
    const toolCallFunctionArgs = toolCall.function
      .parsed_arguments as ToolCallFunctionArgs;

    const functionHandler = await handleToolCallFunction(
      toolCallFunctionName,
      toolCallFunctionArgs,
    );

    console.log("Created Project", functionHandler);
    // format the result of the function call to be added to the messages array for next API call
    const functionCallResultMessage = await formatMessageForOpenAI({
      name: "assistant",
      role: "tool",
      content: JSON.stringify(toolCall.function.parsed_arguments),
      toolCallId: toolCall.id,
    });
    // call the API with the context, previous messages, message that resulted in the tool call and the result of the tool call.
    const functionResponse = await openAIClient.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        context,
        ...formattedMessages,
        openAIResponse.choices[0].message,
        functionCallResultMessage,
      ],
      max_tokens: 300,
      temperature: 0.6,
      top_p: 0.95,
      presence_penalty: 0.3,
      frequency_penalty: 0.1,
      response_format: zodResponseFormat(openAIStructuredOutput, "assistant"),
      tools: openAITools,
    });
    // get final response, add it to the db and return it to the user.
    const assistantResponse =
      functionResponse?.choices[0].message.parsed ?? assistantFailureResponse;
    // update the conversation history with the assistant's response
    await addMessageToConversation(
      conversationHistory.id,
      user.id,
      assistantResponse?.role,
      assistantResponse?.name,
      assistantResponse.content,
    );

    return assistantResponse;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred chatting with the assistant");
  }
};
