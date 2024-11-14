import { prismadb } from "@api/src/config/db.js";
import { handleChatMessage } from "@api/src/services/chatServices.js";
import { Resolvers } from "@api/types/";
import { FormattedMessage } from "@api/types/";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export const chatResolvers: Resolvers = {
  Query: {
    chats: async () => {
      try {
        const chats = await prismadb.chat.findMany();

        if (!chats) {
          throw new Error("Chats not found");
        }

        return chats;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          console.error(e.message);
        } else {
          throw new Error("Error fetching chats");
        }
      }
    },
    chat: async (_, { id }) => {
      if (!id) {
        throw new Error("Id is required");
      }

      try {
        const chat = await prismadb.chat.findUnique({
          where: {
            id: id,
          },
        });

        if (!chat) {
          throw new Error("Chat not found");
        }

        return chat;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          console.error(e.message);
        } else {
          throw new Error("Error fetching chats");
        }
      }
    },
  },
  Mutation: {
    handleChatMessage: async (_, { message }, { user }) => {
      if (!message) {
        throw new Error("Message is required");
      }

      if (!user) {
        throw new Error("User is required");
      }

      try {
        const chatMessage = await handleChatMessage(message, user);

        return chatMessage as FormattedMessage;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          console.error(e.message);
        } else {
          throw new Error("Error handling chat message");
        }
      }
    },
    createChat: async (_, { data }, { user }) => {
      const chat = await prismadb.chat.create({
        data: {
          ...data,
        },
      });
      return chat;
    },
    updateChat: async (_, { id, data }, { user }) => {
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
