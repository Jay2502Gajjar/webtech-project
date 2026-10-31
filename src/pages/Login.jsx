import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "./Login.css";

// Login page - simple login form that saves student info to localStorage
function Login({ onLogin }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.studentId || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Check password length
    if (formData.password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    // Save login info to localStorage (no real authentication needed)
    const userData = {
      name: formData.name,
      studentId: formData.studentId,
      loggedIn: true,
    };
    localStorage.setItem("user", JSON.stringify(userData));

    // Also set profile name if not already set
    const existingProfile = JSON.parse(localStorage.getItem("profile"));
    if (!existingProfile || !existingProfile.name) {
      localStorage.setItem("profile", JSON.stringify({
        name: formData.name,
        email: "",
        department: "",
      }));
    }

    // Notify App of login
    if (onLogin) {
      onLogin();
    }

    // Navigate to dashboard
    navigate("/dashboard");
  }

  return (
    <div className="login-page">
      {/* Animated background shapes */}
      <div className="landing-bg">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Theme toggle */}
      <button className="landing-theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      {/* Login card */}
      <div className="login-container fade-in">
        <div className="login-card">
          <h2 className="login-title">
            Welcome back <span className="gradient-text">!</span>
          </h2>
          <p className="login-subtitle">Sign in to your CampusConnect account</p>

          {/* Error message */}
          {error && <p className="login-error">{error}</p>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="studentId">Student ID</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="e.g. 24BIT143"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Sign In →
            </button>
          </form>

          <p className="login-footer-text">
            <Link to="/" className="login-link">← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
