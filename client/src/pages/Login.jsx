import { useState } from "react"
import {TbMessages} from "react-icons/tb"
import {Link} from "react-router-dom"

import Input from "../components/Input"
import Button from "../components/Button"

const Login = ({setAuth}) => {
    const [input, setInput] = useState(
        {
            username: "",
            password: ""
        }
    )

    const handleInput = e => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const login = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:3001/api/auth/login", {
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
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm justify-between">
                <form onSubmit={login} className="space-y-4">
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
                    />
                    <div>
                    <Button type="submit" className={"block w-full"}>Sign in</Button>
                    </div>
                </form>
                <p className="mt-10">Don't have an account? <Link to="/register" className="underline font-semibold">Register Here</Link></p>
            </div>
        </div>
    )

}

export default Login