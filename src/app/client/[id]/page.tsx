// "use client";
// import React, { useRef, useEffect, useState } from "react";
// import { useChatLocal } from "@/lib/hooks/useChatLocal";
// import Bubble from "../../../components/chatUi/Bubble";
// import { ChatInputMessage } from "../../../components/chatUi/ChatInput";

// interface ChatPopupProps {
//     clientId: string;
// }

// const ClientChatPopup: React.FC<ChatPopupProps> = ({ clientId }) => {
//     const { messages, sendMessage } = useChatLocal("client", clientId);
//     const listRef = useRef<HTMLDivElement>(null);
//     const [open, setOpen] = useState(false);

//     // auto-scroll when new messages arrive
//     useEffect(() => {
//         listRef.current?.scrollTo({
//             top: listRef.current.scrollHeight,
//             behavior: "smooth",
//         });
//     }, [messages]);

//     return (
//         <div className="fixed bottom-4 right-4 w-80 md:w-96 z-50 flex flex-col shadow-lg rounded-lg border border-gray-200 bg-white overflow-hidden">
//             {/* Header */}
//             <div
//                 className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center cursor-pointer"
//                 onClick={() => setOpen(!open)}
//             >
//                 <span className="font-semibold truncate">{clientId}</span>
//                 <button className="font-bold">{open ? "−" : "+"}</button>
//             </div>


//             {open && (
//                 <div className="flex flex-col h-96">
//                     <div
//                         ref={listRef}
//                         className="flex-1 overflow-y-auto p-3 bg-gray-50"
//                     >
//                         {messages.length > 0 ? (
//                             messages.map(msg => (
//                                 <Bubble
//                                     key={msg.id}
//                                     mine={msg.from === "client"}
//                                     label={msg.from === "client" ? clientId : "Admin"}
//                                     text={msg.text}
//                                     time={new Date(msg.createdAt).toLocaleTimeString()}
//                                 />
//                             ))
//                         ) : (
//                             <div className="text-center text-gray-400 mt-10">
//                                 No messages yet
//                             </div>
//                         )}
//                     </div>

//                     {/* Input fixed at bottom */}
//                     <div className="border-t p-2 bg-white">
//                         <ChatInputMessage onSend={sendMessage} />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ClientChatPopup;


"use client";
import React, { useRef, useEffect } from "react";
import { useChatLocal } from "@/lib/hooks/useChatLocal";
import Bubble from "../../../components/chatUi/Bubble";
import { ChatInputMessage } from "../../../components/chatUi/ChatInput";
import { useParams } from "next/navigation";


const ClientPage = () => {
    const params = useParams();
    const Id = params.id as string;

    const clientId = Id.startsWith("user") ? Id : `user${Id}`;
    // console.log(params.id)
    const { messages, sendMessage } = useChatLocal("client", clientId);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        listRef.current?.scrollTo(0, listRef.current.scrollHeight);
    }, [messages]);

    if (!clientId) {
        return <div>Loading chat...</div>;
    }

    return (
        <div className="flex flex-col h-screen w-full bg-gray-50">
            <div ref={listRef} className="flex-1 overflow-y-auto p-4">
                {messages.map((msg,idx) => {
                    const nextMsg = messages[idx + 1];
                    const showTime = !nextMsg || nextMsg.from !== msg.from;

                    return(
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

            <div className="p-4 bg-zinc-100">
                <ChatInputMessage onSend={sendMessage} />
            </div>
        </div>
    );
};

export default ClientPage;
