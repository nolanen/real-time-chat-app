import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../contexts/ChatContext";
import {TbSend} from "react-icons/tb"

import ChatHeader from "./ChatHeader";
import Button from "../components/Button"

const Chat = () => {
    const [message, setMessage] = useState("")
    const messagesContainer = useRef(null)

    const {chatMessages, sendMessage} = useChat()

    useEffect(() => {
        messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight
    }, [chatMessages])

    const handleInput = e => {
        setMessage(e.target.value)
    }

    const handleMessageSubmission = (e) => {
        e.preventDefault()
        sendMessage(message)
        setMessage("")
    }

    return (
        <div className="flex-grow flex flex-col">
            <ChatHeader/>
            <div ref={messagesContainer} className="flex-col h-5/6 overflow-y-auto">
                <ul>
                    {chatMessages.length !== 0 && chatMessages.map((message, i) => (
                        <div key={i} className={`flex ${!message.is_recipient? 'justify-end': ''} items-en`}>
                            <div className="rounded-lg p-4 m-4 bg-slate-200">
                                {message.text}
                                {message.message_time}
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleMessageSubmission} className="bottom-0 sticky bg-gray-200 p-2 flex">
                <input
                    type="text"
                    placeholder="Enter Message"
                    value={message}
                    onChange={handleInput}
                    className={"py-2 px-3 w-full border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"}
                />
                <Button type="submit" className={"mx-2 h-min"}><TbSend size="28"/></Button>
            </form>
        </div> 
    )
}

export default Chat