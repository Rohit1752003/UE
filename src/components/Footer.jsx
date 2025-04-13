const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 text-gray-800">
          <div className="col-span-12 lg:col-span-8 space-y-2 text-dark">
            <div className="flex space-x-3">
              {/* SVG icon inline */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                className="h-10 w-10 transition-transform duration-300 hover:scale-110"
              >
                <path
                  d="M10,25 C10,15 20,5 30,5 C40,5 45,15 45,25 C45,35 40,45 30,45 C20,45 10,35 10,25 Z"
                  fill="none"
                  stroke="#00afef"
                  strokeWidth="2"
                />
                <circle cx="30" cy="25" r="5" fill="#00afef" />
                <text x="15" y="35" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="#00afef">
                  UE
                </text>
              </svg>
              <div className="w-fit">
                <p className="text-xs">© {new Date().getFullYear()} Urban Explore LLC All rights reserved.</p>
                <div className="flex flex-wrap">
                  {[
                    "Terms of Use",
                    "Privacy and Cookies Statement",
                    "Cookie consent",
                    "Site Map",
                    "How the site works",
                  ].map((item, i) => (
                    <a
                      key={i}
                      href="#"
                      className="text-[0.8em] md:text-sm font-bold underline mr-2 hover:text-cyan-600 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-[0.7em] md:text-xs w-full space-y-3">
              <p>
                This is the version of our website addressed to speakers of English in India and worldwide. If you are a
                resident of another country or region, please select the appropriate version of Urban Explore for your
                country or region in the drop-down menu.
              </p>
              <p>
                Urban Explore LLC makes no guarantees for availability of prices advertised on our sites and
                applications. Listed prices may require a stay of a particular length or have blackout dates,
                qualifications or other applicable restrictions. Urban Explore LLC is not responsible for any content on
                external web sites that are not owned or operated by Urban Explore. Indicative hotel prices displayed on
                our "Explore" pages are estimates extrapolated from historic pricing data.
              </p>
              <p>
                Urban Explore LLC is not a booking agent or tour operator. When you book with one of our partners,
                please be sure to check their site for a full disclosure of all applicable fees.
              </p>
            </div>
          </div>
          <div className="col-span-8"></div>
        </div>
      </div>
    </div>
  )
}

export default Footer
