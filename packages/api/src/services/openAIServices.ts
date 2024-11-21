import { ChatGPTMessage, OpenAIChatResponse } from "@api/types/index.js";
import { User } from "@prisma/client";
import { zodResponseFormat } from "openai/helpers/zod.js";
import { openAIClient, prismadb } from "../config/index.js";
import {
  assistantFailureResponse,
  handleToolCallFunction,
  openAIStructuredOutput,
  openAITools,
  ToolCallFunctionArgs,
} from "../utils/openAIUtils.js";
import { getContext } from "./contextServices.js";
import { formatMessageForOpenAI } from "./index.js";

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
      model: "gpt-4o-mini",
      max_tokens: 300,
      temperature: 0.6,
      top_p: 0.95,
      presence_penalty: 0.3,
      frequency_penalty: 0.1,
      response_format: zodResponseFormat(openAIStructuredOutput, "assistant"),
      tools: openAITools,
    });

    const toolCall = openAIResponse.choices[0].message.tool_calls[0];

    if (!toolCall) {
      console.log("NO TOOL CALL MADE")
      const assistantResponse = openAIResponse.choices[0].message.parsed ?? assistantFailureResponse;

      await prismadb.conversation.update({
        where: {
          id: conversationHistory.id,
        },
        data: {
          messages: {
            create: [
              {
                userId: user.id,
                role: assistantResponse?.role ?? "assistant",
                content: assistantResponse?.content ?? "No content available",
                name: assistantResponse?.name ?? "assistant",
                contextData: assistantResponse?.contextData ?? {},
              },
            ],
          },
        },
        include: {
          messages: true,
        },
      });

      return assistantResponse;
    }

    const toolCallFunctionName = toolCall.function.name;
    const toolCallFunctionArgs = toolCall.function
      .parsed_arguments as ToolCallFunctionArgs;

    const functionHandler = await handleToolCallFunction(
      toolCallFunctionName,
      toolCallFunctionArgs,
    );

    console.log("Created Project", functionHandler);

    const functionCallResultMessage = await formatMessageForOpenAI({
      name: "assistant",
      role: "tool",
      content: JSON.stringify(toolCall.function.parsed_arguments),
      toolCallId: toolCall.id,
    });

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

    console.log(functionResponse);

    const assistantResponse = (toolCall === undefined
      ? openAIResponse.choices[0].message.parsed
      : functionResponse?.choices[0].message.parsed) ?? {
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
    // update the conversation history with the assistant's response
    await prismadb.conversation.update({
      where: {
        id: conversationHistory.id,
      },
      data: {
        messages: {
          create: [
            {
              userId: user.id,
              role: assistantResponse?.role ?? "assistant",
              content: assistantResponse?.content ?? "No content available",
              name: assistantResponse?.name ?? "assistant",
              contextData: assistantResponse?.contextData ?? {},
            },
          ],
        },
      },
      include: {
        messages: true,
      },
    });

    return assistantResponse;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred chatting with the assistant");
  }
};

const findConversation = async (userId: string, message: ChatGPTMessage) => {
  try {
    const assistant = await prismadb.assistant.findFirst({
      where: {
        role: "assistant",
      },
    });

    if (!assistant) {
      throw new Error("Assistant not found");
    }

    let conversation = await prismadb.conversation.findFirst({
      where: {
        userId: userId,
        assistantId: assistant.id,
      },
      include: {
        messages: true,
      },
    });

    if (!conversation) {
      conversation = await prismadb.conversation.create({
        data: {
          userId: userId,
          assistantId: assistant.id,
        },
        include: {
          messages: true,
        },
      });
    }

    const updatedConversation = await prismadb.conversation.update({
      where: {
        id: conversation.id,
      },
      data: {
        messages: {
          create: [
            {
              userId: userId,
              role: message.role,
              content: message.content,
              name: message.name,
              contextData: {},
            },
          ],
        },
      },
      include: {
        messages: true,
      },
    });

    if (!updatedConversation) {
      throw new Error("An error occurred updating the conversation");
    }

    return updatedConversation;
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred finding the conversation");
  }
};

export const createConversation = async (
  userId: string,
  message: ChatGPTMessage,
) => {
  try {
    const assistant = await prismadb.assistant.findFirst({
      where: {
        role: "assistant",
      },
    });

    if (!assistant) {
      throw new Error("Assistant not found");
    }

    const conversation = await prismadb.conversation.create({
      data: {
        userId: userId,
        assistantId: assistant.id,
        messages: {
          create: [
            {
              userId: userId,
              role: message.role,
              content: message.content,
              name: message.name,
              contextData: {},
            },
          ],
        },
      },
      include: {
        messages: true,
      },
    });

    if (!conversation) {
      throw new Error("An error occurred creating the conversation");
    }

    return conversation;
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred creating the conversation");
  }
};
