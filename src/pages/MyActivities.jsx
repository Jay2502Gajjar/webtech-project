import { useState, useEffect } from "react";

// MyActivities page - shows registered events and joined clubs with cancel option
function MyActivities() {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);

  // Load registered events and joined clubs from localStorage
  useEffect(() => {
    const savedRegistered = JSON.parse(localStorage.getItem("registeredEvents")) || [];
    const savedJoined = JSON.parse(localStorage.getItem("joinedClubs")) || [];
    setRegisteredEvents(savedRegistered);
    setJoinedClubs(savedJoined);
  }, []);

  // Cancel event registration
  function handleCancelEvent(eventId) {
    // filter() creates a new array excluding the cancelled event
    const updated = registeredEvents.filter((event) => event.id !== eventId);
    setRegisteredEvents(updated);
    localStorage.setItem("registeredEvents", JSON.stringify(updated));
    alert("Registration cancelled.");
  }

  // Leave a club
  function handleLeaveClub(clubId) {
    const updated = joinedClubs.filter((club) => club.id !== clubId);
    setJoinedClubs(updated);
    localStorage.setItem("joinedClubs", JSON.stringify(updated));
    alert("You have left the club.");
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>📋 My Activities</h2>
        <p>Manage your event registrations and club memberships</p>
      </div>

      {/* Registered Events */}
      <section className="section-box">
        <h3>🎫 Registered Events ({registeredEvents.length})</h3>
        {registeredEvents.length === 0 ? (
          <div className="empty-state">
            <p>You have not registered for any events yet.</p>
          </div>
        ) : (
          <ul className="activity-list">
            {registeredEvents.map((event) => (
              <li key={event.id} className="activity-item">
                <div>
                  <strong>{event.name}</strong>
                  <span className="activity-detail"> — {event.date} at {event.venue}</span>
                </div>
                <button
                  className="cancel-btn"
                  onClick={() => handleCancelEvent(event.id)}
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Joined Clubs */}
      <section className="section-box">
        <h3>🏛️ Joined Clubs ({joinedClubs.length})</h3>
        {joinedClubs.length === 0 ? (
          <div className="empty-state">
            <p>You have not joined any clubs yet.</p>
          </div>
        ) : (
          <ul className="activity-list">
            {joinedClubs.map((club) => (
              <li key={club.id} className="activity-item">
                <div>
                  <strong>{club.name}</strong>
                </div>
                <button
                  className="cancel-btn"
                  onClick={() => handleLeaveClub(club.id)}
                >
                  Leave
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default MyActivities;
