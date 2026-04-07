import axios from "axios";
import { useEffect, useState, useRef } from "react";
import socket from "../services/socket";
import EmojiPicker from "emoji-picker-react";

function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");

  const messagesEndRef = useRef(null);
  const emojiRef = useRef();
  const inputRef = useRef();

  const params = new URLSearchParams(window.location.search);
  const senderId = params.get("userId");

  // ✅ Emoji select
  const handleEmoji = (emojiData) => {
    setMessage(prev => prev + emojiData.emoji);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  // ✅ close emoji on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ✅ auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ socket setup
  useEffect(() => {
    if (!senderId) return;

    socket.emit("join", senderId);

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socket.on("typing", () => setTypingUser("Typing..."));
    socket.on("stopTyping", () => setTypingUser(""));

    return () => {
      socket.off("receiveMessage");
      socket.off("onlineUsers");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [senderId]);

  // ✅ fetch users
  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  // ✅ add user
  const handleAddUser = async () => {
    if (!newUserEmail) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/add",
        { email: newUserEmail }
      );

      setUsers((prev) => [...prev, res.data]);
      setNewUserEmail("");
      setShowAddUser(false);

    } catch (err) {
      console.log(err);
    }
  };

  // ✅ fetch messages
  useEffect(() => {
    if (!receiverId || !senderId) return;

    axios.get(`http://localhost:5000/api/messages/${senderId}/${receiverId}`)
      .then(res => setMessages(res.data))
      .catch(err => console.log(err));
  }, [receiverId, senderId]);

  // ✅ send message
  const sendMessage = () => {
    if (!message.trim() || !receiverId) return;

    socket.emit("sendMessage", {
      senderId,
      receiverId,
      text: message.trim(),
    });

    socket.emit("stopTyping", { senderId, receiverId });

    setMessage("");
    setShowEmoji(false);
  };

  // ✅ typing
  const handleTyping = (e) => {
    setMessage(e.target.value);

    socket.emit("typing", { senderId, receiverId });

    setTimeout(() => {
      socket.emit("stopTyping", { senderId, receiverId });
    }, 1000);
  };

  return (
    <div className="container-fluid">
      <div className="row">

        {/* USERS PANEL */}
        <div className="col-3 bg-light border-end" style={{ height: "90vh" }}>

          {/* HEADER */}
          <div className="d-flex justify-content-between p-3">
            <h4>Users</h4>
            <button onClick={() => setShowAddUser(true)}>➕</button>
          </div>

          {/* ✅ SINGLE POPUP (FIXED) */}
          {showAddUser && (
            <div className="p-2">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter user email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />

              <button
                className="btn btn-primary btn-sm me-2"
                onClick={handleAddUser}
              >
                Add
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowAddUser(false)}
              >
                Cancel
              </button>
            </div>
          )}

          {/* USERS LIST */}
          {users.map(user => (
            user._id !== senderId && (
              <div
                key={user._id}
                className={`p-3 border-bottom ${receiverId === user._id ? "bg-success text-white" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setReceiverId(user._id);
                  setReceiverName(user.name);
                }}
              >
                <strong>{user.name}</strong>
              </div>
            )
          ))}
        </div>

        {/* CHAT PANEL */}
        <div className="col-9 d-flex flex-column" style={{ height: "90vh" }}>

          {/* HEADER */}
          <div className="bg-dark text-white p-3">
            {receiverName}
            <div style={{ fontSize: "12px" }}>
              {typingUser || (onlineUsers.includes(receiverId) ? "Online" : "Offline")}
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-grow-1 p-3" style={{ overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`d-flex ${msg.senderId === senderId ? "justify-content-end" : "justify-content-start"}`}
              >
                <div
                  className={`p-2 m-1 rounded px-3 ${msg.senderId === senderId ? "bg-primary text-white" : "bg-light"}`}
                >
                  {msg.text && <div>{msg.text}</div>}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="p-3 border-top d-flex">
            <textarea
              ref={inputRef}
              className="form-control me-2"
              rows="1"
              value={message}
              onChange={handleTyping}
              placeholder="Type message..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button className="btn btn-primary" onClick={sendMessage}>
              Send
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChatPage;