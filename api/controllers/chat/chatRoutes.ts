import { User } from "@prisma/client";
import express, { Request } from "express";
import { 
  createChat, createMessage, getAssistantUser, getMessages, getSystemUser, getUserChat
} from "../index.js";
import { client } from "../../../api/index.js";

interface ChatRequest extends Request {
  body: {
    user: User;
    message: string;
  };
}

const router = express.Router();

router.post("/chat", async (req: ChatRequest, res) => {
  const { user, message } = req.body;

  try {
    // Check if the user has an existing chat
    let chat = await getUserChat(user.id);

    // If the user does not have an existing chat, create a new one
    if (!chat) {
      chat = await createChat(user.id);
    }

    // Check for existing messages in the chat
    const existingMessages = await getMessages(chat);

    // If there are no existing messages, create context for the chat assistant using the system user
    if (existingMessages.length === 0) {
      // Get the system user
      const systemUser = await getSystemUser();
      // Create a system message to give the assistant context
      const systemMessage = { role: 'system', content: 'You are a personal project manager. Your task is to handle project management tasks for the user\'s development projects. You will create tasks and calendar events for a Motion calendar and coordinate with JIRA', name: systemUser?.name };
      // Create and insert the first message into the DB
      const insertedMessage = await createMessage(systemMessage.content, systemUser, chat );
      // Create and insert the user's message into the DB
      const newMessage = await createMessage(message, user, chat);
      // Generate a response from the assistant
      const response = await client.chat.completions.create({
        messages: [insertedMessage, newMessage],
        model: 'gpt-3.5-turbo',
        max_tokens: 150,
        temperature: 0.7,
      });
      // Get the assistant user
      const assistantUser = await getAssistantUser();
      // Format the assistant's response
      const assistantMessage = {
        role: 'assistant',
        content: response.choices[0].message.content ?? "No message returned",
        name: assistantUser?.name 
      };

      // Insert the assistant's response into the DB to be used later
      const assistantMessageFormatted = await createMessage(assistantMessage.content, assistantUser, chat);
      // Return the assistant's response to the user
      res.json({ response: assistantMessageFormatted });
      return;
    }
    // If there are existing messages, create a new message for the user based on their input and insert it into the DB
    const newMessage = await createMessage(message, user, chat);
    // Generate a response from the assistant based on the user's input
    const response = await client.chat.completions.create({
      messages: [...existingMessages, newMessage],
      model: 'gpt-3.5-turbo',
      max_tokens: 150,
      temperature: 0.7,
    });
    // Get the assistant user
    const assistantUser = await getAssistantUser();
    // Format the assistant's response and insert it into the DB
    const assistantMessage = {
      role: 'assistant',
      content: response.choices[0].message.content ?? "No message returned",
      name: assistantUser?.name 
    };
    // Insert the assistant's response into the DB to be used later
    const assistantMessageFormatted = await createMessage(assistantMessage.content, assistantUser, chat);

    res.json({ response: assistantMessageFormatted });
    return;
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

export default router;