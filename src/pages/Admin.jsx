import { useState, useEffect } from "react";

// Admin page - add, edit and delete events
function Admin() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null); // Track which event is being edited

  // Form state for adding/editing an event
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    venue: "",
    category: "",
    description: "",
  });

  // Load events from localStorage
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(savedEvents);
  }, []);

  // Handle form input changes using a single function
  function handleChange(e) {
    const { name, value } = e.target; // Destructuring to get input name and value
    setFormData({ ...formData, [name]: value });
  }

  // Handle form submission (add or update event)
  function handleSubmit(e) {
    e.preventDefault(); // Prevent page from refreshing

    // Basic validation - check all fields are filled
    if (!formData.name || !formData.date || !formData.venue || !formData.category || !formData.description) {
      alert("Please fill in all fields.");
      return;
    }

    let updatedEvents;

    if (editingEvent) {
      // Update existing event
      updatedEvents = events.map((event) => {
        if (event.id === editingEvent.id) {
          return { ...event, ...formData };
        }
        return event;
      });
      setEditingEvent(null);
      alert("Event updated successfully!");
    } else {
      // Create new event with a unique id using Date.now()
      const newEvent = {
        id: Date.now(),
        ...formData,
      };
      updatedEvents = [...events, newEvent];
      alert("Event added successfully!");
    }

    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    // Clear the form
    setFormData({ name: "", date: "", venue: "", category: "", description: "" });
  }

  // Delete an event
  function handleDelete(eventId) {
    if (!confirm("Are you sure you want to delete this event?")) {
      return;
    }
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    // Also remove from registered events if someone registered for it
    const savedRegistered = JSON.parse(localStorage.getItem("registeredEvents")) || [];
    const updatedRegistered = savedRegistered.filter((event) => event.id !== eventId);
    localStorage.setItem("registeredEvents", JSON.stringify(updatedRegistered));

    alert("Event deleted.");
  }

  // Start editing an event - fill the form with event data
  function handleEdit(event) {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      date: event.date,
      venue: event.venue,
      category: event.category,
      description: event.description,
    });
    // Scroll to top so user can see the form
    window.scrollTo(0, 0);
  }

  // Cancel editing
  function handleCancelEdit() {
    setEditingEvent(null);
    setFormData({ name: "", date: "", venue: "", category: "", description: "" });
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>⚙️ Admin Panel</h2>
        <p>Manage events — add, edit or delete</p>
      </div>

      {/* Add/Edit Event Form */}
      <section className="section-box">
        <h3>{editingEvent ? "✏️ Edit Event" : "➕ Add New Event"}</h3>

        <form onSubmit={handleSubmit} className="admin-form">
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter event name"
            required
          />

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="venue">Venue:</label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Enter venue"
            required
          />

          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Technical">Technical</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
            <option value="Workshop">Workshop</option>
          </select>

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter event description"
            rows="3"
            required
          />

          <div className="form-buttons">
            <button type="submit" className="event-card-btn">
              {editingEvent ? "Update Event" : "Add Event"}
            </button>
            {editingEvent && (
              <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </section>

      {/* List of Existing Events */}
      <section className="section-box">
        <h3>📋 Existing Events ({events.length})</h3>
        {events.length === 0 ? (
          <div className="empty-state">
            <p>No events added yet.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.venue}</td>
                  <td>{event.category}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(event)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(event.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default Admin;
