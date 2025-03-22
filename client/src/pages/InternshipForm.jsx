import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const InternshipForm = () => {
  const [category, setCategory] = useState("");
  const [specializations, setSpecializations] = useState([]);

  const specializationOptions = {
    IT: [
      "Software Development",
      "Web Development",
      "Data Science",
      "Cybersecurity",
      "Cloud Computing & DevOps",
      "IT Support & Networking",
      "QA & Testing",
    ],
    "Business and Management": [
      "General Business",
      "Management Consulting",
      "Human Resources(HR)",
      "Marketing & Advertising",
      "Finance & Accounting",
      "Operations & Supply Chain Management",
      "Entrepreneurship & Startup",
      "Project Management",
      "Sales & Business Development",
      "International Business",
    ],
    Engineering: [
      "Mechanical Engineering",
      "Electrical Engineering",
      "Chemical Engineering",
      "Aerospace Engineering",
      "Biomedical Engineering",
      "Industrial & Manufacturing Engineering",
    ],
    Law: [
      "Corporate Law",
      "Criminal Law",
      "International Law",
      "Environmental Law",
    ],
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSpecializations(specializationOptions[e.target.value] || []);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-5 p-4">
        <div className="bg-gray-50 shadow-lg rounded-lg p-6">
          <h2 className="text-center text-blue-600 text-2xl font-bold mb-4">Post an Internship</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Salary</label>
              <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" required onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                <option value="IT">IT</option>
                <option value="Business and Management">Business and Management</option>
                <option value="Engineering">Engineering</option>
                <option value="Law">Law</option>
              </select>
            </div>
            {category && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Specialization</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" required>
                  <option value="">Select Specialization</option>
                  {specializations.map((specialization, index) => (
                    <option key={index} value={specialization}>
                      {specialization}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Internship Description</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" rows="3" required></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Key Responsibilities</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" rows="3" required></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Skills Required</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" rows="3" required></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InternshipForm;