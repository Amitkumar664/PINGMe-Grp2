// src/services/socket.js
import { io } from "socket.io-client";

let socket = null;

// ✅ Connect socket for a specific user
export const connectSocket = (userId) => {
  if (!socket) {
    socket = io("https://pingme-grp2-1.onrender.com", {
      transports: ["websocket"],
    });
  }

  // Join event with userId
  socket.emit("join", userId);
  return socket;
};

// ✅ Get existing socket instance
export const getSocket = () => socket;

// ✅ Disconnect socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};