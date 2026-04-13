const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 px-4 py-2">
      <div className="flex items-center gap-1 bg-chat-bubble-received px-4 py-3 rounded-2xl rounded-bl-md">
        <span className="w-2 h-2 rounded-full bg-chat-typing animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 rounded-full bg-chat-typing animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 rounded-full bg-chat-typing animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
};

export default TypingIndicator;
