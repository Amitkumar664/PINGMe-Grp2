import Message from "../models/Message.js";

// send message
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;

    const message = await Message.create({
      senderId: req.user.id,   // from JWT
      receiverId,
      text,
    });

    res.status(201).json(message);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get messages between 2 users


export const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 }); // 🔥 IMPORTANT

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};