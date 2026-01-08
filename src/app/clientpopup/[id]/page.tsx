"use client";
import React, { useRef, useEffect } from "react";
import { useChatLocal } from "@/lib/hooks/useChatLocal";
import Bubble from "../../../components/chatUi/Bubble";
import { ChatInputMessage } from "../../../components/chatUi/ChatInput";
import { MessageSquare } from "lucide-react";

interface Props {
    clientId: string;
    onClose?: () => void;
}

const ClientPagePopup = ({ clientId, onClose }: Props) => {
    const { messages, sendMessage } = useChatLocal("client", clientId);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        listRef.current?.scrollTo({
            top: listRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    return (
        // <div className="fixed bottom-4 right-0 md:right-20 mx-2  z-50 w-75  md:w-96 h-120 flex flex-col rounded-xl overflow-hidden bg-zinc-200">
        <div className="fixed md:bottom-4 md:right-20  z-90 md:h-120  md:w-96 flex flex-col md:rounded-xl overflow-hidden bg-zinc-100 inset-0 md:inset-auto rounded-none">

            <div className="flex items-center justify-between px-4 py-2 bg-secondary text-white">
                <span className="text-sm">Chat with PropExperts</span>
                <button onClick={onClose} className="text-white text-lg mb-1 h-8 w-8 shrink-0
                            rounded-full bg-secondary hover:bg-primary
                            flex items-center justify-center
                            cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27" /></svg>
                </button>
            </div>

            <div
                ref={listRef}
                className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-4 bg-zinc-100 flex flex-col gap-2"
            >
                {messages.length === 0 && (
                    // <div className="text-center flex items-center justify-center text-zinc-400 mt-10">
                    //     <MessageSquare className="w-8 h-8 text-primary " />

                    //     Chat With PropExperts
                    // </div>

                    <div className="max-w-md text-center">

                        <div className="flex items-center justify-center gap-4 mb-4 mt-16">
                            <div className="relative">
                                <div
                                    className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
                            justify-center animate-bounce"
                                >
                                    <MessageSquare className="w-8 h-8 text-primary " />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold">Welcome!</h2>
                        <p className="text-base-content/60">
                            Start a chat with PropExperts
                        </p>
                    </div>
                )}
                {/* {messages.map(msg => (
                    <Bubble
                        key={msg.id}
                        mine={msg.from === "client"}
                        label={msg.from === "client" ? clientId : "Admin"}
                        text={msg.text}
                        time={new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    />
                ))} */}

                {messages.map((msg, idx) => {
                    const nextMsg = messages[idx + 1];
                    const showTime = !nextMsg || nextMsg.from !== msg.from;

                    return (
                        <Bubble
                            key={msg.id}
                            mine={msg.from === "client"}
                            label={msg.from === "client" ? clientId : "Admin"}
                            text={msg.text}
                            time={new Date(msg.createdAt).toLocaleTimeString()}
                            showTime={showTime}
                        />
                    )
                })}
            </div>

            <div className="px-3 pb-3 bg-zinc-100">
                <ChatInputMessage onSend={sendMessage} />
            </div>
        </div>
    );
};

export default ClientPagePopup;



// "use client";
// import React, { useRef, useEffect } from "react";
// import { useChatLocal } from "@/lib/hooks/useChatLocal";
// import Bubble from "../../../components/chatUi/Bubble";
// import { ChatInputMessage } from "../../../components/chatUi/ChatInput";

// interface Props {
//     clientId: string;
//     onClose?: () => void;
// }

// const ClientPagePopup = ({ clientId, onClose }: Props) => {
//     const { messages, sendMessage } = useChatLocal("client", clientId);
//     const listRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         listRef.current?.scrollTo({
//             top: listRef.current.scrollHeight,
//             behavior: "smooth",
//         });
//     }, [messages]);

//     return (
//         <div className="fixed bottom-4 right-4 z-9999 w-96 h-128 bg-white rounded-xl shadow-2xl border flex flex-col">

//             <div className="flex items-center justify-between px-4 py-2 bg-secondary text-white rounded-t-xl">
//                 <span className="font-semibold">Chat with Admin</span>
//                 <button onClick={onClose} className="text-white text-lg">✕</button>
//             </div>

//             <div ref={listRef} className="flex-1 overflow-y-auto p-4 bg-gray-50">
//                 {messages.map(msg => (
//                     <Bubble
//                         key={msg.id}
//                         mine={msg.from === "client"}
//                         label={msg.from === "client" ? clientId : "Admin"}
//                         text={msg.text}
//                         time={new Date(msg.createdAt).toLocaleTimeString()}
//                     />
//                 ))}
//             </div>

//             {/* Input */}
//             <div className="p-3 border-t">
//                 <ChatInputMessage onSend={sendMessage} />
//             </div>
//         </div>
//     );
// };

// export default ClientPagePopup;
