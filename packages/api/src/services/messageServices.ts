import { Chat, ChatGPTRole, User } from "@prisma/client";
import { OpenAI } from "openai";
import { FormattedMessage } from "../../types/types.js";
import { prismadb } from "../config/index.js";
import { convertEnums } from "../utils/messageUtils.js";

// takes in a role, content and name and properly types it to be sent to the OpenAI API
export const formatMessageForOpenAI = async ({
  role,
  content,
  name,
}: {
  role: ChatGPTRole;
  content: string;
  name: string;
}) => {
  if (!role || !content || !name) {
    throw new Error("Please provide a role, content, and name for the message");
  }

  const formattedMessage: OpenAI.ChatCompletionMessageParam = {
    role: convertEnums(role),
    content: content,
    name: name,
  };

  return formattedMessage;
};

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
export const sendMessageToDB = async (
  message: string,
  user: User,
  projectId: string,
  data: any,
) => {
  if (!message || !user) {
    throw new Error("Invalid input");
  }
  // if it's a user message, the data is empty for now.
  const baseMessageData = {
    content: message,
    projectId: projectId,
    userId: user.id,
    name: user.firstName ?? user.username,
    role: user.role,
  };

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
};

// function to format messages for openai
