import { prismadb } from "@api/src/config/db.js";

export const messageResolvers = {
  Query: {
    messages: async () => {
      const messages = await prismadb.message.findMany();
      return messages;
    },
    message: async (_, { id }) => {
      const message = await prismadb.message.findUnique({
        where: {
          id: id,
        },
      });
      return message;
    },
  },
  Mutation: {
    createMessage: async (_, { data }) => {
      const message = await prismadb.message.create({
        data: {
          ...data,
        },
      });
      return message;
    },
    updateMessage: async (_, { id, data }) => {
      const message = await prismadb.message.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
      });
      return message;
    },
    deleteMessage: async (_, { id }) => {
      const message = await prismadb.message.delete({
        where: {
          id: id,
        },
      });
      return message;
    },
  },
};