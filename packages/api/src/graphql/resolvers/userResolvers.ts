import { prismadb } from "@api/src/config/db.js";

export const userResolvers = {
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
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { data }) => {
      const user = await prismadb.user.create({
        data: {
          ...data,
        },
      });
      return user;
    },
    updateUser: async (_, { id, data }) => {
      const user = await prismadb.user.update({
        where: {
          id: id,
        },
        data: {
          ...data,
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
      return user
    },
  },
};