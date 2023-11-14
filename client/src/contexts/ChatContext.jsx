import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "./SocketContext";

const ChatContext = createContext()

export const useChat = () => {
    return useContext(ChatContext)
}

export const ChatProvider = ({children}) => {
    const socket = useSocket()

    const [chats, setChats] = useState([])
    const {chat_id, user_id} = useParams()
    const [chatMessages, setChatMessages] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getChats()
    }, [])

    useEffect(() => {
        if(chat_id) {
            getChatMessages()
        }
        console.log(chat_id)
        console.log(user_id)
    }, [chat_id])

    useEffect(() => {
        console.log(chatMessages)
        handleChatUpdate(chatMessages[chatMessages.length-1])
    }, [chatMessages])

    const getChats = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/chat", {
                method: "GET",
                headers: {
                    jwtToken: localStorage.jwtToken
                }
            })
    
            const parseRes = await res.json()
            console.log(parseRes)
            setChats(parseRes)
        } catch (error) {
            
        }
    }

    const onChatSelection = (i) => {
        console.log(i)
        socket.emit("join chat", chats[i].chat_id)
        navigate(`/chats/${chats[i].chat_id}`)
    }   

    const getChatMessages = async () => {
        try {
            const res = await fetch(`http://localhost:3001/api/chat/${chat_id}`, {
                method: "GET",
                headers: {
                    jwtToken: localStorage.jwtToken
                }
            })

            const parseRes = await res.json()

            console.log(parseRes)

            setChatMessages(parseRes)

        } catch (error) {
            
        }
    }

    const handleChatUpdate = (newMessage) => {
        setChats(chats.map((chat) => {
            if (chat.chat_id === chat_id) {
              return { ...chat, text: newMessage.text, message_time: newMessage.message_time }
            } else {
              return chat
            }
          }))
    }

    socket.on("chatCreationSuccess", (chat) => {
        console.log(chat)
        setChats([chat, ...chats])
        navigate(`/chats/${chat.chat_id}`)
    })

    socket.on("new chat", (chat) => {
        console.log(chat)
        setChats([chat, ...chats])
        console.log(chats)
    })

    const sendMessage = (message) => {
        try {
            console.log(user_id)
            if(user_id) {
                socket.emit("new chat", {to_user: user_id, message: message})
            } else {
                socket.emit("message", message)
            }
            setChatMessages([...chatMessages, {
                user_id: null,
                text: message,
                message_time: "",
                is_recipient: false
            }])
        } catch (error) {
            
        }
    }
    socket.on("message", (messageInfo) => {
        console.log(messageInfo)
        setChatMessages([...chatMessages, messageInfo])
    })


    return (
        <ChatContext.Provider value={{chats, onChatSelection, chatMessages, sendMessage}}>
            {children}
        </ChatContext.Provider>
    )
}