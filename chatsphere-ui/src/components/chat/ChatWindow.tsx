import { useEffect, useRef, useState } from "react";
import type { Chat, Message } from "@/data/mockChatData";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";

interface ChatWindowProps {
  chat: Chat;
}

const ChatWindow = ({ chat }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: "me",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);

    // Simulate typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: `msg-${Date.now() + 1}`,
        senderId: chat.user.id,
        text: "Thanks for the message! 😊",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader user={chat.user} />
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 space-y-1 bg-background"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} isSent={msg.senderId === "me"} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
