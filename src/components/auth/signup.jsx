import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    cycleLength: '',
    periodLength: '',
  });

  // Separate state to handle the string input for dates
  const [dateInput, setDateInput] = useState('');
  // State to store the array of Date objects
  const [previousPeriodStartDates, setPreviousPeriodStartDates] = useState([]);

  const handleDateChange = (e) => {
    const userInput = e.target.value;
    setDateInput(userInput);

    // Process the input string into an array of Date objects
    const dateStrings = userInput.split(',').map(s => s.trim());
    const validDates = dateStrings
      .map(dateString => {
        const date = new Date(dateString);
        // Check if the date is valid
        return isNaN(date.getTime()) ? null : date;
      })
      .filter(date => date !== null); // Filter out any invalid dates

    setPreviousPeriodStartDates(validDates);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Now you can directly use the previousPeriodStartDates array of Date objects
    const submissionData = {
      ...form,
      previousPeriodStartDates,
    };
    console.log('Submitting with Date objects:', submissionData);
    alert('Signup submitted!');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fcf9fd', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1.5rem 2rem 0.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Naaricycle</div>
        <div>
          <Link to="/login" style={{ marginRight: '1rem', color: '#23182a', textDecoration: 'none' }}>Log in</Link>
          <Link to="/signup" style={{ background: '#fc4a65ff', color: '#fff', borderRadius: '8px', padding: '0.5rem 1.2rem', textDecoration: 'none', fontWeight: 500 }}>Sign up</Link>
        </div>
      </header>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '2rem auto 0 auto', background: 'transparent', padding: '2rem 0', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2 style={{ textAlign: 'center', color: '#23182a', marginBottom: '1.5rem' }}>Create your account</h2>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>Name</label>
          <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" style={{ width: '100%', padding: '0.8rem', borderRadius: 8, border: 'none', background: '#f5eaf4', marginBottom: 0 }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>Email</label>
          <input name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" style={{ width: '100%', padding: '0.8rem', borderRadius: 8, border: 'none', background: '#f5eaf4', marginBottom: 0 }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>Password</label>
          <input name="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter your password" style={{ width: '100%', padding: '0.8rem', borderRadius: 8, border: 'none', background: '#f5eaf4', marginBottom: 0 }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>Average Cycle length (in days)</label>
          <input name="cycleLength" type="number" value={form.cycleLength} onChange={(e) => setForm({ ...form, cycleLength: e.target.value })} placeholder="e.g., 28" style={{ width: '100%', padding: '0.8rem', borderRadius: 8, border: 'none', background: '#f5eaf4', marginBottom: 0 }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>Average Period length (in days)</label>
          <input name="periodLength" type="number" value={form.periodLength} onChange={(e) => setForm({ ...form, periodLength: e.target.value })} placeholder="e.g., 5" style={{ width: '100%', padding: '0.8rem', borderRadius: 8, border: 'none', background: '#f5eaf4', marginBottom: 0 }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>Start Dates of Previous Periods</label>
          <input
            name="previousPeriodStartDates"
            value={dateInput}
            onChange={handleDateChange}
            placeholder="YYYY-MM-DD, YYYY-MM-DD, ..."
            style={{ width: '100%', padding: '0.8rem', borderRadius: 8, border: 'none', background: '#f5eaf4', marginBottom: 0 }}
            required
          />
        </div>
        <button type="submit" style={{ background: '#e34474ff', color: '#fff', border: 'none', borderRadius: 10, padding: '1rem', fontWeight: 600, fontSize: '1.1rem', marginTop: '1rem', cursor: 'pointer' }}>Sign up</button>
        <div style={{ textAlign: 'center', color: '#a48bbd', fontSize: 14, marginTop: 8 }}>
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </div>
        <div style={{ textAlign: 'center', marginTop: 8, fontSize: 15 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#e15d79ff', textDecoration: 'underline' }}>Log in</Link>
        </div>
      </form>
      <footer style={{ background: '#f5eaf4', height: 30, marginTop: 'auto' }} />
    </div>
  );
};

export default SignupPage;