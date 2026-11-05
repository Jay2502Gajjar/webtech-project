import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";

function Events() {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const savedRegistered = JSON.parse(localStorage.getItem("registeredEvents")) || [];
    setEvents(savedEvents);
    setRegisteredEvents(savedRegistered);
  }, []);

  function handleRegister(event) {
    const alreadyRegistered = registeredEvents.some((e) => e.id === event.id);
    if (alreadyRegistered) {
      alert("You have already registered for this event.");
      return;
    }

    const updated = [...registeredEvents, event];
    setRegisteredEvents(updated);
    localStorage.setItem("registeredEvents", JSON.stringify(updated));
    alert(`Successfully registered for ${event.name}!`);
  }

  function isRegistered(eventId) {
    return registeredEvents.some((e) => e.id === eventId);
  }

  const categories = ["All"];
  events.forEach((item) => {
    if (item.category && !categories.includes(item.category)) {
      categories.push(item.category);
    }
  });

  const filteredEvents = events.filter((ev) => {
    const matchesSearch = ev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ev.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || ev.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>College Events</h2>
        <p>Explore and register for upcoming technical and extracurricular activities</p>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by event name or venue..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>Category: {cat}</option>
          ))}
        </select>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="empty-state">
          <p>No events match your current search criteria.</p>
        </div>
      ) : (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              actionLabel={isRegistered(event.id) ? "Already Registered" : "Register Now"}
              onAction={handleRegister}
              actionDisabled={isRegistered(event.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
