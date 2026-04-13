import User from "../models/User.js";
import Message from "../models/Message.js";


export const getMyChatUsers = async (req, res) => {
  try {
    const myId = req.user.id; // login user id

    const messages = await Message.find({
      $or: [
        { senderId: myId },
        { receiverId: myId }
      ]
    });

    const usersSet = new Set();

    messages.forEach(msg => {
      if (msg.senderId.toString() !== myId) {
        usersSet.add(msg.senderId.toString());
      }
      if (msg.receiverId.toString() !== myId) {
        usersSet.add(msg.receiverId.toString());
      }
    });

    const users = await User.find({
      _id: { $in: Array.from(usersSet) }
    }).select("-password");

    res.json(users);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};