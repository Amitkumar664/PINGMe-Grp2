import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getMyChatUsers } from "../controllers/userController.js";
import User from "../models/User.js";


const router = express.Router();
router.get("/my-chats", protect, getMyChatUsers);
router.get("/", protect, getMyChatUsers);


router.post("/add", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;