import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";

// Events page - displays all events with search and filter
function Events() {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load events and registered events from localStorage
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const savedRegistered = JSON.parse(localStorage.getItem("registeredEvents")) || [];
    setEvents(savedEvents);
    setRegisteredEvents(savedRegistered);
  }, []);

  // Handle event registration
  function handleRegister(event) {
    // Check if already registered (prevent duplicate registration)
    const alreadyRegistered = registeredEvents.some((e) => e.id === event.id);
    if (alreadyRegistered) {
      alert("You are already registered for this event!");
      return;
    }

    // Add event to registered list
    const updatedRegistered = [...registeredEvents, event];
    setRegisteredEvents(updatedRegistered);
    // JSON.stringify() converts a JavaScript array/object into a JSON string for storage
    localStorage.setItem("registeredEvents", JSON.stringify(updatedRegistered));
    alert("Successfully registered for " + event.name + "!");
  }

  // Check if an event is already registered
  function isRegistered(eventId) {
    return registeredEvents.some((e) => e.id === eventId);
  }

  // Get unique categories from events for the filter dropdown
  const categories = ["All"];
  for (let i = 0; i < events.length; i++) {
    if (!categories.includes(events[i].category)) {
      categories.push(events[i].category);
    }
  }

  // Filter events by search term and category
  let filteredEvents = events;

  // Filter by search term (case-insensitive)
  if (searchTerm !== "") {
    filteredEvents = filteredEvents.filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by selected category
  if (selectedCategory !== "All") {
    filteredEvents = filteredEvents.filter(
      (event) => event.category === selectedCategory
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>🎪 College Events</h2>
        <p>Browse and register for upcoming events</p>
      </div>

      {/* Search and filter controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="🔍 Search events by name..."
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
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Display filtered events */}
      {filteredEvents.length === 0 ? (
        <div className="empty-state">
          <p>No events found.</p>
        </div>
      ) : (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              actionLabel={isRegistered(event.id) ? "✓ Registered" : "Register"}
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
