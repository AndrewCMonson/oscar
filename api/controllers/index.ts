import express from 'express';
export * from './message/messageControllers.js';
export * from './chat/chatControllers.js';
export * from './user/userControllers.js';

const router = express.Router();
