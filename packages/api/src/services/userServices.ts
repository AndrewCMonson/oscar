import { UserPreferences } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { UpdateUserPreferenceParameters } from "@api/types";
import { prismadb } from "@api/src/config/index.js";

export const getUserByRole = async (role: string) => {
  if (!role) {
    throw new Error("No role provided");
  }

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
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      throw new Error("Prisma error when retrieving user");
    } else {
      throw new Error("Error retrieving user");
    }
  }
};

export const getUserById = async (userId: string) => {
  if (!userId) {
    throw new Error("No userId provided");
  }
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
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      throw new Error("Prisma error when retrieving user");
    } else {
      throw new Error("Error retrieving user");
    }
  }
};

export const updateUserPreferences = async (
  preferences: UpdateUserPreferenceParameters,
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
        timezone: timeZone,
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
