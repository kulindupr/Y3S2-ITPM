"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { useUser } from "@clerk/clerk-react"
import { toast } from "react-toastify"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Loading from "../components/Loading"
import { assets } from "../assets/assets"

const ApplyJobForm = ({ standalone = false }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useUser()
  const { internships } = useContext(AppContext)
  const [internshipData, setInternshipData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
    coverLetter: "",
    resume: null,
  })

  // Fetch internship details based on ID
  useEffect(() => {
    if (internships.length > 0 && id) {
      const data = internships.find((internship) => internship._id === id)
      if (data) {
        setInternshipData(data)
      } else {
        toast.error("Internship not found")
        navigate("/")
      }
    }
  }, [id, internships, navigate])

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      }))
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file type (PDF, DOCX)
      const fileType = file.type
      if (
        fileType !== "application/pdf" &&
        fileType !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        toast.error("Please upload a PDF or DOCX file")
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB")
        return
      }

      setFormData((prev) => ({
        ...prev,
        resume: file,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.education || !formData.resume) {
      toast.error("Please fill all required fields")
      return
    }

    setLoading(true)

    try {
      // Create form data for file upload
      const applicationData = new FormData()
      applicationData.append("internshipId", id)
      applicationData.append("userId", user.id)
      applicationData.append("fullName", formData.fullName)
      applicationData.append("email", formData.email)
      applicationData.append("phone", formData.phone)
      applicationData.append("education", formData.education)
      applicationData.append("experience", formData.experience)
      applicationData.append("skills", formData.skills)
      applicationData.append("coverLetter", formData.coverLetter)
      applicationData.append("resume", formData.resume)

      // Mock API call - replace with actual API endpoint
      console.log("Submitting application:", applicationData)

      // Simulate API response
      setTimeout(() => {
        toast.success("Application submitted successfully!")
        navigate("/applications")
        setLoading(false)
      }, 1500)

      // Actual API call would look like:
      // const response = await fetch('/api/applications', {
      //   method: 'POST',
      //   body: applicationData
      // })
      // const data = await response.json()
      // if (data.success) {
      //   toast.success('Application submitted successfully!')
      //   navigate('/applications')
      // } else {
      //   toast.error(data.message || 'Failed to submit application')
      // }
    } catch (error) {
      console.error("Error submitting application:", error)
      toast.error("Failed to submit application. Please try again.")
      setLoading(false)
    }
  }

  if (!internshipData && standalone) return <Loading />

  return (
    <>
      {standalone && <Navbar />}
      <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-lg">
        {/* Form Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Apply for Internship</h1>
          {internshipData && (
            <div className="flex items-center mt-4 space-x-4">
              <img
                src={internshipData.companyId.image || "/placeholder.svg"}
                alt="Company Logo"
                className="h-16 bg-white rounded-lg p-2 border border-gray-100"
              />
              <div>
                <h2 className="text-xl font-semibold">{internshipData.title}</h2>
                <p className="text-gray-600">{internshipData.companyId.name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Education & Experience */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Education & Experience</h3>

            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                Education *
              </label>
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Enter your educational background (degree, institution, graduation year)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Work Experience
              </label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your relevant work experience"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., JavaScript, React, Node.js"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Cover Letter & Resume */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Cover Letter & Resume</h3>

            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={5}
                placeholder="Why are you interested in this position? What makes you a good fit?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                Resume/CV (PDF or DOCX) *
              </label>
              <div className="flex items-center space-x-4">
                <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors">
                  <span className="flex items-center">
                    <img src={assets.upload_icon || "/upload-icon.svg"} alt="Upload" className="w-5 h-5 mr-2" />
                    {formData.resume ? "Change File" : "Select File"}
                  </span>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.docx"
                    className="hidden"
                    required={!formData.resume}
                  />
                </label>
                {formData.resume && <span className="text-sm text-gray-600">{formData.resume.name}</span>}
              </div>
              <p className="text-xs text-gray-500 mt-1">Max file size: 5MB. Accepted formats: PDF, DOCX</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto px-6 py-3 bg-blue-500 text-white font-medium rounded-lg border-2 border-blue-500 transition-all duration-300 hover:bg-transparent hover:text-blue-500 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
      {standalone && <Footer />}
    </>
  )
}

export default ApplyJobForm
