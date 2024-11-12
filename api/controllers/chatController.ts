import { Chat, User } from "@prisma/client";
import OpenAI from "openai";
import { prismadb } from "../config";
import e, { Request, Response } from 'express';

export const createChat = async (user: User) => {

  try {
    const chat = await prismadb.chat.create({
      data: {
        messages: {
          create: []
        },
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });

    if(!chat) {
      throw new Error('An error occurred creating the chat');
    }

    return chat;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred creating the chat');
  }
};

type FormattedMessage = {
  role: "system" | "user" | "assistant" | "function" | string;
  content: string | OpenAI.ChatCompletionContentPart[];
  name: string | undefined;
}

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
        role: "user"
      }
    });

    if (!newMessage) {
      throw new Error('An error occurred sending the message');
    }

    const formattedMessage: FormattedMessage = { role: newMessage.role, content: newMessage.content, name: undefined }

    return formattedMessage;
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

    const formattedMessages: FormattedMessage[] = existingMessages.map(({role, content}) => ({role, content, name: ""}));

    return formattedMessages;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred getting the messages');
  }
};
