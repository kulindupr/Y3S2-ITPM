import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment from 'moment';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import ApplyInternship from './ApplyInternship';

const ApplyJob = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get internship ID from URL
  const [internshipData, setInternshipData] = useState(null);
  const { internships } = useContext(AppContext); // Get internships from context

  // Fetch internship details based on ID
  const fetchInternship = () => {
    const data = internships.find(internship => internship._id === id);
    if (data) {
      setInternshipData(data);
      console.log("Fetched Internship Data:", data);
    }
  };

  useEffect(() => {
    if (internships.length > 0) {
      fetchInternship();
    }
  }, [id, internships]);

  if (!internshipData) return <Loading />; // Show loading until data is fetched

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto my-8 p-6 bg-blue-100 rounded-2xl shadow-lg">
        {/* Company & Job Header */}
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={internshipData.companyId.image}
            alt="Company Logo"
            className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border-gray-100"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{internshipData.title}</h1>
            <div className="flex items-center space-x-10 mt-2 text-gray-600">
              <span className="flex items-center space-x-1">
                <img src={assets.suitcase_icon} alt="Company" className="w-5 h-5" />
                <span>{internshipData.companyId.name}</span>
              </span>
              <span className="flex items-center space-x-1">
                <img src={assets.location_icon} alt="Location" className="w-5 h-5" />
                <span>{internshipData.location}</span>
              </span>
              <span className="flex items-center space-x-1">
                <img src={assets.money_icon} alt="Salary" className="w-5 h-5" />
                <span>CTC: {kconvert.convertTo(internshipData.salary)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Apply Button */}
       <div className="flex justify-between items-center mt-6">
        <button onClick={() => navigate(`/applicationForm/${internshipData._id}`)} className="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg font-medium border-2 border-blue-500 transition-all duration-300 hover:bg-transparent hover:text-blue-500">
           Apply Now
        </button>
          <p className="text-gray-500 text-sm">
            Posted {moment(internshipData.date).fromNow()}
          </p>
        </div>
      </div>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
        <div className='flex flex-col lg:flex-row justify-between items-start'>
        <div className='w-full lg:w-2/3'>
          <h2 className='font-bold text-2xl mb-4'>Internship Description</h2>
          <div className='rich-text' dangerouslySetInnerHTML={{__html:internshipData.description}}></div>
          <button onClick={() => navigate(`/applicationForm/${internshipData._id}`)} className="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg font-medium border-2 border-blue-500 transition-all duration-300 hover:bg-transparent hover:text-blue-500 mt-10">
           Apply Now
        </button>
        </div>
        {/* Right section more jobs */}
        <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
          <h2>More internships from {internshipData.companyId.name}</h2>
          {internships.filter( internship =>internship._id !== internshipData._id && internship.companyId._id === internshipData.companyId._id)
          .filter( internship => true).slice(0,4)
          .map((internship,index) => <JobCard key={index} internship={internship}/> )}
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default ApplyJob;
