import React from "react";

import Chat from "./Chat";
import { useLocation, useParams } from "react-router-dom";
import { useChat } from "../contexts/ChatContext";

const Chats = () => {
    const {chat_id} = useParams()
    const {chats, onChatSelection} = useChat()
    const location = useLocation()

    const handleChatSelection = (e, i) => {
        e.preventDefault()
        onChatSelection(i)
    }   

    return (
        <div className="flex h-screen">
            <div className="w-80 overflow-y-auto bg-secondary-dark">
                <ul>
                    {chats.map((chat, i) => (
                        <div key={i} onClick={(e) => handleChatSelection(e, i)} className={`w-full h-36 flex items-center px-4 ${i % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                            <div className="flex-grow font-semibold">
                                {chat.contact_name}
                            </div>
                            <div className="text-sm px-4">
                                {chat.text}
                            </div>
                            <div className="text-xs text-gray-400">
                                {chat.message_time}
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
            {(chat_id && chats.length!==0) || location.pathname.includes("/create-chat")? <Chat/> : <div></div>}
        </div>
    )
}

export default Chats