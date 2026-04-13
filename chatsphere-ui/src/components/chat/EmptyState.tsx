import { MessageSquare } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-background text-center px-6">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
        <MessageSquare size={36} className="text-primary" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Welcome to <span className="text-primary">PINGMe</span>
      </h2>
      <p className="text-sm text-muted-foreground max-w-sm">
        Select a conversation from the sidebar to start chatting, or search for a user to begin a new conversation.
      </p>
    </div>
  );
};

export default EmptyState;
