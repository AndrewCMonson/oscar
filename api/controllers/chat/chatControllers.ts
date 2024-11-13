import { prismadb } from "../../config";

export const createChat = async (userId: string) => {

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

export const getUserChat = async (userId: string) => {
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



