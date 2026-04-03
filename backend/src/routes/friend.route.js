import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendRequests,
  getFriends,
  getAllUsers,
} from "../controllers/friend.controller.js";

const router = express.Router();

router.post("/send/:receiverId", protectRoute, sendFriendRequest);
router.put("/accept/:requestId", protectRoute, acceptFriendRequest);
router.put("/decline/:requestId", protectRoute, declineFriendRequest);
router.get("/requests", protectRoute, getFriendRequests);
router.get("/", protectRoute, getFriends);
router.get("/discover", protectRoute, getAllUsers);

export default router;