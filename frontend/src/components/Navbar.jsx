import { useAuth, useUser, SignOutButton } from "@clerk/clerk-react";
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const location = useLocation();

  // Debug logging
  useEffect(() => {
    console.log("=== NAVBAR AUTH DEBUG ===");
    console.log("isLoaded:", isLoaded);
    console.log("isSignedIn:", isSignedIn);
    console.log("user:", user);
    console.log("user imageUrl:", user?.imageUrl);
    console.log("========================");
  }, [isLoaded, isSignedIn, user]);

  const navData = [
    { label: "Home", to: "hero", route: "/" },
    { label: "Features", to: "Features", route: "/" },
    { label: "How It Works", to: "HowItWorks", route: "/" },
    { label: "Log Symptoms", route: "/symptoms" },
    { label: "Water Intake", route: "/waterintake" },
  ];

  const isHome = location.pathname === "/";
  const fallbackImage = "https://www.gravatar.com/avatar/?d=mp&f=y";

  // Show loading state
  if (!isLoaded) {
    return (
      <nav className="bg-gradient-to-r from-pink-900 to-pink-400 sticky top-0 z-50">
        <div className="flex justify-center items-center py-6 text-white">
          Loading...
        </div>
      </nav>
    );
  }

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
            isHome && to ? (
              <ScrollLink
                key={label}
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
                key={label}
                to={route}
                className="text-white text-base font-medium hover:text-pink-100"
              >
                {label}
              </RouterLink>
            )
          )}
        </div>

        {/* Desktop Auth - WITH DEBUG */}
        <div className="hidden md:flex items-center gap-4">
          {/* Debug indicator - REMOVE AFTER TESTING */}
          
          {isSignedIn ? (
            <div className="relative group">
              <RouterLink to="/dashboard">
                <img
                  src={user?.imageUrl || fallbackImage}
                  alt={user?.firstName || "Profile"}
                  className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-white hover:border-pink-200 transition-all"
                  onError={(e) => {
                    console.error("Image failed to load:", user?.imageUrl);
                    e.target.src = fallbackImage;
                  }}
                />
              </RouterLink>

              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50">
                <SignOutButton>
                  <button className="bg-white text-pink-700 hover:bg-pink-100 text-sm px-4 py-2 rounded-lg shadow-lg transition whitespace-nowrap">
                    Logout
                  </button>
                </SignOutButton>
              </div>
            </div>
          ) : (
            <>
              <RouterLink
                to="/login"
                className="px-5 py-2 text-white font-medium hover:text-pink-100 rounded-lg transition-all duration-200"
              >
                Login
              </RouterLink>
              <RouterLink
                to="/signup"
                className="px-5 py-2 bg-white text-pink-700 rounded-lg font-semibold hover:bg-pink-800 hover:text-white transition-all duration-200 shadow-md"
              >
                Sign Up
              </RouterLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;