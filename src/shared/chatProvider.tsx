"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Message {
  id: string;
  from: "admin" | "client";
  senderName: string;
  text: string;
  createdAt: string;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (msg: Omit<Message, "id" | "createdAt">) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = (msg: Omit<Message, "id" | "createdAt">) => {
    const fullMsg: Message = {
      ...msg,
      id: Math.random().toString(36),
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, fullMsg]);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChatContext must be used inside ChatProvider");
  return context;
};
