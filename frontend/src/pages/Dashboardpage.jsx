import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  // States for dynamic data, loading, and error handling
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend on page load
  useEffect(() => {
    const fetchPredictionData = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch("http://localhost:5000/onboarding", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 1, // This should be dynamic based on logged-in user
            avg_cycle_length: 28, // Replace with actual data
            avg_period_length: 5, // Replace with actual data
            previous_dates: ["2024-02-01", "2024-01-01"], // Example dates
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch prediction data");
        }

        const data = await response.json();
        setPredictionData(data); // Update the state with response data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPredictionData();
  }, []);

  // Display loading or error message while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-pink-700 mb-2">Loading...</h1>
          <p className="text-lg text-gray-600">Please wait while we fetch your data.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-pink-50 py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-pink-700 mb-2">Error</h1>
          <p className="text-lg text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-pink-700 mb-2">Your Dashboard</h1>
          <p className="text-gray-600 text-lg">Welcome back! Here's your cycle overview.</p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <div className="bg-white shadow-md rounded-lg text-center p-6">
            <h3 className="text-pink-600 font-semibold mb-3">Next Period</h3>
            <p className="text-xl font-bold text-gray-800 mb-1">
              {predictionData ? new Date(predictionData.predicted_start).toLocaleDateString() : 'Loading...'}
            </p>
            <p className="text-gray-500 text-sm">
              in {predictionData ? Math.round((new Date(predictionData.predicted_start) - new Date()) / (1000 * 60 * 60 * 24)) : '...'} days
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg text-center p-6">
            <h3 className="text-pink-600 font-semibold mb-3">Cycle Day</h3>
            <p className="text-xl font-bold text-gray-800 mb-1">
              {predictionData ? `Day ${predictionData.cycle_day}` : 'Loading...'}
            </p>
            <p className="text-gray-500 text-sm">of 28-day cycle</p>
          </div>

          <div className="bg-white shadow-md rounded-lg text-center p-6">
            <h3 className="text-pink-600 font-semibold mb-3">Ovulation</h3>
            <p className="text-xl font-bold text-gray-800 mb-1">
              {predictionData ? new Date(predictionData.ovulation_date).toLocaleDateString() : 'Loading...'}
            </p>
            <p className="text-gray-500 text-sm">
              {predictionData ? `${Math.round((new Date() - new Date(predictionData.ovulation_date)) / (1000 * 60 * 60 * 24))} days ago` : '...'}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg text-center p-6">
            <h3 className="text-pink-600 font-semibold mb-3">Fertility</h3>
            <p className="text-xl font-bold text-gray-800 mb-1">
              {predictionData ? predictionData.fertility : 'Loading...'}
            </p>
            <p className="text-gray-500 text-sm">{predictionData ? 'Safe period' : '...'}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h2 className="text-pink-600 font-semibold text-2xl mb-6">Quick Actions</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={'/symptoms'}>
              <button className="bg-pink-600 text-white px-6 py-2 rounded-lg shadow hover:bg-pink-700 transition">
                Log Symptoms
              </button>
            </Link>
            <button className="bg-white text-pink-600 border border-pink-600 px-6 py-2 rounded-lg shadow hover:bg-pink-50 transition">
              View Calendar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
