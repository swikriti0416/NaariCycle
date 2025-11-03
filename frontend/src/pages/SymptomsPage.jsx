import React, { useState } from "react";
import { toast } from "react-toastify";

const symptomsList = [
  "Cramps",
  "Headache",
  "Fatigue",
  "Bloating",
  "Breast tenderness",
  "Mood swings",
];

const moods = ["Happy", "Sad", "Irritable", "Anxious", "Energetic", "Calm"];
const flows = ["Spotting", "Light", "Medium", "Heavy"];
const pains = ["None", "Mild", "Moderate", "Severe"];

// Reusable button group component
const ButtonGroup = ({ options, selected, onSelect }) => (
  <div className="flex flex-wrap gap-3">
    {options.map((option) => (
      <button
        key={option}
        type="button"
        onClick={() => onSelect(option)}
        className={`px-5 py-2 rounded-lg font-medium text-sm sm:text-base border transition shadow-sm ${
          selected === option
            ? "bg-purple-600 text-white border-purple-600"
            : "bg-white text-purple-700 border-gray-300 hover:bg-purple-50"
        }`}
      >
        {option}
      </button>
    ))}
  </div>
);

export default function SymptomsPage() {
  const [symptoms, setSymptoms] = useState([]);
  const [mood, setMood] = useState("");
  const [flow, setFlow] = useState("");
  const [pain, setPain] = useState("");
  const [notes, setNotes] = useState("");

  const handleSymptomChange = (symptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Your daily record has been saved successfully!')
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 font-sans text-gray-900">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center text-purple-700">
        Daily Health Tracker
      </h1>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Symptoms Section */}
        <Section title="Symptoms">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {symptomsList.map((symptom) => (
              <label
                key={symptom}
                className="flex items-center gap-3 text-purple-800 cursor-pointer"
              >
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
        </Section>

        {/* Mood Section */}
        <Section title="Mood">
          <ButtonGroup options={moods} selected={mood} onSelect={setMood} />
        </Section>

        {/* Flow Section */}
        <Section title="Flow">
          <ButtonGroup options={flows} selected={flow} onSelect={setFlow} />
        </Section>

        {/* Pain Section */}
        <Section title="Pain">
          <ButtonGroup options={pains} selected={pain} onSelect={setPain} />
        </Section>

        {/* Notes Section */}
        <Section title="Notes">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about your day..."
            className="w-full min-h-24 border border-gray-300 rounded-lg p-4 text-base focus:outline-none focus:ring-2 focus:ring-purple-200 resize-y shadow-sm"
          />
        </Section>

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-12 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

// Reusable section wrapper
const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
    <h2 className="font-semibold mb-4 text-xl text-purple-700">{title}</h2>
    {children}
  </div>
);
