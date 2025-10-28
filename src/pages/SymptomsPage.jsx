import React, { useState } from 'react';

const symptomsList = ['Cramps', 'Headache', 'Fatigue', 'Bloating', 'Breast tenderness', 'Mood swings'];
const moods = ['Happy', 'Sad', 'Irritable', 'Anxious', 'Energetic', 'Calm'];
const flows = ['Spotting', 'Light', 'Medium', 'Heavy'];
const pains = ['None', 'Mild', 'Moderate', 'Severe'];

export default function SymptomsPage() {
  const [symptoms, setSymptoms] = useState([]);
  const [mood, setMood] = useState('');
  const [flow, setFlow] = useState('');
  const [pain, setPain] = useState('');
  const [notes, setNotes] = useState('');

  const handleSymptomChange = (symptom) => {
    setSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: handle save logic
    alert('Saved!');
  };

  // Reusable button group component
  const ButtonGroup = ({ options, selected, onSelect }) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {options.map(option => (
        <button
          type="button"
          key={option}
          onClick={() => onSelect(option)}
          style={{
            border: '1px solid #e5e7eb',
            background: selected === option ? '#f3e8ff' : 'transparent',
            color: '#831a3bff',
            borderRadius: 8,
            padding: '6px 18px',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: 18,
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'inherit', fontSize: 18 }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Today</h1>
      <form onSubmit={handleSave}>

        {/* Symptoms Section */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Symptoms</div>
          {symptomsList.map(symptom => (
            <label
              key={symptom}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#831a3bff' }}
            >
              <input
                type="checkbox"
                checked={symptoms.includes(symptom)}
                onChange={() => handleSymptomChange(symptom)}
                style={{ accentColor: '#63092eff' }}
              />
              {symptom}
            </label>
          ))}
        </div>

        {/* Mood Section */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Mood</div>
          <ButtonGroup options={moods} selected={mood} onSelect={setMood} />
        </div>

        {/* Flow Section */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Flow</div>
          <ButtonGroup options={flows} selected={flow} onSelect={setFlow} />
        </div>

        {/* Pain Section */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Pain</div>
          <ButtonGroup options={pains} selected={pain} onSelect={setPain} />
        </div>

        {/* Notes Section */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Notes</div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about your day"
            style={{
              width: '100%',
              minHeight: 80,
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 12,
              color: '#161617ff',
              fontSize: 18,
              marginBottom: 8,
              resize: 'vertical',
            }}
          />
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #df266aff, #a78bfa)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 32px',
              fontWeight: 600,
              fontSize: 18,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(167,139,250,0.08)',
            }}
          >
            Save
          </button>
        </div>

      </form>
    </div>
  );
}
