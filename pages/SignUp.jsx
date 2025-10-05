import React, { useState } from 'react'
import { api } from '../src/api'

function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/signup', formData);
      setMessage(res.data?.message || 'Signup successful');
    } catch (error) {
      setMessage(error?.response?.data?.message || error.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px', border: '1px solid gray', padding: '20px', borderRadius: '10px' }}>
        <h2>Sign Up</h2>
        <input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  )
}

export default SignUp