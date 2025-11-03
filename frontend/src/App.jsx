import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/auth/loginpage.jsx";
import Register from "./pages/auth/signup.jsx";
import Dashboardpage from "./pages/Dashboardpage.jsx";
import SymptomsPage from "./pages/SymptomsPage.jsx";
import WaterIntake from "./pages/Waterintake.jsx";
import PredictionsPage from './pages/Predictionpage.jsx';
import Predictform from './pages/Predictform.jsx';
import { useAuth0 } from '@auth0/auth0-react';

// 🔒 ProtectedRoute Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// 🌐 PublicRoute Component
function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// 🌟 Main App Component
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboardpage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/symptoms"
          element={
            <ProtectedRoute>
              <SymptomsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/waterintake"
          element={
            <ProtectedRoute>
              <WaterIntake />
            </ProtectedRoute>
          }
        />
        <Route
          path="/prediction"
          element={
            <ProtectedRoute>
              <Predictform />
            </ProtectedRoute>
          }
        />

        <Route
          path="/predictionpage"
          element={
            <PublicRoute>
              <PredictionsPage />
            </PublicRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
