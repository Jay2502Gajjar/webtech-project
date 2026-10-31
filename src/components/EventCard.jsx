import "./EventCard.css";

// EventCard component - displays a single event's details
// Props: event object and an action button (Register/Cancel/Delete etc.)
function EventCard({ event, actionLabel, onAction, actionDisabled }) {
  // Pick badge color class based on category
  function getBadgeClass(category) {
    if (category === "Technical") return "badge-technical";
    if (category === "Cultural") return "badge-cultural";
    if (category === "Sports") return "badge-sports";
    if (category === "Workshop") return "badge-workshop";
    return "badge-technical";
  }

  // Pick border color class based on category
  function getBorderClass(category) {
    if (category === "Technical") return "border-technical";
    if (category === "Cultural") return "border-cultural";
    if (category === "Sports") return "border-sports";
    if (category === "Workshop") return "border-workshop";
    return "border-technical";
  }

  return (
    <div className={`event-card ${getBorderClass(event.category)}`}>
      {/* Header with name and category badge */}
      <div className="event-card-header">
        <h3 className="event-card-name">{event.name}</h3>
        <span className={`category-badge ${getBadgeClass(event.category)}`}>
          {event.category}
        </span>
      </div>

      <p className="event-card-detail">📅 {event.date}</p>
      <p className="event-card-detail">📍 {event.venue}</p>
      <p className="event-card-description">{event.description}</p>

      {/* Show action button only if actionLabel is provided */}
      {actionLabel && (
        <button
          className={`event-card-btn ${actionDisabled ? "disabled-btn" : ""}`}
          onClick={() => onAction(event)}
          disabled={actionDisabled}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EventCard;
