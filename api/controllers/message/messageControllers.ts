import { Chat, User } from "@prisma/client";
import { OpenAI } from "openai";
import { prismadb } from "../../config/index.js";
import { FormattedMessage } from "../../types.js";

export const createMessage = async (message: string, user: User, chat: Chat) => {
  if (!message || !user || !chat) {
    throw new Error('Invalid input');
  }

  try {
    const newMessage = await prismadb.message.create({
      data: {
        content: message,
        chatId: chat.id,
        userId: user.id,
        name: user.name,
        role: "user"
      }
    });

    if (!newMessage) {
      throw new Error('An error occurred sending the message');
    }

    const formattedMessage: FormattedMessage = { role: newMessage.role, content: newMessage.content, name: newMessage.name };

    return formattedMessage as OpenAI.ChatCompletionMessageParam;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred sending the message');
  }
};

export const getMessages = async (chat: Chat) => {
  try {
    const existingMessages = await prismadb.message.findMany({
      where: {
        chatId: chat.id
      }
    });

    if (!existingMessages) {
      throw new Error('An error occurred getting the messages');
    }

    const formattedMessages: FormattedMessage[] = existingMessages.map(({ role, content, name }) => ({ role, content, name }));

    return formattedMessages as OpenAI.ChatCompletionMessageParam[];
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred getting the messages');
  }
};