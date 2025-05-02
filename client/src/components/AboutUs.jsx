import React from 'react';
import { assets } from '../assets/assets'; // Import assets.js file

const AboutUs = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
      {/* Background Video */}
      <video 
        className="w-full h-full object-cover "
        src={assets.cover} // Ensure the correct path
        autoPlay 
        loop 
        muted 
      />

      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg max-w-2xl">
          Welcome to Intern Link! We are committed to bridging the gap between students and companies by providing a seamless internship application process. Our platform enables students to browse opportunities, apply, track applications, and receive feedback – all in one place.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
