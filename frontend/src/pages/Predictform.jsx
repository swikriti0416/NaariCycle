import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, PlusCircle, MinusCircle, Info } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log('🔧 API_BASE_URL:', API_BASE_URL);

export default function OnboardingForm() {
  const [formData, setFormData] = useState({
    avgCycleLength: '28',
    avgPeriodLength: '5',
  });

  const [dateInputs, setDateInputs] = useState(['', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e, index) => {
    const { value } = e.target;
    const newDates = [...dateInputs];
    newDates[index] = value;
    setDateInputs(newDates);
  };

  const handleAddDate = () => {
    if (dateInputs.length < 5) {
      setDateInputs([...dateInputs, '']);
    }
  };

  const handleRemoveDate = (index) => {
    if (dateInputs.length > 2) {
      const newDates = dateInputs.filter((_, i) => i !== index);
      setDateInputs(newDates);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const filteredDates = dateInputs.filter((date) => date !== '');
    if (filteredDates.length < 2) {
      setError('Please provide at least two dates.');
      setIsSubmitting(false);
      return;
    }

    const requestData = {
      user_id: 1,
      avg_cycle_length: formData.avgCycleLength,
      avg_period_length: formData.avgPeriodLength,
      previous_dates: filteredDates,
    };

    const fullUrl = `${API_BASE_URL}/onboarding`;

    console.log('=== 🚀 SUBMISSION DEBUG ===');
    console.log('Full URL:', fullUrl);
    console.log('Request Data:', requestData);
    console.log('========================');

    try {
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      console.log('✅ Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error Response:', errorText);
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Parsed Result:', result);

      if (result.error) {
        throw new Error(result.error);
      }

      navigate('/Predictionpage', { state: { prediction: result.prediction } });
    } catch (error) {
      console.error('❌ Submission error:', error);
      setError(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 mt-10 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl shadow-lg w-full max-w-xl mx-auto border-2xl">
      <h1 className="text-3xl font-semibold mb-6 text-center text-pink-700">
        Tell us about your cycle
      </h1>
      <p className="text-center text-gray-600 mb-6">
        This helps us make accurate predictions.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Average Cycle Length */}
        <div>
          <label htmlFor="avgCycleLength" className="block text-sm font-medium mb-2 text-gray-700">
            Average Cycle Length (days)
          </label>
          <input
            id="avgCycleLength"
            name="avgCycleLength"
            type="number"
            value={formData.avgCycleLength}
            onChange={handleInputChange}
            className="w-full p-3 border border-pink-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            min="1"
          />
          <p className="flex items-start text-xs text-gray-500 mt-1">
            <Info className="w-4 h-4 mr-1 text-gray-400 mt-0.5" />
            The number of days from the start of one period to the start of the next (typically 21–35 days)
          </p>
        </div>

        {/* Average Period Length */}
        <div>
          <label htmlFor="avgPeriodLength" className="block text-sm font-medium mb-2 text-gray-700">
            Average Period Length (days)
          </label>
          <input
            id="avgPeriodLength"
            name="avgPeriodLength"
            type="number"
            value={formData.avgPeriodLength}
            onChange={handleInputChange}
            className="w-full p-3 border border-pink-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            min="1"
          />
          <p className="flex items-start text-xs text-gray-500 mt-1">
            <Info className="w-4 h-4 mr-1 text-gray-400 mt-0.5" />
            How many days your period usually lasts (typically 3–7 days)
          </p>
        </div>

        {/* Previous Period Dates */}
        <div>
          <label htmlFor="previousDates" className="block text-sm font-medium mb-2 text-gray-700">
            Previous Period Start Dates
          </label>
          {dateInputs.map((date, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Calendar className="text-pink-500 w-5 h-5" />
              <input
                type="date"
                value={date}
                onChange={(e) => handleDateChange(e, index)}
                className="w-full p-3 border border-pink-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {dateInputs.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveDate(index)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <MinusCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          {dateInputs.length < 5 && (
            <button
              type="button"
              onClick={handleAddDate}
              className="flex items-center text-pink-600 hover:text-pink-800 mt-2 text-sm font-medium transition"
            >
              <PlusCircle className="w-5 h-5 mr-1" />
              Add another date
            </button>
          )}
          <p className="flex items-start text-xs text-gray-500 mt-2">
            <Info className="w-4 h-4 mr-1 text-gray-400 mt-0.5" />
            Enter at least 2–3 previous period start dates for better predictions. More dates = more accuracy!
          </p>
        </div>

        {error && <div className="text-red-600 p-3 bg-red-50 rounded-md">{error}</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white py-3 rounded-lg shadow-md hover:opacity-90 transition disabled:bg-gray-400"
        >
          {isSubmitting ? 'Submitting...' : 'Generate My Prediction'}
        </button>
      </form>
    </div>
  );
}
