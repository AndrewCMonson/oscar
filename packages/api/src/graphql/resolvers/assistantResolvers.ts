import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { Resolvers } from "../../../types/index.js";
import { prismadb } from "../../config/index.js";

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
    updateAssistant: async (_, { id, model }) => {
      if (!id) {
        throw new Error("Id is required");
      }

      try {
        const assistant = await prismadb.assistant.update({
          where: {
            id: id,
          },
          data: {
            model,
          },
        });

        if (!assistant) {
          throw new Error("Error updating assistant");
        }

        return assistant;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error("Error updating assistant context with Prisma ORM");
        } else {
          throw new Error("Error updating assistant context");
        }
      }
    },
  },
};
