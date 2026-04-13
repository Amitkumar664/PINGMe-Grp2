import { useState } from "react";
import { Send, Smile, Paperclip } from "lucide-react";

interface MessageInputProps {
  onSend: (text: string) => void;
}

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 py-3 border-t border-border bg-card">
      <div className="flex items-center gap-2 bg-chat-input-bg rounded-xl px-3 py-2 border border-border focus-within:ring-2 focus-within:ring-ring/30 transition-all">
        <button
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title="Emoji"
        >
          <Smile size={20} />
        </button>
        <button
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title="Attach file"
        >
          <Paperclip size={20} />
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
