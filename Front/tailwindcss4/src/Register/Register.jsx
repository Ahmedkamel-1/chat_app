import  axios  from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext.jsx'

export const Register = () => {
    const {setAuthUser} = useAuth()
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [inputData, setinputData] = useState({})

    const handelinput = (e)=> {
        setinputData({
            ...inputData , [e.target.id]:e.target.value
        })
    }
    const selectGender = (selectGender)=>{
        setinputData((prev)=>({
            ...prev , gender:selectGender === inputData.gender ? '' : selectGender
        }))
    }
    const handelSubmit = async(e)=> {
        e.preventDefault()
        setloading(true)
        if(inputData.password !== inputData.confirmpassword.toLowerCase()){
            setloading(false)
            return toast.error("Password must match!")
        }
        try {
            const register = await axios.post('/api/auth/register', inputData);
            const data = register.data
            if(!data.success === false) {
                setloading(false)
                toast.error(data.message)
                //console.log(data.message);
            }
            toast.success(data?.message)
            localStorage.setItem('chatapp' , JSON.stringify(data))
            setAuthUser(data)
            setloading(false)
            navigate('/login')
        } catch (error) {
            setloading(false)
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }
    return <>
            <div className="flex flex-col items-center justify-center mix-w-full mx-auto">
                <div className="w-full p-6 rounded-lg shadow-lg bg-gray-0 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                    <h1 className='text-3xl font-bold text-center text-gray-300'>Register 
                    <span className='text-gray-950'>Chatters</span></h1>
                    <form onSubmit={handelSubmit} className='flex flex-col text-black'>
                        <div>
                            <label className='label p-2'><span className='font-bold text-gray-950 text-xl label-text'>FullName :</span></label>
                            <input id="fullname" type="text" onChange={handelinput} placeholder='Enter Full Name' required className='w-full input input-bordered h-10' />
                        </div>
                        <div>
                            <label className='label p-2'><span className='font-bold text-gray-950 text-xl label-text'>UserName :</span></label>
                            <input id="username" type="text" onChange={handelinput} placeholder='username' required className='w-full input input-bordered h-10' />
                        </div>
                        <div>
                            <label className='label p-2'><span className='font-bold text-gray-950 text-xl label-text'>Email :</span></label>
                            <input id="email" type="email" onChange={handelinput} placeholder='Enteryour Email' required className='w-full input input-bordered h-10' />
                        </div>
                        <div>
                            <label className='label p-2'><span className='font-bold text-gray-950 text-xl label-text'>Password :</span></label>
                            <input id="password" type="password" onChange={handelinput} placeholder='Enter your Password' required className='w-full input input-bordered h-10' />
                        </div>
                        <div>
                            <label className='label p-2'><span className='font-bold text-gray-950 text-xl label-text'>Confirm Password :</span></label>
                            <input id="confirmpassword" type="password" onChange={handelinput} placeholder='Confirm Password' required className='w-full input input-bordered h-10' />
                        </div>
                        <div id='gender' className='flex gap-2'>
                            <label className='cursor-pointer label flex gap-2'>
                            <span className='label-text font-semibold text-gray-950'>male</span>
                            <input 
                            onChange={()=>selectGender('male')}
                            checked={inputData.gender === 'male'}
                            type="checkbox" className='checkbox checkbox-info'/>
                            </label>
                            <label className='cursor-pointer label flex gap-2'>
                            <span className='label-text font-semibold text-gray-950'>female</span>
                            <input 
                            onChange={()=>selectGender('female')}
                            checked={inputData.gender === 'female'}
                            type="checkbox" className='checkbox checkbox-info'/>
                            </label>
                        </div>
                        <button type='submit'
                            className='mt-4 self-center w-auto px-2 py-1 bg-gray-950 text-lg hover:bg-gray-900 text-white rounded-lg hover:scale-105 cursor-pointer'>
                        {loading ? "loading.." : "Register"}
                        </button>
                    </form>
                    <div className='pt-2'>
                        <p className='text-sm font-semibold 
                        text-gray-800'>
                            have an account ? 
                            <Link to={'/login'}>
                            <span className='text-gray-950 font-bold underline cursor-pointer hover:text-green-950'>
                            Login Now!</span></Link> 
                        </p>
                    </div>
                </div>
            </div>
    </>
}
