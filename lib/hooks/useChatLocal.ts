"use client";
import { useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import { server } from "../../src/shared/ChatServer"
// import { server } from "@/app/shared/ChatServer"
export interface Message {
    id: string;
    from: "client" | "admin";
    status: "sending" | "sent" | "failed";
    clientId: string;
    text: string;
    createdAt: string;
}

// LocalStorage helpers
const STORAGE_KEY = "chat_messages";

const getMessagesFromStorage = (): Message[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const saveMessageToStorage = (message: Message) => {
    const messages = getMessagesFromStorage();
    messages.push(message);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};

export const useChatLocal = (role: "client" | "admin", clientId?: string) => {
    const [messages, setMessages] = useState<Message[]>([]);


    // Load initial messages
    useEffect(() => {
        const allMessages = getMessagesFromStorage();
        if (role === "client" && clientId) {
            setMessages(allMessages.filter(m => m.clientId === clientId));
        } else if (role === "admin") {
            setMessages(allMessages);
        }
    }, [role, clientId]);

    // Listen to storage events for multi-tab sync
    useEffect(() => {
        const handler = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                const allMessages = getMessagesFromStorage();
                if (role === "client" && clientId) {
                    setMessages(allMessages.filter(m => m.clientId === clientId));
                } else if (role === "admin") {
                    setMessages(allMessages);
                }
            }
        };
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, [role, clientId]);


    const sendMessage = (text: string, targetClientId?: string) => {

        if (!text.trim()) return;

        let resolvedClientId: string | undefined;

        // if (role === "client" && !clientId) {
        //     console.error("clientId missing for client message");
        //     return;
        // }

        if (role === "client") {
            resolvedClientId = clientId;
        } else {
            resolvedClientId = targetClientId;
        }

        if (!resolvedClientId) {
            console.error("clientId missing for message");
            return;
        }

        const newMessage: Message = {
            id: crypto.randomUUID(),
            text,
            // from: "client",
            from: role,
            status: "sending",
            clientId: resolvedClientId,
            createdAt: new Date().toISOString(),

        };

        // 1. Show message immediately
        setMessages(prev => [...prev, newMessage]);

        saveMessageToStorage(newMessage);

        // 2. Simulate message delivery
        setTimeout(() => {
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === newMessage.id
                        ? { ...msg, status: "sent" }
                        : msg
                )
            );
            const all = getMessagesFromStorage().map(msg =>
                msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
            );
            localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
        }, 300)



        
    }
    // const clearChat = (targetClientId?: string) => {
    //     const allMessages = getMessagesFromStorage();

    //     let newMessages: Message[] = [];

    //     if (targetClientId) {
    //         // Remove messages for a specific client
    //         newMessages = allMessages.filter(msg => msg.clientId !== targetClientId);
    //     } else if (role === "client" && clientId) {
    //         // Remove all messages for this client
    //         newMessages = allMessages.filter(msg => msg.clientId !== clientId);
    //     }

    //     localStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));

    //     // Update UI state
    //     if (role === "admin") {
    //         setMessages(newMessages);
    //     } else if (role === "client" && clientId) {
    //         setMessages([]);
    //     }
    // };


    return { messages, sendMessage };
};
