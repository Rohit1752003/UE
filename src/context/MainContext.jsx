"use client"

import React, { useState, useEffect } from "react"
import { getPlacesByBounds, getPlacesByLatLng } from "../api"
import axios from "axios"

export const MainContext = React.createContext()

export const MainContextProvider = ({ children }) => {
  const [places, setPlaces] = useState()
  const [filteredPlaces, setFilteredPlaces] = useState()
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})
  const [rating, setRating] = useState(0)
  const [type, setType] = useState("restaurants")
  const [isLoading, setIsLoading] = useState(false)
  const [restaurants, setRestaurants] = useState()
  const [hotels, setHotels] = useState()
  const [attractions, setAttractions] = useState()

  // Featured locations in India
  const featuredLocations = [
    { name: "Mumbai", lat: 19.076, lng: 72.8777 },
    { name: "Delhi", lat: 28.6139, lng: 77.209 },
    { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
    { name: "Goa", lat: 15.2993, lng: 74.124 },
    { name: "Varanasi", lat: 25.3176, lng: 82.9739 },
    { name: "Agra", lat: 27.1767, lng: 78.0081 },
  ]

  // Selected location state
  const [selectedLocation, setSelectedLocation] = useState(0)

  // Get Current User Location or use featured location
  useEffect(() => {
    // Try to get user's location
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        // setting coordinates latitude and longitude to the state
        setCoordinates({ lat: latitude, lng: longitude })
      },
      // Fallback to a featured location if user denies location access
      (error) => {
        console.log("Geolocation error or denied, using featured location:", error)
        const location = featuredLocations[selectedLocation]
        setCoordinates({ lat: location.lat, lng: location.lng })
      },
    )

    // Set up interval to rotate through featured locations
    const locationInterval = setInterval(() => {
      setSelectedLocation((prev) => (prev + 1) % featuredLocations.length)
    }, 300000) // Change every 5 minutes

    return () => clearInterval(locationInterval)
  }, [])

  // Update coordinates when selected location changes
  useEffect(() => {
    if (selectedLocation !== null) {
      const location = featuredLocations[selectedLocation]
      // Only update if we're not using user location
      if (!coordinates.userLocation) {
        setCoordinates({ lat: location.lat, lng: location.lng })
      }
    }
  }, [selectedLocation])

  // Get Places for Map View
  useEffect(() => {
    const source = axios.CancelToken.source()
    // Setting loading state to true while data is being fetched
    setIsLoading(true)

    // If bounds state value of southwest - 'sw' and northeast 'ne' is available then the try-catch block is fired
    if (bounds.sw && bounds.ne) {
      try {
        // Calling on the getPlacesByBounds endpoint passing in the type (hotels || attractions || restaurant), bounds and 'source' for error handling and effect cleanup
        getPlacesByBounds(type, bounds.sw, bounds.ne, source).then((data) => {
          // Response 'data' is ready and set to the places state
          setPlaces(data?.filter((place) => place.name))

          // Loading state set back to false - to stop loading, after data is fetched
          setIsLoading(false)
        })
        console.log("All set! ", bounds.sw, bounds.ne)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    // Effect Cleanup
    return () => {
      source.cancel()
    }
  }, [type, bounds])

  // Get Places for Homepage
  useEffect(() => {
    const source = axios.CancelToken.source()
    // Setting loading state to true while data is being fetched
    setIsLoading(true)

    // if coordinates state value latitude 'lat' and longitude 'lng' is found, the try-catch block is fired
    if (coordinates.lat && coordinates.lng) {
      try {
        // Calling on getPlacesByLatLng for 'restaurants' type, passing in parameter for 'limits' & 'min_rating'; and 'source' for error handling and effect cleanup
        getPlacesByLatLng("restaurants", coordinates.lat, coordinates.lng, { limit: 20, min_rating: 4 }, source).then(
          (data) => {
            // Response 'data' received and set to restaurants state filtering out data without 'name' property, 'location_id' === 0
            setRestaurants(data?.filter((restaurant) => restaurant.name && restaurant.location_id != 0))

            // Add animation class to each restaurant
            if (data?.length > 0) {
              const animatedRestaurants = data.map((restaurant, index) => ({
                ...restaurant,
                animationDelay: `${index * 0.1}s`,
              }))
              setRestaurants(animatedRestaurants.filter((restaurant) => restaurant.name && restaurant.location_id != 0))
            }
          },
        )

        // Calling on getPlacesByLatLng for 'attractions' type, passing in parameter for 'limits' & 'min_rating'; and 'source' for error handling and effect cleanup
        getPlacesByLatLng("attractions", coordinates.lat, coordinates.lng, { limit: 20, min_rating: 4 }, source).then(
          (data) => {
            // Response 'data' received and set to attractions state filtering out data without 'name' property, 'location_id' === 0
            if (data?.length > 0) {
              const animatedAttractions = data.map((attraction, index) => ({
                ...attraction,
                animationDelay: `${index * 0.1}s`,
              }))
              setAttractions(
                animatedAttractions.filter(
                  (attraction) => attraction.name && attraction.location_id != 0 && attraction.rating > 0,
                ),
              )
            }
          },
        )

        // Calling on getPlacesByLatLng for 'hotels' type, passing in parameter for 'limits' & 'min_rating'; and 'source' for error handling and effect cleanup
        getPlacesByLatLng("hotels", coordinates.lat, coordinates.lng, { limit: 20, min_rating: 4 }, source).then(
          (data) => {
            // Response 'data' received and set to hotels state filtering out data without 'name' property, 'location_id' === 0
            if (data?.length > 0) {
              const animatedHotels = data.map((hotel, index) => ({
                ...hotel,
                animationDelay: `${index * 0.1}s`,
              }))
              setHotels(animatedHotels.filter((hotel) => hotel.name && hotel.location_id != 0 && hotel.rating > 0))
            }
          },
        )

        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    // Effect Cleanup
    return () => {
      source.cancel()
    }
  }, [coordinates])

  // Get Filtered Places by Rating
  useEffect(() => {
    // Places filter by rating for Map view
    // Set new filteredPlaces on change of 'rating' state
    // filter in only data with 'rating' proper greater than or equal to the selcted rating value
    setFilteredPlaces(places?.filter((place) => Number(place.rating) >= rating))
  }, [rating, places])

  return (
    // Passing State value through main context to children for access
    <MainContext.Provider
      value={{
        places,
        setPlaces,
        coordinates,
        setCoordinates,
        bounds,
        setBounds,
        rating,
        setRating,
        type,
        setType,
        isLoading,
        setIsLoading,
        filteredPlaces,
        attractions,
        restaurants,
        hotels,
        featuredLocations,
        selectedLocation,
        setSelectedLocation,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}
