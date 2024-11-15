import { ChatGPTRole, User } from "@prisma/client";
import { ChatCompletion } from "openai/resources/index.js";
import { FormattedMessage } from "../../types/types.js";
import { openAIClient, prismadb } from "../config/index.js";
import { convertEnums, initialLLMPrompt } from "../utils/index.js";
import { formatMessageForOpenAI, getUserByRole, sendMessageToDB } from "./index.js";


/*
This function is the wrapper function for the chatWithAssistant function. 
It takes in a message and a user object and returns the response from the assistant. 
It first checks if the user has an existing chat, and if not, creates a new chat with the user. 
It then calls the chatWithAssistant function to get a response from the assistant and returns it to the caller.
*/
export const handleChatMessage = async (message: string, user: User) => {
  if (!message || !user) {
    throw new Error("Invalid input");
  }

  const { id: userId } = user;

  const { chatId, chatMessages } = await findUserChat(userId);

  if (!chatId || !chatMessages) {
    const { chatId, chatMessages } = await createInitialChat(userId);

    return await chatWithAssistant(message, user, chatId, chatMessages);
  }

  return await chatWithAssistant(message, user, chatId, chatMessages);
};

/*
This function is the primary logic for the assistant. 

- It takes in a message, user, chat, and chatMessages as input.
- It creates a new message in the database with the user's message.
- It formats the user's message to be sent to the OpenAI API.
- It calls the OpenAI API to get a response from the assistant, using the existing chatMessages as context and the new formatted user message as input.
- It parses the string response from the assistant into a FormattedMessage object.
- It creates a new message in the database with the assistant's response.
- It returns the assistant's response to the caller.
*/
export const chatWithAssistant = async (
  message: string,
  user: User,
  chatId: string,
  chatMessages: FormattedMessage[],
) => {
  if (!message || !user || !chatId || !chatMessages) {
    throw new Error("Invalid input");
  }

  try {
    const createdUserMessage = await sendMessageToDB(message, user, chatId, { data: {} });

    const formattedMessage = await formatMessageForOpenAI(createdUserMessage);

    const openAIResponse = await openAIClient.chat.completions.create({
      messages: [...chatMessages, formattedMessage],
      model: "gpt-3.5-turbo",
      max_tokens: 150,
      temperature: 0.8,
      top_p: 0.9,
      presence_penalty: 0.6,
      frequency_penalty: 0.2,
    });

    const assistantResponse = await parseAssistantResponse(openAIResponse);

    const { content, data } = assistantResponse;

    const assistantUser = await getUserByRole(ChatGPTRole.ASSISTANT);

    await sendMessageToDB(content, assistantUser, chatId, data);

    return assistantResponse;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred chatting with the assistant");
  }
};

/* 
This function instantiates a new chat for the user.
It uses the "system" user to seed the chat's context via an initial message. 
It then returns the chat object and the associated messages to the caller.
The messages are needed for context when calling the OpenAI API.
*/
export const createInitialChat = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const systemUser = await getUserByRole(ChatGPTRole.SYSTEM);

    const chat = await prismadb.chat.create({
      data: {
        messages: {
          create: [
            {
              userId: systemUser.id,
              role: ChatGPTRole.SYSTEM,
              content: initialLLMPrompt,
              name: "system",
              data: {
                action: "INITIAL_PROMPT",
                data: {},
              },
            },
          ],
        },
        userId,
      },
      include: {
        messages: true,
      }
    });

    if (!chat) {
      throw new Error("An error occurred creating the chat");
    }

    // const chatMessages = await getMessagesByChatId(chat.id);
    // format the chat message for enum conversion
    const formattedMessages: FormattedMessage[] = chat.messages.map(
      ({ role, content, name }) => ({
        role: convertEnums(role),
        content,
        name,
      }),
    );

    return { chatId: chat.id, chatMessages: formattedMessages };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred creating the chat");
  }
};

/*
This function finds the chat associated with a user.
It returns the chat object and the associated messages to the caller.
*/
export const findUserChat = async (userId: string) => {
  try {
    const chat = await prismadb.chat.findFirst({
      where: {
        userId: userId,
      },
      include: {
        messages: true,
      },
    });

    if (!chat) {
      throw new Error("An error occurred finding the chat");
    }

    const formattedMessages: FormattedMessage[] = chat.messages.map(
      ({ role, content, name }) => ({
        role: convertEnums(role),
        content,
        name,
      }),
    );

    // const chatMessages = await getMessagesByChatId(chat.id);

    return { chatId: chat.id, chatMessages: formattedMessages };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred getting the chat");
  }
};



export const getMessagesByChatId = async (chatId: string) => {
  try {
    const messages = await prismadb.message.findMany({
      where: {
        chatId: chatId,
      },
    });
    if (!messages) {
      throw new Error("An error occurred getting the messages");
    }

    const formattedMessages: FormattedMessage[] = messages.map(
      ({ role, content, name }) => ({
        role: convertEnums(role),
        content,
        name,
      }),
    );

    return formattedMessages;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred getting the messages");
  }
};


export const parseAssistantResponse = async (response: ChatCompletion): Promise<FormattedMessage> => {
  if (response === null) {
    throw new Error("Error: No message returned from assistant")
  }

  try {

    const { content } = response.choices[0].message;

    console.log("Assistant response: ", content);

    if (content === null) {
      throw new Error("Error: Message content is null");
    }

    const parsedResponse = JSON.parse(content) as FormattedMessage;

    if (!parsedResponse) {
      throw new Error("Error: Unable to parse response");
    }

    return parsedResponse;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred parsing the response");
  }
}
