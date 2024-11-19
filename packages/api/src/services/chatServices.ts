import { ChatGPTRole, User } from "@prisma/client";
import { ChatCompletion } from "openai/resources/index.js";
import { FormattedMessage } from "../../types/types.js";
import { openAIClient, prismadb } from "../config/index.js";
import { convertEnums } from "../utils/index.js";
import { getContext } from "./contextServices.js";
import { formatMessageForOpenAI } from "./index.js";

/*
This is the wrapper function for the assistant chat function.
It takes in a message, user, and projectId as input.
It calls the chatWithAssistant function with the input parameters.
It returns the assistant's response to the caller.
*/
export const handleChatMessage = async (
  message: string,
  user: User,
  projectId: string,
) => {
  if (!message || !user || !projectId) {
    throw new Error("Invalid input");
  }

  // const { chatId, chatMessages } = await findUserChat(userId);

  if (!projectId) {
    throw new Error("Project ID is required");
  }

  return await chatWithAssistant(message, user, projectId);
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
) => {
  if (!message || !user) {
    throw new Error("Invalid input");
  }

  try {
    // const createdUserMessage = await sendMessageToDB(message, user, chatId, { data: {} });

    const context = await getContext(user.id);


    const formattedUserMessage = await formatMessageForOpenAI({
      role: ChatGPTRole.USER,
      content: message,
      name: user.firstName ?? user.username,
    });

    const openAIResponse = await openAIClient.chat.completions.create({
      messages: [context, formattedUserMessage],
      model: "gpt-4o-mini",
      max_tokens: 300,
      temperature: 0.6,
      top_p: 0.95,
      presence_penalty: 0.3,
      frequency_penalty: 0.1,
    });

    // console.log("OpenAI response: ", openAIResponse);

    const assistantResponse = await parseAssistantResponse(openAIResponse);

    if(assistantResponse.contextData?.action === "CREATE_PROJECT"){
      const createdProject = await prismadb.project.create({
        data: {
          name: assistantResponse.contextData.name,
          userId: user.id,
        },
      });

      if (!createdProject) {
        throw new Error("An error occurred creating the project");
      }

      console.log("Project created: ", createdProject);
    }

    // const { content, data } = assistantResponse;

    // const assistantUser = await getUserByRole(ChatGPTRole.ASSISTANT);

    // await sendMessageToDB(content, assistantUser, chatId, data);

    return assistantResponse;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred chatting with the assistant");
  }
};

export const parseAssistantResponse = async (
  response: ChatCompletion,
): Promise<FormattedMessage> => {
  if (response === null) {
    throw new Error("Error: No message returned from assistant");
  }

  try {
    const { content } = response.choices[0].message;

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
};

const findConversation = async (userId: string) => {
  const assistant = await prismadb.assistant.findFirst({
    where: {
      role: ChatGPTRole.ASSISTANT,
    },
  });

  if (!assistant) {
    throw new Error("Assistant not found");
  }

  const conversation = await prismadb.conversation.findFirst({
    where: {
      userId: userId,
      assistantId: assistant.id,
    }
  });

  return conversation;
};
