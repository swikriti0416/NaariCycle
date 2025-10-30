import React, { useState } from 'react';
import { Calendar, Droplets, Clock, ChevronRight, Sparkles, Info } from 'lucide-react';

export default function OnboardingForm() {
  const [formData, setFormData] = useState({
    avgCycleLength: '28',
    avgPeriodLength: '5',
    previousDates: ''
  });
  
  const [dateInputs, setDateInputs] = useState(['', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (index, value) => {
    const newDates = [...dateInputs];
    newDates[index] = value;
    setDateInputs(newDates);
  };

  const addDateInput = () => {
    if (dateInputs.length < 6) {
      setDateInputs([...dateInputs, '']);
    }
  };

  const removeDateInput = (index) => {
    if (dateInputs.length > 2) {
      const newDates = dateInputs.filter((_, i) => i !== index);
      setDateInputs(newDates);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validate dates
    const validDates = dateInputs.filter(date => date.trim() !== '');
    
    if (validDates.length < 2) {
      setError('Please enter at least 2 previous period start dates');
      setIsSubmitting(false);
      return;
    }

    // Prepare data for backend
    const submissionData = {
      user_id: 1, // Replace with actual user ID from auth
      avg_cycle_length: parseInt(formData.avgCycleLength),
      avg_period_length: parseInt(formData.avgPeriodLength),
      previous_dates: validDates.join(', ')
    };

    try {
      // Submit to backend
      const response = await fetch('http://localhost:5000/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      const result = await response.json();
      setPrediction(result.prediction);
      
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (prediction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Setup Complete!</h2>
            <p className="text-gray-600">Your period prediction is ready</p>
          </div>

          <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Next Period</h3>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">
              {new Date(prediction.predicted_start).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            <p className="text-gray-600">
              Confidence: {(prediction.confidence * 100).toFixed(0)}%
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Ovulation Date</p>
              <p className="font-semibold text-gray-800">
                {prediction.ovulation_date ? new Date(prediction.ovulation_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Prediction Method</p>
              <p className="font-semibold text-gray-800 capitalize">
                {prediction.method.replace('_', ' ')}
              </p>
            </div>
          </div>

          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome to NaariCycle
          </h1>
          <p className="text-gray-600 text-lg">
            Let's set up your personalized period tracking
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white">Tell us about your cycle</h2>
            <p className="text-pink-100 mt-1">This helps us make accurate predictions</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Average Cycle Length */}
            <div>
              <label className="flex items-center text-gray-700 font-semibold mb-3">
                <Clock className="w-5 h-5 mr-2 text-purple-500" />
                Average Cycle Length
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="avgCycleLength"
                  value={formData.avgCycleLength}
                  onChange={handleInputChange}
                  min="21"
                  max="45"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:bg-white focus:outline-none transition-all text-gray-800"
                  placeholder="e.g., 28"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  days
                </div>
              </div>
              <div className="mt-2 flex items-start text-sm text-gray-500">
                <Info className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                <p>The number of days from the start of one period to the start of the next (typically 21-35 days)</p>
              </div>
            </div>

            {/* Average Period Length */}
            <div>
              <label className="flex items-center text-gray-700 font-semibold mb-3">
                <Droplets className="w-5 h-5 mr-2 text-pink-500" />
                Average Period Length
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="avgPeriodLength"
                  value={formData.avgPeriodLength}
                  onChange={handleInputChange}
                  min="2"
                  max="10"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:bg-white focus:outline-none transition-all text-gray-800"
                  placeholder="e.g., 5"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  days
                </div>
              </div>
              <div className="mt-2 flex items-start text-sm text-gray-500">
                <Info className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                <p>How many days your period usually lasts (typically 3-7 days)</p>
              </div>
            </div>

            {/* Previous Period Dates */}
            <div>
              <label className="flex items-center text-gray-700 font-semibold mb-3">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Previous Period Start Dates
              </label>
              <div className="space-y-3">
                {dateInputs.map((date, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => handleDateChange(index, e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:bg-white focus:outline-none transition-all text-gray-800"
                      required={index < 2}
                    />
                    {dateInputs.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeDateInput(index)}
                        className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {dateInputs.length < 6 && (
                <button
                  type="button"
                  onClick={addDateInput}
                  className="mt-3 text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center"
                >
                  + Add another date
                </button>
              )}
              <div className="mt-2 flex items-start text-sm text-gray-500">
                <Info className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                <p>Enter at least 2-3 previous period start dates for better predictions. More dates = more accuracy!</p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start">
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">!</span>
                </div>
                <p className="ml-3 text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  Generate My Prediction
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Info Box */}
            <div className="bg-blue-50 border-2 border-blue-100 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                How it works
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• We use advanced Linear Regression to predict your next period</li>
                <li>• You'll get predictions for period dates, ovulation, and fertile window</li>
                <li>• Predictions improve as you log more cycles</li>
              </ul>
            </div>
          </form>
        </div>

        {/* Privacy Note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          🔒 Your data is private and secure. We never share your personal information.
        </p>
      </div>
    </div>
  );
}