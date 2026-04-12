// import { useEffect, useState, useRef } from "react";
// import socket from "../services/socket";
// import EmojiPicker from "emoji-picker-react";
// import api from "../services/api";
// import { FaSmile } from "react-icons/fa";
// function ChatPage() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [receiverId, setReceiverId] = useState("");
//   const [receiverName, setReceiverName] = useState("");
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [typingUser, setTypingUser] = useState("");
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [showAddUser, setShowAddUser] = useState(false);
//   const [newUserEmail, setNewUserEmail] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const messagesEndRef = useRef(null);
//   const emojiRef = useRef();
//   const inputRef = useRef();
//   // const BASE_URL = "http://localhost:5000";
//   const BASE_URL = "http://localhost:5000";
//   const getMediaUrl = (imagePath) => {
//     if (!imagePath) return null;

//     // Agar already full URL hai
//     if (imagePath.startsWith("http")) {
//       return imagePath;
//     }

//     // Agar relative path hai
//     return `${BASE_URL}${imagePath}`;
//   };
//   //const mediaUrl = msg.image ? `${BASE_URL}${msg.image}` : null;
//   // ✅ FIX: Get token and senderId securely from local storage instead of URL
//   // const token = localStorage.getItem("token");
//   // const senderId = localStorage.getItem("userId");
//   const token = sessionStorage.getItem("token");
//   const senderId = sessionStorage.getItem("userId");
//   // const handleLogout = () => {
//   //   sessionStorage.clear();
//   //   window.location.href = "/login";
//   // };
//   // ✅ Emoji select
//   // const handleEmoji = (emojiData) => {
//   //   setMessage((prev) => prev + emojiData.emoji);
//   //   setTimeout(() => inputRef.current.focus(), 0);
//   // // };
//   // const handleEmoji = (emojiData) => {
//   //   setMessage((prev) => prev + emojiData.emoji);
//   //   setShowEmoji(false);
//   //   inputRef.current?.focus();
//   // };
//   const handleEmoji = (emojiData) => {
//     setMessage((prev) => prev + emojiData.emoji);
//     inputRef.current?.focus(); // Cursor wapas input par le aata hai
//   };

//   // ✅ Close emoji on outside click
//   // useEffect(() => {
//   //   const handleClickOutside = (event) => {
//   //     if (emojiRef.current && !emojiRef.current.contains(event.target)) {
//   //       setShowEmoji(false);
//   //     }
//   //   };

