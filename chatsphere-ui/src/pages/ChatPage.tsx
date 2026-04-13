import { useState } from "react";
import { Menu, X } from "lucide-react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import EmptyState from "@/components/chat/EmptyState";
import { chats } from "@/data/mockChatData";

const ChatPage = () => {
  const visibleChats = chats.filter((chat) => chat.user.online);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(visibleChats[0]?.id ?? null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedChat = visibleChats.find((c) => c.id === selectedChatId) ?? null;

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-md text-foreground"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:w-[30%] md:min-w-[300px] md:max-w-[400px]
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <ChatSidebar
          chats={visibleChats}
          selectedChatId={selectedChatId}
          onSelectChat={handleSelectChat}
        />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Chat window */}
      <div className="flex-1 min-w-0">
        {selectedChat ? <ChatWindow chat={selectedChat} /> : <EmptyState />}
      </div>
    </div>
  );
};

export default ChatPage;
