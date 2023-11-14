import { Link } from "react-router-dom";
import {TbMessages} from "react-icons/tb"
import {RiContactsLine, RiContactsBook2Line} from "react-icons/ri"


const Sidebar = ({logout, isVisible}) => {
    return (
        <nav className={`fixed top-0 left-0 h-screen w-16 flex flex-col bg-secondary-default  shadow-lg transition-transform transform ${isVisible ? '' : '-translate-x-full'}`}>
            <ul className="space-y-2">
                <SidebarIcon route="chats" icon={<TbMessages size="28"/>} text={"Chats"}/>
                <SidebarIcon route="contacts" icon={<RiContactsBook2Line size="28"/>} text={"Contacts"}/>
                <SidebarIcon route="profile" icon={<RiContactsLine size="28"/>} text={"Profile"}/>
            </ul>
            <button onClick={logout} className="flex fixed bottom-1 items-center justify-center h-12 w-16 mx-auto
        bg-white hover:bg-primary text-primary hover:text-white
        hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear
        cursor-pointer shadow-lg">Logout</button>
        </nav>
    )
}

const SidebarIcon = ({route, icon, text}) => {
    return (
        <Link to={`/${route}`} className="relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto
        bg-white hover:bg-primary text-primary hover:text-white
        hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear
        cursor-pointer shadow-lg group">
            {icon}
            <span className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
            text-white bg-secondary-dark text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100"
            >
                {text}
            </span>
        </Link>
    )
}

export default Sidebar