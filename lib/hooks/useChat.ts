"use client";
import { useEffect, useMemo, useState } from "react";
import { server, Message } from "../../src/shared/SupportChatServer";

type ClientSocket = ReturnType<typeof server.connectClient>;
type AdminSocket = ReturnType<typeof server.connectAdmin>;

export function useChat({
    role,
    name,
    activeClientId,
}: {
    role: "client" | "admin";
    name?: string;            // only for client
    activeClientId?: string;  // only for admin
}) {
    const clientSocket = useMemo<ClientSocket | null>(() => {
        return role === "client" ? server.connectClient(name ?? "Guest") : null;
    }, [role, name]);

    const adminSocket = useMemo<AdminSocket | null>(() => {
        return role === "admin" ? server.connectAdmin() : null;
    }, [role]);

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (role === "client" && clientSocket) {
            // Load initial messages
            setMessages(clientSocket.getThread());

            // Subscribe to new messages
            clientSocket.on("client:message", () => {
                setMessages(clientSocket.getThread());
            });
        }

        if (role === "admin" && adminSocket) {
            if (!activeClientId) {
                setMessages([]);
                return;
            }

            // Load initial thread
            setMessages(adminSocket.getThread(activeClientId));

            // Subscribe to new messages from that client
            adminSocket.on("admin:message", () => {
                setMessages(adminSocket.getThread(activeClientId));
            });
        }
    }, [role, clientSocket, adminSocket, activeClientId]);

    const sendMessage = (text: string) => {
        if (role === "client" && clientSocket) {
            clientSocket.emit("client:message", { text });
        }

        if (role === "admin" && adminSocket && activeClientId) {
            adminSocket.emit("admin:message", { clientId: activeClientId, text });
        }
    };

    return { messages, sendMessage };
}
