import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createChatController,
  deleteChatByIdController,
  getChatByIdController,
  getRecentChatController,
} from "../controllers/chat.controller.js";

const router = Router();

// Apply authentication middleware to all routes in this router
router.use(authMiddleware);

router.post("/createChat", createChatController);
router.get("/getRecentChat", getRecentChatController);
router.get("/:chatId", getChatByIdController);
router.delete("/:chatId", deleteChatByIdController);

export default router;
