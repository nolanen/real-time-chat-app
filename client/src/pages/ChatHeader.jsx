import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useChat } from "../contexts/ChatContext";

const ChatHeader = () => {
    const [chatName, setChatName] = useState("")
    const {openChatName} = useChat()
    const {chat_id, user_id} = useParams()

    useEffect(() => {
        getContactInfo(user_id)
    }, [user_id])

    useEffect(() => {
        setChatName(openChatName)
    }, [chat_id])

    const getContactInfo = async (user_id) => {
        const res = await fetch(`http://localhost:3001/api/users/${user_id}`, {
            method: "GET",
            headers: {
                jwtToken: localStorage.jwtToken
            }
        })

        const parseRes = await res.json()
        console.log(parseRes)

        setChatName(parseRes.user_name)
    }

    return (
        <div className="top-0 h-1/6 bg-slate-600 sticky z-10 items-center justify-center text-center">
            <div className="text-3xl">
                {chatName}
            </div>
        </div>
    )
}

export default ChatHeader