import { useState, useEffect } from "react";

// Dashboard page - shows welcome message, stats and upcoming events
function Dashboard() {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);

  // Load data from localStorage when the page loads
  useEffect(() => {
    // JSON.parse() converts a JSON string back into a JavaScript array/object
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const savedRegistered = JSON.parse(localStorage.getItem("registeredEvents")) || [];
    const savedClubs = JSON.parse(localStorage.getItem("joinedClubs")) || [];

    setEvents(savedEvents);
    setRegisteredEvents(savedRegistered);
    setJoinedClubs(savedClubs);
  }, []); // Empty dependency array means this runs only once when component mounts

  // Get upcoming events (events with a date today or in the future)
  const today = new Date().toISOString().split("T")[0]; // Get today's date as "YYYY-MM-DD"
  const upcomingEvents = events.filter((event) => event.date >= today);

  // Simple announcements array
  const announcements = [
    "📢 Registrations for Tech Fest 2026 are now open!",
    "📢 New clubs have been added. Check the Clubs page!",
    "📢 Submit your project reports before December 20th.",
  ];

  return (
    <div className="page-container">
      {/* Welcome banner */}
      <div className="welcome-banner">
        <h2>Welcome to CampusConnect! 🎓</h2>
        <p>Your one-stop portal for college events and student communities.</p>
      </div>

      {/* Stats section using CSS Grid */}
      <section className="stats-section">
        <div className="stat-card">
          <h3>{registeredEvents.length}</h3>
          <p>Registered Events</p>
        </div>
        <div className="stat-card">
          <h3>{joinedClubs.length}</h3>
          <p>Joined Clubs</p>
        </div>
        <div className="stat-card">
          <h3>{events.length}</h3>
          <p>Total Events</p>
        </div>
      </section>

      {/* Upcoming events section */}
      <section className="section-box">
        <h3>📅 Upcoming Events</h3>
        {upcomingEvents.length === 0 ? (
          <div className="empty-state">
            <p>No upcoming events.</p>
          </div>
        ) : (
          <ul className="simple-list">
            {upcomingEvents.map((event) => (
              <li key={event.id}>
                <strong>{event.name}</strong> — {event.date} at {event.venue}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Announcements section */}
      <section className="section-box">
        <h3>📣 Announcements</h3>
        <ul className="simple-list">
          {announcements.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer">
        CampusConnect © 2026 — Built with React
      </footer>
    </div>
  );
}

export default Dashboard;
