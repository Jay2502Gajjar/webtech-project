import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [studentName, setStudentName] = useState("Student");
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.name) {
        setStudentName(user.name);
      }
    } catch {
      setStudentName("Student");
    }

    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const savedRegistered = JSON.parse(localStorage.getItem("registeredEvents")) || [];
    const savedClubs = JSON.parse(localStorage.getItem("joinedClubs")) || [];

    setEvents(savedEvents);
    setRegisteredEvents(savedRegistered);
    setJoinedClubs(savedClubs);
  }, []);

  const todayStr = new Date().toISOString().split("T")[0];
  const upcomingList = events.filter((item) => item.date >= todayStr);

  const announcements = [
    "Registrations for Tech Fest 2026 are officially open.",
    "New departmental clubs have been updated. View details in the Clubs tab.",
    "Semester project submissions and activity confirmations are due before the end of this month.",
    "Guest lecture on Artificial Intelligence scheduled in Seminar Hall.",
  ];

  return (
    <div className="page-container">
      <div className="welcome-banner">
        <h2>Welcome back, {studentName}!</h2>
        <p>CampusConnect Student Portal — Academic Year 2026</p>
      </div>

      <section className="stats-section">
        <div className="stat-card">
          <h3>{registeredEvents.length}</h3>
          <p>My Registered Events</p>
        </div>
        <div className="stat-card">
          <h3>{joinedClubs.length}</h3>
          <p>Enrolled Clubs</p>
        </div>
        <div className="stat-card">
          <h3>{events.length}</h3>
          <p>Total College Events</p>
        </div>
      </section>

      <section className="section-box">
        <h3>Upcoming Campus Events</h3>
        {upcomingList.length === 0 ? (
          <div className="empty-state">
            <p>No upcoming events scheduled right now.</p>
          </div>
        ) : (
          <ul className="simple-list">
            {upcomingList.map((ev) => (
              <li key={ev.id}>
                <strong>{ev.name}</strong> — {ev.date} at {ev.venue} ({ev.category})
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="section-box">
        <h3>Campus Notice Board</h3>
        <ul className="simple-list">
          {announcements.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </section>

      <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
        <Link to="/events" className="event-card-btn" style={{ textDecoration: "none" }}>
          Explore Events
        </Link>
        <Link to="/my-activities" className="event-card-btn" style={{ textDecoration: "none", backgroundColor: "#0284c7" }}>
          View My Activities
        </Link>
      </div>

      <footer className="footer">
        CampusConnect — Web Technology Project
      </footer>
    </div>
  );
}

export default Dashboard;
