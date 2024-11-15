import { Chat, ChatGPTRole, Message, User } from "@prisma/client";
import { OpenAI } from "openai";
import { FormattedMessage } from "../../types/types.js";
import { prismadb } from "../config/index.js";
import { convertEnums } from "../utils/messageUtils.js";

export const createNewDBMessage = async (
  message: string,
  user: User,
  chatId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
) => {
  if (!message || !user || !chatId) {
    throw new Error("Invalid input");
  }

  try {
    const newMessage = await prismadb.message.create({
      data: {
        content: message,
        chatId,
        userId: user.id,
        name: user.firstName ?? user.username,
        role: user.role,
        data: data,
      },
    });

    if (!newMessage) {
      throw new Error("An error occurred sending the message");
    }

    const formattedMessage: FormattedMessage = {
      role: convertEnums(newMessage.role),
      content: newMessage.content,
      name: newMessage.name,
    };

    return formattedMessage as OpenAI.ChatCompletionMessageParam;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred sending the message");
  }
};

export const formatMessageForOpenAI = async (message: Message) => {
  if (!message) {
    throw new Error("Please provide a message");
  }

  const formattedMessage: OpenAI.ChatCompletionMessageParam = {
    role: convertEnums(message.role),
    content: message.content,
    name: message.name,
  };

  return formattedMessage;
}

export const getMessages = async (chat: Chat) => {
  try {
    const existingMessages = await prismadb.message.findMany({
      where: {
        chatId: chat.id,
      },
    });

    if (!existingMessages) {
      throw new Error("An error occurred getting the messages");
    }

    const formattedMessages: FormattedMessage[] = existingMessages.map(
      ({ role, content, name }) => ({
        role: convertEnums(role),
        content,
        name,
      }),
    );

    return formattedMessages as OpenAI.ChatCompletionMessageParam[];
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred getting the messages");
  }
};

// function to send user or assistant message to database
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendMessageToDB = async (message: string, user: User, chatId: string, data: any) => {
  if(!message || !user) {
    throw new Error("Invalid input");
  }
  // if it's a user message, the data is empty for now. 
  const baseMessageData = {
    content: message,
    chatId,
    userId: user.id,
    name: user.firstName ?? user.username,
    role: user.role,
  }

  const messageData =
    user.role === ChatGPTRole.USER
      ? { action: "USER_MESSAGE", data: {} }
      : data;

  const createdMessage = await prismadb.message.create({
    data: {
      ...baseMessageData,
      data: messageData,
    },
  });

  if (!createdMessage) {
    throw new Error("An error occurred sending the message to the database");
  }

  return createdMessage;
}

// function to format messages for openai

