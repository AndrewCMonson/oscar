import dotenv from 'dotenv';
import express from 'express';
import OpenAI from 'openai';
import { connectDB } from './config';
import router from './controllers/chat/chatRoutes.js';
dotenv.config();

const PORT = process.env.PORT || 3007;
const app = express();

connectDB();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
})

app.use(express.json());

app.use('/api', router);
// let sentMessages: OpenAI.ChatCompletionMessageParam[] = [
//   { role: 'system', content: 'You are a LinkedIn Assistant. Your task is to help users create compelling and engaging LinkedIn posts.' },
// ]

// app.post('/chat', async (req, res) => {
//   const { message } = req.body;

//   try {
//     sentMessages.push({ role: 'user', content: message });

//     const response = await client.chat.completions.create({
//       messages: [...sentMessages, { role: 'user', content: message }],
//       model: 'gpt-3.5-turbo',
//       max_tokens: 150,
//       temperature: 0.7,
//     });

//     sentMessages.push({ role: 'assistant', content: response.choices[0].message.content });

//     res.json({ response: response.choices[0].message.content });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
