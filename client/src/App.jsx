import {useState, useEffect} from "react"
import {Route, Navigate, Routes} from "react-router-dom"

import {SocketProvider} from "./contexts/SocketContext"
import { ChatProvider } from "./contexts/ChatContext"

import Login from "./pages/login"
import Register from "./pages/Register"
import Chats from "./pages/Chats"
import Contacts from "./pages/Contacts"
import ContactProfile from "./pages/ContactProfile"
import Profile from "./pages/Profile"
import DashboardLayout from "./layouts/DashboardLayout"
import Users from "./pages/Users"

function App() {
  const [authenticated, setAuthenticated] = useState(false)

  const authCheck = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/check-auth", {
        method: "POST",
        headers: {jwtToken: localStorage.jwtToken}
      })

      const parseRes = await res.json()

      return parseRes
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    authCheck().then((res) => {
      setAuthenticated(res)
    })
  }, [])

  const logout = (e) => {
    e.preventDefault()
    localStorage.clear()
    setAuthenticated(false)
  }

  return (
    <SocketProvider authenticated={authenticated}>
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/login"/>}/>
        <Route exact path="/login" element={!authenticated? <Login setAuth={setAuthenticated}/> : <Navigate replace to="/chats"/>} />
        <Route exact path="/register" element={!authenticated? <Register setAuth={setAuthenticated}/> : <Navigate replace to="/chats"/>} />
        <Route exact path="/chats/:chat_id?" element={authenticated? 
          <DashboardLayout logout={logout}>
            <ChatProvider>
              <Chats/>
            </ChatProvider>
          </DashboardLayout>
          : 
          <Navigate replace to="/login"/>}
        />
        <Route exact path="/chats/create-chat/:user_id" element={authenticated? 
          <DashboardLayout logout={logout}>
            <ChatProvider>
              <Chats/>
            </ChatProvider>
          </DashboardLayout>
          : 
          <Navigate replace to="/login"/>}
        />
        <Route exact path="/contacts" element={authenticated? 
          <DashboardLayout logout={logout}>
            <Contacts/>
          </DashboardLayout>
          : 
          <Navigate replace to="/login"/>}
        />
        <Route exact path="/contacts/:user_id/:is_contact" element={authenticated? 
          <DashboardLayout logout={logout}>
            <ContactProfile/>
          </DashboardLayout>
          : 
          <Navigate replace to="/login"/>}
        />
        <Route exact path="/users" element={authenticated? 
          <DashboardLayout logout={logout}>
            <Users/>
          </DashboardLayout>
          : 
          <Navigate replace to="/login"/>}
        />
        <Route exact path="/profile" element={authenticated? 
          <DashboardLayout logout={logout}>
            <Profile/>
          </DashboardLayout>
          : 
          <Navigate replace to="/login"/>}
        />
      </Routes>
    </SocketProvider>
  )
}

export default App