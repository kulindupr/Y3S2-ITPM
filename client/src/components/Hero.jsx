
import { useContext, useRef } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext"

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext)

  const titleRef = useRef(null)
  const locationRef = useRef(null)
  const videoRef = useRef(null)

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    })
    setIsSearched(true)
  }

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="relative overflow-hidden rounded-xl mx-2">
        {/* Video Background */}
        <video ref={videoRef} autoPlay loop muted className="absolute w-full h-full object-cover">
          <source src={assets.about} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-purple-900/70"></div>

        {/* Hero Content */}
        <div className="relative text-white py-16 text-center z-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">Find Your Dream Internship</h2>
          <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
            Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step
            Toward Your Future!
          </p>
          {/* <div className="flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto">
            <div className="flex items-center">
              <img className="h-4 sm:h-5" src={assets.search_icon || "/placeholder.svg"} alt="" />
              <input
                type="text"
                placeholder="Search for jobs"
                className="max-sm:text-xs p-2 rounded outline-none w-full"
                ref={titleRef}
              />
            </div>
            <div className="flex items-center">
              <img className="h-4 sm:h-5" src={assets.location_icon || "/placeholder.svg"} alt="" />
              <input
                type="text"
                placeholder="Location"
                className="max-sm:text-xs p-2 rounded outline-none w-full"
                ref={locationRef}
              />
            </div>
            <button onClick={onSearch} className="bg-blue-600 px-6 py-2 rounded text-white m-1">
              Search
            </button>
          </div> */}
        </div>
      </div>

      <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex">
        <div className="flex justify-center gap-10 lg:gap-16 flex-wrap">
          <p className="font-medium">Trusted by</p>
          <img className="h-6" src={assets.microsoft_logo || "/placeholder.svg"} alt="" />
          <img className="h-6" src={assets.walmart_logo || "/placeholder.svg"} alt="" />
          <img className="h-6" src={assets.accenture_logo || "/placeholder.svg"} alt="" />
          <img className="h-6" src={assets.samsung_logo || "/placeholder.svg"} alt="" />
          <img className="h-6" src={assets.amazon_logo || "/placeholder.svg"} alt="" />
          <img className="h-6" src={assets.adobe_logo || "/placeholder.svg"} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Hero
