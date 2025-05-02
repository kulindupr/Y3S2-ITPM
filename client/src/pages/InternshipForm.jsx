import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const InternshipForm = () => {
  const [category, setCategory] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    category: "",
    subcategory: "",
  });
  const { backendUrl } = useContext(AppContext);

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
    setFormData(prev => ({ ...prev, category: e.target.value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hardcoded company details
    const companyDetails = {
      _id: "670e4d25ca9fda8f1bf359b9",
      name: "Tech Solutions Inc",
      email: "hr@techsolutions.com",
      image: "/company-logo.png"
    };

    try {
      const response = await fetch(`${backendUrl}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          companyId: companyDetails,
          date: Date.now()
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Internship posted successfully!");
        // Reset form
        setFormData({
          title: "",
          description: "",
          salary: "",
          location: "",
          category: "",
          subcategory: "",
        });
        setCategory("");
        setSpecializations([]);
      } else {
        toast.error(data.message || "Failed to post internship");
      }
    } catch (error) {
      console.error("Error posting internship:", error);
      toast.error("Failed to post internship. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-5 p-4">
        <div className="bg-gray-50 shadow-lg rounded-lg p-6">
          <h2 className="text-center text-blue-600 text-2xl font-bold mb-4">Post an Internship</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Job Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" 
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
              <input 
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" 
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Salary</label>
              <input 
                type="number" 
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" 
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" 
                required 
                onChange={handleCategoryChange}
                value={category}
              >
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
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" 
                  required
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                >
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
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" 
                rows="3" 
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InternshipForm;