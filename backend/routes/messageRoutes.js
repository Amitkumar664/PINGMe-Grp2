import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// send message (protected)
router.post("/send", protect, sendMessage);

// get messages
router.get("/:senderId/:receiverId", getMessages);

export default router;