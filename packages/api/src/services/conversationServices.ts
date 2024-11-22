import { prismadb } from "@api/src/config/index.js";
import { ConversationWithMessages } from "@api/types/types.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export const addMessageToConversation = async (
  conversationId: string,
  userId: string,
  role: string,
  content: string,
  name: string,
): Promise<ConversationWithMessages> => {
  if (!conversationId || !userId || !role || !content) {
    throw new Error("Invalid inputs to add message to conversation");
  }

  try {
    const updatedConversation = prismadb.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        messages: {
          create: [
            {
              userId,
              role,
              content,
              name,
            },
          ],
        },
      },
      include: {
        messages: true,
      },
    });

    if (!updatedConversation) {
      throw new Error("Error adding message to conversation");
    }

    return updatedConversation
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e);
      throw new Error("Error with prisma db")
    } else {
      throw new Error("Error creating message");
    }
  }
};

export const createConversation = async (
  userId: string,
): Promise<ConversationWithMessages> => {
  try {
    const assistant = await prismadb.assistant.findFirst({
      where: {
        role: "assistant",
      },
    });

    if (!assistant) {
      throw new Error("Assistant not found");
    }

    const conversation = await prismadb.conversation.create({
      data: {
        userId: userId,
        assistantId: assistant.id,
      },
      include: {
        messages: true,
      },
    });

    if (!conversation) {
      throw new Error("An error occurred creating the conversation");
    }

    return conversation;
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred creating the conversation");
  }
};

export const findConversation = async (
  userId: string,
): Promise<ConversationWithMessages> => {
  try {
    const assistant = await prismadb.assistant.findFirst({
      where: {
        role: "assistant",
      },
    });

    if (!assistant) {
      throw new Error("Assistant not found");
    }

    let conversation = await prismadb.conversation.findFirst({
      where: {
        userId: userId,
        assistantId: assistant.id,
      },
      include: {
        messages: true,
      },
    });

    if (!conversation) {
      conversation = await prismadb.conversation.create({
        data: {
          userId: userId,
          assistantId: assistant.id,
        },
        include: {
          messages: true,
        },
      });
    }

    return conversation;
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred finding the conversation");
  }
};
