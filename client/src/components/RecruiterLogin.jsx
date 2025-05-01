
import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets'
import { AppContext}from '../context/AppContext'
import axios from 'axios'

function RecruiterLogin() {

    const [state,setState]=useState('Login')
    const[name,setName]=useState('')
    const[password,setPassword]=useState('')
    const[email,setEmail]=useState('')

    const[image,setImage]=useState(false)

    const[isTextDataSubmited,setIsTextDataSubmited]=useState(false)

    const {setShowRecruitersLogin,backendUrl}=useContext(AppContext)


    const onSubmitHandler=async(e)=>{
      e.preventDefault()
      if(state=='Sign Up'&& !isTextDataSubmited){
      setIsTextDataSubmited(true)   
    }
    try {
      if(state==='Login'){
        const {data}= await axios.post(backendUrl+'/api/company/login',{
          email,
          password
        })

        if(data.success){
          console.log(data)
      }

    }
  }catch (error) {
      
    }
    


  }

  useEffect(()=>{

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
  }
},[])


    
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
        <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl  text-slate-500 gap-4'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
            <p className='text-sm'>Welcome back! Please Sign in to Continue</p>
          { state=="Sign Up" && isTextDataSubmited 
          ?<>
            <div className='flex items-center gap-4 my-10'>
              <label htmlFor="image">
                <img className='w-16 rounded-full'src={ image ? URL.createObjectURL(image) :assets.upload_area} alt=""/>
                <input onChange={e=>setImage(e.target.files[0])} type='file' id='image' hidden/>
              </label>
              <p>Upload Company <br/> logo</p>
            </div> 
          
          </>
          :<>

          {state !=='Login' && ( 
            <div className='border px-4 py-2 gap-2 rounded-full mt-5 p-4 flex  items-center'>
                <img src={assets.person_icon} alt=""/>
                <input  className="outline-none"onChange ={e=>setName(e.target.value)} value={name} type='text' placeholder='Company Name' required></input>
             </div>) }
           
             <div className='border px-4 py-2 gap-2 rounded-full mt-5 p-4 flex  items-center'>
                <img src={assets.email_icon} alt=""/>
                <input onChange ={e=>setEmail(e.target.value)} value={email} type='text' placeholder='Email' required></input>
             </div>
             <div className='border px-4 py-2 gap-2 rounded-full mt-5 p-4 flex  items-center'>
                <img src={assets.lock_icon} alt=""/>
                <input onChange ={e=>setPassword(e.target.value)} value={password} type='password' placeholder='Password' required></input>
             </div>
        </>
          }

          {state === "Login" && <p className='text-sm gap-2 mt-2 cursor-pointer text-blue-600'>Forgot Password?</p>
          }

                <button type='submit' className='bg-blue-600 text-white  w-full content-center  py-2  rounded-full mt-5    items-center'>
                    {state ==='Login' ? 'login' : isTextDataSubmited ? 'Create Account' :'next'}
                </button>

                {state ==='Login'
               ? <p className='mt-d text-center'>Don't have an account?<span className='text-blue-600 cursor-pointer' onClick={()=>setState("Sign Up")}>Sign Up</span></p>
                :<p className='mt-d text-center'>Aready have an account?<span className='text-blue-600 cursor-pointer'onClick={()=>setState("Login")}>Login</span></p>
              }

              <img onClick={e=> setShowRecruitersLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon}/>
        </form>
        
        
      
    </div>
  )
}

export default RecruiterLogin
