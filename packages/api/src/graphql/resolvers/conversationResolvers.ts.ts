import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { ChatGPTMessage, Resolvers } from "../../../types/index.js";
import { prismadb } from "../../config/index.js";
import { chatWithAssistant } from "../../services/index.js";

export const conversationResolvers: Resolvers = {
  Query: {
    conversations: async () => {
      try {
        const conversations = await prismadb.conversation.findMany();

        if (!conversations) {
          throw new Error("conversations not found");
        }

        //map over conversations and update the projectids if they are null
        return conversations.map((conversation) => {
          return {
            ...conversation,
            projectId: conversation.projectId ?? "",
          };
        });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          console.error(e.message);
        } else {
          throw new Error("Error fetching conversations");
        }
      }
    },
    conversation: async (_, { id }) => {
      if (!id) {
        throw new Error("Id is required");
      }

      try {
        const conversation = await prismadb.conversation.findUnique({
          where: {
            id: id,
          },
        });

        if (!conversation) {
          throw new Error("conversation not found");
        }

        return {
          ...conversation,
          projectId: conversation.projectId ?? "",
        };
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          console.error(e.message);
        } else {
          throw new Error("Error fetching conversations");
        }
      }
    },
  },
  Mutation: {
    handleConversationMessage: async (_, { message, projectId }, { user }) => {
      try {
        if (!message) {
          throw new Error("Message is required");
        }

        if (!user) {
          throw new Error("User is required");
        }

        const userMessage: ChatGPTMessage = {
          role: "user",
          content: message,
          name: user.firstName ?? user.username ?? "",
        };

        const conversationMessage = await chatWithAssistant(
          userMessage,
          user,
          projectId,
        );

        if (!conversationMessage) {
          throw new Error("Error communicating with the assistant");
        }

        return conversationMessage;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error("Prisma error communicating with assistant");
        } else {
          throw new Error("Error handling conversation message");
        }
      }
    },
    createConversation: async (_, __, { user }) => {
      try {
        if (!user) {
          throw new Error("User is required");
        }

        const assistant = await prismadb.assistant.findFirst({
          where: {
            role: "assistant",
          },
        });

        const conversation = await prismadb.conversation.create({
          data: {
            assistantId: assistant?.id ?? "",
            userId: user.id,
          },
        });

        if (!conversation) {
          throw new Error("Conversation not created");
        }

        return {
          ...conversation,
          projectId: conversation.projectId ?? "",
        };
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          console.error(e.message);
        } else {
          throw new Error("Error creating conversation");
        }
      }
    },
    updateConversation: async (_, { id, projectId }, { user }) => {
      try {
        const conversation = await prismadb.conversation.update({
          where: {
            id: id,
            userId: user?.id,
          },
          data: {
            projectId,
          },
        });

        return {
          ...conversation,
          projectId: conversation.projectId ?? "",
        };
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          console.error(e);
        } else {
          throw new Error("Error updating conversation");
        }
      }
    },
    deleteConversation: async (_, { id }) => {
      try {
        await prismadb.conversation.delete({
          where: {
            id: id,
          },
        });
        return "Conversation Deleted";
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          console.error(e.message);
        } else {
          throw new Error("Error deleting conversation");
        }
      }
    },
  },
  Conversation: {
    messages: async (parent) => {
      try {
        const messages = await prismadb.message.findMany({
          where: {
            conversationId: parent.id,
          },
        });

        if (!messages) {
          return [];
        }

        return messages;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          console.error(e.message);
        } else {
          throw new Error("Error fetching messages");
        }
      }
    },
  },
};
