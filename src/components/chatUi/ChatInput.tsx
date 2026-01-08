"use client";

import { useRef, useState } from "react";
import { Send } from "lucide-react";

interface ChatInputMessageProps {
    onSend: (text: string) => void;
}

export function ChatInputMessage({ onSend }: ChatInputMessageProps) {
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Autogrow textarea
    const autoResize = () => {
        const el = textareaRef.current;
        if (!el) return;

        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 30) + "px";
    };

    const handleSend = () => {
        if (!value.trim()) return;

        setIsLoading(true);
        onSend(value.trim());

        setValue("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }

        setTimeout(() => setIsLoading(false), 200);
    };

    return (
        <div className="flex items-center justify-center  py-3">
            <div className="w-full max-w-7xl">
                <div className="flex items-center gap-3 rounded-2xl border bg-white px-3 py-2">
                    {/* <textarea
                        ref={textareaRef}
                        value={value}
                        placeholder="Type a message..."
                        rows={1}
                        onChange={(e) => {
                            setValue(e.target.value);
                            autoResize();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        className="
                            flex-1 resize-none bg-transparent
                            text-sm leading-6
                            outline-none
                            h-2 max-h-4
                            overflow-y-auto
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                            whitespace-pre-wrap
                            break-all
                            "
                    /> */}
                    <textarea
                        ref={textareaRef}
                        value={value}
                        placeholder="Type a message..."
                        rows={1}
                        onChange={(e) => {
                            setValue(e.target.value);
                            autoResize();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        className="
                            flex-1 resize-none bg-transparent
                            text-sm leading-6
                            outline-none
                            h-8 max-h-32
                            overflow-y-auto
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                            whitespace-pre-wrap
                            break-all
                        "
                    />


                    <button
                        onClick={handleSend}
                        disabled={isLoading || !value.trim()}
                        className="
                            mb-1 h-10 w-10 shrink-0
                            rounded-full bg-secondary hover:bg-primary
                            flex items-center justify-center
                            cursor-pointer
                        "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="
                            text-white
                            transform
                            transition-transform duration-300
                            
                            "
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M20.04 2.323c1.016-.355 1.992.621 1.637 1.637l-5.925 16.93c-.385 1.098-1.915 1.16-2.387.097l-2.859-6.432l4.024-4.025a.75.75 0 0 0-1.06-1.06l-4.025 4.024l-6.432-2.859c-1.063-.473-1-2.002.097-2.387z"
                            />
                        </svg>
                    </button>


                    {/* <button
                        onClick={handleSend}
                        disabled={isLoading || !value.trim()}
                        className="
                            mb-1 h-10 w-10 shrink-0
                            rounded-full bg-secondary
                            flex items-center justify-center
                            cursor-pointer group
                            
                            "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="text-white transform
                                transition-transform duration-300
                                group-hover:rotate-45
                                group-hover:translate-x-2
                                group-hover:translate-y-2"
                            width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.04 2.323c1.016-.355 1.992.621 1.637 1.637l-5.925 16.93c-.385 1.098-1.915 1.16-2.387.097l-2.859-6.432l4.024-4.025a.75.75 0 0 0-1.06-1.06l-4.025 4.024l-6.432-2.859c-1.063-.473-1-2.002.097-2.387z" /></svg>
                    </button> */}
                </div>
            </div>
        </div>
    );
}


// "use client";

// import { useState } from "react";
// import {
//     ChatInput,
//     ChatInputEditor,
//     ChatInputGroupAddon,
//     ChatInputSubmitButton,
//     useChatInput,
// } from "@/components/ui/chat-input";

// interface ChatInputMessageProps {
//     onSend: (text: string) => void;
// }

// export function ChatInputMessage({ onSend }: ChatInputMessageProps) {
//     const [isLoading, setIsLoading] = useState(false);

//     const { value, onChange, handleSubmit } = useChatInput({
//         onSubmit: (parsed) => {
//             if (!parsed.content.trim()) return;

//             setIsLoading(true);
//             onSend(parsed.content);
//             setTimeout(() => setIsLoading(false), 200);
//         },
//     });

//     return (
//         <div className="flex justify-center items-center">
//             <div className="w-full max-w-6xl">
//                 <ChatInput
//                     onSubmit={handleSubmit}
//                     value={value}
//                     onChange={onChange}
//                     isStreaming={isLoading}
//                     onStop={() => setIsLoading(false)}
//                 >
//                         <ChatInputEditor placeholder="Type a message..." />
//                         <ChatInputGroupAddon align="inline-end">
//                             <ChatInputSubmitButton className="ml-auto" />
//                         </ChatInputGroupAddon>
//                 </ChatInput>
//             </div>
//         </div>


//     );
// }


// // import React from 'react'

// // const ChatInput = () => {
// //   return (
// //     <div className='text-black'>
// //         <input type="text" className='border w-full rounded'/>
// //     </div>
// //   )
// // }

// // export default ChatInput


// "use client";

// import { useState } from "react";
// import { toast } from "sonner";
// import {
//     ChatInput,
//     ChatInputEditor,
//     ChatInputGroupAddon,
//     ChatInputSubmitButton,
//     useChatInput,
// } from "@/components/ui/chat-input";

// interface ChatInputMessageProps {
//     onSend: (text: string) => void;
// }

// export function ChatInputMessage() {
//     const [isLoading, setIsLoading] = useState(false);

//     const { value, onChange, handleSubmit } = useChatInput({
//         onSubmit: (parsed) => {
//             setIsLoading(true);
//             onSend(parsed.content);
//             setTimeout(() => setIsLoading(false), 1000);
//         },
//     });



//     return (
//         <div className="flex justify-center items-center">
//             <div className="w-full max-w-6xl">
//                 <>
//                     <ChatInput
//                         onSubmit={handleSubmit}
//                         value={value}
//                         onChange={onChange}
//                         isStreaming={isLoading}
//                         onStop={() => setIsLoading(false)}
//                     >

//                         <ChatInputEditor placeholder="Type a message..." />
//                         <ChatInputGroupAddon align="block-end">
//                             <ChatInputSubmitButton className="ml-auto" />
//                         </ChatInputGroupAddon>

//                         {/* <ChatInputEditor placeholder="Type a message..." />
//                     <ChatInputGroupAddon align="block-end">
//                         <ChatInputSubmitButton className="ml-auto" />
//                     </ChatInputGroupAddon> */}
//                     </ChatInput>
//                 </>
//             </div>
//         </div>
//     );
// }
