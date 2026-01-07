"use client";

import React from "react";
import { useChatLocal } from "@/lib/hooks/useChatLocal";
import Image from "next/image";

interface AdminSidebarProps {
    activeClientId: string | null;
    setActiveClientId: (id: string | null) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
    activeClientId,
    setActiveClientId,
}) => {
    const { messages } = useChatLocal("admin");

    const clients = Array.from(new Set(messages.map(m => m.clientId)));

    const clientData = clients
        .map(clientId => {
            const clientMessages = messages.filter(m => m.clientId === clientId);
            const latestMessage = clientMessages.reduce((a, b) =>
                new Date(a.createdAt) > new Date(b.createdAt) ? a : b
            );
            return { clientId, latestMessage };
        })
        .sort(
            (a, b) =>
                new Date(b.latestMessage.createdAt).getTime() -
                new Date(a.latestMessage.createdAt).getTime()
        );

    return (
        <div className="h-screen p-4 bg-white flex flex-col gap-6 border">
            {/* Header */}
            <div className="w-full flex justify-between items-center">
                <Image
                    src="/propxpertLogo.webp"
                    alt="Logo"
                    width={80}
                    height={80}
                />
                <button className="w-6 h-6">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M13 6H21M3 12H21M7 18H21"
                            stroke="#1F2937"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </div>

            <div>
                <div className="h-8 px-3 flex items-center">
                    <h6 className="text-secondary text-xs font-semibold">
                        CLIENTS
                    </h6>
                </div>

                <ul className="flex flex-col gap-1">
                    {clientData.length === 0 && (
                        <li className="text-center text-zinc-400 py-6 text-sm">
                            No clients yet
                        </li>
                    )}

                    {clientData.map(({ clientId, latestMessage }) => {
                        const isActive = clientId === activeClientId;

                        return (
                            <li key={clientId}>
                                <button
                                    onClick={() => setActiveClientId(clientId)}
                                    className={`w-full text-left p-3 rounded-lg transition flex gap-3 ${
                                        isActive
                                            ? "bg-secondary2"
                                            // ? "bg-indigo-50"
                                            : "hover:bg-zinc-50"
                                    }`}
                                >

                                    <img
                                        src="https://pagedone.io/asset/uploads/1710412177.png"
                                        alt={clientId}
                                        className="w-10 h-10 rounded-full"
                                    />

                                    <div className="flex-1 overflow-hidden">
                                        <h2 className="text-sm font-medium text-gray-900 truncate">
                                            {clientId}
                                        </h2>
                                        <p className="text-xs text-gray-500 truncate">
                                            {latestMessage.text}
                                        </p>
                                    </div>

                                    {/* Time */}
                                    <span className="text-xs text-zinc-400 whitespace-nowrap">
                                        {new Date(
                                            latestMessage.createdAt
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

        </div>
    );
};

export default AdminSidebar;



// "use client";
// import React from "react";
// import { useChatLocal } from "@/lib/hooks/useChatLocal";

// interface AdminSidebarProps {
//     activeClientId: string | null;
//     setActiveClientId: (id: string | null) => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeClientId, setActiveClientId }) => {
//     const { messages } = useChatLocal("admin");

//     const clients = Array.from(new Set(messages.map(m => m.clientId)));

//     const clientData = clients
//         .map(clientId => {
//             const clientMessages = messages.filter(m => m.clientId === clientId);
//             const latestMessage = clientMessages.reduce((a, b) =>
//                 new Date(a.createdAt) > new Date(b.createdAt) ? a : b
//             );
//             return { clientId, latestMessage };
//         })
//         .sort(
//             (a, b) =>
//                 new Date(b.latestMessage.createdAt).getTime() -
//                 new Date(a.latestMessage.createdAt).getTime()
//         );

//     return (
//         <div className="flex-1 overflow-y-auto">
//             {clientData.length === 0 && (
//                 <div className="text-center text-black mt-10">
//                     No clients yet
//                 </div>
//             )}

//             {clientData.map(({ clientId, latestMessage }) => (
//                 <div
//                     key={clientId}
//                     onClick={() => setActiveClientId(clientId)}
//                     className={`flex gap-4 items-center p-2 my-2 cursor-pointer hover:bg-secondary/10 rounded-lg transition-colors ${
//                         clientId === activeClientId ? "bg-secondary/10" : ""
//                     }`}
//                 >   
                
//                 <div>

                
//                     <div className="flex-1 overflow-hidden">
//                         <div className="font-medium text-foreground truncate">
//                             {clientId}
//                         </div>
//                         <div className="text-zinc-500 text-sm truncate">
//                             {latestMessage.text}
//                         </div>
//                     </div>

//                     {/* <div className="text-zinc-400 text-xs ml-2">
//                         {new Date(latestMessage.createdAt).toLocaleTimeString([], {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                         })}
//                     </div> */}

//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default AdminSidebar;



// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { useChatLocal, Message } from "@/lib/hooks/useChatLocal";


// const AdminSidebar = () => {
//     const { messages, sendMessage } = useChatLocal("admin");
//         const [activeClientId, setActiveClientId] = useState<string | null>(null);
//         const listRef = useRef<HTMLDivElement>(null);
    
//         const clients = Array.from(new Set(messages.map(m => m.clientId)));
    
//         const activeMessages = activeClientId
//             ? messages.filter(m => m.clientId === activeClientId)
//             : [];
    
//         useEffect(() => {
//             listRef.current?.scrollTo(0, listRef.current.scrollHeight);
//         }, [activeMessages])
//     return (
//         <div>
//             <h2 className="font-bold mb-4">Clients</h2>

//             {clients
//                 .map(clientId => {
//                     // get the latest message for this client
//                     const clientMessages = messages.filter(m => m.clientId === clientId);
//                     const latestMessage = clientMessages.reduce((a, b) =>
//                         new Date(a.createdAt) > new Date(b.createdAt) ? a : b
//                     );
//                     return { clientId, latestMessage };
//                 })
//                 // sort by latest message timestamp descending
//                 .sort(
//                     (a, b) =>
//                         new Date(b.latestMessage.createdAt).getTime() -
//                         new Date(a.latestMessage.createdAt).getTime()
//                 )
//                 .map(({ clientId }) => (
//                     <div
//                         key={clientId}
//                         className={`p-2 mb-2 cursor-pointer ${clientId === activeClientId ? "bg-zinc-300" : "bg-zinc-200"
//                             }`}
//                         onClick={() => setActiveClientId(clientId)}
//                     >
//                         {clientId}
//                     </div>
//                 ))}
//         </div>
//     )
// }

// export default AdminSidebar