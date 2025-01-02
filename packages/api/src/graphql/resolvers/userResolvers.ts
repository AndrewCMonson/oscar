import { prismadb } from "@api/src/config/index.js";
import { Resolvers } from "@api/types/generated/graphql.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export const userResolvers: Resolvers = {
  Query: {
    users: async () => {
      const users = await prismadb.user.findMany();
      return users;
    },
    user: async (_, { auth0Sub }) => {
      const user = await prismadb.user.findUnique({
        where: {
          auth0sub: auth0Sub,
        },
      });

      if (!user) {
        throw new Error("An error occurred getting the user");
      }

      return user;
    },
  },
  Mutation: {
    createUser: async (_, { email, username, role, auth0sub }) => {
      const user = await prismadb.user.create({
        data: {
          email,
          username,
          role,
          auth0sub,
        },
      });
      return user;
    },
    updateUser: async (
      _,
      { id, email, username, firstName, lastName, role },
    ) => {
      const user = await prismadb.user.update({
        where: {
          id: id,
        },
        data: {
          email,
          username,
          firstName,
          lastName,
          role,
        },
      });
      return user;
    },
    updateUserPreferences: async (_, { auth0sub, preferences }) => {
      try {
        const user = await prismadb.user.findUnique({
          where: {
            auth0sub: auth0sub,
          },
        });

        if (!user) {
          throw new Error("No user exists with that auth0sub");
        }

        const userPreferences = await prismadb.userPreferences.update({
          where: {
            userId: user.id,
          },
          data: {
            ...preferences,
          },
        });

        return userPreferences;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error("Prisma error fetching messages");
        } else {
          console.error(e);
          throw new Error("Error updating user preferences");
        }
      }
    },
    deleteUser: async (_, { id }) => {
      const user = await prismadb.user.delete({
        where: {
          id: id,
        },
      });
      return user;
    },
  },
  User: {
    notificationSettings: async (parent) => {
      try {
        const notificationSettings =
          await prismadb.notificationSettings.findUnique({
            where: {
              userId: parent.id,
            },
          });

        if (!notificationSettings) {
          throw new Error(
            "An error occurred getting the notification settings",
          );
        }

        return {
          ...notificationSettings,
          user: parent,
        };
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred getting the notification settings");
      }
    },
    preferences: async (parent) => {
      const preferences = await prismadb.userPreferences.findUnique({
        where: {
          userId: parent.id,
        },
        include: {
          integrations: true,
        },
      });

      if (!preferences) {
        throw new Error("An error occurred getting the user preferences");
      }
      return preferences;
    },
    memory: async (parent) => {
      const memory = await prismadb.userMemory.findUnique({
        where: {
          userId: parent.id,
        },
        include: {
          memories: true,
        },
      });

      if (!memory) {
        throw new Error("An error occurred getting the user memory");
      }
      return memory;
    },
    projects: async (parent) => {
      const projects = await prismadb.project.findMany({
        where: {
          userId: parent.id,
        },
      });

      if (!projects) {
        return [];
      }

      return projects;
    },
  },
};
