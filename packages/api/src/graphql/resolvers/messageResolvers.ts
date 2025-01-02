import { prismadb } from "@api/src/config/index.js";
import { Resolvers } from "@api/types/generated/graphql.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export const messageResolvers: Resolvers = {
  Query: {
    messages: async () => {
      try {
        const messages = await prismadb.message.findMany();

        if (!messages) {
          return [];
        }
        return messages;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error("Prisma error fetching messages");
        } else {
          throw new Error("Error fetching messages");
        }
      }
    },
    message: async (_, { id }) => {
      try {
        const message = await prismadb.message.findUnique({
          where: {
            id: id,
          },
        });

        if (!message) {
          throw new Error("No message found");
        }

        return message;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error("Prisma error retrieving message");
        } else {
          throw new Error("Error retrieving message");
        }
      }
    },
  },
  Mutation: {
    createMessage: async (
      _,
      { conversationId, content, role, name },
      { user },
    ) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      try {
        const message = await prismadb.message.create({
          data: {
            conversationId,
            content,
            userId: user.id,
            role,
            name,
          },
        });
        return message;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error("Prisma error when creating new message");
        } else {
          throw new Error("Error creating new message");
        }
      }
    },
    updateMessage: async (_, { id, content }) => {
      try {
        const message = await prismadb.message.update({
          where: {
            id: id,
          },
          data: {
            content,
          },
        });

        if (!message) {
          throw new Error("Message update unsuccessful");
        }

        return message;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error("Prisma error when updating message");
        } else {
          throw new Error("Error updating message");
        }
      }
    },
    deleteMessage: async (_, { id }) => {
      try {
        await prismadb.message.delete({
          where: {
            id: id,
          },
        });

        return "Message deleted successfully";
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error("Prisma error deleting message");
        } else {
          throw new Error("Error deleting message");
        }
      }
    },
  },
};
