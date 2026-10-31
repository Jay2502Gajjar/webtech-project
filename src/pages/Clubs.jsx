import { useState, useEffect } from "react";

// Clubs page - displays all clubs and allows joining
function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);

  // Load clubs and joined clubs from localStorage
  useEffect(() => {
    const savedClubs = JSON.parse(localStorage.getItem("clubs")) || [];
    const savedJoined = JSON.parse(localStorage.getItem("joinedClubs")) || [];
    setClubs(savedClubs);
    setJoinedClubs(savedJoined);
  }, []);

  // Handle joining a club
  function handleJoin(club) {
    // Check if already joined (prevent duplicate joining)
    const alreadyJoined = joinedClubs.some((c) => c.id === club.id);
    if (alreadyJoined) {
      alert("You have already joined " + club.name + "!");
      return;
    }

    // Add club to joined list
    const updatedJoined = [...joinedClubs, club];
    setJoinedClubs(updatedJoined);
    localStorage.setItem("joinedClubs", JSON.stringify(updatedJoined));
    alert("Successfully joined " + club.name + "!");
  }

  // Check if a club is already joined
  function isJoined(clubId) {
    return joinedClubs.some((c) => c.id === clubId);
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>🏛️ College Clubs</h2>
        <p>Join student communities and explore your interests</p>
      </div>

      {clubs.length === 0 ? (
        <div className="empty-state">
          <p>No clubs available.</p>
        </div>
      ) : (
        <div className="events-grid">
          {clubs.map((club) => (
            <div key={club.id} className="club-card">
              <h3>{club.name}</h3>
              <p>{club.description}</p>
              <button
                className={`event-card-btn ${isJoined(club.id) ? "disabled-btn" : ""}`}
                onClick={() => handleJoin(club)}
                disabled={isJoined(club.id)}
              >
                {isJoined(club.id) ? "✓ Joined" : "Join Club"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Clubs;
