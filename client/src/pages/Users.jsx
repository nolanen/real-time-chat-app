import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Users = () => {
    const [userSearchValue, setUserSearchValue] = useState("")
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers(userSearchValue)
    }, [])

    useEffect(() => {
        getUsers(userSearchValue)
    }, [userSearchValue])
    
    const getUsers = async (user_name) => {
        try {
            const res = await fetch(`http://localhost:3001/api/users/?user_name=${user_name}`, {
                method: "GET",
                headers: {
                    jwtToken: localStorage.jwtToken
                }
            })
            console.log(res)
            const parseRes = await res.json()
            console.log(parseRes)
            setUsers(parseRes)
        } catch (error) {
            
        }
    }

    const handleSearchInput = e => {
        setUserSearchValue(e.target.value)
    }

    return (
        <div className="flex-col h-screen">
            <div className="flex">
                <h1>Users</h1>
                <Link replace to="/contacts" className="px-4 py-2 bg-primary text-white hover:bg-white hover:text-primary outline  hover:outline-primary font-semibold rounded-md transition-all duration-200">
                    Back
                </Link>
            </div>
            <input
                type="text"
                placeholder="Enter User Name"
                value={userSearchValue}
                onChange={handleSearchInput} 
                className="py-2 px-3 w-full border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
            <ul className="divide-y divide-secondary-dark">
                {users.map((user, i) => (
                    <Link replace to={`/contacts/${user.user_id}/${user.is_contact? "true": "false"}`} key={i} className="flex gap-x-6 py-5">
                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`http://localhost:3001/api/users/profile-image/${user.user_id}`}  alt=""></img>
                        <div className="flex min-w-0 gap-x-4">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{user.user_name}</p>
                            {user.is_contact? "added": "add"}
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default Users