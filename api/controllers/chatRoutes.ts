import { createChat, getMessages, createMessage } from "./chatController.js";
import express from "express";
import OpenAI from "openai";
const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

router.post("/chat", async (req, res) => {
  const { user, message } = req.body;

  try {
    const chat = await createChat(user);

    const existingMessages = await getMessages(chat) as OpenAI.ChatCompletionMessageParam[];

    const newMessage = await createMessage(message, user, chat) as OpenAI.ChatCompletionMessageParam;

    const response = await client.chat.completions.create({
      messages: [...existingMessages, newMessage],
      model: 'gpt-3.5-turbo',
      max_tokens: 150,
      temperature: 0.7,
    });

    const assistantMessage = {
      role: 'assistant',
      content: response.choices[0].message.content ?? "No message returned",
      name: 'assistant' 
    };

    const assistantMessageFormatted = await createMessage(assistantMessage.content, user, chat);

    res.json({ response: assistantMessageFormatted });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});