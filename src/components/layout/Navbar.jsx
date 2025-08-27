// "use client"

// import { useState } from "react"
// import { Link, useLocation } from "react-router-dom"

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const location = useLocation()

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen)
//   }

//   const isActive = (path) => {
//     return location.pathname === path
//   }

//   return (
//     <nav classNameNameName="bg-white border-b border-gray-100 sticky top-0 z-50">
//       <div classNameNameName="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div classNameNameName="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" classNameNameName="flex items-center space-x-2 text-gray-900 hover:text-pink-600 transition-colors">
//             <span classNameNameName="text-xl font-bold">@naaricycle</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div classNameNameName="hidden md:flex items-center space-x-6">
//             <Link
//               to="/features"
//               classNameNameName={`px-3 py-2 text-sm font-medium transition-colors ${
//                 isActive("/features") ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
//               }`}
//             >
//               Features
//             </Link>
//             <Link
//               to="/how-it-works"
//               classNameNameName={`px-3 py-2 text-sm font-medium transition-colors ${
//                 isActive("/how-it-works") ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
//               }`}
//             >
//               How It Works
//             </Link>
//             <Link
//               to="/log-symptoms"
//               classNameNameName={`px-3 py-2 text-sm font-medium transition-colors ${
//                 isActive("/log-symptoms") ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
//               }`}
//             >
//               Log Symptoms
//             </Link>
//             <Link
//               to="/about"
//               classNameNameName={`px-3 py-2 text-sm font-medium transition-colors ${
//                 isActive("/about") ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
//               }`}
//             >
//               About
//             </Link>
//             <Link
//               to="/blog"
//               classNameNameName={`px-3 py-2 text-sm font-medium transition-colors ${
//                 isActive("/blog") ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
//               }`}
//             >
//               Blog
//             </Link>
//             <Link
//               to="/contact"
//               classNameNameName={`px-3 py-2 text-sm font-medium transition-colors ${
//                 isActive("/contact") ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
//               }`}
//             >
//               Contact
//             </Link>
//           </div>

//           {/* Desktop Action Button */}
//           <div classNameNameName="hidden md:flex items-center">
//             <Link
//               to="/login"
//               classNameNameName="px-4 py-2 text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors"
//             >
//               Login
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={toggleMenu}
//             classNameNameName="md:hidden p-2 rounded-lg text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-colors"
//           >
//             <svg classNameNameName="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               {isMenuOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div classNameNameName="md:hidden py-2 border-t border-gray-100">
//             <div classNameNameName="flex flex-col space-y-1">
//               <Link
//                 to="/features"
//                 classNameNameName={`px-4 py-2 text-sm font-medium transition-colors ${
//                   isActive("/features") ? "text-pink-600 bg-pink-50" : "text-gray-600 hover:text-pink-600"
//                 }`}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Features
//               </Link>
//               <Link
//                 to="/how-it-works"
//                 classNameNameName={`px-4 py-2 text-sm font-medium transition-colors ${
//                   isActive("/how-it-works") ? "text-pink-600 bg-pink-50" : "text-gray-600 hover:text-pink-600"
//                 }`}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 How It Works
//               </Link>
//               <Link
//                 to="/log-symptoms"
//                 classNameNameName={`px-4 py-2 text-sm font-medium transition-colors ${
//                   isActive("/log-symptoms") ? "text-pink-600 bg-pink-50" : "text-gray-600 hover:text-pink-600"
//                 }`}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Log Symptoms
//               </Link>
//               <Link
//                 to="/about"
//                 classNameNameName={`px-4 py-2 text-sm font-medium transition-colors ${
//                   isActive("/about") ? "text-pink-600 bg-pink-50" : "text-gray-600 hover:text-pink-600"
//                 }`}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 About
//               </Link>
//               <Link
//                 to="/blog"
//                 classNameNameName={`px-4 py-2 text-sm font-medium transition-colors ${
//                   isActive("/blog") ? "text-pink-600 bg-pink-50" : "text-gray-600 hover:text-pink-600"
//                 }`}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Blog
//               </Link>
//               <Link
//                 to="/contact"
//                 classNameNameName={`px-4 py-2 text-sm font-medium transition-colors ${
//                   isActive("/contact") ? "text-pink-600 bg-pink-50" : "text-gray-600 hover:text-pink-600"
//                 }`}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Contact
//               </Link>
//               <div classNameNameName="pt-2 border-t border-gray-100">
//                 <Link
//                   to="/login"
//                   classNameNameName="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Login
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }

// export default Navbar

// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import HowItWorks from '../../landing/HowItWorks';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Naaricycle</Link>
        <button className="navbar-toggle" onClick={toggleMenu}>
         {isOpen ? 'X' : "☰"}
        </button>
        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            
            <li><Link to="/Aboutteam" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link to="/Features" onClick={() => setIsOpen(false)}>Features</Link></li>
            <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
            <li><Link to="/Signup" onClick={() => setIsOpen(false)}>Sign Up</Link></li>
            <li><Link to="/HowItWorks" onClick={() => setIsOpen(false)}>How It Works</Link></li>
            <li><Link to="/SymptomsPage" onClick={() => setIsOpen(false)}>Log Symptoms</Link></li>
            <li><Link to="/Waterintake" onClick={() => setIsOpen(false)}>Water Intake</Link></li>

        
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

