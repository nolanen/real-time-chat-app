import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useSocket } from "../contexts/SocketContext";

const ContactProfile = () => {
    const {user_id, is_contact} = useParams()
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate()

    const socket = useSocket()

    useEffect(() => {
        getUserInfo()
    }, [user_id, is_contact])

    
    const getUserInfo = async () => {
        try {
            const res = await fetch(`http://localhost:3001/api/contacts/${user_id}`, {
                method: "GET",
                headers: {
                    jwtToken: localStorage.jwtToken
                }
            })

            const parseRes = await res.json()
            setUserInfo(parseRes)
        } catch (error) {
            
        }
    }

    const handleBackButtonClick = (e) => {
        e.preventDefault()
        is_contact === "true" ? navigate("/contacts") : navigate("/users")
    }

    const handleMessageButtonClick = async (e) => {
        e.preventDefault()
        try {
            if(is_contact === "true") {
                console.log(user_id)
                const res = await fetch(`http://localhost:3001/api/chat/${user_id}/exists`, {
                    method: "GET",
                    headers: {
                        jwtToken: localStorage.jwtToken
                    }
                })
                console.log(res)
                const parseRes = await res.json()
                console.log(parseRes)
                if(!parseRes.exists) {
                    navigate(`/chats/create-chat/${user_id}`)
                } else {
                    const {chat_id} = parseRes
                    navigate(`/chats/${chat_id}`)
                }
            } else {
                const res = await fetch(`http://localhost:3001/api/contacts/${user_id}`, {
                    method: "POST",
                    headers: {
                        jwtToken: localStorage.jwtToken
                    }
                })

                navigate(`/contacts/${user_id}/true`)
            }
        
        } catch (error) {
            
        }
    }

    return (
        <div>
            <Button onClick={handleBackButtonClick}>Back</Button>
            <div className="px-4 sm:px-0">
                <div className="text-base font-semibold leading-7 text-gray-900">
                    {is_contact? "Contact Information": "User Information"}
                </div>
                <div className="flex">
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`http://localhost:3001/api/users/profile-image/${user_id}`}  alt=""></img>
                    <Button onClick={handleMessageButtonClick}>{is_contact === "true"? "Message" : "Add"}</Button>
                </div>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <div className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div className="text-sm font-medium leading-6 text-gray-900">
                            Full name
                        </div>
                        <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {userInfo.user_name}
                        </div>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div className="text-sm font-medium leading-6 text-gray-900">
                            Username
                        </div>
                        <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {userInfo.user_name}
                        </div>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div className="text-sm font-medium leading-6 text-gray-900">About</div>
                        <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                        qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                        pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactProfile