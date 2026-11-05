import "./EventCard.css";

function EventCard({ event, actionLabel, onAction, actionDisabled }) {
  function getCategoryClass(category) {
    if (category === "Technical") return "cat-technical";
    if (category === "Cultural") return "cat-cultural";
    if (category === "Sports") return "cat-sports";
    if (category === "Workshop") return "cat-workshop";
    return "cat-default";
  }

  return (
    <div className="event-card">
      <div className="event-card-top">
        <span className={`category-tag ${getCategoryClass(event.category)}`}>
          {event.category}
        </span>
        <span className="event-date">{event.date}</span>
      </div>

      <h3 className="event-title">{event.name}</h3>

      <div className="event-info">
        <p className="event-venue"><strong>Venue:</strong> {event.venue}</p>
        <p className="event-desc">{event.description}</p>
      </div>

      {actionLabel && (
        <div className="event-card-footer">
          <button
            type="button"
            className={`event-card-btn ${actionDisabled ? "disabled-btn" : ""}`}
            onClick={() => onAction(event)}
            disabled={actionDisabled}
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
}

export default EventCard;
