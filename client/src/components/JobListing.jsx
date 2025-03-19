import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { JobCategories, ITCategories, BusinessCategories, EngineerCategories, internships, assets } from '../assets/assets';
import JobCard from './JobCard';  // Import the JobCard component

const JobListing = () => {
  const { searchFilter, setSearchFilter } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Set the number of items per page

  // Function to get relevant subcategories based on selected category
  const getSubcategories = () => {
    switch (searchFilter.category) {
      case "IT":
        return ITCategories;
      case "BUSINESS AND MANAGEMENT":
        return BusinessCategories;
      case "ENGINEERING":
        return EngineerCategories;
      default:
        return [];
    }
  };

  // Filter internships based on selected category and subcategory
  const filteredInternships = internships.filter((internship) => {
    const matchesCategory = searchFilter.category ? internship.category === searchFilter.category : true;
    const matchesSubcategory = searchFilter.subcategory ? internship.subcategory === searchFilter.subcategory : true;
    return matchesCategory && matchesSubcategory;
  });

  // Calculate the internships to display based on currentPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInternships = filteredInternships.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);

  // Function to change the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 '>
      {/* Sidebar */}
      <div className='w-full lg:w-1/4 bg-blue-50 p-6 shadow-md rounded-lg '>
        {/* Category Filter */}
        <div className='border-b-2 border-gray-300 pb-4 mb-6 '>
          <h4 className='font-semibold text-xl mb-4 underline '>Categories</h4> {/* Category title color */}
          <ul className='space-y-3'>
            {JobCategories.map((category, index) => (
              <li
                key={index}
                className={`cursor-pointer py-3 px-5 rounded-xl transition-all duration-200 hover:bg-blue-200 hover:text-white text-gray-800 ${searchFilter.category === category ? "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 py-2 text-white font-bold" : ""}`}
                onClick={() => setSearchFilter({ category, subcategory: "" })}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Subcategory Filter (Only shows when a category is selected) */}
        {searchFilter.category && getSubcategories().length > 0 && (
          <div className='border-b-2 border-gray-300 pb-4 mb-6'>
            <h4 className='font-semibold text-lg mb-4 underline '>Specializations</h4> {/* Specializations title color */}
            <ul className='space-y-3'>
              {getSubcategories().map((subcategory, index) => (
                <li
                  key={index}
                  className={`cursor-pointer py-3 px-5 rounded-xl transition-all duration-200 hover:bg-blue-200 hover:text-white text-gray-800 ${searchFilter.subcategory === subcategory ? "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 py-2 text-white font-bold" : ""}`}
                  onClick={() => setSearchFilter((prev) => ({ ...prev, subcategory }))}
                >
                  {subcategory}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Job Listings Section */}
      <div className="w-full lg:w-3/4 p-6">
        <h2 className="text-3xl font-semibold">Available Internships</h2>
        <p className="text-gray-600 mt-2">
          Showing results for: <strong>{searchFilter.category || "All Categories"}</strong> {searchFilter.subcategory && `> ${searchFilter.subcategory}`}
        </p>

        {/* Display filtered internships */}
        {filteredInternships.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentInternships.map((internship, index) => (
              <JobCard key={index} internship={internship} />
            ))}
          </div>
        ) : (
          <div className="mt-6 p-6 bg-gray-100 rounded-md text-gray-500 text-center">
            No internships available yet.
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="cursor-pointer mt-6 flex justify-center items-center space-x-4">
            <a href="">
                <img 
                className={`px-4 py-2 `}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                src={assets.left_arrow_icon} alt="" />
            </a>
            {[...Array(totalPages)].map((_, index) => (
              <h1
                key={index}
                className={`px-4 py-2 ${currentPage === index + 1 ? "text-blue-600" : "text-gray-800"}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </h1>
            ))}
            <a href="">
                <img 
                className={`px-4 py-2 `}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                src={assets.right_arrow_icon} alt="" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListing;
