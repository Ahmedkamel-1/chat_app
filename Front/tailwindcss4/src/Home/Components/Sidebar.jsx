import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoArrowBackSharp } from "react-icons/io5"
import { BiLogOut } from "react-icons/bi"
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import useConversation from '../../Zustans/useConversation.js'
import { useSocketContext } from '../../context/socketContext.jsx'

const Sidebar = ({ onSelectUser }) => {
    const navigate = useNavigate()
    const {authUser , setAuthUser} = useAuth()
    const [searchinput, setsearchinput] = useState('')
    const [searchUser, setsearchUser] = useState([])
    const [chatUser, setchatUser] = useState([])
    const [loading, setloading] = useState(false)
    const [selectedUserid, setselectedUserid] = useState(null)
    const [newMessageUser, setnewMessageUser] = useState('')
    const {messages , setMessage,selectedConversation,setSelectedConversation } = useConversation()
    const {onlineUser , socket} = useSocketContext()

    const nowOnline = chatUser.map((user)=>(user._id))

    // chats function
    const isOnline = nowOnline.map(userid => onlineUser.includes(userid))

    useEffect(() => {
        socket?.on("newMessage" , (newMessage) => {
        setnewMessageUser(newMessage)
    })
    return () => socket?.off("newMessage")
    }, [socket,messages])

    // show user with u chatted
    useEffect(()=>{
        const chatUserHandler = async()=>{
            setloading(true)
            try {
                const chatters = await axios.get(`/api/user/currentchatters`)
                const data = chatters.data
                if(data.success === false){
                    setloading(false)
                    console.log(data.message)
                }
                setloading(false)
                setchatUser(data)
            } catch (error) {
                setloading(false)
                console.log(error)
            }
        }
        chatUserHandler()
    },[])
    // show user from search result
    const handelSearchSubmit = async(e)=>{
        e.preventDefault()
        setloading(true)
        try {
            const search = await axios.get(`/api/user/search?search=${searchinput}`)
            const data = search.data
            if(data.success === false){
                setloading(false)
                console.log(data.message)
            }
            setloading(false)
            if(data.loading === 0){
                toast.info("User not Found!")
            }else{
                setsearchUser(data)
            }
        } catch (error) {
            setloading(false)
            console.log(error)
        }
    }
    // show which is selected
    const handelUserClick = (user)=>{
        onSelectUser(user)
        setSelectedConversation(user)
        setselectedUserid(user._id)
        setnewMessageUser('')
    }
    // back from search result
    const handelSearchback = () => {
        setsearchUser([])
        setsearchinput('')
    }
    // logout
    const handelLogOut = async() => {
        const confirmLogout = window.prompt("Type 'username' to Logout!")
        if(confirmLogout === authUser.username){
            setloading(true)
        try {
            const logout = await axios.post('/api/auth/logout')
            const data = logout.data
            if(data?.success === false) {
                setloading(false)
                console.log(data?.message)
            }
            toast.info(data?.message)
            localStorage.removeItem('chatapp')
            setAuthUser(null)
            setloading(false)
            navigate('/login')
        } catch (error) {
            setloading(false)
            console.log(error)
        }
        }else{
            toast.info("Logout Cancelled!")
        }
    }
    return <>
        <div className="h-full w-auto px-1">
            <div className="flex justify-between gap-2">
                <form onSubmit={handelSearchSubmit} className='w-auto flex justify-between items-center bg-white rounded-full'>
                    <input value={searchinput} onChange={(e)=>setsearchinput(e.target.value)} type="text" className='px-4 w-auto bg-transparent outline-none rounded-full' placeholder='search user'/>
                    <button className='btn btn-circle bg-sky-700 hover:bg-gray-950'>
                        <FaSearch/>
                    </button>
                </form>
                <img 
                    onClick={()=>navigate(`/profile/${authUser?._id}`)} 
                    src={authUser?.profilepic || "../../../public/user.png"}
                    className='self-center h-12 w-12 hover:scale-110 cursor-pointer'/>
            </div>
            <div className="divider px-3"></div>
            {searchUser?.length > 0 ?(
                <>
                    <div className='min-h-[70%] max-h-[80%] m overflow-y-auto scrollbar'>
                        <div className="w-auto">
                            {searchUser.map((user,index)=>{
                                <div key={user._id}>
                                    <div 
                                        onClick={()=>handelUserClick(user)}
                                        className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer
                                        ${selectedUserid === user?._id? 'bg-sky-500': ''
                                        }`}>
                                            <div className={`avatar ${isOnline[index] ? 'online': ''}`}>
                                                <div className="w-12 h-12 rounded-full">
                                                    <img src={user.profilepic} alt='user.img' />
                                                </div>
                                            </div>
                                            <div className='flex flex-col flex-1'>
                                                <p className='font-bold text-gray-950'>{user.username}</p>
                                            </div>
                                    </div>
                                    <div className="divider divide-solid px-3 h-[1px]"></div>
                                </div>
                            }
                            )}
                        </div>
                    </div>
                    <div className='mt-auto px-1 py-1 flex'>
                        <button onClick={handelSearchback} className='bg-white rounded-full px-2 py-1 self-center'>
                            <IoArrowBackSharp size={25}/>
                        </button>
                    </div>
                </>
            ):(
                <>
                <div className='min-h-[70%] max-h-[80%] m overflow-y-auto scrollbar'>
                    <div className="w-auto">
                        {chatUser.length === 0 ? (
                            <>
                            <div className='font-bold items-center flex flex-col text-xl text-yellow-500'>
                                <h1>Why are you Alone ?!</h1>
                                <h1>Search username to chat Now!</h1>
                            </div>
                            </>
                        ):(
                            <>
                            {chatUser.map((user,index)=>(
                                <div key={user._id}>
                                    <div 
                                        onClick={()=>handelUserClick(user)}
                                        className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer
                                        ${selectedUserid === user?._id? 'bg-sky-500': ''
                                        }`}>
                                            <div className={`avatar ${isOnline[index] ? 'online': ''}`}>
                                                <div className="w-12 h-12 rounded-full">
                                                    <img src={user.profilepic} alt='user.img' />
                                                </div>
                                            </div>
                                            <div className='flex flex-col flex-1'>
                                                <p className='font-bold text-gray-950'>{user.username}</p>
                                            </div>
                                            <div>
                                                { newMessageUser.recieverid === authUser._id && newMessageUser.senderid === user._id ?
                                                <div className="rounded-full bg-green-700 text-sm  text-white px-[4px]">+1</div>:<></>
                                                }
                                                </div>
                                    </div>
                                    <div className="divider divide-solid px-3 h-[1px]"></div>
                                </div>
                            )
                            )}
                            </>
                        )}
                    </div>
                </div>
                <div className='mt-auto px-1 py-1 flex'>
                    <button onClick={handelLogOut} className='hover:bg-red-600 w-10 cursor-pointer hover:text-white rounded-lg'>
                        <BiLogOut size={25}/>
                    </button>
                    <p className='text-sm py-1'>Logout</p>
                </div>
                </>
            )}
        </div>
    </>
}

export default Sidebar