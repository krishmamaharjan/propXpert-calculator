"use client";

export type Message = {
    id: string;
    clientId: string;
    from: "client" | "admin";
    senderName: string;
    text: string;
    createdAt: string;
};

type Handler = (payload: any) => void;

class SupportChatServer {
    private adminHandlers = new Set<Handler>();
    private clientHandlers = new Map<string, Set<Handler>>();
    private clients = new Map<string, { name: string }>();
    private threads = new Map<string, Message[]>();
    private nextClientId = 1;

    connectAdmin() {
        return {
            on: (fn: Handler) => this.adminHandlers.add(fn),
            emit: (payload: any) => this.handleFromAdmin(payload),
            getClients: () =>
                Array.from(this.clients.entries()).map(([id, c]) => ({ id, name: c.name })),
            getThread: (clientId: string) => this.threads.get(clientId) ?? [],
        };
    }

    connectClient(name: string) {
        const clientId = String(this.nextClientId++);
        this.clients.set(clientId, { name });
        this.clientHandlers.set(clientId, new Set());
        this.threads.set(clientId, []);

        const socket = {
            clientId,
            name,
            on: (fn: Handler) => this.clientHandlers.get(clientId)!.add(fn),
            emit: (payload: any) => this.handleFromClient(clientId, payload),
            getThread: () => this.threads.get(clientId)!,
        };

        return socket;
    }

    private handleFromClient(clientId: string, payload: { text: string }) {
        const msg: Message = {
            id: crypto.randomUUID(),
            clientId,
            from: "client",
            senderName: this.clients.get(clientId)!.name,
            text: payload.text,
            createdAt: new Date().toISOString(),
        };

        this.threads.get(clientId)!.push(msg);

        // notify admin
        this.adminHandlers.forEach(fn => fn(msg));
        // notify client
        this.clientHandlers.get(clientId)?.forEach(fn => fn(msg));
    }

    private handleFromAdmin(payload: { clientId: string; text: string }) {
        const msg: Message = {
            id: crypto.randomUUID(),
            clientId: payload.clientId,
            from: "admin",
            senderName: "Admin",
            text: payload.text,
            createdAt: new Date().toISOString(),
        };

        this.threads.get(payload.clientId)!.push(msg);

        // notify client
        this.clientHandlers.get(payload.clientId)?.forEach(fn => fn(msg));
        // notify admin too
        this.adminHandlers.forEach(fn => fn(msg));
    }
}

export const server = new SupportChatServer();
