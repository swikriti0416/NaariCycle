import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Heart, TrendingUp, AlertCircle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [prediction, setPrediction] = useState(location.state?.prediction || null);
  const [loading, setLoading] = useState(!prediction);
  const [error, setError] = useState('');

  // Replace with your auth/user logic
  const userId = 1;

  const fetchPrediction = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${API_BASE_URL}/predictions`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        if (response.status === 404) {
          setError('No predictions found. Redirecting to onboarding...');
          setTimeout(() => navigate('/onboarding'), 1500);
          return;
        }
        throw new Error(`Failed to fetch prediction: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.prediction || null);
    } catch (err) {
      setError(err.message || 'Failed to load prediction data');
    } finally {
      setLoading(false);
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (!prediction) fetchPrediction();
  }, [prediction, fetchPrediction]);

  // Helpers
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getDaysUntil = (dateString) => {
    if (!dateString) return '-';
    const target = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  };

  const getFertilityColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (!confidence) return 'text-gray-600';
    if (confidence >= 85) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-orange-600';
  };

  // Loading state
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading your predictions...</p>
      </div>
    </div>
  );

  // Error state
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => navigate('/onboarding')}
          className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
        >
          Go to Onboarding
        </button>
      </div>
    </div>
  );

  if (!prediction) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <p className="text-gray-600">No prediction data available.</p>
    </div>
  );

  const daysUntilPeriod = getDaysUntil(prediction.predicted_start);
  const daysUntilOvulation = getDaysUntil(prediction.ovulation_date);

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto max-w-6xl grid gap-10">

        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Your Prediction Result</h1>
        </header>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Next Period Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-pink-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl font-bold text-gray-900">Next Period</h2>
              </div>
              <p className="text-3xl font-bold text-pink-600">{formatDate(prediction.predicted_start)}</p>
              <p className="text-gray-600 mt-2">
                {typeof daysUntilPeriod === 'number'
                  ? daysUntilPeriod > 0 ? `In ${daysUntilPeriod} days`
                    : daysUntilPeriod === 0 ? 'Today'
                      : `${Math.abs(daysUntilPeriod)} days ago`
                  : '-'}
              </p>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-gray-700 font-medium">
                <span>Confidence</span>
                <span className={`font-bold ${getConfidenceColor(prediction.confidence)}`}>{prediction.confidence ?? '-'}%</span>
              </div>
              <div className="flex justify-between text-gray-700 font-medium">
                <span>Cycle Day</span>
                <span className="font-bold text-purple-600">Day {prediction.cycle_day ?? '-'}</span>
              </div>
              <div className="flex justify-between text-gray-700 font-medium">
                <span>Method</span>
                <span className="capitalize">{prediction.method?.replace('_', ' ') ?? '-'}</span>
              </div>
            </div>
          </div>

          {/* Ovulation Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-gray-900">Ovulation</h2>
              </div>
              <p className="text-gray-600 mb-2">Next Ovulation Date</p>
              <p className="text-3xl font-bold text-red-500">{formatDate(prediction.ovulation_date)}</p>
              <p className="text-gray-600 mt-1">
                {typeof daysUntilOvulation === 'number'
                  ? daysUntilOvulation > 0 ? `In ${daysUntilOvulation} days`
                    : daysUntilOvulation === 0 ? 'Today'
                      : `${Math.abs(daysUntilOvulation)} days ago`
                  : '-'}
              </p>
            </div>
            <div className={`mt-6 p-4 rounded-xl text-center ${getFertilityColor(prediction.fertility_status)}`}>
              <p className="text-sm font-medium mb-1">Fertility Status</p>
              <p className="text-2xl font-bold capitalize">{prediction.fertility_status ?? '-'}</p>
            </div>
          </div>

          {/* Cycle Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-900">Cycle Info</h2>
              </div>
              <div className="grid gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-gray-700 mb-1">Average Cycle Length</p>
                  <p className="text-2xl font-bold text-blue-600">{prediction.avg_cycle_length ?? '-'} days</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <p className="text-gray-700 mb-1">Average Period Length</p>
                  <p className="text-2xl font-bold text-purple-600">{prediction.avg_period_length ?? '-'} days</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Actions */}
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => navigate('/prediction')}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition font-medium"
          >
            Update Cycle Data
          </button>
          <button
            onClick={fetchPrediction}
            disabled={loading}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50"
          >
            Refresh Predictions
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
