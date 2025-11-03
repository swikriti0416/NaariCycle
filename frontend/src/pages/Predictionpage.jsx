import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Heart, TrendingUp, AlertCircle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const PredictionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [prediction, setPrediction] = useState(location.state?.prediction || null);
  const [loading, setLoading] = useState(!prediction);
  const [error, setError] = useState('');

  // Replace this with your auth logic
  const userId = 1; 

  const fetchPrediction = useCallback(async () => {
    if (loading) return; // prevent double fetch
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${API_BASE_URL}/predictions/${userId}`, {
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
  }, [userId, navigate, loading]);

  useEffect(() => {
    if (!prediction) fetchPrediction();
  }, [prediction, fetchPrediction]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your predictions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
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
  }

  if (!prediction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <p className="text-gray-600">No prediction data available.</p>
      </div>
    );
  }

  const daysUntilPeriod = getDaysUntil(prediction.predicted_start);
  const daysUntilOvulation = getDaysUntil(prediction.ovulation_date);

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Your Cycle Predictions</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            AI-powered predictions based on your unique cycle patterns
          </p>
        </div>

        {/* Next Period Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border-t-4 border-pink-500">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-pink-600" />
            <h2 className="text-3xl font-bold text-gray-900">Next Period</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-5xl font-bold text-pink-600 mb-2">{formatDate(prediction.predicted_start)}</p>
              <p className="text-2xl text-gray-600">
                {typeof daysUntilPeriod === 'number'
                  ? daysUntilPeriod > 0
                    ? `In ${daysUntilPeriod} days`
                    : daysUntilPeriod === 0
                      ? 'Today'
                      : `${Math.abs(daysUntilPeriod)} days ago`
                  : '-'}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-700 font-medium">Confidence</span>
                <span className={`text-2xl font-bold ${getConfidenceColor(prediction.confidence)}`}>
                  {prediction.confidence ?? '-'}%
                </span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-700 font-medium">Cycle Day</span>
                <span className="text-2xl font-bold text-purple-600">
                  Day {prediction.cycle_day ?? '-'}
                </span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-700 font-medium">Method</span>
                <span className="text-sm text-gray-600 capitalize">
                  {prediction.method?.replace('_', ' ') ?? '-'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ovulation Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-red-500" />
            <h3 className="text-3xl font-bold text-gray-900">Ovulation</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-lg text-gray-600 mb-2">Next Ovulation Date</p>
              <p className="text-4xl font-bold text-red-500 mb-2">{formatDate(prediction.ovulation_date)}</p>
              <p className="text-xl text-gray-600">
                {typeof daysUntilOvulation === 'number'
                  ? daysUntilOvulation > 0
                    ? `In ${daysUntilOvulation} days`
                    : daysUntilOvulation === 0
                      ? 'Today'
                      : `${Math.abs(daysUntilOvulation)} days ago`
                  : '-'}
              </p>
            </div>

            <div className="flex items-center">
              <div className={`flex-1 p-6 rounded-xl ${getFertilityColor(prediction.fertility_status)}`}>
                <p className="text-sm font-medium mb-2">Fertility Status</p>
                <p className="text-3xl font-bold capitalize">{prediction.fertility_status ?? '-'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cycle Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <h3 className="text-2xl font-bold text-gray-900">Cycle Information</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-2">Average Cycle Length</p>
              <p className="text-4xl font-bold text-blue-600">{prediction.avg_cycle_length ?? '-'} <span className="text-xl">days</span></p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-2">Average Period Length</p>
              <p className="text-4xl font-bold text-purple-600">{prediction.avg_period_length ?? '-'} <span className="text-xl">days</span></p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => navigate('/onboarding')}
            className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition font-medium"
          >
            Update Cycle Data
          </button>
          <button
            onClick={fetchPrediction}
            disabled={loading}
            className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50"
          >
            Refresh Predictions
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionsPage;
