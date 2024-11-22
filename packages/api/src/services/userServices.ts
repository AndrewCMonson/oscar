import { UpdateUserPreferenceParams } from "@api/types/types.js";
import { prismadb } from "../config/index.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { UserPreferences } from "@prisma/client";

export const getUserByRole = async (role: string) => {
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

export const updateUserPreferences = async (
  preferences: UpdateUserPreferenceParams,
): Promise<UserPreferences> => {
  if (!preferences) {
    throw new Error("No preferences provided to update user preferences");
  }

  const { tone, responseStyle, preferredLanguage, timeZone, userId } =
    preferences;

  try {
    const updatedPreferences = await prismadb.userPreferences.update({
      where: {
        userId,
      },
      data: {
        tone: tone,
        responseStyle: responseStyle,
        preferredLanguage: preferredLanguage,
        timeZone: timeZone,
      },
    });

    if (!updatedPreferences) {
      throw new Error("Error updating user preferences");
    }

    return updatedPreferences;
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      throw new Error("Error with primsa database request");
    } else {
      throw new Error("Error updating user preferences");
    }
  }
};
