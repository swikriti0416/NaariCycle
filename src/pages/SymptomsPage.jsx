import React, { useState } from "react";

const symptomsList = ["Cramps", "Headache", "Fatigue", "Bloating", "Breast tenderness", "Mood swings"];
const moods = ["Happy", "Sad", "Irritable", "Anxious", "Energetic", "Calm"];
const flows = ["Spotting", "Light", "Medium", "Heavy"];
const pains = ["None", "Mild", "Moderate", "Severe"];

export default function SymptomsPage() {
  const [symptoms, setSymptoms] = useState([]);
  const [mood, setMood] = useState("");
  const [flow, setFlow] = useState("");
  const [pain, setPain] = useState("");
  const [notes, setNotes] = useState("");

  const handleSymptomChange = (symptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Saved!");
  };

  // Reusable button group component
  const ButtonGroup = ({ options, selected, onSelect }) => (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={`px-5 py-2 rounded-lg font-medium text-lg border transition ${
            selected === option
              ? "bg-purple-100 text-purple-700 border-purple-300"
              : "bg-transparent text-purple-800 border-gray-300 hover:bg-purple-50"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10 font-sans text-gray-900">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-10">Today</h1>

      <form onSubmit={handleSave} className="space-y-8">

        {/* Symptoms */}
        <div>
          <h2 className="font-semibold mb-3 text-purple-700">Symptoms</h2>
          <div className="flex flex-col gap-2">
            {symptomsList.map((symptom) => (
              <label key={symptom} className="flex items-center gap-3 text-purple-800">
                <input
                  type="checkbox"
                  checked={symptoms.includes(symptom)}
                  onChange={() => handleSymptomChange(symptom)}
                  className="accent-purple-600 w-5 h-5"
                />
                {symptom}
              </label>
            ))}
          </div>
        </div>

        {/* Mood */}
        <div>
          <h2 className="font-semibold mb-3 text-purple-700">Mood</h2>
          <ButtonGroup options={moods} selected={mood} onSelect={setMood} />
        </div>

        {/* Flow */}
        <div>
          <h2 className="font-semibold mb-3 text-purple-700">Flow</h2>
          <ButtonGroup options={flows} selected={flow} onSelect={setFlow} />
        </div>

        {/* Pain */}
        <div>
          <h2 className="font-semibold mb-3 text-purple-700">Pain</h2>
          <ButtonGroup options={pains} selected={pain} onSelect={setPain} />
        </div>

        {/* Notes */}
        <div>
          <h2 className="font-semibold mb-3 text-purple-700">Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about your day"
            className="w-full min-h-20 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-200 resize-y"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-10 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
          >
            Save
          </button>
        </div>

      </form>
    </div>
  );
}
