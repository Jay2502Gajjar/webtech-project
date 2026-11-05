import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim() || !formData.studentId.trim() || !formData.password) {
      setError("Please fill in all the required fields.");
      return;
    }

    if (formData.password.length < 4) {
      setError("Password must contain at least 4 characters.");
      return;
    }

    const userData = {
      name: formData.name.trim(),
      studentId: formData.studentId.trim().toUpperCase(),
      loggedIn: true,
    };
    localStorage.setItem("user", JSON.stringify(userData));

    const existingProfile = JSON.parse(localStorage.getItem("profile"));
    if (!existingProfile || !existingProfile.name) {
      localStorage.setItem("profile", JSON.stringify({
        name: formData.name.trim(),
        email: `${formData.studentId.trim().toLowerCase()}@college.edu`,
        department: "Computer Science & Engineering",
      }));
    }

    if (onLogin) {
      onLogin();
    }

    navigate("/dashboard");
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-header">
          <h2 className="login-title">Student Login</h2>
          <p className="login-subtitle">CampusConnect College Event Portal</p>
        </div>

        {error && <div className="login-alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form-body">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="studentId">Student Roll No / ID</label>
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

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">
            Sign In
          </button>
        </form>

        <div className="login-bottom-links">
          <Link to="/" className="back-link">← Back to Portal Home</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
