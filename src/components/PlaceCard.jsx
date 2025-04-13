"use client"

import ReactStarsRating from "react-awesome-stars-rating"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

const PlaceCard = ({ place, type }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Add a small delay before showing the card for a staggered effect
    const timeout = setTimeout(
      () => {
        setIsVisible(true)
      },
      place?.animationDelay ? Number.parseFloat(place.animationDelay) * 1000 : 0,
    )

    return () => clearTimeout(timeout)
  }, [place])

  return (
    <>
      {/* Place card is rendered if place prop is received */}
      {place && (
        <div
          className={`group cursor-pointer hover-lift transition-all duration-700 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: place?.animationDelay || "0s" }}
        >
          {/* Place location_id is passed as parameter to place_type (hotels || restaurants || attractions) route for full place details */}
          <Link to={`${type}/${place?.location_id}`}>
            {/* Place Photo is render if found or a default image is renderedas fallback */}
            <div className="overflow-hidden rounded-lg shadow-md">
              <img
                src={
                  place?.photo
                    ? place?.photo?.images?.large?.url
                    : "https://media-cdn.tripadvisor.com/media/photo-s/22/d9/7b/42/this-image-has-been-removed.jpg"
                }
                alt={place?.name}
                className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* --- */}

            <div className="mt-3">
              {/* Place name */}
              <h2 className="font-semibold text-lg group-hover:text-cyan-600 transition-colors duration-300">
                {place?.name}
              </h2>
              {/* --- */}

              {/* Place Rating with place.rating value passed into component to render star rating */}
              <span className="flex items-center mb-2">
                <ReactStarsRating
                  value={Number(place?.rating)}
                  className="flex mr-2"
                  size={20}
                  isEdit={false}
                  primaryColor="#00afef"
                  secondaryColor="#e5e7eb"
                />
                <span className="text-gray-600 text-sm">~ {place?.num_reviews} Reviews</span>
              </span>
              {/* --- */}

              {/* Price level if available */}
              {place?.price_level && <p className="text-sm text-gray-600">{place?.price_level}</p>}

              {/* Location string if available */}
              {place?.location_string && <p className="text-sm text-gray-600 mt-1">{place?.location_string}</p>}

              {/* View details button */}
              <button className="mt-2 text-sm text-cyan-600 hover:text-cyan-800 transition-colors duration-300 flex items-center">
                View Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </Link>
          {/* --- */}
        </div>
      )}
    </>
  )
}

export default PlaceCard
