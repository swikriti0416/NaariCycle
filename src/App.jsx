import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import Login from "./components/auth/loginform.jsx";
import Register from "./components/auth/signup.jsx";
import Dashboardpage from "./pages/Dashboardpage.jsx";
import SymptomsPage from "./pages/SymptomsPage.jsx";
import WaterIntake from "./pages/Waterintake.jsx";
import PredictionPage from "./pages/PredictionPage.jsx";
// import HowItWorksPage from "./landing/HowItWorks.jsx";
// import HeroSection from "./landing/HeroSection.jsx";
// import AboutTeam from "./landing/Aboutteam.jsx";
// import FeaturesPage from "./landing/Features.jsx";
// import SignupPage from './components/auth/signup.jsx';  

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} /> 
        <Route path="/dashboard" element={<Dashboardpage />} />
        <Route path="/symptoms" element={<SymptomsPage />} />
        <Route path="/water-intake" element={<WaterIntake />} />
        <Route path="/prediction" element={<PredictionPage />} />
        
        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
