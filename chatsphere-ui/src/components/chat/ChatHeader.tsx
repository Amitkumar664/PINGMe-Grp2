import { Phone, Video, MoreVertical } from "lucide-react";
import type { User } from "@/data/mockChatData";

interface ChatHeaderProps {
  user: User;
}

const ChatHeader = ({ user }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/15 border border-border">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          {user.online && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-chat-online border-2 border-card" />
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{user.name}</h3>
          <p className="text-xs text-muted-foreground">
            {user.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
          <Phone size={18} />
        </button>
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
          <Video size={18} />
        </button>
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
