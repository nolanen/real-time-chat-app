import React, { useEffect, useState } from "react";

const ChatHeader = ({name}) => {
    const [chatName, setChatName] = useState("")

    useEffect(() => {
        setChatName(name)
    }, [name])

    return (
        <div className="top-0 h-1/6 bg-slate-600 sticky z-10">
            {chatName}
        </div>
    )
}

export default ChatHeader