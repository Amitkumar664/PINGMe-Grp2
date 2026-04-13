import type { Message } from "@/data/mockChatData";

interface MessageBubbleProps {
  message: Message;
  isSent: boolean;
}

const MessageBubble = ({ message, isSent }: MessageBubbleProps) => {
  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[70%] px-4 py-2.5 rounded-2xl transition-shadow ${
          isSent
            ? "bg-chat-bubble-sent text-chat-bubble-sent-foreground rounded-br-md shadow-md"
            : "bg-chat-bubble-received text-chat-bubble-received-foreground rounded-bl-md shadow-sm"
        }`}
      >
        <p className="text-sm leading-relaxed break-words">{message.text}</p>
        <p
          className={`text-[10px] mt-1 ${
            isSent ? "text-chat-bubble-sent-foreground/70" : "text-muted-foreground"
          }`}
        >
          {message.timestamp}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
