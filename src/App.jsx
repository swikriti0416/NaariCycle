import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/App.css';
import './styles/global.css';
import Footer from "./components/layout/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import Login from "./components/auth/loginform.jsx";
import Register from "./components/auth/signup.jsx";
import Dashboardpage from "./pages/Dashboardpage.jsx";
import SymptomsPage from "./pages/SymptomsPage.jsx";
import HowItWorksPage from "./landing/HowItWorks.jsx";
import HeroSection from "./landing/HeroSection.jsx";
import WaterIntake from "./pages/Waterintake.jsx";


function App() {
  return (
    <Router>
      <main className="mt-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/dashboard" element={<Dashboardpage />} />
          <Route path="/symptoms" element={<SymptomsPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/water-intake" element={<WaterIntake />} />
          <Route path="/prediction" element={<div>Prediction Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/blog" element={<div>Blog Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="/features" element={<div>Features Page</div>} />
          <Route path="/privacy" element={<div>Privacy Policy Page</div>} />
          <Route path="/terms" element={<div>Terms of Use Page</div>} />
          <Route path="/security" element={<div>Security Page</div>} />
        
        </Routes>
      </main>
      <Footer />  
    </Router>
  );
}

export default App;
