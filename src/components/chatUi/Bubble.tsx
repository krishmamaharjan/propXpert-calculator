"use client";

type Props = {
    mine: boolean;
    label: string;
    text: string;
    time: string;
    avatar?: string;
    showTime: boolean;
};

export default function Bubble({ mine, label, text, time, avatar, showTime }: Props) {
    return (
        <div className="w-full">
            <div className="grid pb-6">
                <div
                    className={`flex gap-2.5 mb-4 ${mine ? "ml-auto flex-row-reverse text-right" : "mr-auto"
                        }`}
                >
                    {/* Avatar */}
                    {/* {!mine && (
                        <img
                            src={
                                avatar ||
                                "https://pagedone.io/asset/uploads/1710412177.png"
                            }
                            alt={`${label} image`}
                            className="w-10 h-11 rounded-full"
                        />
                    )} */}

                    {/* <img
                        src={
                            avatar ||
                            (mine
                                ? "https://pagedone.io/asset/uploads/1710412177.png" // client avatar
                                : "x.png") // admin avatar
                        }
                        alt={`${label} avatar`}
                        className="w-10 h-10 rounded-full object-cover"
                    /> */}

                    <div className="grid">
                        {!mine && (
                            <h5 className="text-zinc-900 text-sm font-semibold leading-snug pb-1">
                                {label}
                            </h5>
                        )}

                        {/* <div
                            className={`grid w-max-[50%] ${mine ? "ml-auto" : ""
                                }`}
                        >
                            <div
                                className={`px-3.5 py-2 rounded-3xl justify-start items-center gap-3 inline-flex
                                ${mine
                                        ? "bg-secondary text-white rounded-tr-none"
                                        : "bg-zinc-200 text-gray-900 rounded-tl-none"
                                    }`}
                            >
                                <p className="text-sm font-normal leading-snug break-all">
                                    {text}
                                </p>
                            </div>

                            <div
                                className={`inline-flex mb-2.5 ${mine ? "justify-start" : "justify-end"
                                    }`}
                            >
                                <h6 className="text-zinc-500 text-xs font-normal leading-4 py-1">
                                    {time}
                                </h6>
                            </div>
                        </div> */}

                        <div className={`grid w-full max-w-full overflow-hidden ${mine ? "ml-auto" : "mr-auto"}`}>
                            <div
                                className={`px-3.5 py-2 rounded-3xl w-full max-w-full overflow-hidden
                                    ${mine
                                        ? "bg-secondary text-white rounded-tr-none"
                                        : "bg-zinc-200 text-gray-900 rounded-tl-none"
                                    }`}
                            >
                                <p className="text-sm font-normal leading-snug break-all">
                                    {text}
                                </p>
                            </div>
                            {showTime && (
                                <div className={`inline-flex mb-2.5 ${mine ? "justify-start" : "justify-end"}`}>
                                    <h6 className="text-zinc-500 text-xs font-normal leading-4 py-1">
                                        {time}
                                    </h6>
                                </div>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}



// "use client";

// type Props = {
//     mine: boolean;
//     label: string;
//     text: string;
//     time: string;
//     avatar?: string;
// };

// export default function Bubble({ mine, label, text, time, avatar }: Props) {
//     return (
//         <div className={`chat ${mine ? "chat-end" : "chat-start"} text-black`}>
//             {/* {!mine && (
//                 <div className="chat-image avatar">
//                     <div className="w-10 rounded-full">
//                         <img
//                             alt={`${label} avatar`}
//                             src={avatar || "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"}
//                         />
//                     </div>
//                 </div>
//             )} */}

//             <div>
//                 <div className="chat-header">
//                     {label}
//                     <time className="text-xs opacity-50 ml-2">{time}</time>
//                 </div>
//                 <div className="chat-bubble" style={{ backgroundColor: mine ? "#111" : "#eee", color: mine ? "white" : "black" }}>
//                     {text}
//                 </div>
//                 {/* <div className="chat-footer opacity-50">{mine ? "Delivered" : "Seen"}</div> */}
//             </div>
//         </div>
//     );
// }
