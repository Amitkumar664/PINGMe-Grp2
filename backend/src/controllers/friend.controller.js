import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";

export const sendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user._id;

    if (senderId === receiverId) {
      return res.status(400).json({ message: "Cannot send request to yourself" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already exists" });
    }

    const newRequest = new FriendRequest({
      sender: senderId,
      receiver: receiverId,
    });

    await newRequest.save();
    res.status(201).json({ message: "Friend request sent" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await FriendRequest.findById(requestId);
    if (!request || request.receiver.toString() !== userId.toString()) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    request.status = "accepted";
    await request.save();

    await User.findByIdAndUpdate(userId, { $addToSet: { friends: request.sender } });
    await User.findByIdAndUpdate(request.sender, { $addToSet: { friends: userId } });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const declineFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await FriendRequest.findById(requestId);
    if (!request || request.receiver.toString() !== userId.toString()) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "declined";
    await request.save();

    res.status(200).json({ message: "Friend request declined" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    const requests = await FriendRequest.find({
      receiver: userId,
      status: "pending",
    }).populate("sender", "fullName profilePic");

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFriends = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("friends", "fullName profilePic email");
    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};