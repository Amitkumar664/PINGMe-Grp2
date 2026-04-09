import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import Message from "./models/Message.js"; // 🔥 IMPORTANT
import uploadRoutes from "./routes/uploadRoutes.js";



dotenv.config();

const app = express();
const server = http.createServer(app);

connectDB();
app.use(express.json());

// middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/upload", uploadRoutes);

// socket setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // join


  // 🔥 JOIN
  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });

  // 🔥 TYPING
  socket.on("typing", ({ senderId, receiverId }) => {
    const receiverSocketId = onlineUsers[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing");
    }
  });

  // 🔥 STOP TYPING
  socket.on("stopTyping", ({ senderId, receiverId }) => {
    const receiverSocketId = onlineUsers[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stopTyping");
    }
  });

  // 🔥 DISCONNECT
  socket.on("disconnect", () => {
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    }
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });

  // 🔥 SEND MESSAGE (FINAL FIX)
  // socket.on("sendMessage", async ({ senderId, receiverId, text, image }) => {
  //   try {
  //     const isOnline = onlineUsers[receiverId] ? true : false;
  //     console.log("Incoming:", { senderId, receiverId, text });
  //     const newMessage = await Message.create({
  //       senderId,
  //       receiverId,
  //       text: text || "",
  //       image,
  //       delivered: isOnline, // 🔥 important
  //     });

  //     // receiver ko bhejo (agar online)
  //     if (isOnline) {
  //       io.to(onlineUsers[receiverId]).emit("receiveMessage", newMessage);
  //     }

  //     // sender ko bhejo
  //     io.to(onlineUsers[senderId]).emit("receiveMessage", newMessage);

  //   } catch (err) {
  //     console.log(err);
  //   }
  // });
  socket.on("sendMessage", async ({ senderId, receiverId, text, image }) => {
  try {
    console.log("Incoming:", { senderId, receiverId });

    if (!senderId || !receiverId) {
      console.log("❌ Missing senderId or receiverId");
      return;
    }

    const isOnline = onlineUsers[receiverId] ? true : false;

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text: text || "",
      image,
      delivered: isOnline,
    });

    // receiver
    if (isOnline) {
      io.to(onlineUsers[receiverId]).emit("receiveMessage", newMessage);
    }

    // sender
    if (onlineUsers[senderId]) {
      io.to(onlineUsers[senderId]).emit("receiveMessage", newMessage);
    }

  } catch (err) {
    console.log("❌ ERROR:", err);
  }
});


  // disconnect
  socket.on("disconnect", () => {
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    }
  });
});

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});