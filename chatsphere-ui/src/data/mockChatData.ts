export interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  user: User;
  messages: Message[];
  unreadCount: number;
}

const ME = "me";

export const currentUser: User = {
  id: ME,
  name: "You",
  avatar: "",
  online: true,
};

export const chats: Chat[] = [];
