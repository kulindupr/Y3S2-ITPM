import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'

const JobCard = ({internship }) => {

  const naviagate = useNavigate()

  return (
    <div className=' p-6 shadow-lg rounded-lg bg-blue-50'>
        <div className='flex justify-between items center'>
            <img className='h-8'src={assets.company_icon} alt="" />
        </div>
       <h4 className='font-medium text-xl mt-2'>{internship.title}</h4>
       <div className='flex items-center gap-3 mt-2 text-xs '>
        <span className='bg-blue-50 border border-blue-200 px-10 py-1.5 rounded '>{internship.location}</span>
       </div>
       <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{__html:internship.description.slice(0,150)}}></p>
       <div className='mt-4 flex gap-4 text-sm'>
        <button onClick={() => {naviagate(`/apply-job/${internship._id}`); scrollTo(0,0)}} className='cursor-pointer bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white px-4 py-2 rounded'>Apply now</button>
        <button onClick={() => {naviagate(`/apply-job/${internship._id}`); scrollTo(0,0)}} className=' cursor-pointer text-gray-500 border border-gray-500 rounded px-4 py-2'>Learn More</button>
       </div>
    </div>
  )
}

export default JobCard
