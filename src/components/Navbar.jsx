import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./Navbar.css";

// Navbar component - navigation links, theme toggle, and logout
function Navbar({ onLogout }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <h1 className="navbar-title">🎓 CampusConnect</h1>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/clubs">Clubs</Link></li>
        <li><Link to="/my-activities">My Activities</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <div className="navbar-actions">
        {/* Theme toggle button */}
        <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {/* Logout button */}
        <Link to="/" className="logout-btn" onClick={onLogout}>
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
