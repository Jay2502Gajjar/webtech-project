import { useState, useEffect } from "react";

function Admin() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    venue: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(savedEvents);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim() || !formData.date || !formData.venue.trim() || !formData.category || !formData.description.trim()) {
      alert("Please fill in all the required event details.");
      return;
    }

    let updatedList;

    if (editingEvent) {
      updatedList = events.map((item) => {
        if (item.id === editingEvent.id) {
          return { ...item, ...formData };
        }
        return item;
      });
      setEditingEvent(null);
      alert("Event updated successfully!");
    } else {
      const newEvent = {
        id: Date.now(),
        ...formData,
      };
      updatedList = [...events, newEvent];
      alert("New event created successfully!");
    }

    setEvents(updatedList);
    localStorage.setItem("events", JSON.stringify(updatedList));

    setFormData({ name: "", date: "", venue: "", category: "", description: "" });
  }

  function handleDelete(eventId) {
    if (!confirm("Are you sure you want to delete this event from the portal?")) {
      return;
    }
    const updated = events.filter((ev) => ev.id !== eventId);
    setEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));

    const savedRegistered = JSON.parse(localStorage.getItem("registeredEvents")) || [];
    const updatedReg = savedRegistered.filter((ev) => ev.id !== eventId);
    localStorage.setItem("registeredEvents", JSON.stringify(updatedReg));

    alert("Event deleted successfully.");
  }

  function handleEdit(event) {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      date: event.date,
      venue: event.venue,
      category: event.category,
      description: event.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingEvent(null);
    setFormData({ name: "", date: "", venue: "", category: "", description: "" });
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Admin Management Panel</h2>
        <p>Create, update, and manage official campus events and activities</p>
      </div>

      <section className="section-box">
        <h3>{editingEvent ? "Update Existing Event" : "Create New College Event"}</h3>

        <form onSubmit={handleSubmit} className="admin-form">
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. National Hackathon 2026"
            required
          />

          <label htmlFor="date">Scheduled Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="venue">Campus Venue</label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="e.g. Auditorium / Computer Lab 3"
            required
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose Category --</option>
            <option value="Technical">Technical</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
            <option value="Workshop">Workshop</option>
          </select>

          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description about the event, rules, or schedule"
            rows="3"
            required
          />

          <div className="form-buttons">
            <button type="submit" className="event-card-btn">
              {editingEvent ? "Save Changes" : "Create Event"}
            </button>
            {editingEvent && (
              <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="section-box">
        <h3>Current Events List ({events.length})</h3>
        {events.length === 0 ? (
          <div className="empty-state">
            <p>No events found in the database. Use the form above to add an event.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Category</th>
                <th style={{ width: "140px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev.id}>
                  <td><strong>{ev.name}</strong></td>
                  <td>{ev.date}</td>
                  <td>{ev.venue}</td>
                  <td>{ev.category}</td>
                  <td>
                    <button type="button" className="edit-btn" onClick={() => handleEdit(ev)}>
                      Edit
                    </button>
                    <button type="button" className="delete-btn" onClick={() => handleDelete(ev.id)}>
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
