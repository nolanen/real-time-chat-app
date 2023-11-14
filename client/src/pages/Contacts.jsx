import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Contacts = () => {
    const [contactSearchValue, setContactSearchValue] = useState("")
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        getContacts(contactSearchValue)
    }, [])

    useEffect(() => {
        getContacts(contactSearchValue)
    }, [contactSearchValue])

    const getContacts = async (user_name) => {
        try {
            const res = await fetch(`http://localhost:3001/api/contacts/?user_name=${user_name}`, {
                method: "GET",
                headers: {
                    jwtToken: localStorage.jwtToken
                }
            })
            const parseRes = await res.json()
            console.log(parseRes)
            setContacts(parseRes)
        } catch (error) {
            
        }
    }

    const handleSearchInput = e => {
        setContactSearchValue(e.target.value)
    }

    return (
        <div className="flex-col h-screen">
            <div className="flex">
                <h1>Contacts</h1>
                <Link replace to="/users" className="px-4 py-2 bg-primary text-white hover:bg-white hover:text-primary outline  hover:outline-primary font-semibold rounded-md transition-all duration-200">
                    +
                </Link>
            </div>
            <input
                type="text"
                placeholder="Enter Contact Name"
                value={contactSearchValue}
                onChange={handleSearchInput} 
                className="py-2 px-3 w-full border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
            <ul className="divide-y divide-secondary-dark">
                {contacts.map((contact, i) => (
                    <Link replace to={`/contacts/${contact.user_id}/true`} key={i} className="flex gap-x-6 py-5">
                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`http://localhost:3001/api/users/profile-image/${contact.user_id}`}  alt=""></img>
                        <div className="flex min-w-0 gap-x-4">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{contact.user_name}</p>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default Contacts