//   //   document.addEventListener("click", handleClickOutside);
//   //   return () => document.removeEventListener("click", handleClickOutside);
//   // }, []);
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (emojiRef.current && !emojiRef.current.contains(event.target)) {
//         setShowEmoji(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);
//   // ✅ Auto scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ✅ Socket setup
//   useEffect(() => {
//     if (!senderId) return;

//     socket.emit("join", senderId);

//     socket.on("receiveMessage", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     socket.on("onlineUsers", (users) => {
//       setOnlineUsers(users);
//     });

//     socket.on("typing", () => setTypingUser("Typing..."));
//     socket.on("stopTyping", () => setTypingUser(""));

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("onlineUsers");
//       socket.off("typing");
//       socket.off("stopTyping");
//     };
//   }, [senderId]);

//   // ✅ Fetch users
//   useEffect(() => {
//     if (!token) return;

//     api.get("http://localhost:5000/api/users", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.log("ERROR fetching users:", err.response?.data || err.message));
//   }, [token]);

//   useEffect(() => {
//     const fetchChatUsers = async () => {
//       try {
//         const res = await api.get("/api/users/my-chats");
//         setUsers(res.data);
//       } catch (err) {
//         console.error("Error fetching chat users:", err);
//       }
//     };

//     fetchChatUsers();
//   }, []);
//   useEffect(() => {
//     if (!token) return;

//     api.get("/api/users/my-chats", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => setUsers(res.data))
//       .catch((err) =>
//         console.log(
//           "ERROR fetching chat users:",
//           err.response?.data || err.message
//         )
//       );
//   }, [token]);
//   // ✅ Add user
//   // const handleAddUser = async () => {
//   //   if (!newUserEmail) return;

//   //   try {
//   //     const res = await api.post(
//   //       "http://localhost:5000/api/users/add",
//   //       { email: newUserEmail }
//   //     );

//   //     setUsers((prev) => [...prev, res.data]);
//   //     setNewUserEmail("");
//   //     setShowAddUser(false);
//   //   } catch (err) {
//   //     console.log("ERROR adding user:", err);
//   //   }
//   // };
//   const handleAddUser = async () => {
//     if (!newUserEmail) return;

//     try {
//       const res = await api.post("/api/users/add", {
//         email: newUserEmail,
//       });

//       // ✅ add to list
//       setUsers((prev) => {
//         const exists = prev.find(u => u._id === res.data._id);
//         if (exists) return prev;
//         return [...prev, res.data];
//       });

//       setNewUserEmail("");
//       setShowAddUser(false);

//     } catch (err) {
//       alert(err.response?.data?.message || "User not found ❌");
//     }
//   };

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await api.post("/api/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       socket.emit("sendMessage", {
//         senderId,
//         receiverId,
//         image: res.data.url,
//       });
//     } catch (err) {
//       console.error("File upload error:", err);
//     }
//   };
//   // ✅ Fetch messages
//   useEffect(() => {
//     if (!receiverId || !senderId || !token) return;

//     api.get(
//       `http://localhost:5000/api/messages/${senderId}/${receiverId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )
//       .then((res) => setMessages(res.data))
//       .catch((err) => console.log("ERROR fetching messages:", err));
//   }, [receiverId, senderId, token]);

//   // ✅ Send message
//   const sendMessage = () => {
//     if (!message.trim() || !receiverId) return;

//     socket.emit("sendMessage", {
//       senderId,
//       receiverId,
//       text: message.trim(),
//     });

//     socket.emit("stopTyping", { senderId, receiverId });

//     setMessage("");
//     setShowEmoji(false);
//   };

//   // ✅ Typing
//   const handleTyping = (e) => {
//     setMessage(e.target.value);

//     socket.emit("typing", { senderId, receiverId });

//     setTimeout(() => {
//       socket.emit("stopTyping", { senderId, receiverId });
//     }, 1000);
//   };

//   return (
//     <div className="container-fluid vh-100">
//       <div className="row h-100">
//         {/* USERS PANEL */}
//         <div className="col-3 bg-light border-end h-100" style={{ height: "90vh", overflowY: "auto" }}>

//           {/* HEADER */}
//           <div className="d-flex justify-content-between p-3 position-sticky top-0 bg-light z-1">
//             <h4>Chats</h4>
//             <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowAddUser(true)}>➕</button>
//           </div>

//           {/* ADD USER POPUP */}
//           {showAddUser && (
//             <div className="p-2 border-bottom">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Enter user email"
//                 value={newUserEmail}
//                 onChange={(e) => setNewUserEmail(e.target.value)}
//               />
//               <button
//                 className="btn btn-primary btn-sm me-2"
//                 onClick={handleAddUser}
//               >
//                 Add
//               </button>
//               <button
//                 className="btn btn-secondary btn-sm"
//                 onClick={() => setShowAddUser(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           )}

//           {/* USERS LIST */}
//           {users
//             .filter((user) => user._id !== senderId)
//             .map((user) => (
//               <div
//                 key={user._id}
//                 className={`p-3 border-bottom ${receiverId === user._id ? "bg-success text-white" : ""
//                   }`}
//                 style={{ cursor: "pointer" }}
//                 onClick={() => {
//                   setReceiverId(user._id);
//                   setReceiverName(user.name);
//                 }}
//               >
//                 <strong>{user.name}</strong>
//               </div>
//             ))}
//         </div>

//         {/* CHAT PANEL */}
//         <div className="col-9 d-flex flex-column h-100" style={{ height: "90vh" }}>

//           {/* HEADER */}
//           {/* <div className="bg-dark text-white p-3">
//             {receiverName ? receiverName : "Select a user to start chatting"}
//             <div style={{ fontSize: "12px", color: "#aaa" }}>
//               {receiverId && (typingUser || (onlineUsers.includes(receiverId) ? "Online" : "Offline"))}
//             </div>
//           </div> */}
//           {receiverId && (
//             <div className="bg-dark text-white p-3">
//               {receiverName}

//               <div style={{ fontSize: "12px", color: "#aaa" }}>
//                 {typingUser ||
//                   (onlineUsers.includes(receiverId) ? "Online" : "Offline")}
//               </div>
//             </div>
//           )}
//           {/* <div className="bg-dark text-white p-3">
//             {receiverName && receiverName}

//             <div style={{ fontSize: "12px", color: "#aaa" }}>
//               {receiverId &&
//                 (typingUser ||
//                   (onlineUsers.includes(receiverId) ? "Online" : "Offline"))}
//             </div>
//           </div> */}

//           {/* MESSAGES */}
//           {/* <div className="flex-grow-1 p-3" style={{ overflowY: "auto", backgroundColor: "#f8f9fa" }}>
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`d-flex ${
//                   msg.senderId === senderId ? "justify-content-end" : "justify-content-start"
//                 }`}
//               >
//                 <div
//                   className={`p-2 m-1 rounded px-3 ${
//                     msg.senderId === senderId ? "bg-primary text-white" : "bg-white border"
//                   }`}
//                   style={{ maxWidth: "70%" }}
//                 >
//                   {msg.text && <div>{msg.text}</div>}
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div> */}
//           <div className="flex-grow-1 p-3 d-flex justify-content-center align-items-center"
//             style={{ overflowY: "auto", backgroundColor: "#f8f9fa" }}>

