import { prismadb } from "@api/src/config/index.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { ChatGPTMessage, ConversationWithMessages } from "@api/types/types.js";

export const addMessageToConversation = async (
  conversationId: string,
  userId: string,
  role: string,
  content: string,
  name: string,
): Promise<void> => {
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
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e);
    } else {
      throw new Error("Error creating message");
    }
  }
};

export const createConversation = async (
  userId: string,
  message: ChatGPTMessage,
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
        messages: {
          create: [
            {
              userId: userId,
              role: message.role,
              content: message.content,
              name: message.name,
              contextData: {},
            },
          ],
        },
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
  message: ChatGPTMessage,
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

    const updatedConversation = await prismadb.conversation.update({
      where: {
        id: conversation.id,
      },
      data: {
        messages: {
          create: [
            {
              userId: userId,
              role: message.role,
              content: message.content,
              name: message.name,
              contextData: {},
            },
          ],
        },
      },
      include: {
        messages: true,
      },
    });

    if (!updatedConversation) {
      throw new Error("An error occurred updating the conversation");
    }

    return updatedConversation;
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred finding the conversation");
  }
};
