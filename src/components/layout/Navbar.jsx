import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const navData = ['/', '/Features', '/HowItWorks', '/SymptomsPage', '/Waterintake'];
  
  return (
    <nav className="flex items-center justify-center bg-linear-to-r from-pink-700 to-pink-500 sticky top-0 z-50 shadow-lg ">
      <div className="flex h-20">
        <div className="flex items-center gap-80 ">
          {/* LEFT: Logo */}
          <div className="">
            <Link to="/" className="text-white text-3xl font-bold tracking-wide">
              Naaricycle
            </Link>
          </div>

          {/* MIDDLE: Navigation Links */}
          <div className="flex gap-4">
            {navData.map((path) => {
              const label = path === '/' ? 'Home' :
                            path === '/Features' ? 'Features' :
                            path === '/HowItWorks' ? 'How It Works' :
                            path === '/SymptomsPage' ? 'Log Symptoms' :
                            'Water Intake';
              return (
                <Link
                  key={path}
                  to={path}
                  className={`text-md font-medium transition-all duration-300 ${
                    isActive(path) 
                      ? 'text-white border-b-3 border-white ' 
                      : 'text-white hover:text-pink-400 '
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* RIGHT: Auth Buttons */}
          <div className="flex gap-2 ">
            <Link to="/login" className="px-4 py-2 text-white font-medium hover:text-pink-700  transition-all duration-300">
              Login
            </Link>
            <Link to="/Signup" className="px-4 py-2 text-pink-700 rounded-lg font-semibold hover:text-pink-50 transition-all duration-500 ">
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              {navData.map((path) => {
                const label = path === '/' ? 'Home' :
                              path === '/Features' ? 'Features' :
                              path === '/HowItWorks' ? 'How It Works' :
                              path === '/SymptomsPage' ? 'Log Symptoms' :
                              'Water Intake';
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive(path) 
                        ? 'bg-white text-pink-700' 
                        : 'text-white hover:bg-white hover:bg-opacity-20'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-white border-opacity-30 space-y-3">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-white text-center font-medium text-base hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to="/Signup"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 bg-white text-pink-700 rounded-lg font-semibold text-base text-center shadow-md"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;