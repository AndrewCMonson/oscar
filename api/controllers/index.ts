import express from 'express';
import { chatRouter } from '../routes/chatRoutes.js';
export * from './chatController.js';
export * from './messageController.js';
export * from './userController.js';

export const router = express.Router();

router.use('/chat', chatRouter);
