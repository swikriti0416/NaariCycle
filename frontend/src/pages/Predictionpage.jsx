import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // To get state passed from onboarding

const PredictionsPage = () => {
  const location = useLocation();
  const [prediction, setPrediction] = useState(location.state?.prediction || null);

  useEffect(() => {
    if (!prediction) {
      // In case prediction data was not passed directly
      // You could fetch it from the backend or show a loading state.
      // For now, let's assume prediction was passed correctly.
    }
  }, [prediction]);

  if (!prediction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Your Cycle Predictions</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            AI-powered predictions based on your unique cycle patterns using advanced linear regression algorithms
          </p>
        </div>

        {/* Prediction Result */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900">Your Next Period</h2>
          <p className="text-4xl font-bold text-pink-600">
            {new Date(prediction.predicted_start).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-gray-500">Confidence: {prediction.confidence}%</p>
        </div>

        {/* Ovulation Date */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-xl font-semibold text-gray-900">Next Ovulation</h3>
          <p className="text-4xl font-bold text-pink-600">
            {new Date(prediction.ovulation_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionsPage;
