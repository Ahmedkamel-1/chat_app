import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import Sidebar from './Components/Sidebar.jsx'
import MessageContainer from './Components/MessageContainer.jsx'

export const Home = () => {
    const [selectUser, setselectUser] = useState(null)
    const [isSidebarVisible, setisSidebarVisible] = useState(true)
    const handelUserSelect = (user) => {
        setselectUser(user)
        setisSidebarVisible(false)
    }
    const handelShowSidebar = () => {
        setisSidebarVisible(true)
        setselectUser(null)
    }
    return <>
        <div className='flex justify-between min-w-full md:min-w-[550px] md:max-w-[65%]
        px-2 h-[95%] md:h-full
        rounded-xl shadow-lg
        bg-gray-0 bg-clip-padding
        backdrop-filter backdrop-blur-lg
        bg-opacity-0'>
            <div className={`w-full py-2 md:flex ${isSidebarVisible ? '' : 'hidden'}`}>
                <Sidebar onSelectUser={handelUserSelect}/>
            </div>
            <div className={`divider divider-horizontal px-3 md:flex
            ${isSidebarVisible ? '' : 'hidden'} ${selectUser ? 'block' : 'hidden'}`}></div>
            <div className={`flex-auto ${selectUser ? '' : 'hidden md:flex'} bg-gray-200`}>
                <MessageContainer onBackUser={handelShowSidebar}/>
            </div>
        </div>
    </>
}
