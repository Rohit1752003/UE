"use client"

import { useState } from "react"
import { Autocomplete } from "@react-google-maps/api"

const Header = ({ setCoordinates }) => {
  const [search, setSearch] = useState(false)
  const [autoComplete, setAutoComplete] = useState(null)

  // Sets new AutoComplete state value after loading seearch result value
  const onLoad = (autoC) => setAutoComplete(autoC)

  // Function that receives and sets new Cordinates for new search location
  const onPlaceChanged = () => {
    // getting 'longitude' and 'latitude' autoComplete search value
    const lat = autoComplete.getPlace().geometry.location.lat()
    const lng = autoComplete.getPlace().geometry.location.lng()

    // Set new corodinates received from autoComplete
    setCoordinates({ lat, lng })
  }

  return (
    <div className="flex items-center w-full p-2 absolute top-0 z-10">
      <div className="flex bg-white justify-between items-center w-full p-3 md:p-4 rounded-sm shadow-md">
        {/* Logo displays only when  */}
        {!search && (
          <div className="flex items-center">
            {/* SVG logo inline */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" className="h-6 sm:h-7 md:h-8">
              <path
                d="M10,25 C10,15 20,5 30,5 C40,5 45,15 45,25 C45,35 40,45 30,45 C20,45 10,35 10,25 Z"
                fill="none"
                stroke="#00afef"
                strokeWidth="2"
              />
              <circle cx="30" cy="25" r="5" fill="#00afef" />
              <text x="55" y="30" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="#00afef">
                Urban Explore
              </text>
            </svg>
          </div>
        )}
        {/* --- */}

        {/* Search Form - Toggle between Hidden and Visible on Mobile, determined by the 'search' state */}
        <div className={`relative w-full md:w-auto md:block ${!search && "hidden"}`}>
          {/* AutoComplte enabled Search Input Field */}
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className="group relative">
              <svg
                className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-sm py-1 md:py-2 pl-10 ring-1 ring-slate-200"
                type="text"
                placeholder="Search Location..."
              />
            </div>
          </Autocomplete>
          {/* --- */}
        </div>
        {/* --- */}

        {/* Search Form Toggle for Mobile Only */}
        <div
          className="cursor-pointer md:hidden p-2 -mr-2"
          // Click Event to toggle Search form state
          onClick={() => (search ? setSearch(false) : setSearch(true))}
        >
          {!search ? (
            // Search Button - Displays when search = false
            <svg
              className="w-5 h-5 transition ease-out duration-1000"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          ) : (
            // Close Search Button - Displays when search = true
            <svg
              className="w-5 h-5 transition ease-out duration-1000"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        {/* --- */}
      </div>
    </div>
  )
}

export default Header
