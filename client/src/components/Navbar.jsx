import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = ({ scrollToAboutUs }) => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const {setShowRecruitersLogin} = useContext(AppContext)
  const handleAboutClick = () =>{
    if(window.location.pathname !== '/') {
      navigate('/');
    }

    setTimeout(() => {
      if(scrollToAboutUs) {
        scrollToAboutUs();
      }
    },100)
  }

  return (
    <div className="shadow py-4 bg-white">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        {/* Logo aligned to the left */}
        <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className="cursor-pointer w-44 h-auto" />
        
        {user ? (
          <div className='flex items-center gap-6'>
            {/* "About Us" as a styled clickable text link */}
            <p
              className="cursor-pointer text-gray-700 font-semibold hover:text-blue-600 transition-all duration-300"
              onClick={handleAboutClick}
            >
              About Us
            </p>

            {/* Applied Jobs link */}
            <Link
              to="/applications"
              className="text-gray-700 font-semibold hover:text-blue-600 transition-all duration-300"
            >
              Applied Jobs
            </Link>

            {/* Applied Jobs link */}
            <Link
              to="/aiAsistant"
              className="text-gray-700 font-semibold hover:text-blue-600 transition-all duration-300"
            >
              Ai Asistant
            </Link>

            <p className="text-gray-600">|</p>

            <p className='max-sm:hidden text-gray-700'>
              Hi, {user.firstName + " " + user.lastName}
            </p>

            {/* User Button */}
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-6 max-sm:text-xs">
            <button onClick={e=>setShowRecruitersLogin(true)} className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
              Recruiter Login
            </button>
            <button
              onClick={() => openSignIn()}
              className="bg-blue-500 text-white px-6 sm:px-9 py-2 rounded-full font-semibold shadow-md hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