//             {!receiverId ? (
//               // ✅ EMPTY STATE UI
//               <div className="text-center text-muted">
//                 <div style={{
//                   width: "80px",
//                   height: "80px",
//                   borderRadius: "20px",
//                   background: "#e9ecef",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   margin: "0 auto 15px"
//                 }}>
//                   💬
//                 </div>

//                 <h4>Welcome to PINGMe</h4>
//                 <p>Select a user to start chatting</p>
//               </div>

//             ) : (
//               // ✅ ACTUAL CHAT
//               <div style={{ width: "100%" }}>
//                 {/*{messages.map((msg, i) => (
//                   <div
//                     key={i}
//                     className={`d-flex ${msg.senderId === senderId ? "justify-content-end" : "justify-content-start"
//                       }`}
//                   >
//                     <div
//                       className={`p-2 m-1 rounded px-3 ${msg.senderId === senderId ? "bg-primary text-white" : "bg-white border"
//                         }`}
//                       style={{ maxWidth: "70%" }}
//                     >
//                       {msg.text && <div>{msg.text}</div>}
//                     </div>
//                   </div>
//                 ))}*/}
//                 {messages.map((msg, i) => {
//                   const isVideo =
//                     msg.image && /\.(mp4|webm|ogg)$/i.test(msg.image);

//                   const mediaUrl = msg.image
//                     ? `${BASE_URL}${msg.image}`
//                     : null;

//                   return (
//                     <div
//                       key={i}
//                       className={`d-flex ${msg.senderId === senderId
//                           ? "justify-content-end"
//                           : "justify-content-start"
//                         }`}
//                     >
//                       <div
//                         className={`p-2 m-1 rounded px-3 ${msg.senderId === senderId
//                             ? "bg-primary text-white"
//                             : "bg-white border"
//                           }`}
//                         style={{ maxWidth: "70%" }}
//                       >
//                         {/* Text Message */}
//                         {msg.text && <div>{msg.text}</div>}

