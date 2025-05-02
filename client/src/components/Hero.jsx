import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const Hero = ({ scrollToJobListing }) => {
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-40 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center text-center md:text-left">
          
          {/* Left Section: Text */}
          <motion.div 
            className="md:w-1/2 text-white z-10"
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Find Your Dream Internship
            </h2>
            <p className="mt-4 text-lg">
              Explore top internships and get hired by the best companies. Start your career with the right opportunity!
            </p>
            <motion.button 
              className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-gray-100 transition duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToJobListing}  // Trigger scroll when clicked
            >
              Browse Internships
            </motion.button>
          </motion.div>

          {/* Right Section: Video */}
          
          
          
            <div className="absolute top-0 left-0 w-full h-full z-0">
              <video
                src={assets.about}
                alt="cover"
                className="object-cover w-full h-full opacity-60"  // Video covers the full area with transparency
                autoPlay 
                loop 
                muted
              />
            </div>
          
        </div>
      </div>

      {/* Trusted Companies Section */}
      <div className='container 2xl:px-20 mx-auto my-10 border border-gray-300 shadow-md p-6 rounded-md flex'>
        <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
          <p className='font-medium'>Trusted by</p>
          <img className='h-6' src={assets.microsoft_logo} alt="Microsoft" />
          <img className='h-6' src={assets.walmart_logo} alt="Walmart" />
          <img className='h-6' src={assets.accenture_logo} alt="Accenture" />
          <img className='h-6' src={assets.samsung_logo} alt="Samsung" />
          <img className='h-6' src={assets.amazon_logo} alt="Amazon" />
          <img className='h-6' src={assets.adobe_logo} alt="Adobe" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
