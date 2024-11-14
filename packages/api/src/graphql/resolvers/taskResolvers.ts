import { prismadb } from "@api/src/config/db.js";

export const taskResolvers = {
  Query: {
    tasks: async () => {
      const tasks = await prismadb.task.findMany();
      return tasks;
    },
    task: async (_, { id }) => {
      const task = await prismadb.task.findUnique({
        where: {
          id: id,
        },
      });
      return task;
    },
  },
  Mutation: {
    createTask: async (_, { data }) => {
      const task = await prismadb.task.create({
        data: {
          ...data,
        },
      });
      return task;
    },
    updateTask: async (_, { id, data }) => {
      const task = await prismadb.task.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
      });
      return task;
    },
    deleteTask: async (_, { id }) => {
      const task = await prismadb.task.delete({
        where: {
          id: id,
        },
      });
      return task;
    },
  },
};
