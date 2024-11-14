import { prismadb } from "@api/src/config/db.js";

export const chatResolvers = {
  Query: {
    chats: async () => {
      const chats = await prismadb.chat.findMany();
      return chats;
    },
    chat: async (_, { id }) =>{
      const chat = await prismadb.chat.findUnique({
        where: {
          id: id,
        },
      });
      return chat;
    },
  },
  Mutation: {
    createChat: async (_, { data }) => {
      const chat = await prismadb.chat.create({
        data: {
          ...data
        },
      });
      return chat;
    },
    updateChat: async (_, { id, data }) => {
      const chat = await prismadb.chat.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
      });
      return chat;
    },
    deleteChat: async (_, { id }) => {
      const chat = await prismadb.chat.delete({
        where: {
          id: id,
        },
      });
      return chat;
    },
  },
};