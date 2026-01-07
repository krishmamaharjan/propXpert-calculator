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
    private adminHandlers = new Map<string, Set<Handler>>();
    private clientHandlers = new Map<string, Map<string, Set<Handler>>>();
    private clients = new Map<string, { name: string }>();
    private threads = new Map<string, Message[]>();
    private nextClientId = 1;

    private on(map: Map<string, Set<Handler>>, event: string, fn: Handler) {
        if (!map.has(event)) map.set(event, new Set());
        map.get(event)!.add(fn);
    }

    private emit(map: Map<string, Set<Handler>>, event: string, payload: any) {
        map.get(event)?.forEach((fn) => fn(payload));
    }

    connectAdmin() {
        return {
            on: (event: string, fn: Handler) =>
                this.on(this.adminHandlers, event, fn),

            emit: (event: string, payload: any) =>
                this.handleFromAdmin(event, payload),

            getClients: () =>
                Array.from(this.clients.entries()).map(([id, c]) => ({
                    id,
                    name: c.name,
                })),

            getThread: (clientId: string) =>
                this.threads.get(clientId) ?? [],
        };
    }

    connectClient(name: string) {
        const clientId = String(this.nextClientId++);
        this.clients.set(clientId, { name });
        this.clientHandlers.set(clientId, new Map());
        this.threads.set(clientId, []);

        this.emit(this.adminHandlers, "admin:clients", this.clientsPayload());

        return {
            clientId,
            name,

            on: (event: string, fn: Handler) => {
                const map = this.clientHandlers.get(clientId)!;
                if (!map.has(event)) map.set(event, new Set());
                map.get(event)!.add(fn);
            },

            emit: (event: string, payload: any) =>
                this.handleFromClient(clientId, event, payload),

            getThread: () => this.threads.get(clientId)!,
        };
    }

    private clientsPayload() {
        return Array.from(this.clients.entries()).map(([id, c]) => ({
            id,
            name: c.name,
            online: this.clientHandlers.has(id),
            lastMessagePreview:
                this.threads.get(id)?.slice(-1)[0]?.text ?? "",
        }));
    }

    private handleFromClient(clientId: string, event: string, payload: any) {
        if (event === "client:message") {
            const msg: Message = {
                id: crypto.randomUUID(),
                clientId,
                from: "client",
                senderName: this.clients.get(clientId)!.name,
                text: payload.text,
                createdAt: new Date().toISOString(),
            };

            this.threads.get(clientId)!.push(msg);

            this.emit(this.clientHandlers.get(clientId)!, "client:message", msg);

            // Emit to all admins
            this.emit(this.adminHandlers, "admin:message", msg);

            // Update admin client list
            this.emit(this.adminHandlers, "admin:clients", this.clientsPayload());


            // this.emit(this.adminHandlers, "admin:message", msg);
            // this.emit(this.adminHandlers, "admin:clients", this.clientsPayload());
            // this.emit(this.clientHandlers.get(clientId)!, "client:message", msg);
        }
    }

    private handleFromAdmin(event: string, payload: any) {
        if (event === "admin:message") {
            const msg: Message = {
                id: crypto.randomUUID(),
                clientId: payload.clientId,
                from: "admin",
                senderName: "admin",
                text: payload.text,
                createdAt: new Date().toISOString(),
            };

            this.threads.get(payload.clientId)!.push(msg);

            this.emit(
                this.clientHandlers.get(payload.clientId)!,
                "client:message",
                msg
            );
            this.emit(this.adminHandlers, "admin:message", msg);
        }
    }
}

export const server = new SupportChatServer();
