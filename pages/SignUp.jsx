import React, { useState } from "react";
import { api } from "../src/api";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/signup", formData);
      setMessage(res.data?.message || "Signup successful 🎉");

      // Optionally redirect to login after signup
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(error?.response?.data?.message || error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      {/* Pretty heading */}
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Create your <span className="text-gray-800">BookStore Account</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-80 gap-4 border border-gray-300 p-6 rounded-xl bg-white shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-2">
          Sign Up
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />

        <button
          type="submit"
          className="py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 text-lg font-medium"
        >
          Sign Up
        </button>

        {/* Redirect to Login */}
        <div className="text-center mt-2">
          <span className="text-sm text-gray-600">Already have an account?</span>{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium hover:underline text-sm"
          >
            Login
          </button>
        </div>

        {message && (
          <p className="text-center text-red-500 mt-2 text-sm">{message}</p>
        )}
      </form>
    </div>
  );
}

export default SignUp;
