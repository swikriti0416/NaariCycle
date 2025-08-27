import React, { useState } from 'react';

const symptomsList = [
  'Cramps',
  'Headache',
  'Fatigue',
  'Bloating',
  'Breast tenderness',
  'Mood swings',
];
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
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Placeholder: handle save logic here
    alert('Saved!');
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'inherit', fontSize: '18px'  }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Today</h1>
      <form onSubmit={handleSave}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Symptoms</div>
          {symptomsList.map((symptom) => (
            <div key={symptom} style={{ marginBottom: 8 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#831a3bff' }}>
                <input
                  type="checkbox"
                  checked={symptoms.includes(symptom)}
                  onChange={() => handleSymptomChange(symptom)}
                  style={{ accentColor: '#63092eff' }}
                />
                {symptom}
              </label>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Mood</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {moods.map((m) => (
              <button
                type="button"
                key={m}
                onClick={() => setMood(m)}
                style={{
                  border: '1px solid #e5e7eb',
                  background: mood === m ? '#f3e8ff' : 'transparent',
                  color: '#831a3bff',
                  borderRadius: 8,
                  padding: '6px 18px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '18px' 
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Flow</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {flows.map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => setFlow(f)}
                style={{
                  border: '1px solid #e5e7eb',
                  background: flow === f ? '#f3e8ff' : 'transparent',
                  color: '#831a3bff',
                  borderRadius: 8,
                  padding: '6px 18px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '18px' 
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Pain</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {pains.map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setPain(p)}
                style={{
                  border: '1px solid #e5e7eb',
                  background: pain === p ? '#f3e8ff' : 'transparent',
                  color: '#831a3bff',
                  borderRadius: 8,
                  padding: '6px 18px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '18px' 
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
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
              fontSize: '18px' ,
              marginBottom: 8,
              resize: 'vertical',
            }}
          />
        </div>
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
              fontSize: '18px',
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