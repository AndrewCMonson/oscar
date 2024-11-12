import express from 'express';
import { chatController } from './chat';

const router = express.Router();

router.use('/chat', chatController);