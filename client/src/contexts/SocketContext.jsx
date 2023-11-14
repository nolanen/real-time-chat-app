import React, {useContext, useEffect, useState, createContext} from "react"
import { io } from "socket.io-client"

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({children, authenticated}) => {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        if(authenticated) {
            const newSocket = io("http://localhost:3001", {
                auth: {
                    jwtToken: localStorage.jwtToken
                }
            })

            setSocket(newSocket)

            return(() => newSocket.disconnect())
        }
    }, [authenticated])



    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}