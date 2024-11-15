import { Chat, User } from "@prisma/client";
import { OpenAI } from "openai";
import { FormattedMessage } from "../../types/types.js";
import { prismadb } from "../config/index.js";
import { convertEnums } from "../utils/messageUtils.js";

export const createNewMessage = async (
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
