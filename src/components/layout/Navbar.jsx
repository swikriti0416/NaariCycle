import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const navData = ['/', '/Features', '/HowItWorks', '/SymptomsPage', '/Waterintake'];
  
  return (
  <nav className="bg-gradient-to-r from-pink-900 to-pink-400 sticky top-0 z-50 ">
    <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
      
      {/* LEFT: Logo */}
      <Link to="/" className="text-white text-3xl font-bold tracking-wide">
        Naaricycle
      </Link>

      {/* MIDDLE: Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        {navData.map((path) => {
          const label = path === '/'
            ? 'Home'
            : path === '/Features'
            ? 'Features'
            : path === '/HowItWorks'
            ? 'How It Works'
            : path === '/SymptomsPage'
            ? 'Log Symptoms'
            : 'Water Intake';

          return (
            <Link
              key={path}
              to={path}
              className={`text-base font-medium transition-all duration-200 ${
                isActive(path)
                  ? 'text-white border-b-2 border-white pb-1'
                  : 'text-white hover:text-pink-100 hover:border-b-2 hover:border-pink-200 pb-1'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* RIGHT: Auth Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          to="/login"
          className="px-5 py-2 text-white font-medium hover:text-pink-800 hover:bg-opacity-10 rounded-lg transition-all duration-200"
        >
          Login
        </Link>
        <Link
          to="/Signup"
          className="px-5 py-2 bg-white text-pink-700 rounded-lg font-semibold hover:bg-pink-800 hover:text-white transition-all duration-200 shadow-md"
        >
          Sign Up
        </Link>
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
          {navData.map((path) => {
            const label = path === '/'
              ? 'Home'
              : path === '/Features'
              ? 'Features'
              : path === '/HowItWorks'
              ? 'How It Works'
              : path === '/SymptomsPage'
              ? 'Log Symptoms'
              : 'Water Intake';
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`block text-white text-base font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive(path)
                    ? 'bg-white text-pink-700'
                    : 'hover:bg-white hover:bg-opacity-20'
                }`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className=" text-white text-center px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-20 transition"
          >
            Login
          </Link>
          <Link
            to="/Signup"
            onClick={() => setIsOpen(false)}
            className=" bg-white text-pink-700 text-center px-3 py-2 rounded-md font-semibold shadow-md"
          >
            Sign Up
          </Link>
        </div>
      </div>
    )}
  </nav>
  );
};

export default Navbar;