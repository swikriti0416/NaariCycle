import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navData = [
    { label: 'Home', to: 'hero', route: '/' },  
    { label: 'Features', to: 'Features', route: '/' },
    { label: 'How It Works', to: 'HowItWorks', route: '/' },
    { label: 'Log Symptoms', to: 'symptoms', route: '/symptoms' },
    { label: 'Water Intake', to: 'waterintake', route: '/waterintake' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav className="bg-gradient-to-r from-pink-900 to-pink-400 sticky top-0 z-50">
      <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        <RouterLink
          to="/"
          className="text-white text-3xl font-bold tracking-wide"
          onClick={() => scroll.scrollToTop()}
        >
          Naaricycle
        </RouterLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navData.map(({ label, to, route }) =>
            isHome && to !== 'symptoms' && to !== 'waterintake' ? (
              <ScrollLink
                key={to}
                to={to}
                smooth={true}
                duration={500}
                offset={-70} 
                className="text-white text-base font-medium hover:text-pink-100 cursor-pointer"
              >
                {label}
              </ScrollLink>
            ) : (
              <RouterLink 
                key={to} 
                to={route} 
                className="text-white text-base font-medium hover:text-pink-100"
              >
                {label}
              </RouterLink>
            )
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <RouterLink to="/login" className="px-5 py-2 text-white font-medium hover:text-pink-800 hover:bg-opacity-10 rounded-lg transition-all duration-200">
            Login
          </RouterLink>
          <RouterLink to="/signup" className="px-5 py-2 bg-white text-pink-700 rounded-lg font-semibold hover:bg-pink-800 hover:text-white transition-all duration-200 shadow-md">
            Sign Up
          </RouterLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-pink-600 bg-opacity-90 px-6 py-4">
          <div className="flex flex-col space-y-3">
            {navData.map(({ label, to, route }) =>
              isHome && to !== 'symptoms' && to !== 'waterintake' ? (
                <ScrollLink
                  key={to}
                  to={to}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  onClick={() => setIsOpen(false)}
                  className="block text-white text-base font-medium px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-20 cursor-pointer"
                >
                  {label}
                </ScrollLink>
              ) : (
                <RouterLink
                  key={to}
                  to={route}
                  onClick={() => setIsOpen(false)}
                  className="block text-white text-base font-medium px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-20"
                >
                  {label}
                </RouterLink>
              )
            )}

            <RouterLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-white text-center px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-20 transition"
            >
              Login
            </RouterLink>
            <RouterLink
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="bg-white text-pink-700 text-center px-3 py-2 rounded-md font-semibold shadow-md"
            >
              Sign Up
            </RouterLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;