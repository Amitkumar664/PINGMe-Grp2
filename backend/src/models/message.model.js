import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    isViewed: {
      type: Boolean,
      default: false,
    },
    viewedAt: {
      type: Date,
    },
    expiryType: {
      type: String,
      enum: ["view", "24h", "persistent"],
      default: "persistent",
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// TTL index only for non-persistent messages
messageSchema.index(
  { expiresAt: 1 },
  { 
    expireAfterSeconds: 0,
    partialFilterExpression: { expiryType: { $ne: "persistent" } }
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
