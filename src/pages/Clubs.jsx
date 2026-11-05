import { useState, useEffect } from "react";

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);

  useEffect(() => {
    const savedClubs = JSON.parse(localStorage.getItem("clubs")) || [];
    const savedJoined = JSON.parse(localStorage.getItem("joinedClubs")) || [];
    setClubs(savedClubs);
    setJoinedClubs(savedJoined);
  }, []);

  function handleJoin(club) {
    const alreadyJoined = joinedClubs.some((c) => c.id === club.id);
    if (alreadyJoined) {
      alert("You have already joined " + club.name + ".");
      return;
    }

    const updated = [...joinedClubs, club];
    setJoinedClubs(updated);
    localStorage.setItem("joinedClubs", JSON.stringify(updated));
    alert("You have successfully enrolled in " + club.name + "!");
  }

  function isJoined(clubId) {
    return joinedClubs.some((c) => c.id === clubId);
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Student Clubs & Societies</h2>
        <p>Participate in departmental communities, tech chapters, and hobby clubs</p>
      </div>

      {clubs.length === 0 ? (
        <div className="empty-state">
          <p>No clubs are currently listed.</p>
        </div>
      ) : (
        <div className="events-grid">
          {clubs.map((club) => (
            <div key={club.id} className="club-card">
              <div>
                <h3>{club.name}</h3>
                <p>{club.description}</p>
              </div>
              <div>
                <button
                  type="button"
                  className={`event-card-btn ${isJoined(club.id) ? "disabled-btn" : ""}`}
                  onClick={() => handleJoin(club)}
                  disabled={isJoined(club.id)}
                >
                  {isJoined(club.id) ? "Member Enrolled" : "Join Club"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Clubs;
