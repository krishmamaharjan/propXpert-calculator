"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChatLocal } from "@/lib/hooks/useChatLocal";
import Bubble from "../../components/chatUi/Bubble";
import { ChatInputMessage } from "../../components/chatUi/ChatInput";
import ClientNotSelected from "@/src/components/chatUi/clientNotselected";
import AdminSidebar from "@/src/components/chatUi/sidebar";

const AdminPage = () => {
    const { messages, sendMessage } = useChatLocal("admin");
    const [activeClientId, setActiveClientId] = useState<string | null>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const activeMessages = activeClientId
        ? messages.filter(m => m.clientId === activeClientId)
        : [];

    useEffect(() => {
        listRef.current?.scrollTo({
            top: listRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [activeMessages]);

    return (
        <div className="h-screen flex  bg-white">

            {/* sidebar */}
            <div
                className={`
                    w-full md:w-1/4 border-r
                    ${activeClientId ? "hidden md:block" : "block"}
                `}
            >
                <AdminSidebar
                    activeClientId={activeClientId}
                    setActiveClientId={setActiveClientId}
                />
            </div>

            {/* chat container */}
            <div
                className={`
                    flex-1 flex flex-col 
                    ${activeClientId ? "block" : "hidden md:flex "}
                `}
            >
                {/* formobiile*/}
                {activeClientId && (
                    <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b">
                        <button
                            onClick={() => setActiveClientId(null)}
                            className="text-gray-600 text-sm font-medium"
                        >
                            returnnn
                        </button>
                        <span className="text-sm font-semibold text-gray-900">
                            {activeClientId}
                        </span>
                    </div>
                )}

                {/* Message */}
                {/* <div className="md:mx-12"> */}


                <div
                    ref={listRef}
                    className="flex-1  p-4 md:mx-20 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]   [scrollbar-width:none]"
                >
                    {activeClientId ? (
                        activeMessages.length > 0 ? (
                            // activeMessages.map(msg => (
                            //     <Bubble
                            //         key={msg.id}
                            //         mine={msg.from === "admin"}
                            //         label={msg.from === "admin" ? "Admin" : msg.clientId}
                            //         text={msg.text}
                            //         time={new Date(msg.createdAt).toLocaleTimeString()}
                            //     />
                            // ))

                            activeMessages.map((msg, idx) => {
                                const nextMsg = activeMessages[idx + 1];
                                const showTime = !nextMsg || nextMsg.from !== msg.from;

                                return (
                                    <Bubble
                                        key={msg.id}
                                        mine={msg.from === "admin"}
                                        label={msg.from === "admin" ? "Admin" : msg.clientId}
                                        text={msg.text}
                                        time={new Date(msg.createdAt).toLocaleTimeString()}
                                        showTime={showTime}
                                    />
                                )
                            })

                        ) : (
                            <div className="text-center text-gray-400 mt-10">
                                No messages yet
                            </div>
                        )
                    ) : (
                        <ClientNotSelected />
                    )}
                </div>

                {/* <button
                    onClick={() => activeClientId && clearChat(activeClientId)}
                    className="bg-red-500 px-2 py-1 rounded text-white text-xs hover:bg-red-600"
                >
                    Clear Chat
                </button> */}

                {activeClientId && (
                    <div className="p-3 md:mx-20">
                        <ChatInputMessage
                            onSend={text => sendMessage(text, activeClientId)}
                        />
                    </div>
                )}

            </div>
        </div>
        // </div>
    );
};

export default AdminPage;