//                         {/* Image Message */}
//                         {mediaUrl && !isVideo && (
//                           // <img
//                           //   src={mediaUrl}
//                           //   alt="uploaded"
//                           //   style={{
//                           //     maxWidth: "100%",
//                           //     borderRadius: "10px",
//                           //     marginTop: msg.text ? "8px" : "0",
//                           //   }}
//                           //   onError={(e) => {
//                           //     console.error("Image failed to load:", mediaUrl);
//                           //     e.target.alt = "Image not found";
//                           //   }}
//                           // />
//                           <img
//   src={mediaUrl}
//   alt="uploaded"
//   style={{
//     maxWidth: "100%",
//     borderRadius: "10px",
//     marginTop: msg.text ? "8px" : "0",
//     cursor: "pointer",
//   }}
//   onClick={() => setSelectedImage(mediaUrl)}
//   onError={(e) => {
//     console.error("Image failed to load:", mediaUrl);
//     e.target.alt = "Image not found";
//   }}
// />
//                         )}

//                         {/* Video Message */}
//                         {mediaUrl && isVideo && (
//                           <video
//                             controls
//                             style={{
//                               maxWidth: "100%",
//                               borderRadius: "10px",
//                               marginTop: msg.text ? "8px" : "0",
//                             }}
//                           >
//                             <source src={mediaUrl} type="video/mp4" />
//                             Your browser does not support the video tag.
//                           </video>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//                 <div ref={messagesEndRef} />
//               </div>
//             )}
//           </div>

//           {/* INPUT */}
//           {/* <div className="p-3 border-top d-flex bg-white">
//             <textarea
//               ref={inputRef}
//               className="form-control me-2"
//               rows="1"
//               value={message}
//               onChange={handleTyping}
//               placeholder="Type a message..."
//               disabled={!receiverId}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   sendMessage();
//                 }
//               }}
//             />
//             <button
//               className="btn btn-primary"
//               onClick={sendMessage}
//               disabled={!receiverId || !message.trim()}
//             >
//               Send
//             </button>
//           </div> */}
//           {receiverId && (
//             // <div className="p-3 border-top d-flex bg-white">
//             //   <input
//             //     ref={inputRef}
//             //     type="text"
//             //     className="form-control me-2"
//             //     value={message}
//             //     onChange={handleTyping}
//             //     placeholder="Type a message..."
//             //     onKeyDown={(e) => {
//             //       if (e.key === "Enter") {
//             //         e.preventDefault();
//             //         sendMessage();
//             //       }
//             //     }}
//             //   />
//             //   <button
//             //     className="btn btn-primary"
//             //     onClick={sendMessage}
//             //     disabled={!message.trim()}
//             //   >
//             //     Send
//             //   </button>
//             // </div>
//             <div className="p-3 border-top d-flex bg-white position-relative">
//               {/* Emoji Button */}
//               {/* <button
//     className="btn btn-light me-2"
//     onClick={() => setShowEmoji(!showEmoji)}
//   >
//     😊
//   </button> */}


//               <button
//                 type="button"
//                 className="btn btn-light me-2"
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent outside click handler
//                   setShowEmoji((prev) => !prev);
//                 }}
//               >
//                 <FaSmile size={20} />
//               </button>

//               {/* Emoji Picker */}
//               {/* {showEmoji && (
//     <div 
//       ref={emojiRef}
//       style={{
//         position: "absolute",
//         bottom: "60px",
//         zIndex: 1000,
//       }}
//     >
//       <EmojiPicker onEmojiClick={handleEmoji} />
//     </div>
//   )} */}
//               {showEmoji && (
//                 <div
//                   ref={emojiRef}
//                   style={{
//                     position: "absolute",
//                     bottom: "60px",
//                     right: "20px",
//                     zIndex: 9999,
//                   }}
//                   onClick={(e) => e.stopPropagation()} // Prevent closing on click
//                 >
//                   <EmojiPicker onEmojiClick={handleEmoji} />
//                 </div>
//               )}
//               {/* Message Input */}
              
//               <input
//                 ref={inputRef}
//                 type="text"
//                 className="form-control me-2"
//                 value={message}
//                 onChange={handleTyping}
//                 placeholder="Type a message..."
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     e.preventDefault();
//                     sendMessage();
//                   }
//                 }}
//               />
//               <input
//                 type="file"
//                 accept="image/*,video/*"
//                 onChange={handleFileUpload}
//                 style={{ display: "none" }}
//                 id="fileInput"
//               />

