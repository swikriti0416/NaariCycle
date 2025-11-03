import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Calendar, Droplets, Heart, TrendingUp, Activity, RefreshCw } from "lucide-react";

const DashboardPage = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuth0();
  const navigate = useNavigate();

  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's prediction data
  const fetchPredictionData = async () => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/predictions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include Auth0 token if you need backend auth
          // "Authorization": `Bearer ${await getAccessTokenSilently()}`,
        },
        credentials: "include", // ensures cookies are sent if your backend uses sessions
      }
    );

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to fetch prediction data.");
    }

    const data = await response.json();

    if (!data.prediction) {
      throw new Error("No prediction data found. Please complete onboarding first.");
    }

    setPredictionData(data.prediction);
  } catch (err) {
    setError(err.message);
    setPredictionData(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (isAuthenticated && user) fetchPredictionData();
  }, [isAuthenticated, user]);

  // Days until a date
  const getDaysUntil = (dateString) => {
    if (!dateString) return "-";
    const targetDate = new Date(dateString);
    const today = new Date();
    const diffTime = targetDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return isNaN(date) ? "-" : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Fertility badge color
  const getFertilityColor = (status) => {
    switch (status?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const daysUntilPeriod = getDaysUntil(predictionData?.predicted_start);
  const daysUntilOvulation = getDaysUntil(predictionData?.ovulation_date);
  const fertilityStatus = predictionData?.fertility_status?.toLowerCase() || "-";

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Your Dashboard</h2>
          <p className="text-gray-600">Fetching your cycle data...</p>
        </div>
      </div>
    );
  }

  if (error || !predictionData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-100 to-blue-200 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Found</h2>
          <p className="text-gray-600 mb-6">{error || "Please complete onboarding to see your dashboard."}</p>
          <button
            onClick={() => navigate("/onboarding")}
            className="bg-linear-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Complete Onboarding
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50 py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-purple-600 mb-3">
            Your Cycle Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Welcome back! Here's your personalized cycle overview</p>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={fetchPredictionData}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {/* Next Period */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-pink-600 font-semibold text-lg">Next Period</h3>
              <Calendar className="w-6 h-6 text-pink-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">{formatDate(predictionData?.predicted_start)}</p>
            <p className="text-gray-500">
              {daysUntilPeriod === "-"
                ? "-"
                : daysUntilPeriod > 0
                ? `in ${daysUntilPeriod} days`
                : daysUntilPeriod === 0
                ? "Today!"
                : `${Math.abs(daysUntilPeriod)} days ago`}
            </p>
          </div>

          {/* Cycle Day */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-purple-600 font-semibold text-lg">Cycle Day</h3>
              <Activity className="w-6 h-6 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">Day {predictionData?.cycle_day ?? "-"}</p>
            <p className="text-gray-500">
              of {predictionData?.avg_cycle_length ?? "-"}-day cycle
            </p>
          </div>

          {/* Ovulation */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-blue-600 font-semibold text-lg">Ovulation</h3>
              <Droplets className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">{formatDate(predictionData?.ovulation_date)}</p>
            <p className="text-gray-500">
              {daysUntilOvulation === "-"
                ? "-"
                : daysUntilOvulation > 0
                ? `in ${daysUntilOvulation} days`
                : daysUntilOvulation === 0
                ? "Today!"
                : `${Math.abs(daysUntilOvulation)} days ago`}
            </p>
          </div>

          {/* Fertility */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-green-600 font-semibold text-lg">Fertility</h3>
              <Heart className="w-6 h-6 text-green-500" />
            </div>
            <div className="mb-2">
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getFertilityColor(
                  fertilityStatus
                )}`}
              >
                {fertilityStatus || "-"}
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              {fertilityStatus === "low"
                ? "Safe period"
                : fertilityStatus === "high"
                ? "Fertile window"
                : fertilityStatus === "medium"
                ? "Approaching fertile window"
                : "-"}
            </p>
          </div>
        </div>

        {/* Prediction Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-purple-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Prediction Details</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Predicted Period Start</span>
              <span className="font-semibold text-gray-800">{formatDate(predictionData?.predicted_start)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Predicted Ovulation</span>
              <span className="font-semibold text-gray-800">{formatDate(predictionData?.ovulation_date)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cycle Length</span>
              <span className="font-semibold text-gray-800">{predictionData?.avg_cycle_length ?? "-"} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Period Length</span>
              <span className="font-semibold text-gray-800">{predictionData?.avg_period_length ?? "-"} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cycle Day</span>
              <span className="font-semibold text-gray-800">Day {predictionData?.cycle_day ?? "-"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Prediction Confidence</span>
              <span className="font-semibold text-gray-800">{predictionData?.confidence ?? "-"}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Method</span>
              <span className="font-semibold text-gray-800">{predictionData?.method ?? "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
