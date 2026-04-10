import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getMyChatUsers } from "../controllers/userController.js";
import User from "../models/User.js";


const router = express.Router();
router.get("/my-chats", protect, getMyChatUsers);
//router.get("/", protect, getMyChatUsers);
router.get("/", protect, async (req, res) => {
  const users = await User.find({
    _id: { $ne: req.user.id }
  });

  res.json(users);
});
router.post("/add", protect, async (req, res) => {
  try {
    const { email } = req.body;

    const userToAdd = await User.findOne({ email });

    if (!userToAdd) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userToAdd._id.toString() === req.user.id) {
      return res.status(400).json({ message: "You cannot add yourself" });
    }

    // 👉 OPTIONAL: If you store chat list in DB
    // check if already exists in user's chats

    return res.json(userToAdd);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;