import { useState, useEffect } from "react";

function MyActivities() {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);

  useEffect(() => {
    const savedRegistered = JSON.parse(localStorage.getItem("registeredEvents")) || [];
    const savedJoined = JSON.parse(localStorage.getItem("joinedClubs")) || [];
    setRegisteredEvents(savedRegistered);
    setJoinedClubs(savedJoined);
  }, []);

  function handleCancelEvent(eventId) {
    if (!confirm("Are you sure you want to cancel this registration?")) {
      return;
    }
    const updated = registeredEvents.filter((event) => event.id !== eventId);
    setRegisteredEvents(updated);
    localStorage.setItem("registeredEvents", JSON.stringify(updated));
    alert("Event registration cancelled.");
  }

  function handleLeaveClub(clubId) {
    if (!confirm("Are you sure you want to leave this club?")) {
      return;
    }
    const updated = joinedClubs.filter((club) => club.id !== clubId);
    setJoinedClubs(updated);
    localStorage.setItem("joinedClubs", JSON.stringify(updated));
    alert("You have left the club.");
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>My Activities & Registrations</h2>
        <p>Manage your enrolled event tickets and active club memberships</p>
      </div>

      <section className="section-box">
        <h3>My Registered Events ({registeredEvents.length})</h3>
        {registeredEvents.length === 0 ? (
          <div className="empty-state">
            <p>You have not registered for any events yet. Check the Events tab to register.</p>
          </div>
        ) : (
          <ul className="activity-list">
            {registeredEvents.map((event) => (
              <li key={event.id} className="activity-item">
                <div>
                  <strong>{event.name}</strong>
                  <span className="activity-detail"> — {event.date} at {event.venue} ({event.category})</span>
                </div>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => handleCancelEvent(event.id)}
                >
                  Cancel Registration
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="section-box">
        <h3>My Enrolled Clubs ({joinedClubs.length})</h3>
        {joinedClubs.length === 0 ? (
          <div className="empty-state">
            <p>You have not joined any clubs yet. Visit the Clubs page to explore communities.</p>
          </div>
        ) : (
          <ul className="activity-list">
            {joinedClubs.map((club) => (
              <li key={club.id} className="activity-item">
                <div>
                  <strong>{club.name}</strong>
                  <span className="activity-detail"> — {club.description}</span>
                </div>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => handleLeaveClub(club.id)}
                >
                  Leave Club
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
