import { prismadb } from "@api/src/config/db.js";
import { Resolvers } from "@api/types/index.js";

export const assistantResolvers: Resolvers = {
  Query: {
    getAssistant: async (_, { role }) => {
      if (!role) {
        throw new Error("role is required");
      }

      try {
        const assistant = await prismadb.assistant.findFirst({
          where: {
            role: role,
          },
        });

        if (!assistant) {
          throw new Error("Assistant not found");
        }

        return assistant;
      } catch (e) {
        console.error(e);
        throw new Error("Error fetching assistant");
      }
    },
  },
  Mutation: {
    updateAssistant: async (_, { id, model, context }) => {
      if (!id) {
        throw new Error("Id is required");
      }

      if (!context) {
        throw new Error("Context is required");
      }

      try {
        const assistantContext = await prismadb.assistant.findFirst({
          where: {
            id: id,
          },
          select: {
            globalContext: true,
          },
        });

        const updatedContext = {
          assistantContext,
          ...context,
        };

        const assistant = await prismadb.assistant.update({
          where: {
            id: id,
          },
          data: {
            globalContext: JSON.stringify(updatedContext),
            model: model,
          },
        });

        return assistant;
      } catch (e) {
        console.error(e);
        throw new Error("Error updating assistant context");
      }
    },
  },
};
