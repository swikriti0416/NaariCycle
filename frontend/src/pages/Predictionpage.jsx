"use client";

import { useState } from "react";

const PredictionsPage = () => {
  const [currentCycleDay] = useState(20);
  const [cycleLength] = useState(28);

  const predictions = {
    nextPeriod: { date: "March 15, 2024", daysUntil: 5, confidence: 92 },
    nextOvulation: { date: "March 29, 2024", daysUntil: 19, confidence: 88 },
    fertileWindow: { start: "March 27, 2024", end: "April 1, 2024", daysUntil: 17 },
    currentPhase: {
      name: "Luteal Phase",
      description: "Your body is preparing for your next cycle. You might experience PMS symptoms.",
      color: "#B794F6",
    },
  };

  const cycleHistory = [
    { month: "Feb 2024", length: 29, predicted: 28, accuracy: 96 },
    { month: "Jan 2024", length: 27, predicted: 28, accuracy: 96 },
    { month: "Dec 2023", length: 28, predicted: 28, accuracy: 100 },
    { month: "Nov 2023", length: 30, predicted: 28, accuracy: 93 },
    { month: "Oct 2023", length: 28, predicted: 29, accuracy: 96 },
  ];

  const getPhaseProgress = () => (currentCycleDay / cycleLength) * 100;

  return (
    <div className="min-h-screen bg-pink-50 py-10">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Your Cycle Predictions</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            AI-powered predictions based on your unique cycle patterns using advanced linear regression algorithms
          </p>
        </div>

        {/* Current Cycle Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Current Cycle Overview</h2>
            <div className="text-gray-500 text-lg">
              Day <span className="text-pink-600 font-bold">{currentCycleDay}</span> of {cycleLength}
            </div>
          </div>

          <div className="mb-6">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${getPhaseProgress()}%`, backgroundColor: predictions.currentPhase.color }}
              ></div>
            </div>
            <div className="text-center text-gray-500 text-sm">{Math.round(getPhaseProgress())}% Complete</div>
          </div>

          <div className="flex items-center gap-6 p-4 bg-pink-100 rounded-lg">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: predictions.currentPhase.color }}
            ></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{predictions.currentPhase.name}</h3>
              <p className="text-gray-600">{predictions.currentPhase.description}</p>
            </div>
          </div>
        </div>

        {/* Predictions Grid */}
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {[
            {
              icon: "🩸",
              title: "Next Period",
              date: predictions.nextPeriod.date,
              daysUntil: predictions.nextPeriod.daysUntil,
              confidence: predictions.nextPeriod.confidence,
            },
            {
              icon: "🥚",
              title: "Next Ovulation",
              date: predictions.nextOvulation.date,
              daysUntil: predictions.nextOvulation.daysUntil,
              confidence: predictions.nextOvulation.confidence,
            },
            {
              icon: "🌸",
              title: "Fertile Window",
              date: `${predictions.fertileWindow.start} - ${predictions.fertileWindow.end}`,
              daysUntil: predictions.fertileWindow.daysUntil,
              confidence: null,
            },
          ].map((p, idx) => (
            <div key={idx} className="bg-white shadow rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{p.title}</h3>
              <div className="text-pink-600 font-bold mb-1">{p.date}</div>
              <div className="text-gray-500 mb-4">{p.daysUntil && `in ${p.daysUntil} days`}</div>
              {p.confidence && (
                <div className="flex items-center gap-3 justify-center">
                  <span className="text-gray-500 text-sm min-w-20">Confidence:</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-pink-600"
                      style={{ width: `${p.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-pink-600 font-semibold min-w-10">{p.confidence}%</span>
                </div>
              )}
              {!p.confidence && (
                <div className="flex justify-between text-gray-500 text-sm mt-4">
                  <span>Current Status:</span>
                  <span className="font-semibold text-gray-900">Low Fertility</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">Personalized Tips</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "💧",
                title: "Stay Hydrated",
                desc: "Increase water intake during your luteal phase to reduce bloating",
              },
              {
                icon: "🧘‍♀️",
                title: "Manage Stress",
                desc: "Practice meditation to help regulate your cycle naturally",
              },
              {
                icon: "🥗",
                title: "Nutrition Focus",
                desc: "Include iron-rich foods in your diet before your period",
              },
            ].map((tip, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="text-3xl mt-1">{tip.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{tip.title}</h4>
                  <p className="text-gray-600 text-sm">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PredictionsPage;