//               <label htmlFor="fileInput" className="btn btn-light me-2">
//                 📎
//               </label>

//               {/* Send Button */}
//               <button
//                 className="btn btn-primary"
//                 onClick={sendMessage}
//                 disabled={!message.trim()}
//               >
//                 Send
//               </button>
//             </div>
//           )}
//         </div>
        
        
//       </div>
      
      
//     </div>
//   );
// }

// export default ChatPage;
import { useEffect, useState, useRef } from "react";
import socket from "../services/socket";
import EmojiPicker from "emoji-picker-react";
import api from "../services/api";
import { FaSmile } from "react-icons/fa";

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
  const [selectedImage, setSelectedImage] = useState(null);

  const messagesEndRef = useRef(null);
  const emojiRef = useRef(null);
  const inputRef = useRef(null);

  const BASE_URL = "http://localhost:5000";

  const token = sessionStorage.getItem("token");
  const senderId = sessionStorage.getItem("userId");

  // ✅ Helper to handle both relative and full URLs
  const getMediaUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    return `${BASE_URL}${imagePath}`;
  };

  // ✅ Emoji selection
  const handleEmoji = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    inputRef.current?.focus();
  };

  // ✅ Close emoji picker on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Auto-scroll to latest message
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

  // ✅ Fetch chat users
  useEffect(() => {
    if (!token) return;

    api
      .get("/api/users/my-chats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) =>
        console.error(
          "ERROR fetching chat users:",
          err.response?.data || err.message
        )
      );
  }, [token]);

  // ✅ Fetch messages
  useEffect(() => {
    if (!receiverId || !senderId || !token) return;

    api
      .get(`/api/messages/${senderId}/${receiverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data))
      .catch((err) =>
        console.error("ERROR fetching messages:", err.message)
      );
  }, [receiverId, senderId, token]);

  // ✅ Add new user
  const handleAddUser = async () => {
    if (!newUserEmail) return;

    try {
      const res = await api.post(
        "/api/users/add",
        { email: newUserEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prev) => {
        const exists = prev.find((u) => u._id === res.data._id);
        return exists ? prev : [...prev, res.data];
      });

      setNewUserEmail("");
      setShowAddUser(false);
    } catch (err) {
      alert(err.response?.data?.message || "User not found ❌");
    }
  };

  // ✅ File upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !receiverId) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      socket.emit("sendMessage", {
        senderId,
        receiverId,
        image: res.data.url,
      });
    } catch (err) {
      console.error("File upload error:", err);
    }
  };

  // ✅ Send text message
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

  // ✅ Typing indicator
  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", { senderId, receiverId });

    setTimeout(() => {
      socket.emit("stopTyping", { senderId, receiverId });
    }, 1000);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100"
      style={{ height: "100vh", overflow: "hidden" }} // ✅ Page scroll disable
      >
        {/* USERS PANEL */}
        <div
          className="col-3 bg-light border-end"
          style={{ height: "100%", overflowY: "auto" }}
          //style={{ overflowY: "auto" }}
        >
          <div className="d-flex justify-content-between p-3 bg-light">
            <h4>Chats</h4>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setShowAddUser(true)}
            >
              ➕
            </button>
          </div>

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

          {users
            .filter((user) => user._id !== senderId)
            .map((user) => (
              <div
                key={user._id}
                className={`p-3 border-bottom ${
                  receiverId === user._id
                    ? "bg-success text-white"
                    : ""
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
        <div className="col-9 d-flex flex-column"
         style={{ height: "100%" }}
        >
          {/* HEADER */}
          {/* {receiverId && (
            <div className="bg-dark text-white p-3">
              {receiverName}
              <div style={{ fontSize: "12px", color: "#aaa" }}>
                {typingUser ||
                  (onlineUsers.includes(receiverId)
                    ? "Online"
                    : "Offline")}
              </div>
            </div>
          )} */}
          {receiverId && (
  <div className="bg-dark text-white p-3 flex-shrink-0">
    {receiverName}
    <div style={{ fontSize: "12px", color: "#aaa" }}>
      {typingUser ||
        (onlineUsers.includes(receiverId) ? "Online" : "Offline")}
    </div>
  </div>
)}

          {/* MESSAGES */}
          {/* <div
            className="flex-grow-1 p-3"
            style={{ overflowY: "auto", background: "#f8f9fa" }}
          >
            {!receiverId ? (
              <div className="text-center text-muted mt-5">
                <h4>Welcome to PINGMe</h4>
                <p>Select a user to start chatting</p>
              </div>
            ) : (
              messages.map((msg, i) => {
                const isVideo =
                  msg.image &&
                  /\.(mp4|webm|ogg)$/i.test(msg.image);
                const mediaUrl = getMediaUrl(msg.image);

                return (
                  <div
                    key={i}
                    className={`d-flex ${
                      msg.senderId === senderId
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`p-2 m-1 rounded px-3 ${
                        msg.senderId === senderId
                          ? "bg-primary text-white"
                          : "bg-white border"
                      }`}
                      style={{ maxWidth: "70%" }}
                    >
                      {msg.text && <div>{msg.text}</div>}

                      {mediaUrl && !isVideo && (
                        <img
                          src={mediaUrl}
                          alt="uploaded"
                          style={{
                            maxWidth: "100%",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            setSelectedImage(mediaUrl)
                          }
                        />
                      )}

                      {mediaUrl && isVideo && (
                        <video
                          controls
                          style={{
                            maxWidth: "100%",
                            borderRadius: "10px",
                          }}
                        >
                          <source src={mediaUrl} />
                        </video>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div> */}
          <div
  className="flex-grow-1 p-3"
  style={{
    overflowY: "auto",
    backgroundColor: "#f8f9fa",
  }}
>
  {messages.map((msg, i) => {
    const isVideo =
      msg.image && /\.(mp4|webm|ogg)$/i.test(msg.image);
    const mediaUrl = getMediaUrl(msg.image);

    return (
      <div
        key={i}
        className={`d-flex ${
          msg.senderId === senderId
            ? "justify-content-end"
            : "justify-content-start"
        }`}
      >
        <div
          className={`p-2 m-1 rounded px-3 ${
            msg.senderId === senderId
              ? "bg-primary text-white"
              : "bg-white border"
          }`}
          style={{ maxWidth: "70%" }}
        >
          {msg.text && <div>{msg.text}</div>}

          {mediaUrl && !isVideo && (
            <img
              src={mediaUrl}
              alt="uploaded"
              style={{
                maxWidth: "100%",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => setSelectedImage(mediaUrl)}
            />
          )}

          {mediaUrl && isVideo && (
            <video
              controls
              style={{
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            >
              <source src={mediaUrl} />
            </video>
          )}
        </div>
      </div>
    );
  })}
  <div ref={messagesEndRef} />
</div>

          {/* INPUT */}
          {receiverId && (
            <div className="p-3 border-top d-flex bg-white position-relative">
              <button
                type="button"
                className="btn btn-light me-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEmoji((prev) => !prev);
                }}
              >
                <FaSmile size={20} />
              </button>

              {showEmoji && (
                <div
                  ref={emojiRef}
                  style={{
                    position: "absolute",
                    bottom: "60px",
                    right: "20px",
                    zIndex: 9999,
                  }}
                >
                  <EmojiPicker onEmojiClick={handleEmoji} />
                </div>
              )}

              <input
                ref={inputRef}
                type="text"
                className="form-control me-2"
                value={message}
                onChange={handleTyping}
                placeholder="Type a message..."
                onKeyDown={(e) =>
                  e.key === "Enter" && sendMessage()
                }
              />

              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="btn btn-light me-2"
              >
                📎
              </label>

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

      {/* ✅ FULL-SCREEN IMAGE MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <img
            src={selectedImage}
            alt="Full Preview"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              cursor: "zoom-out",
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              fontSize: "30px",
              color: "#fff",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatPage;