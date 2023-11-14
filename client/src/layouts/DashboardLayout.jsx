import { useState } from "react"
import Sidebar from "../components/Sidebar"
import {PiSidebar} from "react-icons/pi"

const DashboardLayout = ({logout, children}) => {
    const [isVisible, setIsVisible] = useState(true)

    return (
        <div className="flex">
            <Sidebar logout={logout} isVisible={isVisible}/>
            <div className={`flex-grow h-screen ${isVisible? 'ml-16' : ''}`}>
                <button onClick={() => setIsVisible(!isVisible)} className="sm:hidden"><PiSidebar size="48"/></button>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout