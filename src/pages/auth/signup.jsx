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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add signup logic here
    alert('Signup submitted!');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fcf9fd', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1.5rem 2rem 0.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Naaricycle</div>
        <div>
          <Link to="/login" style={{ marginRight: '1rem', color: '#23182a', textDecoration: 'none' }}>Log in</Link>
          <Link to="/signup" style={{ background: '#e040fb', color: '#fff', borderRadius: '8px', padding: '0.5rem 1.2rem', textDecoration: 'none', fontWeight: 500 }}>Sign up</Link>
        </div>
      </header>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '2rem auto 0 auto', background: 'transparent', padding: '2rem 0', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2 style={{ textAlign: 'center', color: '#23182a', marginBottom: '1.5rem' }}>Create your account</h2>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" style={{ width: '100%', padding: '0.8rem', borderRadius: 8, border: 'none', background: '#f5eaf4', marginBottom: 0 }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" style={{ width: '100%', padding: '0.8rem', borderRadius: 8, border: 'none', background: '#f5eaf4', marginBottom: 0 }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter your password" style={{ width: '100%', padding: '0.8rem', borderRadius: 8, border: 'none', background: '#f5eaf4', marginBottom: 0 }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>Cycle length</label>
          <input name="cycleLength" value={form.cycleLength} onChange={handleChange} placeholder="Enter your cycle length" style={{ width: '100%', padding: '0.8rem', borderRadius: 8, border: 'none', background: '#f5eaf4', marginBottom: 0 }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>Period length</label>
          <input name="periodLength" value={form.periodLength} onChange={handleChange} placeholder="Enter your period length" style={{ width: '100%', padding: '0.8rem', borderRadius: 8, border: 'none', background: '#f5eaf4', marginBottom: 0 }} required />
        </div>
        <button type="submit" style={{ background: '#e040fb', color: '#fff', border: 'none', borderRadius: 10, padding: '1rem', fontWeight: 600, fontSize: '1.1rem', marginTop: '1rem', cursor: 'pointer' }}>Sign up</button>
        <div style={{ textAlign: 'center', color: '#a48bbd', fontSize: 14, marginTop: 8 }}>
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </div>
        <div style={{ textAlign: 'center', marginTop: 8, fontSize: 15 }}>
          Already have an account?{' '}
          <Link to="/components/auth/login" style={{ color: '#e040fb', textDecoration: 'underline' }}>Log in</Link>
        </div>
      </form>
      <footer style={{ background: '#f5eaf4', height: 30, marginTop: 'auto' }} />
    </div>
  );
};

export default SignupPage;
