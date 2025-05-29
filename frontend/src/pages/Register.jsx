import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import register from "../assets/register.webp"

import { registerUser } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'


const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch= useDispatch();

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(registerUser({name,email,password}))
    }
  return (
   <div className="flex">
        <div className="flex flex-col w-full md:w-1/2 justify-center items-center p-8 md:p-12">
            <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                <div className="flex justify-center mb-6">
                    <h2 className='text-xl font-medium'>Rabbit</h2>
                </div>
                <h2 className='text-2xl font-bold text-center mb-6'>Hey there!👋</h2>
                <p className='text-center mb-6'>Enter your username and password to login</p>
                <div className="mb-4">
                    <label htmlFor="name" className='block text-sm font-semibold mb-2'>Name</label>
                    <input type="text" id="name" value={name}
                    onChange={(e)=> setName(e.target.value)}
                    className='w-full border rounded p-2'
                    placeholder='Enter your Name...'/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className='block text-sm font-semibold mb-2'>Email</label>
                    <input type="email" id="email" value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    className='w-full border rounded p-2'
                    placeholder='Enter your Email Address...'/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className='block text-sm font-semibold mb-2'>Password</label>
                    <input type="password" id="password" value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    className='w-full border rounded p-2'
                    placeholder='Enter your Password...'/>
                </div>
                <button type='submit' className='w-full bg-black text-white p-2 font-semibold rounded-lg hover:bg-gray-800 transition cursor-pointer'>Sign Up </button>
                <p className='mt-6 text-center text-sm'>Don't have an account? <Link to='/login' className='text-blue-500'>Login</Link> </p>
            </form>
        </div>
        <div className="hidden md:block w-1/2 bg-gray-800">
            <div className="h-full flex flex-col justify-center items-center">
                <img src={register} className='w-full h-[750px] object-cover' />
            </div>
        </div>
   </div>
  )
}

export default Register
