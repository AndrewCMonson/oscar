import { ChatGPTRole } from "@prisma/client";
import { prismadb } from "../config/index.js";

export const getUserByRole = async (role: ChatGPTRole) => {
  try {
    const user = await prismadb.user.findFirst({
      where: {
        role,
      },
    });

    if (!user) {
      throw new Error("An error occurred getting the user");
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred getting the user");
  }
};

export const getUserById = async (userId: string) => {
  try {
    const user = await prismadb.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("An error occurred getting the user");
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred getting the user");
  }
};
