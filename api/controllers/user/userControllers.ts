import { prismadb } from "../../config/db.js";

export const getAssistantUser = async () => {
  try {
    const assistantUser = await prismadb.user.findFirst({
      where: {
        name: 'Assistant'
      }
    });

    if (!assistantUser) {
      throw new Error('An error occurred getting the assistant user');
    }

    return assistantUser;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred getting the assistant user');
  }
};

export const getSystemUser = async () => {
  try {
    const systemUser = await prismadb.user.findFirst({
      where: {
        name: 'System'
      }
    });

    if (!systemUser) {
      throw new Error('An error occurred getting the system user');
    }

    return systemUser;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred getting the system user');
  }
};