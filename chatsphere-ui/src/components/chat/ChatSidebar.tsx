import { useState } from "react";
import { Search } from "lucide-react";
import type { Chat } from "@/data/mockChatData";

interface ChatSidebarProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

const ChatSidebar = ({ chats, selectedChatId, onSelectChat }: ChatSidebarProps) => {
  const [search, setSearch] = useState("");

  const filtered = chats.filter((c) =>
    c.user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-chat-sidebar border-r border-border">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h1 className="text-xl font-bold text-foreground tracking-tight">
          PING<span className="text-primary">Me</span>
        </h1>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 bg-accent rounded-lg px-3 py-2">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chats..."
            className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filtered.map((chat) => {
          const lastMsg = chat.messages[chat.messages.length - 1];
          const isSelected = selectedChatId === chat.id;

          return (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left ${
                isSelected
                  ? "bg-chat-selected"
                  : "hover:bg-chat-hover"
              }`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-primary/15 border border-border">
                  <img
                    src={chat.user.avatar}
                    alt={chat.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {chat.user.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-chat-online border-2 border-chat-sidebar" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground truncate">
                    {chat.user.name}
                  </span>
                  <span className="text-[11px] text-muted-foreground shrink-0 ml-2">
                    {lastMsg?.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-xs text-muted-foreground truncate pr-2">
                    {lastMsg?.text}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className="shrink-0 min-w-[20px] h-5 rounded-full bg-chat-unread text-primary-foreground text-[11px] font-medium flex items-center justify-center px-1.5">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;
