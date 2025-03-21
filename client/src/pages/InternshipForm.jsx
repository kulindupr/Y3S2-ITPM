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
    <Navbar/>
    <div className="container mt-5">
      <div className="card shadow-lg p-4" style={{ backgroundColor: '#f8f9fa' }}>
        <h2 className="text-center text-primary mb-4">Post an Internship</h2>
        <form>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#495057' }}>Company Name</label>
            <input type="text" className="form-control" required style={{ backgroundColor: '#e9ecef' }} />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#495057' }}>City</label>
            <input type="text" className="form-control" required style={{ backgroundColor: '#e9ecef' }} />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#495057' }}>Salary</label>
            <input type="number" className="form-control" required style={{ backgroundColor: '#e9ecef' }} />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#495057' }}>Category</label>
            <select className="form-select" required onChange={handleCategoryChange} style={{ backgroundColor: '#e9ecef' }}>
              <option value="">Select Category</option>
              <option value="IT">IT</option>
              <option value="Business and Management">Business and Management</option>
              <option value="Engineering">Engineering</option>
              <option value="Law">Law</option>
            </select>
          </div>
          {category && (
            <div className="mb-3">
              <label className="form-label" style={{ color: '#495057' }}>Specialization</label>
              <select className="form-select" required style={{ backgroundColor: '#e9ecef' }}>
                <option value="">Select Specialization</option>
                {specializations.map((specialization, index) => (
                  <option key={index} value={specialization}>
                    {specialization}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="mb-3">
            <label className="form-label" style={{ color: '#495057' }}>Internship Description</label>
            <textarea className="form-control" rows="3" required style={{ backgroundColor: '#e9ecef' }}></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#495057' }}>Key Responsibilities</label>
            <textarea className="form-control" rows="3" required style={{ backgroundColor: '#e9ecef' }}></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#495057' }}>Skills Required</label>
            <textarea className="form-control" rows="3" required style={{ backgroundColor: '#e9ecef' }}></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#0d6efd', borderColor: '#0d6efd' }}>Submit</button>
        </form>
      </div>
    </div>
          /<Footer/>
    </>
  );
};

export default InternshipForm;