"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar, WhereTo, ToVisit, ToEat, ToStay, Footer } from "../components"
import botb from "../img/botb.svg"

const Home = () => {
  // Home Page Trending in Travel toggle state
  const [toggle, setToggle] = useState({
    toGo: true, // Place to Go state, active by default
    toDo: false, //Things to Do state
    toStay: false, //Places to stay
  })

  // Animation states
  const [animatedSections, setAnimatedSections] = useState({
    hero: false,
    toVisit: false,
    toEat: false,
    toStay: false,
    travelerChoice: false,
    trending: false,
  })

  // Refs for sections
  const toVisitRef = useRef(null)
  const toEatRef = useRef(null)
  const toStayRef = useRef(null)
  const travelerChoiceRef = useRef(null)
  const trendingRef = useRef(null)

  // Traveler's Choice data
  const [travelerChoiceData, setTravelerChoiceData] = useState([
    {
      id: 1,
      title: "Taj Mahal, Agra",
      description: "One of the seven wonders of the world, a symbol of eternal love.",
      image:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      title: "Varanasi Ghats",
      description: "The spiritual capital of India with ancient rituals and traditions.",
      image:
        "https://images.unsplash.com/photo-1561361058-c24cecae35ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmFyYW5hc2l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      title: "Jaipur Pink City",
      description: "Known for its stunning pink architecture and royal heritage.",
      image:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFpcHVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      title: "Kerala Backwaters",
      description: "Serene waterways surrounded by lush greenery and traditional houseboats.",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VyYWxhJTIwYmFja3dhdGVyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  ])

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === toVisitRef.current) {
            setAnimatedSections((prev) => ({ ...prev, toVisit: true }))
          } else if (entry.target === toEatRef.current) {
            setAnimatedSections((prev) => ({ ...prev, toEat: true }))
          } else if (entry.target === toStayRef.current) {
            setAnimatedSections((prev) => ({ ...prev, toStay: true }))
          } else if (entry.target === travelerChoiceRef.current) {
            setAnimatedSections((prev) => ({ ...prev, travelerChoice: true }))
          } else if (entry.target === trendingRef.current) {
            setAnimatedSections((prev) => ({ ...prev, trending: true }))
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    if (toVisitRef.current) observer.observe(toVisitRef.current)
    if (toEatRef.current) observer.observe(toEatRef.current)
    if (toStayRef.current) observer.observe(toStayRef.current)
    if (travelerChoiceRef.current) observer.observe(travelerChoiceRef.current)
    if (trendingRef.current) observer.observe(trendingRef.current)

    // Set hero animation on load
    setTimeout(() => {
      setAnimatedSections((prev) => ({ ...prev, hero: true }))
    }, 300)

    return () => {
      if (toVisitRef.current) observer.unobserve(toVisitRef.current)
      if (toEatRef.current) observer.unobserve(toEatRef.current)
      if (toStayRef.current) observer.unobserve(toStayRef.current)
      if (travelerChoiceRef.current) observer.unobserve(travelerChoiceRef.current)
      if (trendingRef.current) observer.unobserve(trendingRef.current)
    }
  }, [])

  return (
    <>
      {/* Navbar with Sticky property */}
      <Navbar sticky />
      {/* --- */}

      {/* Search Form - Where to */}
      <div className={`transition-opacity duration-700 ${animatedSections.hero ? "opacity-100" : "opacity-0"}`}>
        <WhereTo />
      </div>
      {/* --- */}

      {/* Places to Visit Carousel */}
      <div
        ref={toVisitRef}
        className={`transition-all duration-700 transform ${animatedSections.toVisit ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
      >
        <ToVisit />
      </div>
      {/* --- */}

      {/* Places to Eat Carousel */}
      <div
        ref={toEatRef}
        className={`transition-all duration-700 transform ${animatedSections.toEat ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
      >
        <ToEat />
      </div>
      {/* --- */}

      {/* Places to Stay Carousel */}
      <div
        ref={toStayRef}
        className={`transition-all duration-700 transform ${animatedSections.toStay ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
      >
        <ToStay />
      </div>
      {/* --- */}

      {/* Traveler Choice Section */}
      <div
        ref={travelerChoiceRef}
        className={`bg-gradient-to-r from-cyan-800 to-blue-900 transition-all duration-700 transform ${animatedSections.travelerChoice ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
      >
        <div className="container mx-auto py-12">
          <div className="text-center mb-10">
            <img src={botb || "/placeholder.svg"} alt="" className="h-16 lg:h-20 mb-5 lg:mb-10 mx-auto animate-pulse" />
            <h2 className="text-white font-bold text-2xl md:text-[2.15em]">Travelers' Choice Best of India</h2>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto">
              Discover the most iconic destinations across India, as chosen by millions of travelers worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {travelerChoiceData.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover-lift cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                  <button className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded-full text-sm hover:bg-cyan-700 transition-colors duration-300">
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="rounded-full bg-white hover:bg-gray-100 transition ease-out duration-200 text-cyan-800 font-bold w-fit py-3 px-6 mt-5">
              See All Winners
            </button>
          </div>
        </div>
      </div>
      {/* --- */}

      {/* Trending in Travel Section */}
      <div
        ref={trendingRef}
        className={`container mx-auto px-4 py-10 transition-all duration-700 transform ${animatedSections.trending ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
      >
        <h2 className="font-bold text-lg md:text-2xl my-5">Trending in Travel</h2>
        <div>
          {/* Trending in Travel Toggles */}
          <div className="flex text-sm md:text-base space-x-4 md:space-x-8 whitespace-nowrap overflow-x-auto travel_toggle">
            {/* Places to go toggle */}
            <h3
              className={`${toggle.toGo ? "border-cyan-600 text-cyan-600" : "border-transparent"} font-medium mb-3 border-b-2 pb-1 hover:border-cyan-600 w-fit cursor-pointer transition-all duration-300`}
              // onClick toggle, all items in the 'toggle' state object is set to false while 'toGo' is true
              onClick={() => setToggle({ toGo: true, toDo: false, toStay: false })}
            >
              Places to Go
            </h3>
            {/* --- */}

            {/* Things to Do toggle */}
            <h3
              className={`${toggle.toDo ? "border-cyan-600 text-cyan-600" : "border-transparent"} font-medium mb-3 border-b-2 pb-1 hover:border-cyan-600 w-fit cursor-pointer transition-all duration-300`}
              // onClick toggle, all items in the 'toggle' state object is set to false while 'toDo' is true
              onClick={() => setToggle({ toGo: false, toDo: true, toStay: false })}
            >
              Things to Do
            </h3>
            {/* --- */}

            {/* Places to Stay toggle */}
            <h3
              className={`${toggle.toStay ? "border-cyan-600 text-cyan-600" : "border-transparent"} font-medium mb-3 border-b-2 pb-1 hover:border-cyan-600 w-fit cursor-pointer transition-all duration-300`}
              // onClick toggle, all items in the 'toggle' state object is set to false while 'toStay' is true
              onClick={() => setToggle({ toGo: false, toDo: false, toStay: true })}
            >
              Places to Stay
            </h3>
            {/* --- */}
          </div>
          {/* --- */}
          <div className="transition-all duration-500">
            {/* List of Places to Go - Display only if 'toGo'is true */}
            {toggle.toGo && (
              <div className="grid grid-cols-12 fade-in">
                {/* Mapping through list of items to render */}
                {[
                  "Mumbai Hotels",
                  "Delhi Hotels",
                  "Jaipur Hotels",
                  "Goa Hotels",
                  "Varanasi Hotels",
                  "Agra Hotels",
                  "Udaipur Hotels",
                  "Rishikesh Hotels",
                  "Darjeeling Hotels",
                  "Shimla Hotels",
                  "Kerala Hotels",
                  "Amritsar Hotels",
                  "Kolkata Hotels",
                  "Chennai Hotels",
                  "Bangalore Hotels",
                  "Hyderabad Hotels",
                  "Mysore Hotels",
                  "Pondicherry Hotels",
                  "Manali Hotels",
                  "Kochi Hotels",
                ].map((item, i) => (
                  <a
                    key={i}
                    className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 text-xs md:text-sm font-medium cursor-pointer hover:text-cyan-600 hover:underline mb-1 transition-colors duration-300"
                    href="#"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {item}
                  </a>
                ))}
                {/* --- */}
              </div>
            )}
            {/* --- */}

            {/* List of Things to Do - Displays only if 'toDo' is true */}
            {toggle.toDo && (
              <div className="grid grid-cols-12 fade-in">
                {/* Mapping through List of Items to render */}
                {[
                  "Things to Do in Mumbai",
                  "Things to Do in Delhi",
                  "Things to Do in Jaipur",
                  "Things to Do in Goa",
                  "Things to Do in Varanasi",
                  "Things to Do in Agra",
                  "Things to Do in Udaipur",
                  "Things to Do in Rishikesh",
                  "Things to Do in Darjeeling",
                  "Things to Do in Shimla",
                  "Things to Do in Kerala",
                  "Things to Do in Amritsar",
                  "Things to Do in Kolkata",
                  "Things to Do in Chennai",
                  "Things to Do in Bangalore",
                  "Things to Do in Hyderabad",
                  "Things to Do in Mysore",
                  "Things to Do in Pondicherry",
                  "Things to Do in Manali",
                  "Things to Do in Kochi",
                ].map((item, i) => (
                  <a
                    key={i}
                    className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 text-xs md:text-sm font-medium cursor-pointer hover:text-cyan-600 hover:underline mb-1 transition-colors duration-300"
                    href="#"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {item}
                  </a>
                ))}
                {/* --- */}
              </div>
            )}
            {/* --- */}

            {/* List of Places to Stay - Displays only if 'toStay' is true */}
            {toggle.toStay && (
              <div className="grid grid-cols-12 fade-in">
                {/* Mapping through list of Items to render */}
                {[
                  "Taj Lake Palace, Udaipur",
                  "The Oberoi Amarvilas, Agra",
                  "The Leela Palace, New Delhi",
                  "Umaid Bhawan Palace, Jodhpur",
                  "The Taj Mahal Palace, Mumbai",
                  "Wildflower Hall, Shimla",
                  "The Oberoi Udaivilas, Udaipur",
                  "Rambagh Palace, Jaipur",
                  "The Leela Palace, Udaipur",
                  "ITC Grand Chola, Chennai",
                  "Taj Falaknuma Palace, Hyderabad",
                  "The Oberoi, New Delhi",
                  "Taj Exotica Resort & Spa, Goa",
                  "The Oberoi Cecil, Shimla",
                  "The Oberoi Grand, Kolkata",
                  "Taj Exotica Resort & Spa, Andamans",
                  "The Oberoi Rajvilas, Jaipur",
                  "The Leela, Kovalam",
                  "Taj Exotica Resort & Spa, Maldives",
                  "The Oberoi Vanyavilas, Ranthambhore",
                ].map((item, i) => (
                  <a
                    key={i}
                    className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 text-xs md:text-sm font-medium cursor-pointer hover:text-cyan-600 hover:underline mb-1 transition-colors duration-300"
                    href="#"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {item}
                  </a>
                ))}
                {/* --- */}
              </div>
            )}
            {/* --- */}
          </div>
        </div>
      </div>
      {/* --- */}

      {/* Footer */}
      <Footer />
      {/* --- */}
    </>
  )
}

export default Home
