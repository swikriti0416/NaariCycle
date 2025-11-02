import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Calendar, Droplets, Heart, TrendingUp, Activity } from "lucide-react";

const DashboardPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's prediction data
  useEffect(() => {
    if (!user) return;

    const fetchPredictionData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/predictions/${user.id}`,
          { headers: { "Content-Type": "application/json" } }
        );

        if (!response.ok) {
          throw new Error("No prediction data found. Please complete onboarding first.");
        }

        const data = await response.json();
        setPredictionData(data.prediction || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictionData();
  }, [user]);

  // Days until a date
  const getDaysUntil = (dateString) => {
    const targetDate = new Date(dateString);
    const today = new Date();
    const diffTime = targetDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Found</h2>
          <p className="text-gray-600 mb-6">{error || "Please complete onboarding to see your dashboard."}</p>
          <button
            onClick={() => navigate("/onboarding")}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Complete Onboarding
          </button>
        </div>
      </div>
    );
  }

  const daysUntilPeriod = getDaysUntil(predictionData.predicted_start);
  const daysUntilOvulation = getDaysUntil(predictionData.ovulation_date);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-3">
            Your Cycle Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Welcome back! Here's your personalized cycle overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {/* Next Period */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-pink-600 font-semibold text-lg">Next Period</h3>
              <Calendar className="w-6 h-6 text-pink-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">{formatDate(predictionData.predicted_start)}</p>
            <p className="text-gray-500">
              {daysUntilPeriod > 0
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
            <p className="text-3xl font-bold text-gray-800 mb-2">Day {predictionData.cycle_day}</p>
            <p className="text-gray-500">of {predictionData.avg_cycle_length}-day cycle</p>
          </div>

          {/* Ovulation */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-blue-600 font-semibold text-lg">Ovulation</h3>
              <Droplets className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">{formatDate(predictionData.ovulation_date)}</p>
            <p className="text-gray-500">
              {daysUntilOvulation > 0
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
                  predictionData.fertility_status
                )}`}
              >
                {predictionData.fertility_status}
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              {predictionData.fertility_status === "low"
                ? "Safe period"
                : predictionData.fertility_status === "high"
                ? "Fertile window"
                : "Approaching fertile window"}
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
            <div className="border-l-4 border-pink-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Confidence Level</p>
              <p className="text-2xl font-bold text-gray-800">{predictionData.confidence}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${predictionData.confidence}%` }}
                ></div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Prediction Method</p>
              <p className="text-2xl font-bold text-gray-800 capitalize">
                {predictionData.method?.replace("_", " ")}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Based on {predictionData.method === "linear_regression" ? "advanced ML algorithm" : "historical cycle data"}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/symptoms")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Log Symptoms
            </button>
            <button
              onClick={() => navigate("/calendar")}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              View Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
