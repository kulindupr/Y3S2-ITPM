import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const  ManageJobs =()=> {

    const navigate=useNavigate();

    const [jobs, setJobs] = useState([]);

    const{backendUrl,companyToken} = useContext(AppContext)
    //functiom=n fetch coompany jobs
    const fetchCompanyJobs = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/company/list-jobs',
                 {headers:{token:companyToken}})


                 if(data.success){
                    setJobs(data.jobsData.reverse())
                    console.log(data.jobsData)
                 }
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    useEffect(() => {
        if (companyToken) {
            fetchCompanyJobs(); // Call the function here
        }
    }, [companyToken])
    
  return (
    <div className='container p-4 max-w-5xl'>
         <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
                <thead>
                    <tr>
                        <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
                        <th className='py-2 px-4 border-b text-left'>Job Title</th>
                        <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
                        <th className='py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
                        <th className='py-2 px-4 border-b text-center'>Applicants</th>
                        <th className='py-2 px-4 border-b text-left'>Visible</th>
                        
                    </tr> 
                    </thead>  
                    <tbody>
                        {jobs.map((job, index) => (
                            <tr key={index} className='text-gar-700'>
                            <td className='py-2 px-4 border-b max-sm:hidden'>{index+1}</td>
                            <td className='py-2 px-4 border-b'>{job.title}</td>
                            <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                            <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
                            <td className='py-2 px-4 text-center border-b '>{job.applicants}</td>
                            <td className='py-2 px-4 border-b '>
                                <input  className='scale-125 ml-4'type="checkbox" />
                            </td>

                            </tr>

                        ))}
                            
                    </tbody>
            </table>

         </div>
         <div className='flex justify-end mt-4'>
            <button onClick={()=>navigate('/dashboard/add-job')} className='bg-black text-white py-2  px-4 rounded cursor-pointer'>Add New Job</button>
         </div>
    </div>
  )
}

export default ManageJobs
