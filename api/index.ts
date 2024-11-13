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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
