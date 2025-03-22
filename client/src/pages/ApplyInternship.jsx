import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const ApplyInternship = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.resume) newErrors.resume = 'Resume is required';
    if (!formData.coverLetter) newErrors.coverLetter = 'Cover letter is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Application submitted successfully!');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Apply for Internship</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {['name', 'email', 'phone'].map((field, index) => (
            <div key={index}>
              <label className="block text-gray-700 font-semibold capitalize">{field}</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Enter your ${field}`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}

          <div>
            <label className="block text-gray-700 font-semibold">Upload Resume (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg cursor-pointer"
            />
            {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Cover Letter</label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="5"
              placeholder="Write your cover letter here..."
            ></textarea>
            {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-all"
          >
            Submit Application
          </motion.button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ApplyInternship;
