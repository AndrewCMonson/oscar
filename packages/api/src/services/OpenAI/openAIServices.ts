import { openAIClient, prismadb } from "@api/src/config/index.js";
import {
  addMessageToConversation,
  assistantFailureResponse,
  findConversation,
  formatMessageForOpenAI,
  getContext,
  handleResponseToolCalls,
  openAIApiOptions,
  openAIApiOptionsProjectCreation,
} from "@api/src/services/index.js";
import {
  ChatGPTMessage,
  ConversationWithMessages,
  OpenAIStructuredOutput,
} from "@api/types/types.js";
import { User } from "@prisma/client";
import { z, ZodError } from "zod";

/**
 * Communicates with the assistant using the provided message and user information.
 *
 * @param {ChatGPTMessage} message - The message to be sent to the assistant.
 * @param {User} user - The user sending the message.
 * @param {string} projectId - The project ID for the conversation.
 * @returns {Promise<OpenAIStructuredOutput>} - The structured output from the OpenAI API.
 * @throws {Error} - Throws an error if the input is invalid or if an error occurs during the process.
 *
 * The function performs the following steps:
 * 1. Validates the input message and user.
 * 2. Retrieves the context for the user.
 * 3. Checks for existing conversation history or creates a new conversation.
 * 4. Adds the new message to the conversation.
 * 5. Formats the conversation messages for the OpenAI API.
 * 6. Sends the formatted messages and context to the OpenAI API.
 * 7. Handles the response based on the finish reason:
 *    - If the finish reason is "tool_calls", it processes tool calls.
 *    - If the finish reason is "stop", it adds the assistant's response to the conversation history and returns it.
 *    - Otherwise, it returns a failure response.
 */
export const chatWithAssistant = async (
  message: ChatGPTMessage,
  user: User,
  projectId?: string,
): Promise<OpenAIStructuredOutput> => {
  if (!message || !user) {
    throw new Error("Invalid input");
  }

  try {
    // get context from the assistant and the user

    const context = projectId
      ? await getContext(user.id, projectId)
      : await getContext(user.id);
    // check if the user has conversation history with the assistant for this project. If they don't, it means there is no project yet, and it will create a new project and corresponding conversation.
    const conversationHistory = projectId
      ? await findConversation(user.id, projectId)
      : await assistantGenerateProject(user, message);

    // The new message is added to the conversation
    const updatedConversation = await addMessageToConversation(
      conversationHistory.id,
      user.id,
      message.role,
      message.content,
      message.name,
    );
    // get the messages from the conversation to add to assistant API call
    const { messages: conversationMessages } = updatedConversation;
    // format the messages to be sent to the OpenAI API
    const formattedMessages = await Promise.all(
      conversationMessages.map((message) => {
        return formatMessageForOpenAI({
          role: message.role,
          content: message.content,
          name: message.name,
        });
      }),
    );
    // send formatted messages and context to the API. This should return as an object that will be contain a JSON response for parsing.
    const openAIResponse = await openAIClient.beta.chat.completions.parse({
      messages: [context, ...formattedMessages],
      ...openAIApiOptions,
    });
    // finish reason will be one of the following: "length" | "stop" | "tool_calls" | "content_filter" | "function_call"
    const finishReason = openAIResponse.choices[0].finish_reason;
    // if the API finished it's call due to needing to call a tool (function), we pass the response to "handleResonseToolCalls" for the tool calls to be resolved.
    if (finishReason === "tool_calls") {
      const handledToolCallsResponse = handleResponseToolCalls(
        openAIResponse,
        conversationHistory,
        user,
        context,
        formattedMessages,
      );
      return {
        ...handledToolCallsResponse,
        projectId: conversationHistory.projectId ?? "",
      };
    }
    // if the finish reason is "stop", we add the response to the conversation history and return it to the user.
    if (finishReason === "stop") {
      const assistantResponse =
        openAIResponse.choices[0].message.parsed ?? assistantFailureResponse;

      await addMessageToConversation(
        conversationHistory.id,
        user.id,
        assistantResponse?.role,
        assistantResponse.content,
        assistantResponse?.name,
      );

      return {
        ...assistantResponse,
        projectId: conversationHistory.projectId ?? "",
      };
    }
    return {
      ...assistantFailureResponse,
      projectId: conversationHistory.projectId ?? "",
    };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred chatting with the assistant");
  }
};

