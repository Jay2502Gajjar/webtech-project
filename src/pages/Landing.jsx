import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./Landing.css";

// Landing page - the first page visitors see with animated hero section
function Landing() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="landing-page">
      {/* Animated floating shapes in the background (CSS only) */}
      <div className="landing-bg">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      {/* Theme toggle button */}
      <button className="landing-theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content fade-in">
          <span className="hero-badge">🎓 Welcome to</span>
          <h1 className="hero-title">
            Campus<span className="gradient-text">Connect</span>
          </h1>
          <p className="hero-subtitle">
            Your all-in-one portal for college events, clubs, and student communities.
            Stay connected, stay involved.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="hero-btn hero-btn-primary">
              Get Started →
            </Link>
            <Link to="/login" className="hero-btn hero-btn-secondary">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section fade-in-delay">
        <h2 className="features-title">What you can do</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎪</div>
            <h3>Discover Events</h3>
            <p>Browse and register for college events — tech fests, cultural nights, workshops and more.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏛️</div>
            <h3>Join Clubs</h3>
            <p>Find student communities that match your interests and connect with like-minded peers.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Track Activities</h3>
            <p>Manage your registrations, view upcoming events, and stay on top of your schedule.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>Admin Panel</h3>
            <p>Easily add, edit and manage events. Keep the community updated with the latest info.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>CampusConnect © 2026 — Built with React for Web Technology Project</p>
      </footer>
    </div>
  );
}

export default Landing;
