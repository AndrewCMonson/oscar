import {
  handleChatMessage,
  handleGetAllChats,
  handleGetChatById,
} from "../controllers/chatController.js";
import express from "express";
import {
  createNewChat,
  deleteChatById,
  getMessagesByChatId,
} from "../controllers/chatController.js";

export const chatRouter = express.Router();

// GET /api/chat
chatRouter.get("/", handleGetAllChats);
// GET /api/chat/:chatId
chatRouter.get("/:chatId", handleGetChatById);
// POST /api/chat
chatRouter.post("/", handleChatMessage);

// GET /api/chat/:chatId/history
chatRouter.get("/:chatId/history", async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await getMessagesByChatId(chatId);

    if (!messages) {
      throw new Error("Failed to fetch chat history");
    }

    res.json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

// DELETE /api/chat/:chatId
chatRouter.delete("/:chatId", async (req, res) => {
  const { chatId } = req.params;
  try {
    await deleteChatById(chatId);
    res.json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete chat" });
  }
});