/**
 * Generates a new project and conversation based on the user's first message to the assistant.
 *
 * This function is used to generate project details when a user interacts with the assistant without a specified project selected.
 * It takes in the user's message, generates a new project, and creates a project title and description based on the user's message.
 * The generated project and conversation are then saved to the database.
 *
 * @param user - The user object containing user details.
 * @param message - The message object containing the user's message.
 * @returns A promise that resolves to a conversation with messages.
 * @throws Will throw an error if the input is invalid, if the assistant is not found, if the conversation generation fails, or if there is an error during project generation.
 */
export const assistantGenerateProject = async (
  user: User,
  message: ChatGPTMessage,
): Promise<ConversationWithMessages> => {
  if (!user || !message) {
    throw new Error("Invalid input");
  }

  // this function is used to generate project details when a user interacts with the assistant without a specified project selected. The purpose is to take in the user's message, generate a new project AND generate a project title and description based on the user's message. This will then be used to create a new project and conversation.
  const systemContext = formatMessageForOpenAI({
    role: "system",
    content:
      "You are an assistant tasked with generating a project title and a brief description based on a provided message. carefully analyze the incoming message to do this. Do not perform any other actions or provide any additional output. Focus only on creating A clear and concise project title, A detailed, one-sentence project description. Provide only the project title and description as your response. Your name is 'assistant'. Your response should be always be formatted JSON and include the following keys: projectTitle, projectDescription.",
    name: "system",
  });

  const userMessage = formatMessageForOpenAI(message);

  try {
    const openAIResponse = await openAIClient.beta.chat.completions.parse({
      messages: [systemContext, userMessage],
      ...openAIApiOptionsProjectCreation,
    });

    const assistantResponse =
      openAIResponse.choices[0].message.parsed ?? assistantFailureResponse;

    // define the response schema for the assistant's response
    const projectCreationResponse = z.object({
      projectTitle: z.string(),
      projectDescription: z.string(),
    });

    // parse and validate the assistant response based on above schema
    const assistantResponseContent = projectCreationResponse.parse(
      JSON.parse(assistantResponse.content),
    );
    const projectTitle = assistantResponseContent.projectTitle;
    const projectDescription = assistantResponseContent.projectDescription;

    const generatedProject = await prismadb.project.create({
      data: {
        name: projectTitle,
        description: projectDescription,
        userId: user.id,
      },
      include: {
        conversation: {
          include: {
            messages: true,
          },
        },
      },
    });

    const assistant = await prismadb.assistant.findFirst({
      where: {
        role: "assistant",
      },
    });

    if (!assistant) {
      throw new Error("Assistant not found");
    }

    const generatedProjectConversation = await prismadb.conversation.create({
      data: {
        assistantId: assistant.id,
        userId: user.id,
        projectId: generatedProject.id,
        messages: {
          create: [
            {
              userId: user.id,
              role: "system",
              content: "This is a new conversation",
              name: "system",
            },
            {
              userId: user.id,
              role: "system",
              content: assistantResponse.content,
              name: "system",
            },
          ],
        },
      },
      include: {
        messages: true,
      },
    });

    if (!generatedProjectConversation) {
      throw new Error("Failed to generate conversation");
    }
    return generatedProjectConversation;
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      console.error(error.errors, "Assistant Response is not valid JSON");
      // if the assistant response is not valid JSON, we will attempt to run the function again
      await assistantGenerateProject(user, message);
    }
    throw new Error("An error occurred generating the project");
  }
};
