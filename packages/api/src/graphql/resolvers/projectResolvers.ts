import { prismadb } from "../../config/index.js";
import { Resolvers } from "../../../types/index.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export const projectResolvers: Resolvers = {
  Query: {
    projects: async () => {
      const projects = await prismadb.project.findMany();
      return projects;
    },
    project: async (_, { id }) => {
      if (!id) {
        throw new Error("Project ID is required");
      }

      try {
        const project = await prismadb.project.findUnique({
          where: {
            id: id,
          },
        });

        if (!project) {
          throw new Error("Project not found");
        }

        return project;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error(e.message);
        } else {
          throw new Error("An error occurred while fetching the project");
        }
      }
    },
  },
  Mutation: {
    createProject: async (_, { name, description, type }, { user }) => {
      const project = await prismadb.project.create({
        data: {
          name,
          description,
          type,
          userId: user.id,
        },
      });
      return project;
    },
    updateProject: async (_, { id, name, description }, { user }) => {
      const project = await prismadb.project.update({
        where: {
          id: id,
        },
        data: {
          name,
          description,
          userId: user.id,
        },
      });
      return project;
    },
    deleteProject: async (_, { id }) => {
      const project = await prismadb.project.delete({
        where: {
          id: id,
        },
      });
      return project;
    },
  },
  Project: {
    user: async (project) => {
      try {
        const user = await prismadb.user.findUnique({
          where: {
            id: project.userId,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error(e.message);
        } else {
          throw new Error("An error occurred while fetching the user");
        }
      }
    },
  },
};
