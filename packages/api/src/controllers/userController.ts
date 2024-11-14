import { UserRole } from "@prisma/client";
import { prismadb } from "../config/index.js";

export const getUserByRole = async (role: UserRole) => {
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

const getUserById = async (userId: string) => {
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
