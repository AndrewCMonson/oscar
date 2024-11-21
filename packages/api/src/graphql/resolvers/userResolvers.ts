import { prismadb } from "@api/src/config/db.js";
import { Resolvers } from "@api/types/";

export const userResolvers: Resolvers = {
  Query: {
    users: async () => {
      const users = await prismadb.user.findMany();
      return users;
    },
    user: async (_, { id }) => {
      const user = await prismadb.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new Error("An error occurred getting the user");
      }

      return user;
    },
  },
  Mutation: {
    createUser: async (_, { email, username, role }) => {
      const user = await prismadb.user.create({
        data: {
          email,
          username,
          role,
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
  },
};
