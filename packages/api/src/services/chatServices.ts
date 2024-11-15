import { Chat, ChatGPTRole, User } from "@prisma/client";
import { Request, Response } from "express";
import { FormattedMessage } from "../../types/types.js";
import { openAIClient, prismadb } from "../config/index.js";
import { getAllChats } from "../queries/chatQueries.js";
import { llmPrompt } from "../utils/initialPrompt.js";
import { convertEnums } from "../utils/messageUtils.js";
import { createNewMessage } from "./messageServices.js";
import { getUserByRole } from "./userServices.js";

export const handleChatMessage = async (message: string, user: User) => {
  try {
    if (!message || !user) {
      throw new Error("Invalid input");
    }

    const { chat, chatMessages } = await findUserChat(user.id);

    if (!chat) {
      const { chat, chatMessages } = await createInitialChat(user.id);

      return await chatWithAssistant(message, user, chat, chatMessages);
    }

    return await chatWithAssistant(message, user, chat, chatMessages);
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred handling the chat message");
  }
};

export const handleGetAllChats = async (res: Response) => {
  try {
    const chats = await getAllChats();
    res.json({ chats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const handleGetChatById = async (req: Request, res: Response) => {
  const { chatId } = req.params;

  try {
    const chat = await prismadb.chat.findUnique({
      where: {
        id: chatId,
      },
    });

    res.json({ chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const createInitialChat = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const systemUser = await getUserByRole(ChatGPTRole.SYSTEM);

    const chat = await prismadb.chat.create({
      data: {
        messages: {
          create: [
            {
              userId: systemUser.id,
              role: ChatGPTRole.SYSTEM,
              content: llmPrompt,
              name: "system",
              data: {
                action: "INITIAL_PROMPT",
                data: {},
              },
            },
          ],
        },
        userId,
      },
    });

    if (!chat) {
      throw new Error("An error occurred creating the chat");
    }

    const chatMessages = await getMessagesByChatId(chat.id);

    return { chat, chatMessages };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred creating the chat");
  }
};

export const findUserChat = async (userId: string) => {
  try {
    const chat = await prismadb.chat.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!chat) {
      throw new Error("An error occurred finding the chat");
    }

    const chatMessages = await getMessagesByChatId(chat.id);

    return { chat, chatMessages };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred getting the chat");
  }
};

export const getMessagesByChatId = async (chatId: string) => {
  try {
    const messages = await prismadb.message.findMany({
      where: {
        chatId: chatId,
      },
    });
    if (!messages) {
      throw new Error("An error occurred getting the messages");
    }

    const formattedMessages: FormattedMessage[] = messages.map(
      ({ role, content, name }) => ({
        role: convertEnums(role),
        content,
        name,
      }),
    );

    return formattedMessages;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred getting the messages");
  }
};

export const deleteChatById = async (chatId: string) => {
  try {
    const chat = await prismadb.chat.delete({
      where: {
        id: chatId,
      },
    });

    return chat;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred deleting the chat");
  }
};

export const chatWithAssistant = async (
  message: string,
  user: User,
  chat: Chat,
  chatMessages: FormattedMessage[],
) => {
  const createdUserMessage = await createNewMessage(message, user, chat.id, {
    action: "USER_MESSAGE",
    data: {},
  });

  const response = await openAIClient.chat.completions.create({
    messages: [...chatMessages, createdUserMessage],
    model: "gpt-3.5-turbo",
    max_tokens: 150,
    temperature: 0.7,
  });

  const content = JSON.parse(
    response.choices[0].message.content ??
      "{ message: 'Error: No message returned' }",
  ) as FormattedMessage;

  return content;
};
