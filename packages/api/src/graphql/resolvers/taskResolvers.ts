import { prismadb } from "@api/src/config/index.js";
import { Resolvers } from "@api/types/generated/graphql.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export const taskResolvers: Resolvers = {
  Query: {
    tasks: async () => {
      try {
        const tasks = await prismadb.task.findMany();

        if (!tasks) {
          return [];
        }
        return tasks;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error("Prisma ORM error fetching tasks");
        } else {
          throw new Error("Error fetching tasks");
        }
      }
    },
    task: async (_, { id }) => {
      try {
        const task = await prismadb.task.findUnique({
          where: {
            id: id,
          },
        });

        if (!task) {
          throw new Error("Task not found");
        }
        return task;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error("Prisma ORM error fetching task");
        } else {
          throw new Error("Error fetching tasks");
        }
      }
    },
  },
  Mutation: {
    createTask: async (
      _,
      { title, description, status, priority, dueDate, projectId },
      { user },
    ) => {
      if (!title || !description || !status || !priority || !projectId) {
        throw new Error(
          "Invalid task parameters. Please include a title, description, status, priority and projectId",
        );
      }

      if (!user) {
        throw new Error("User required");
      }

      try {
        const task = await prismadb.task.create({
          data: {
            title,
            description,
            status,
            priority,
            dueDate,
            projectId,
            userId: user.id,
          },
        });

        if (!task) {
          throw new Error("Error creating task");
        }

        return task;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error("Prisma ORM error creating task");
        } else {
          throw new Error("Error creating task");
        }
      }
    },
    updateTask: async (
      _,
      { id, title, description, status, priority, dueDate, projectId },
      { user },
    ) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const task = await prismadb.task.update({
        where: {
          id: id,
        },
        data: {
          userId: user.id,
          title,
          description,
          status,
          priority,
          dueDate,
          projectId,
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
