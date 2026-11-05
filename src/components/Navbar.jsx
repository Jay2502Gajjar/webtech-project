import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.name) {
        setUserName(user.name);
      }
    } catch {
      setUserName("");
    }
  }, []);

  function handleLogoutClick() {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  }

  return (
    <header className="navbar-header">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/dashboard" className="brand-link">
            <span className="brand-name">CampusConnect</span>
            <span className="brand-tag">Event Portal</span>
          </Link>
        </div>

        <ul className="navbar-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/clubs">Clubs</Link></li>
          <li><Link to="/my-activities">My Activities</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>

        <div className="navbar-actions">
          {userName && <span className="nav-user">{userName}</span>}
          <button type="button" className="logout-btn" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
