import { prismadb } from "@api/src/config/index.js";
import { Resolvers } from "@api/types/generated/graphql.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export const projectResolvers: Resolvers = {
  Query: {
    projects: async () => {
      const projects = await prismadb.project.findMany();

      if (!projects) {
        return [];
      }

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
    getProjectsByUserId: async (_, { auth0Sub }) => {
      if (!auth0Sub) {
        throw new Error("auth0Sub is required");
      }

      try {
        const user = await prismadb.user.findUnique({
          where: {
            auth0sub: auth0Sub,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const projects = await prismadb.project.findMany({
          where: {
            userId: user?.id,
          },
        });

        if (!projects) {
          throw new Error("Projects not found");
        }

        return projects;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error(e.message);
        } else {
          throw new Error("An error occurred while fetching the projects");
        }
      }
    },
  },
  Mutation: {
    createProject: async (_, { name, description, type, repositoryId }, { user }) => {
      if (!user) {
        throw new Error("User is required to create a new project");
      }

      const assistant = await prismadb.assistant.findFirst({
        where: {
          role: "assistant",
        },
      });

      if (!assistant) {
        throw new Error("Assistant not found");
      }

      const project = await prismadb.project.create({
        data: {
          name,
          description,
          type,
          repositoryId,
          userId: user.id,
          conversation: {
            create: {
              userId: user.id,
              assistantId: assistant.id,
              messages: {
                create: [
                  {
                    userId: user.id,
                    name: "System",
                    content: `This project is called ${name}`,
                    role: "system",
                  },
                ],
              },
            },
          },
        },
      });
      return project;
    },
    updateProject: async (_, { id, name, description }, { user }) => {
      if (!user) {
        throw new Error("User is required to update a project");
      }

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
      if (!id) {
        throw new Error("Project ID is required");
      }

      try {
        await prismadb.project.delete({
          where: {
            id: id,
          },
        });

        return "Project deleted successfully";
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error(e.message);
        } else {
          throw new Error("An error occurred while deleting the project");
        }
      }
    },
  },
  Project: {
    user: async (parent) => {
      try {
        const user = await prismadb.user.findUnique({
          where: {
            id: parent.userId,
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
    conversation: async (parent) => {
      try {
        const conversation = await prismadb.conversation.findUnique({
          where: {
            projectId: parent.id,
          },
        });

        if (!conversation) {
          throw new Error("Conversation not found");
        }

        return conversation;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error(e.message);
        } else {
          throw new Error("An error occurred while fetching the conversation");
        }
      }
    },
  },
};
