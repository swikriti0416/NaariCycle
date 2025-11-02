import { useState } from "react";

export default function WaterIntake() {
  const [waterIntake, setWaterIntake] = useState(0);
  const dailyGoal = 8;

  const addWater = () => waterIntake < dailyGoal && setWaterIntake(waterIntake + 1);
  const removeWater = () => waterIntake > 0 && setWaterIntake(waterIntake - 1);

  const progress = (waterIntake / dailyGoal) * 100;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-semibold text-pink-700">Water Intake</h3>
        <span className="text-gray-500 font-medium text-sm">
          {waterIntake} / {dailyGoal} glasses
        </span>
      </div>

      {/* Bottle Visual */}
      <div className="text-center mb-6">
        <svg width="80" height="120" viewBox="0 0 80 120" className="mx-auto mb-2">
          {/* Bottle outline */}
          <path
            d="M25 20 L25 10 Q25 5 30 5 L50 5 Q55 5 55 10 L55 20 L60 25 Q65 30 65 35 L65 105 Q65 110 60 115 L20 115 Q15 110 15 105 L15 35 Q15 30 20 25 Z"
            fill="none"
            stroke="#db2777"
            strokeWidth="2"
          />
          {/* Water fill */}
          <path
            d={`M20 ${115 - progress * 0.8} L60 ${115 - progress * 0.8} L60 110 Q60 115 55 115 L25 115 Q20 115 20 110 Z`}
            fill="#db2777"
            opacity="0.6"
          />
          {/* Bottle cap */}
          <rect x="30" y="5" width="20" height="8" rx="2" fill="#f472b6" />
        </svg>
        <p className="text-gray-500 text-sm">{Math.round(progress)}% of daily goal</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={removeWater}
          disabled={waterIntake === 0}
          className={`w-10 h-10 rounded-full bg-pink-700 text-white text-xl flex items-center justify-center transition ${
            waterIntake === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-600"
          }`}
        >
          -
        </button>

        <div className="flex gap-2 flex-wrap justify-center">
          {[...Array(dailyGoal)].map((_, index) => (
            <div
              key={index}
              className={`w-7 h-7 rounded-md flex items-center justify-center transition ${
                index < waterIntake ? "bg-pink-700 text-white" : "bg-gray-200"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9L3 7V9H21ZM12 22C17.5 22 22 17.5 22 12H2C2 17.5 6.5 22 12 22Z" />
              </svg>
            </div>
          ))}
        </div>

        <button
          onClick={addWater}
          disabled={waterIntake === dailyGoal}
          className={`w-10 h-10 rounded-full bg-pink-700 text-white text-xl flex items-center justify-center transition ${
            waterIntake === dailyGoal ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-600"
          }`}
        >
          +
        </button>
      </div>

      {/* Congrats message */}
      {waterIntake === dailyGoal && (
        <div className="bg-green-500 text-white font-semibold p-4 rounded-md mb-6 text-center">
          🎉 Great job! You've reached your daily water goal!
        </div>
      )}

      {/* Tips */}
      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-pink-700 font-semibold mb-2">Hydration Tips</h4>
        <ul className="text-gray-500 text-sm list-disc list-inside space-y-1">
          <li>Drink water first thing in the morning</li>
          <li>Keep a water bottle with you</li>
          <li>Set reminders throughout the day</li>
          <li>Eat water-rich foods like fruits</li>
        </ul>
      </div>
    </div>
  );
}
