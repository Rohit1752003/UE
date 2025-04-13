"use client"

import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

const WhereTo = () => {
  const [term, setTerm] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const history = useHistory()

  // Animation effect on component mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Form submit handler function - fires on submit
  const handleSubmit = (e) => {
    // Prevent form from reloading page
    e.preventDefault()

    // Route to the search Result page
    // ...passing the form search 'term' state value as url parameter to be received on search result component
    history.push(`/search?location=${term}`)
  }

  // Popular destinations for quick search
  const popularDestinations = ["Mumbai", "Delhi", "Jaipur", "Goa", "Varanasi", "Kerala"]

  return (
    <div className="container mx-auto p-4 relative flex justify-center items-center overflow-hidden">
      {/* Using a gradient background instead of the image */}
      <div
        className={`bg-gradient-to-r from-cyan-500 to-blue-600 w-full md:w-full md:h-[22em] h-[20em] transition-transform duration-700 ${isVisible ? "scale-100" : "scale-110"}`}
      >
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full opacity-10 blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white rounded-full opacity-10 blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl md:text-4xl font-bold opacity-30">
          Discover Amazing Destinations
        </div>
      </div>

      {/* Search Input Field */}
      <div
        className={`absolute w-[85%] md:w-10/12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <form className="relative" onSubmit={handleSubmit}>
          <svg
            className="h-6 w-6 absolute left-3 top-1/4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Where to? Discover amazing destinations..."
            className="bg-white rounded-full w-full pl-12 py-3 shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            value={term}
            // Update form state value onChange of input
            onChange={(e) => setTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cyan-600 text-white px-4 py-1 rounded-full hover:bg-cyan-700 transition-colors duration-300"
          >
            Search
          </button>
        </form>

        {/* Popular destinations */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {popularDestinations.map((destination, index) => (
            <button
              key={index}
              onClick={() => {
                setTerm(destination)
                history.push(`/search?location=${destination}`)
              }}
              className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm hover:bg-cyan-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {destination}
            </button>
          ))}
        </div>
      </div>
      {/* --- */}
    </div>
  )
}

export default WhereTo
