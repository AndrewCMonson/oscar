import { prismadb } from "../config/index.js";

export const getAllChats = async () => {
  try {
    const chats = await prismadb.chat.findMany();

    return chats;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred getting the chats');
  }
}

export const getChatById = async (chatId: string) => {
  try {
    const chat = await prismadb.chat.findUnique({
      where: {
        id: chatId
      }
    });

    return chat;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred getting the chat');
  }
};