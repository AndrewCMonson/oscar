import { getAllChats } from "../queries/chatQueries.js";
import { UserRole } from "@prisma/client";
import { Request, Response } from "express";
import { prismadb, openAIClient } from "../config/index.js";
import { FormattedMessage, ChatRequest } from "../types.js";
import { convertEnums } from "../utils/messageUtils.js";
import { createNewMessage } from "./messageController.js";
import { getUserByRole } from "./userController.js";

export const handleChatMessage = async (req: ChatRequest, res: Response) => {
  const { user, message } = req.body;

  try {
    // Check if the user has an existing chat
    let chat = await findUserChat(user.id);

    // If the user does not have an existing chat, create a new one
    if (!chat) {
      chat = await createNewChat(user.id);
    }

    // Check for existing messages in the chat
    const existingMessages = await getMessagesByChatId(chat.id);

    // If there are no existing messages, create context for the chat assistant using the system user
    if (existingMessages.length === 0) {
      // Get the system user
      const systemUser = await getUserByRole(UserRole.SYSTEM);
      // Create a system message to give the assistant context
      const systemMessage = { role: 'system', content: 'You are a personal project manager. Your task is to handle project management tasks for the user\'s development projects. You will create tasks and calendar events for a Motion calendar and coordinate with JIRA', name: systemUser.username };
      // Create and insert the first message into the DB
      const insertedMessage = await createNewMessage(systemMessage.content, systemUser, chat);
      // Create and insert the user's message into the DB
      const newMessage = await createNewMessage(message, user, chat);
      // Generate a response from the assistant
      const response = await openAIClient.chat.completions.create({
        messages: [insertedMessage, newMessage],
        model: 'gpt-3.5-turbo',
        max_tokens: 150,
        temperature: 0.7,
      });
      // Get the assistant user
      const assistantUser = await getUserByRole(UserRole.ASSISTANT);
      // Format the assistant's response
      const assistantMessage = {
        role: 'assistant',
        content: response.choices[0].message.content ?? "No message returned",
        name: assistantUser.username
      };

      // Insert the assistant's response into the DB to be used later
      const assistantMessageFormatted = await createNewMessage(assistantMessage.content, assistantUser, chat);
      // Return the assistant's response to the user
      res.json({ response: assistantMessageFormatted });
      return;
    }
    // If there are existing messages, create a new message for the user based on their input and insert it into the DB
    const newMessage = await createNewMessage(message, user, chat);
    // Generate a response from the assistant based on the user's input
    const response = await openAIClient.chat.completions.create({
      messages: [...existingMessages, newMessage],
      model: 'gpt-3.5-turbo',
      max_tokens: 150,
      temperature: 0.7,
    });
    // Get the assistant user
    const assistantUser = await getUserByRole(UserRole.ASSISTANT);
    // Format the assistant's response and insert it into the DB
    const assistantMessage = {
      role: 'assistant',
      content: response.choices[0].message.content ?? "No message returned",
      name: assistantUser.username
    };
    // Insert the assistant's response into the DB to be used later
    const assistantMessageFormatted = await createNewMessage(assistantMessage.content, assistantUser, chat);

    res.json({ response: assistantMessageFormatted });
    return;
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const handleGetAllChats = async (res: Response) => {
  try {
    const chats = await getAllChats();
    res.json({ chats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const handleGetChatById = async (req: Request, res: Response) => {
  const { chatId } = req.params;

  try {
    const chat = await prismadb.chat.findUnique({
      where: {
        id: chatId
      }
    });

    res.json({ chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const createNewChat = async (userId: string) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    const chat = await prismadb.chat.create({
      data: {
        messages: {
          create: []
        },
        user: {
          connect: {
            id: userId
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



export const findUserChat = async (userId: string) => {
  try {
    const chat = await prismadb.chat.findFirst({
      where: {
        userId: userId
      }
    });

    return chat;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred getting the chat');
  }
}

export const getMessagesByChatId = async (chatId: string) => {
  try {
    const messages = await prismadb.message.findMany({
      where: {
        chatId: chatId
      }
    });
    if (!messages) {
      throw new Error('An error occurred getting the messages');
    }

    const formattedMessages: FormattedMessage[] = messages.map(({ role, content, name }) => ({ role: convertEnums(role), content, name }));

    return formattedMessages;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred getting the messages');
  }
};



export const deleteChatById = async (chatId: string) => {
  try {
    const chat = await prismadb.chat.delete({
      where: {
        id: chatId
      }
    });

    return chat;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred deleting the chat');
  }
}

