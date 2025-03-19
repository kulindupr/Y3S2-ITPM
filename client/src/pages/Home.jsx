import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import JobListing from '../components/JobListing';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';

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
