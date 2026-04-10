import { useEffect, useState, useRef } from "react";
import socket from "../services/socket";
import EmojiPicker from "emoji-picker-react";
import api from "../services/api";

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

  // ✅ FIX: Get token and senderId securely from local storage instead of URL
  const token = localStorage.getItem("token");
  const senderId = localStorage.getItem("userId");

  // ✅ Emoji select
  const handleEmoji = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  // ✅ Close emoji on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ✅ Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Socket setup
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

  // ✅ Fetch users
  useEffect(() => {
    if (!token) return;

    api.get("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log("ERROR fetching users:", err.response?.data || err.message));
  }, [token]);

  // ✅ Add user
  // const handleAddUser = async () => {
  //   if (!newUserEmail) return;

  //   try {
  //     const res = await api.post(
  //       "http://localhost:5000/api/users/add",
  //       { email: newUserEmail }
  //     );

  //     setUsers((prev) => [...prev, res.data]);
  //     setNewUserEmail("");
  //     setShowAddUser(false);
  //   } catch (err) {
  //     console.log("ERROR adding user:", err);
  //   }
  // };
  const handleAddUser = async () => {
  if (!newUserEmail) return;

  try {
    const res = await api.post("/api/users/add", {
      email: newUserEmail,
    });

    // ✅ add to list
    setUsers((prev) => {
      const exists = prev.find(u => u._id === res.data._id);
      if (exists) return prev;
      return [...prev, res.data];
    });

    setNewUserEmail("");
    setShowAddUser(false);

  } catch (err) {
    alert(err.response?.data?.message || "User not found ❌");
  }
};

  // ✅ Fetch messages
  useEffect(() => {
    if (!receiverId || !senderId || !token) return;

    api.get(
      `http://localhost:5000/api/messages/${senderId}/${receiverId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => setMessages(res.data))
      .catch((err) => console.log("ERROR fetching messages:", err));
  }, [receiverId, senderId, token]);

  // ✅ Send message
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

  // ✅ Typing
  const handleTyping = (e) => {
    setMessage(e.target.value);

    socket.emit("typing", { senderId, receiverId });

    setTimeout(() => {
      socket.emit("stopTyping", { senderId, receiverId });
    }, 1000);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* USERS PANEL */}
        <div className="col-3 bg-light border-end h-100" style={{ height: "90vh", overflowY: "auto" }}>

          {/* HEADER */}
          <div className="d-flex justify-content-between p-3 position-sticky top-0 bg-light z-1">
            <h4>Chats</h4>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowAddUser(true)}>➕</button>
          </div>

          {/* ADD USER POPUP */}
          {showAddUser && (
            <div className="p-2 border-bottom">
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
          {users
            .filter((user) => user._id !== senderId)
            .map((user) => (
              <div
                key={user._id}
                className={`p-3 border-bottom ${receiverId === user._id ? "bg-success text-white" : ""
                  }`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setReceiverId(user._id);
                  setReceiverName(user.name);
                }}
              >
                <strong>{user.name}</strong>
              </div>
            ))}
        </div>

        {/* CHAT PANEL */}
        <div className="col-9 d-flex flex-column h-100" style={{ height: "90vh" }}>

          {/* HEADER */}
          {/* <div className="bg-dark text-white p-3">
            {receiverName ? receiverName : "Select a user to start chatting"}
            <div style={{ fontSize: "12px", color: "#aaa" }}>
              {receiverId && (typingUser || (onlineUsers.includes(receiverId) ? "Online" : "Offline"))}
            </div>
          </div> */}
          {receiverId && (
            <div className="bg-dark text-white p-3">
              {receiverName}

              <div style={{ fontSize: "12px", color: "#aaa" }}>
                {typingUser ||
                  (onlineUsers.includes(receiverId) ? "Online" : "Offline")}
              </div>
            </div>
          )}
          {/* <div className="bg-dark text-white p-3">
            {receiverName && receiverName}

            <div style={{ fontSize: "12px", color: "#aaa" }}>
              {receiverId &&
                (typingUser ||
                  (onlineUsers.includes(receiverId) ? "Online" : "Offline"))}
            </div>
          </div> */}

          {/* MESSAGES */}
          {/* <div className="flex-grow-1 p-3" style={{ overflowY: "auto", backgroundColor: "#f8f9fa" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`d-flex ${
                  msg.senderId === senderId ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 m-1 rounded px-3 ${
                    msg.senderId === senderId ? "bg-primary text-white" : "bg-white border"
                  }`}
                  style={{ maxWidth: "70%" }}
                >
                  {msg.text && <div>{msg.text}</div>}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div> */}
          <div className="flex-grow-1 p-3 d-flex justify-content-center align-items-center"
            style={{ overflowY: "auto", backgroundColor: "#f8f9fa" }}>

            {!receiverId ? (
              // ✅ EMPTY STATE UI
              <div className="text-center text-muted">
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "20px",
                  background: "#e9ecef",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px"
                }}>
                  💬
                </div>

                <h4>Welcome to PINGMe</h4>
                <p>Select a user to start chatting</p>
              </div>

            ) : (
              // ✅ ACTUAL CHAT
              <div style={{ width: "100%" }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`d-flex ${msg.senderId === senderId ? "justify-content-end" : "justify-content-start"
                      }`}
                  >
                    <div
                      className={`p-2 m-1 rounded px-3 ${msg.senderId === senderId ? "bg-primary text-white" : "bg-white border"
                        }`}
                      style={{ maxWidth: "70%" }}
                    >
                      {msg.text && <div>{msg.text}</div>}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* INPUT */}
          {/* <div className="p-3 border-top d-flex bg-white">
            <textarea
              ref={inputRef}
              className="form-control me-2"
              rows="1"
              value={message}
              onChange={handleTyping}
              placeholder="Type a message..."
              disabled={!receiverId}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              className="btn btn-primary"
              onClick={sendMessage}
              disabled={!receiverId || !message.trim()}
            >
              Send
            </button>
          </div> */}
          {receiverId && (
  <div className="p-3 border-top d-flex bg-white">
    <input
      ref={inputRef}
      type="text"
      className="form-control me-2"
      value={message}
      onChange={handleTyping}
      placeholder="Type a message..."
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          sendMessage();
        }
      }}
    />
    <button
      className="btn btn-primary"
      onClick={sendMessage}
      disabled={!message.trim()}
    >
      Send
    </button>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;