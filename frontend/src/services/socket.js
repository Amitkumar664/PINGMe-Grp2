import { io } from "socket.io-client";

const socket = io("https://pingme-grp2-1.onrender.com");

export default socket;