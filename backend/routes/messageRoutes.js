import express from "express";
import { sendMessage } from "../controllers/messageController.js";
import protect from "../middleware/authMiddleware.js";
import { getMessages } from "../controllers/messageController.js";

const router = express.Router();

// send message (protected)
router.post("/send", protect, sendMessage);
router.get("/:senderId/:receiverId", getMessages);


export default router;