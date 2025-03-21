import React, { useState } from 'react'
import { assets } from '../assets/assets'

function RecruiterLogin() {

    const [state,setState]=useState('Loging')
    const[name,setName]=useState('')
    const[password,setPassword]=useState('')
    const[email,setEmail]=useState('')

    const[image,setImage]=useState(false)

    const[isNextDataSubmited,setIsNextDataSubmited]=useState(false)
    
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30  flex justify-center items-center'>
        <form className='relative bg-white p-10 rounded-xl  text-slate-500 gap-4'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
            <p className='text-sm'>Welcome back! Please Sign in to Continue</p>
            <>
              {state !=='Login' && ( <div className='border px-4 py-2 gap-2 rounded-full mt-5 p-4 flex  items-center'>
                    <img src={assets.person_icon} alt=""/>
                    <input  className="outline-none"onChange ={e=>setName(e.target.value)} value={name} type='text' placeholder='Company Name' required></input>
                 </div>) }
               
                 <div className='border px-4 py-2 gap-2 rounded-full mt-5 p-4 flex  items-center'>
                    <img src={assets.email_icon} alt=""/>
                    <input onChange ={e=>setEmail(e.target.value)} value={email} type='text' placeholder='Email' required></input>
                 </div>
                 <div className='border px-4 py-2 gap-2 rounded-full mt-5 p-4 flex  items-center'>
                    <img src={assets.lock_icon} alt=""/>
                    <input onChange ={e=>setPassword(e.target.value)} value={password} type='text' placeholder='Password' required></input>
                 </div>
                 <p className='text-sm gap-2 mt-2 cursor-pointer text-blue-600'>Forgot Password?</p>
            </>
                <button className='bg-blue-600 text-white  w-full content-center  py-2  rounded-full mt-5    items-center'>
                    {state ==='Login' ? 'login' : 'Create Account'}
                </button>
        </form>
        
        
      
    </div>
  )
}

export default RecruiterLogin
