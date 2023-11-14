import React, { useState } from "react";
import {TbMessages} from "react-icons/tb"
import { Link } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

const Register = ({setAuth}) => {
    const [input, setInput] = useState(
        {
            username: "",
            email: "",
            password: ""
        }
    )

    const handleInput = e => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const register = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:3001/api/auth/register", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(input)
            })

            const parseRes = await res.json()

            if(parseRes.jwtToken) {
                localStorage.setItem("jwtToken", parseRes.jwtToken)
                setAuth(true)
            } else {
                setAuth(false)
            }
        } catch (error) {
            
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <TbMessages size="48"/>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register</h2>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm justify-between">
                <form onSubmit={register} className="space-y-4">
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={handleInput}
                        className={"block w-full"}
                    />
                    <Input
                        type="text"
                        name="username"
                        value={input.username}
                        onChange={handleInput}
                        className={"block w-full"}
                    />
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={handleInput}
                        className={"block w-full"}
                    />
                    <Button type="submit" className={"block w-full"}>Register</Button>
                </form>
                <p className="mt-10">Have an account? <Link to="/login" className="underline font-semibold">Login Here</Link></p>
            </div>
        </div>
    )
}

export default Register