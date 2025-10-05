import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AuthButton() {
  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  if (!token) {
    return (
      <div className="flex items-center gap-3">
        <Link to="/login" className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-800">Login</Link>
        <Link to="/signup" className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700">Sign Up</Link>
      </div>
    )
  }

  return (
    <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold bg-gray-800 text-white rounded-xl shadow hover:bg-gray-900">
      Logout
    </button>
  )
}

export default AuthButton


