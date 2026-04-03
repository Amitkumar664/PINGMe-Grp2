import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const user = await User.findById(loggedInUserId).populate("friends", "-password");
    const friends = user.friends;

    res.status(200).json(friends);
  } catch (error) {

    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const user = await User.findById(myId);
    if (!user.friends.map((id) => id.toString()).includes(userToChatId)) {
      return res.status(403).json({ error: "You can only chat with accepted friends" });
    }

    const now = new Date();
    let query = {
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    };

    // Get all messages, handling expiry separately
    const conversationMessages = await Message.find(query);

    // Filter out expired messages
    const validMessages = conversationMessages.filter((msg) => {
      if (msg.expiryType === "persistent") return true;
      if (msg.expiryType === "24h" && msg.expiresAt && msg.expiresAt > now) return true;
      if (msg.expiryType === "view" && !msg.isViewed) return true;
      return false;
    });

    // Mark receiver messages as viewed and delete view-type messages
    const receiverMessages = validMessages.filter(
      (m) => m.receiverId.toString() === myId.toString() && !m.isViewed
    );

    if (receiverMessages.length > 0) {
      const viewMessageIds = receiverMessages
        .filter((m) => m.expiryType === "view")
        .map((m) => m._id);

      const otherMessageIds = receiverMessages
        .filter((m) => m.expiryType !== "view")
        .map((m) => m._id);

      // Delete view-type messages immediately
      if (viewMessageIds.length > 0) {
        await Message.deleteMany({ _id: { $in: viewMessageIds } });
      }

      // Mark non-view messages as viewed
      if (otherMessageIds.length > 0) {
        await Message.updateMany(
          { _id: { $in: otherMessageIds } },
          { $set: { isViewed: true, viewedAt: new Date() } }
        );
      }
    }

    // Return final filtered list after deletion
    const finalMessages = await Message.find(query);
    const finalValidMessages = finalMessages.filter((msg) => {
      if (msg.expiryType === "persistent") return true;
      if (msg.expiryType === "24h" && msg.expiresAt && msg.expiresAt > now) return true;
      if (msg.expiryType === "view" && !msg.isViewed) return true;
      return false;
    });

    return res.status(200).json(finalValidMessages);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image, expiryType = "persistent" } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Validate at least text or image is provided
    if (!text?.trim() && !image) {
      return res.status(400).json({ error: "Message must contain text or image" });
    }

    const user = await User.findById(senderId);
    if (!user.friends.map((id) => id.toString()).includes(receiverId)) {
      return res.status(403).json({ error: "You can only chat with accepted friends" });
    }

    let imageUrl = null;
    if (image) {
      try {
        // Only upload if Cloudinary is configured
        if (cloudinary.config().api_key) {
          const uploadResponse = await cloudinary.uploader.upload(image);
          imageUrl = uploadResponse.secure_url;
        } else {
          // Store base64 as fallback (not recommended for production)
          imageUrl = image.substring(0, 100) + "..."; // placeholder
        }
      } catch (uploadError) {
        // Don't fail the message, just skip image
        imageUrl = null;
      }
    }

    const messageData = {
      senderId,
      receiverId,
      text: text?.trim() || "",
      image: imageUrl || "",
      expiryType,
    };

    // Set expiresAt based on expiryType
    if (expiryType === "24h") {
      messageData.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    } else if (expiryType === "view") {
      messageData.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // fallback 7d if not viewed
    }
    // for "persistent", expiresAt stays null

    const newMessage = new Message(messageData);
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
