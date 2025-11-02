import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log('🔧 API_BASE_URL:', API_BASE_URL); // This will show on page load

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
    setFormData(prev => ({ ...prev, [name]: value }));
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

    const filteredDates = dateInputs.filter(date => date !== '');

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('✅ Response Status:', response.status);
      console.log('✅ Response URL:', response.url);
      console.log('✅ Response OK:', response.ok);

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

      // Navigate to the predictions page
      navigate('/Predictionpage', { state: { prediction: result.prediction } });

    } catch (error) {
      console.error('❌ Submission error:', error);
      setError(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 bg-white shadow rounded-lg w-full max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Cycle Prediction Setup</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="avgCycleLength" className="block text-sm font-medium mb-2">Average Cycle Length</label>
          <input
            id="avgCycleLength"
            name="avgCycleLength"
            type="number"
            value={formData.avgCycleLength}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none"
            min="1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="avgPeriodLength" className="block text-sm font-medium mb-2">Average Period Length</label>
          <input
            id="avgPeriodLength"
            name="avgPeriodLength"
            type="number"
            value={formData.avgPeriodLength}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none"
            min="1"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="previousDates" className="block text-sm font-medium mb-2">Previous Period Dates</label>
          {dateInputs.map((date, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="date"
                value={date}
                onChange={(e) => handleDateChange(e, index)}
                className="w-full p-3 border rounded-md shadow-sm focus:outline-none"
              />
              {dateInputs.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveDate(index)}
                  className="text-red-500 hover:text-red-700 px-3"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {dateInputs.length < 5 && (
            <button
              type="button"
              onClick={handleAddDate}
              className="text-blue-500 hover:text-blue-700 mt-2"
            >
              + Add another date
            </button>
          )}
        </div>

        {error && <div className="text-red-500 mb-4 p-3 bg-red-50 rounded">{error}</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}