import React, { useRef } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import JobListing from '../components/JobListing';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";
const Home = () => {
  const jobListingRef = useRef(null);
  const aboutUsRef = useRef(null);  // Reference for About Us section

  const scrollToJobListing = () => {
    // Scroll to the JobListing section
    jobListingRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAboutUs = () => {
    aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar scrollToAboutUs={scrollToAboutUs} />
      <Hero scrollToJobListing={scrollToJobListing} /> {/* Pass the scroll function */}

      {/* Job Listing Section */}
      <div ref={jobListingRef}>
        <JobListing />
      </div>
{/*CV button */}
      <Link to="/cv-form">
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
    Create Your CV
    </button>
      </Link>

      {/* Jobs Button */}
      <div className="text-center my-4">
        <Link to="/internshipForm">
          <button className="btn btn-primary">Jobs</button>
        </Link>
      </div>

      {/* Add space between JobListing and AboutUs */}
      <div className="my-16 md:my-24 lg:my-32"></div> {/* Adjust space based on screen size */}

      {/* About Us Section */}
      <div ref={aboutUsRef}>
        <AboutUs />
      </div>

      {/* Add space between About Us and Footer */}
      <div className="my-16 md:my-24 lg:my-32"></div> {/* This adds margin between AboutUs and Footer */}
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
