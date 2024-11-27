import { Task } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { CreateTaskParameters } from "../../types/index.js";
import { prismadb } from "../config/index.js";

export const createTask = async (
  taskParams: CreateTaskParameters,
): Promise<Task> => {
  if (!taskParams) {
    throw new Error("No task parameters provided");
  }

  const { title, status, priority, dueDate, userId } = taskParams;

  try {
    const createdTask = await prismadb.task.create({
      data: {
        title,
        status,
        priority,
        dueDate,
        userId,
      },
    });

    if (!createdTask) {
      throw new Error("Error creating task");
    }

    return createdTask;
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      throw new Error("Error with prisma database request");
    } else {
      throw new Error("Error creating task");
    }
  }
};
