import { prismadb } from "@api/src/config/db.js";
import { chatWithAssistant } from "@api/src/services/index.js";
import { ChatGPTMessage, Resolvers } from "@api/types/";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

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
          }
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
    handleConversationMessage: async (_, { message }, { user }) => {
      if(!message) {
        throw new Error("Message is required");
      }

      if(!user) {
        throw new Error("User is required");
      }

      const userMessage: ChatGPTMessage = {
        role: "user",
        content: message,
        name: user.firstName ?? user.username,
      };

      const conversationMessage = await chatWithAssistant(userMessage, user);

      return conversationMessage;
    },
    createconversation: async (_, {  }, { user }) => {
      const conversation = await prismadb.conversation.create({
        data: {

        },
      });
      return conversation;
    },
    updateconversation: async (_, { id, data }, { user }) => {
      const conversation = await prismadb.conversation.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
      });
      return conversation;
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
};
