import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { api } from "../src/api";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      setMessage("Login successful 🎉");
      console.log("User:", res.data.user);

      navigate("/home");
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold flex justify-center items-center text-blue-700 mb-8">
        Welcome to <span className="text-gray-800 ml-2">theBookStore!</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-80 gap-4 border border-gray-300 p-6 rounded-xl bg-white shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-2">
          Login
        </h2>

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
          className="py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-lg font-medium"
        >
          Login
        </button>

        {/* Sign up button (always visible) */}
        <div className="text-center mt-2">
          <span className="text-sm text-gray-600">Don’t have an account?</span>{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-medium hover:underline text-sm"
          >
            Sign Up
          </button>
        </div>

        {message && (
          <p className="text-center text-red-500 mt-2 text-sm">{message}</p>
        )}
      </form>
    </div>
  );
}

export default Login;
